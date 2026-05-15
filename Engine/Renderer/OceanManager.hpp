#pragma once

#include <glad/glad.h>
#include <glm/glm.hpp>
#include <vector>

namespace Aether {

class OceanManager {
public:
    struct OceanSettings {
        int resolution = 512;
        float size = 1000.0f;
        float windSpeed = 10.0f;
        glm::vec2 windDir = glm::vec2(1.0f, 0.0f);
        float choppiness = 1.5f;
    };

    OceanSettings Settings;
    unsigned int fftShader;
    unsigned int displacementMap;
    unsigned int normalMap;

    OceanManager() {
        // Initialization of textures and shaders would occur here
    }

    void Update(float deltaTime, float time, const glm::vec3& globalWind) {
        // Sync with Weather System
        Settings.windSpeed = glm::length(globalWind);
        Settings.windDir = glm::normalize(glm::vec2(globalWind.x, globalWind.z));

        // 1. Dispatch FFT Compute Shaders
        glUseProgram(fftShader);
        // glUniform1f(glGetUniformLocation(fftShader, "uTime"), time);
        // ... Dispatch Compute ...
        
        // 2. Memory Barrier for Texture Access
        glMemoryBarrier(GL_SHADER_IMAGE_ACCESS_BARRIER_BIT);
    }
};

} // namespace Aether
