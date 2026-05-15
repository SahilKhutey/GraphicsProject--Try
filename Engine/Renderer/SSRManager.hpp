#pragma once

#include <glad/glad.h>
#include <glm/glm.hpp>

namespace Aether {

class SSRManager {
public:
    struct SSRSettings {
        int maxSteps = 64;
        float stepSize = 0.1f;
        float thickness = 0.2f;
        float roughnessThreshold = 0.8f;
        bool enableEdgeFading = true;
    };

    SSRSettings Settings;
    unsigned int ssrShader;
    unsigned int ssrMap; // RGBA16F Result
    unsigned int historyMap;

    SSRManager() {
        // Initialization of textures and buffers
    }

    void ProcessReflections(unsigned int gDepth, unsigned int gNormal, unsigned int gColor) {
        glUseProgram(ssrShader);
        
        // Bind Buffers
        // glBindTextureUnit(0, gDepth);
        // glBindTextureUnit(1, gNormal);
        // glBindTextureUnit(2, gColor);
        
        // Dispatch Compute
        // glDispatchCompute(width/16, height/16, 1);
        
        // Memory Barrier
        glMemoryBarrier(GL_SHADER_IMAGE_ACCESS_BARRIER_BIT);
    }
};

} // namespace Aether
