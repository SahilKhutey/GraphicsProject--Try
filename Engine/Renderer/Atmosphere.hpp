#pragma once

#include <glm/glm.hpp>
#include "Shader.hpp"

namespace Aethelgard {

class Atmosphere {
public:
    glm::vec3 SunDirection = glm::normalize(glm::vec3(-1.0f, -0.5f, -0.3f));
    glm::vec3 RayleighScattering = glm::vec3(5.8e-6f, 13.5e-6f, 33.1e-6f);
    float MieScattering = 21e-6f;
    float SunIntensity = 20.0f;

    void Update(float deltaTime) {
        // Simple day/night rotation logic
        static float time = 0.0f;
        time += deltaTime * 0.1f;
        SunDirection = glm::normalize(glm::vec3(sin(time), cos(time), 0.3f));
    }

    void Apply(const Shader& shader) {
        shader.SetVec3("uSunDir", SunDirection);
        shader.SetVec3("uRayleigh", RayleighScattering);
        shader.SetFloat("uMie", MieScattering);
        shader.SetFloat("uSunIntensity", SunIntensity);
    }
};

} // namespace Aethelgard
