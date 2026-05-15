#pragma once

#include <glad/glad.h>
#include <glm/glm.hpp>

namespace Aether {

class SSGIManager {
public:
    struct SSGISettings {
        int raysPerPixel = 4;
        int stepsPerRay = 32;
        float indirectStrength = 1.0f;
        bool enableTemporal = true;
    };

    SSGISettings Settings;
    unsigned int ssgiShader;
    unsigned int ssgiMap; // RGBA16F Result
    unsigned int historyMap; // For temporal stability

    SSGIManager() {
        // Initialization of textures and buffers
    }

    void ProcessGI(unsigned int gDepth, unsigned int gNormal, unsigned int gColor) {
        glUseProgram(ssgiShader);
        
        // Bind G-Buffer
        // glBindTextureUnit(0, gDepth);
        // glBindTextureUnit(1, gNormal);
        // glBindTextureUnit(2, gColor);
        
        // Dispatch Compute (Half Resolution for Performance)
        // glDispatchCompute(width/32, height/32, 1);
        
        // Memory Barrier
        glMemoryBarrier(GL_SHADER_IMAGE_ACCESS_BARRIER_BIT);
    }
};

} // namespace Aether
