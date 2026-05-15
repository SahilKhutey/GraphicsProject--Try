#pragma once

#include <Terrain/EnvironmentGenerator.hpp>
#include <glm/glm.hpp>

namespace Aether {

class DensityField {
public:
    static float GetExclusionRadius(float x, float z) {
        auto env = EnvironmentGenerator::GeneratePoint(x, z);
        
        float baseRadius = 5.0f; // Standard spacing
        
        // 1. Biome influence
        if (env.biome == BiomeType::RAINFOREST) baseRadius = 2.5f; // Dense growth
        if (env.biome == BiomeType::SAVANNA)     baseRadius = 15.0f; // Isolated trees
        if (env.biome == BiomeType::DESERT)      baseRadius = 40.0f; // Extremely sparse
        
        // 2. Humidity influence (higher moisture = denser growth)
        float humidityFactor = 1.0f - glm::clamp(env.humidity, 0.0f, 1.0f);
        baseRadius += humidityFactor * 10.0f;
        
        return baseRadius;
    }

    static int GetMaxSpeciesCount(BiomeType biome) {
        switch(biome) {
            case BiomeType::RAINFOREST: return 5;
            case BiomeType::FOREST:      return 3;
            case BiomeType::TUNDRA:      return 1;
            default:                    return 1;
        }
    }
};

} // namespace Aether
