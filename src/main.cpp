#include <glad/glad.h>
#include <GLFW/glfw3.h>
#include <iostream>

#include <Renderer/Shader.hpp>
#include <Renderer/Atmosphere.hpp>
#include <Renderer/ShadowManager.hpp>
#include <Camera/ThirdPersonCamera.hpp>
#include <Terrain/TerrainManager.hpp>
#include <Weather/WeatherManager.hpp>
#include <Vegetation/VegetationManager.hpp>

// Settings
const unsigned int SCR_WIDTH = 1280;
const unsigned int SCR_HEIGHT = 720;

// High-Performance Engine Modules
Aethelgard::ThirdPersonCamera camera(glm::vec3(0.0f, 20.0f, 0.0f));
Aethelgard::TerrainManager terrainManager;
Aethelgard::Atmosphere atmosphere;
Aethelgard::ShadowManager shadowManager;
Aethelgard::WeatherManager* weather; // Initialized in main to handle GL context

float lastX = SCR_WIDTH / 2.0f;
float lastY = SCR_HEIGHT / 2.0f;
bool firstMouse = true;
float deltaTime = 0.0f;
float lastFrame = 0.0f;

void processInput(GLFWwindow *window) {
    if (glfwGetKey(window, GLFW_KEY_ESCAPE) == GLFW_PRESS)
        glfwSetWindowShouldClose(window, true);
    
    // We can move the camera target or the camera itself here in future phases
}

void mouse_callback(GLFWwindow* window, double xposIn, double yposIn) {
    float xpos = static_cast<float>(xposIn);
    float ypos = static_cast<float>(yposIn);
    if (firstMouse) { lastX = xpos; lastY = ypos; firstMouse = false; }
    float xoffset = xpos - lastX;
    float yoffset = lastY - ypos; 
    lastX = xpos; lastY = ypos;
    camera.ProcessMouseMovement(xoffset, yoffset);
}

void scroll_callback(GLFWwindow* window, double xoffset, double yoffset) {
    camera.ProcessMouseScroll(static_cast<float>(yoffset));
}

int main() {
    glfwInit();
    glfwWindowHint(GLFW_CONTEXT_VERSION_MAJOR, 3);
    glfwWindowHint(GLFW_CONTEXT_VERSION_MINOR, 3);
    glfwWindowHint(GLFW_OPENGL_PROFILE, GLFW_OPENGL_CORE_PROFILE);

    GLFWwindow* window = glfwCreateWindow(SCR_WIDTH, SCR_HEIGHT, "Aethelgard Engine: OpenWorld Phase 1-8", NULL, NULL);
    glfwMakeContextCurrent(window);
    glfwSetCursorPosCallback(window, mouse_callback);
    glfwSetScrollCallback(window, scroll_callback);
    glfwSetInputMode(window, GLFW_CURSOR, GLFW_CURSOR_DISABLED);
    gladLoadGLLoader((GLADloadproc)glfwGetProcAddress);

    glEnable(GL_DEPTH_TEST);

    // Initialize Shaders
    Aethelgard::Shader terrainShader("shaders/terrain.vert", "shaders/terrain.frag");
    
    // Initialize Weather after GL Context is ready
    weather = new Aethelgard::WeatherManager();

    while (!glfwWindowShouldClose(window)) {
        float currentFrame = static_cast<float>(glfwGetTime());
        deltaTime = currentFrame - lastFrame;
        lastFrame = currentFrame;

        processInput(window);

        // Simulation Update
        atmosphere.Update(deltaTime);
        terrainManager.Update(camera.Target);
        weather->Update(deltaTime, camera.Position);

        // PASS 1: Shadow Mapping
        shadowManager.Update(atmosphere.SunDirection, camera.Target);
        shadowManager.BindForWriting();
        terrainManager.Draw(terrainShader); // Simplified shadow caster pass
        shadowManager.Unbind(SCR_WIDTH, SCR_HEIGHT);

        // PASS 2: Beauty Render
        glClearColor(0.5f, 0.6f, 0.7f, 1.0f); // Match Fog Color
        glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);

        terrainShader.Use();
        glm::mat4 projection = glm::perspective(glm::radians(45.0f), (float)SCR_WIDTH / (float)SCR_HEIGHT, 0.1f, 1000.0f);
        glm::mat4 view = camera.GetViewMatrix();
        
        terrainShader.SetMat4("projection", projection);
        terrainShader.SetMat4("view", view);
        terrainShader.SetVec3("viewPos", camera.Position);
        terrainShader.SetMat4("lightSpaceMatrix", shadowManager.lightSpaceMatrix);
        
        glActiveTexture(GL_TEXTURE0);
        glBindTexture(GL_TEXTURE_2D, shadowManager.depthMap);
        terrainShader.SetInt("shadowMap", 0);

        atmosphere.Apply(terrainShader);
        terrainManager.Draw(terrainShader);

        // Weather Overlay
        weather->Draw();

        glfwSwapBuffers(window);
        glfwPollEvents();
    }

    glfwTerminate();
    return 0;
}
