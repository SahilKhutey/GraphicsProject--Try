#pragma once

#include <glad/glad.h>
#include <glm/glm.hpp>
#include <Renderer/Shader.hpp>

namespace Aether {

struct CloudSettings {
    float coverage = 0.45f;
    float density = 0.02f;
    float speed = 0.1f;
    float cloudHeightBottom = 1500.0f;
    float cloudHeightTop = 4500.0f;
    glm::vec3 windDirection = glm::vec3(1.0f, 0.0f, 0.5f);
};

class VolumetricCloudSystem {
public:
    unsigned int cloudNoise3D; // 3D Texture
    unsigned int weatherMap;   // 2D Control Texture
    CloudSettings settings;

    VolumetricCloudSystem() {
        // Initialize 3D Noise (Perlin-Worley)
        // Initialize Weather Map (Coverage, Type, Rain)
        GenerateNoiseTextures();
    }

    void Render(const Shader& cloudShader, const glm::mat4& view, const glm::mat4& projection, float time) {
        cloudShader.Bind();
        
        // Pass Cloud Volume Settings
        cloudShader.SetFloat("uCloudHeightBottom", settings.cloudHeightBottom);
        cloudShader.SetFloat("uCloudHeightTop", settings.cloudHeightTop);
        cloudShader.SetFloat("uCoverage", settings.coverage);
        cloudShader.SetFloat("uDensity", settings.density);
        cloudShader.SetFloat("uTime", time);
        cloudShader.SetVec3("uWindDir", settings.windDirection);

        // Bind 3D Noise and Weather Map
        glActiveTexture(GL_TEXTURE0);
        glBindTexture(GL_TEXTURE_3D, cloudNoise3D);
        cloudShader.SetInt("uCloudNoise", 0);

        glActiveTexture(GL_TEXTURE1);
        glBindTexture(GL_TEXTURE_2D, weatherMap);
        cloudShader.SetInt("uWeatherMap", 1);

        // Render full-screen quad for raymarching
    }

private:
    void GenerateNoiseTextures() {
        // Placeholder for 3D Noise Generation
        // Typically generated via Compute Shader or loaded from binary
    }
};

} // namespace Aether
