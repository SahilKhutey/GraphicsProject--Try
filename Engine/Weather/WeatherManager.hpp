#pragma once

#include <glm/glm.hpp>
#include <vector>

namespace Aether {

struct WeatherState {
    float rainIntensity;
    float windStrength;
    glm::vec3 windDirection;
    float temperature;
    float cloudCoverage;
    float wetnessLevel; // Accumulated ground wetness
};

class WeatherManager {
public:
    WeatherState CurrentState;

    WeatherManager() {
        CurrentState.rainIntensity = 0.0f;
        CurrentState.windStrength = 0.5f;
        CurrentState.windDirection = glm::vec3(1.0f, 0.0f, 0.5f);
        CurrentState.temperature = 20.0f;
        CurrentState.cloudCoverage = 0.3f;
        CurrentState.wetnessLevel = 0.0f;
    }

    void Update(float deltaTime) {
        // 1. Accumulate Ground Wetness during rain
        if (CurrentState.rainIntensity > 0.1f) {
            CurrentState.wetnessLevel += CurrentState.rainIntensity * deltaTime * 0.05f;
        } else {
            // Dry out slowly
            CurrentState.wetnessLevel -= deltaTime * 0.01f;
        }
        CurrentState.wetnessLevel = glm::clamp(CurrentState.wetnessLevel, 0.0f, 1.0f);

        // 2. Dynamic Wind Variation
        // Wind fluctuates over time to avoid static swaying
    }

    // Parameters for Shaders
    float GetRainIntensity() const { return CurrentState.rainIntensity; }
    float GetWetness() const { return CurrentState.wetnessLevel; }
    glm::vec3 GetWindDir() const { return CurrentState.windDirection * CurrentState.windStrength; }
};

} // namespace Aether
