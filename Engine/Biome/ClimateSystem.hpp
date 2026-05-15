#pragma once

#include <glm/glm.hpp>
#include <Utils/Noise.hpp>

namespace Aether {

enum class BiomeType {
    TUNDRA,
    TAIGA,
    TEMPERATE_FOREST,
    RAINFOREST,
    GRASSLAND,
    SAVANNA,
    DESERT,
    WETLANDS
};

class ClimateSystem {
public:
    static float GetTemperature(float x, float z, float height) {
        // Temperature drops with altitude (Lapse Rate)
        float baseTemp = Noise::GetValue(x * 0.001f, 0.0f, z * 0.001f, 3, 0.5f, 2.0f);
        float altitudeEffect = height * 0.01f; 
        return baseTemp - altitudeEffect;
    }

    static float GetHumidity(float x, float z) {
        // Simple humidity noise for now, will be driven by hydrology in future steps
        return Noise::GetValue(x * 0.002f, 50.0f, z * 0.002f, 4, 0.5f, 2.0f);
    }

    static BiomeType CalculateBiome(float temperature, float humidity) {
        if (temperature < 0.2f) {
            if (humidity < 0.3f) return BiomeType::TUNDRA;
            return BiomeType::TAIGA;
        }
        if (temperature < 0.6f) {
            if (humidity < 0.4f) return BiomeType::GRASSLAND;
            if (humidity < 0.7f) return Biether::BiomeType::TEMPERATE_FOREST;
            return BiomeType::WETLANDS;
        }
        if (humidity < 0.2f) return BiomeType::DESERT;
        if (humidity < 0.5f) return BiomeType::SAVANNA;
        return BiomeType::RAINFOREST;
    }
};

} // namespace Aether
