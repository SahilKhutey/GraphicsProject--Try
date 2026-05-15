#pragma once

#include <Utils/Noise.hpp>
#include <Biome/ClimateSystem.hpp>
#include <vector>
#include <algorithm>

namespace Aether {

class EnvironmentGenerator {
public:
    struct TerrainData {
        float height;
        float temperature;
        float humidity;
        BiomeType biome;
    };

    static TerrainData GeneratePoint(float x, float z) {
        // 1. Continental Noise (Large scale landmasses)
        float continent = Noise::GetValue(x * 0.0001f, 0.0f, z * 0.0001f, 4, 0.5f, 2.0f);
        float landMask = smoothstep(0.4f, 0.6f, continent);

        // 2. Mountain Noise (Ridged Multifractal)
        float mountain = Noise::GetRidgedValue(x * 0.005f, 0.0f, z * 0.005f, 6, 0.5f, 2.0f);
        
        // Combine landmask and mountains
        float finalHeight = (continent * 20.0f) + (mountain * 80.0f * landMask);

        // 3. Climate Simulation
        float temp = ClimateSystem::GetTemperature(x, z, finalHeight);
        float hum  = ClimateSystem::GetHumidity(x, z);
        BiomeType biome = ClimateSystem::CalculateBiome(temp, hum);

        return { finalHeight, temp, hum, biome };
    }

private:
    static float smoothstep(float edge0, float edge1, float x) {
        float t = std::clamp((x - edge0) / (edge1 - edge0), 0.0f, 1.0f);
        return t * t * (3.0f - 2.0f * t);
    }
};

} // namespace Aether
