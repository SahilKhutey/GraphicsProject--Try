#pragma once

#include <glad/glad.h>
#include <Renderer/Shader.hpp>

namespace Aether {

class CASController {
public:
    float Sharpness = 0.5f; // 0.0 to 1.0
    unsigned int casShader;
    
    CASController() {
        // Initialization and shader compilation
    }

    void ProcessFrame(unsigned int inputTexture, unsigned int outputTexture, int width, int height) {
        glUseProgram(casShader);

        // Bind Images
        glBindImageTexture(0, inputTexture, 0, GL_FALSE, 0, GL_READ_ONLY, GL_RGBA16F);
        glBindImageTexture(1, outputTexture, 0, GL_FALSE, 0, GL_WRITE_ONLY, GL_RGBA16F);

        // Set Uniforms
        // glUniform1f(glGetUniformLocation(casShader, "uSharpness"), Sharpness);

        // Dispatch (16x16 workgroups)
        glDispatchCompute((width + 15) / 16, (height + 15) / 16, 1);
        
        // Memory Barrier
        glMemoryBarrier(GL_SHADER_IMAGE_ACCESS_BARRIER_BIT);
    }
};

} // namespace Aether
