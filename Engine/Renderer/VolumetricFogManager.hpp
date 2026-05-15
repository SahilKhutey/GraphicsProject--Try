#pragma once

#include <glad/glad.h>
#include <glm/glm.hpp>

namespace Aether {

class VolumetricFogManager {
public:
    struct FogSettings {
        float density = 0.05f;
        float heightFalloff = 0.1f;
        float anisotropy = 0.7f; // Henyey-Greenstein G factor
        float scatteringCoeff = 0.1f;
        float absorptionCoeff = 0.01f;
        
        glm::ivec3 gridResolution = glm::ivec3(160, 90, 128);
    };

    FogSettings Settings;
    unsigned int froxelGrid; // 3D Texture (RGBA16F)
    unsigned int injectionShader;
    unsigned int resolveShader;

    VolumetricFogManager() {
        // Initialization of 3D Texture and Shaders
    }

    void SetupGrid() {
        glGenTextures(1, &froxelGrid);
        glBindTexture(GL_TEXTURE_3D, froxelGrid);
        glTexImage3D(GL_TEXTURE_3D, 0, GL_RGBA16F, Settings.gridResolution.x, 
                     Settings.gridResolution.y, Settings.gridResolution.z, 0, 
                     GL_RGBA, GL_HALF_FLOAT, NULL);
        
        glTexParameteri(GL_TEXTURE_3D, GL_TEXTURE_MIN_FILTER, GL_LINEAR);
        glTexParameteri(GL_TEXTURE_3D, GL_TEXTURE_MAG_FILTER, GL_LINEAR);
        glTexParameteri(GL_TEXTURE_3D, GL_TEXTURE_WRAP_S, GL_CLAMP_TO_EDGE);
        glTexParameteri(GL_TEXTURE_3D, GL_TEXTURE_WRAP_T, GL_CLAMP_TO_EDGE);
        glTexParameteri(GL_TEXTURE_3D, GL_TEXTURE_WRAP_R, GL_CLAMP_TO_EDGE);
    }
};

} // namespace Aether
