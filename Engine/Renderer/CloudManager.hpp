#pragma once

#include <glad/glad.h>
#include <glm/glm.hpp>

namespace Aether {

class CloudManager {
public:
    struct CloudSettings {
        float coverage = 0.5f;
        float density = 1.0f;
        float silverLiningIntensity = 0.5f;
        float cloudHeightStart = 1500.0f;
        float cloudHeightEnd = 4000.0f;
        
        glm::vec3 windDir = glm::vec3(1.0, 0.0, 0.0);
        float windSpeed = 10.0f;
    };

    CloudSettings Settings;
    unsigned int cloudNoise3D; // Perlin-Worley Noise
    unsigned int weatherMap;   // 2D Texture from Climate Engine
    unsigned int cloudShader;

    CloudManager() {
        // Initialization of 3D Textures and Shaders
    }

    void UpdateWeather(unsigned int globalWeatherMap) {
        weatherMap = globalWeatherMap;
    }

    void SetupNoise() {
        // Generate 3D Perlin-Worley Noise Texture (128x128x128)
        glGenTextures(1, &cloudNoise3D);
        glBindTexture(GL_TEXTURE_3D, cloudNoise3D);
        // ... Noise generation logic ...
        glTexParameteri(GL_TEXTURE_3D, GL_TEXTURE_MIN_FILTER, GL_LINEAR_MIPMAP_LINEAR);
        glTexParameteri(GL_TEXTURE_3D, GL_TEXTURE_MAG_FILTER, GL_LINEAR);
    }
};

} // namespace Aether
