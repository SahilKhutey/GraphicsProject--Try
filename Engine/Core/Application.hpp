#pragma once

#include <glad/glad.h>
#include <GLFW/glfw3.h>
#include <iostream>
#include <memory>
#include <Renderer/RenderSystem.hpp>
#include <World/StreamingSystem.hpp>
#include <Camera/Camera.hpp>

namespace Aether {

class Application {
public:
    Application(const char* title, int width, int height) 
        : Title(title), Width(width), Height(height) {}

    bool Initialize() {
        if (!glfwInit()) return false;
        
        glfwWindowHint(GLFW_CONTEXT_VERSION_MAJOR, 4);
        glfwWindowHint(GLFW_CONTEXT_VERSION_MINOR, 6);
        glfwWindowHint(GLFW_OPENGL_PROFILE, GLFW_OPENGL_CORE_PROFILE);
        glfwWindowHint(GLFW_SAMPLES, 4); // Multisample

        Window = glfwCreateWindow(Width, Height, Title, NULL, NULL);
        if (!Window) {
            glfwTerminate();
            return false;
        }
        glfwMakeContextCurrent(Window);
        
        if (!gladLoadGLLoader((GLADloadproc)glfwGetProcAddress)) return false;

        // OpenGL Systems Initialization
        glEnable(GL_DEPTH_TEST);
        glEnable(GL_CULL_FACE);
        glEnable(GL_MULTISAMPLE);
        glViewport(0, 0, Width, Height);

        std::cout << "[Aether Engine] OpenGL 4.6 Initialized." << std::endl;
        std::cout << "[Aether Engine] Renderer: " << glGetString(GL_RENDERER) << std::endl;

        return true;
    }

    void Run() {
        while (!glfwWindowShouldClose(Window)) {
            float currentFrame = static_cast<float>(glfwGetTime());
            DeltaTime = currentFrame - LastFrame;
            LastFrame = currentFrame;

            ProcessInput();
            Update();
            Render();

            glfwSwapBuffers(Window);
            glfwPollEvents();
        }
    }

    virtual ~Application() {
        glfwTerminate();
    }

protected:
    virtual void ProcessInput() {}
    virtual void Update() {}
    virtual void Render() {}

    GLFWwindow* Window;
    const char* Title;
    int Width, Height;
    float DeltaTime = 0.0f;
    float LastFrame = 0.0f;
};

} // namespace Aether
