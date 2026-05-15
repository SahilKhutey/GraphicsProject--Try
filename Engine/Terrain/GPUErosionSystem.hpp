#pragma once

#include <glad/glad.h>
#include <Renderer/Shader.hpp>
#include <vector>

namespace Aether {

class GPUErosionSystem {
public:
    unsigned int erosionShader;
    
    GPUErosionSystem() {
        // In a real implementation, we would load and compile erosion.comp here
    }

    void RunErosion(unsigned int heightMapTexture, unsigned int waterSedimentTexture, int width, int height, int iterations) {
        glUseProgram(erosionShader);

        // Bind Textures to Image Units
        glBindImageTexture(0, heightMapTexture, 0, GL_FALSE, 0, GL_READ_WRITE, GL_R32F);
        glBindImageTexture(1, waterSedimentTexture, 0, GL_FALSE, 0, GL_READ_WRITE, GL_RGBA16F);

        // Set Simulation Params
        // glUniform1f(glGetUniformLocation(erosionShader, "uErosionRate"), 0.1f);
        // glUniform1f(glGetUniformLocation(erosionShader, "uDepositionRate"), 0.1f);
        // glUniform1f(glGetUniformLocation(erosionShader, "uEvaporation"), 0.02f);

        for (int i = 0; i < iterations; i++) {
            glDispatchCompute(width / 16, height / 16, 1);
            glMemoryBarrier(GL_SHADER_IMAGE_ACCESS_BARRIER_BIT);
        }
    }
};

} // namespace Aether
