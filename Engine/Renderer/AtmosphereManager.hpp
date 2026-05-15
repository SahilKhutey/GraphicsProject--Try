#pragma once

#include <glm/glm.hpp>
#include <glm/gtc/matrix_transform.hpp>

namespace Aether {

struct AtmosphereSettings {
    float turbidity = 2.0f; // 2: Clear, 10: Hazy
    float rayleigh = 2.0f;
    float mie = 0.005f;
    float sunIntensity = 20.0f;
    glm::vec3 sunDir;
};

class AtmosphereManager {
public:
    float WorldTime = 12.0f; // 0.0 to 24.0
    AtmosphereSettings Settings;

    void Update(float deltaTime) {
        WorldTime += deltaTime * 0.1f;
        if (WorldTime >= 24.0f) WorldTime = 0.0f;

        // Calculate Sun Direction based on Time
        float angle = glm::radians((WorldTime / 24.0f) * 360.0f - 90.0f);
        Settings.sunDir = glm::normalize(glm::vec3(cos(angle), sin(angle), 0.2f));
        
        // Dynamically adjust scattering at sunset
        if (Settings.sunDir.y < 0.2f) {
            Settings.turbidity = glm::mix(2.0f, 5.0f, 1.0f - Settings.sunDir.y * 5.0f);
        }
    }

    glm::vec3 GetSunColor() const {
        // Simple color shift: White at noon, Orange at sunset
        float y = Settings.sunDir.y;
        if (y > 0.0f) {
            return glm::mix(glm::vec3(1.0f, 0.5f, 0.2f), glm::vec3(1.0f, 1.0f, 0.9f), y);
        }
        return glm::vec3(0.0f); // Night
    }
};

} // namespace Aether
