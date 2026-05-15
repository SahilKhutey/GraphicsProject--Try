#pragma once

#include <glm/glm.hpp>
#include <string>

namespace Aethelgard {

enum class BiomeType {
    WATER,
    BEACH,
    PLAINS,
    FOREST,
    MOUNTAINS,
    SNOW_PEAK
};

struct BiomeData {
    BiomeType Type;
    glm::vec3 Color;
    float TreeDensity;
};

class BiomeSystem {
public:
    static BiomeData GetBiome(float height) {
        if (height < 5.0f)   return { BiomeType::WATER,     glm::vec3(0.0f, 0.3f, 0.6f), 0.0f };
        if (height < 8.0f)   return { BiomeType::BEACH,     glm::vec3(0.8f, 0.8f, 0.4f), 0.02f };
        if (height < 25.0f)  return { BiomeType::PLAINS,    glm::vec3(0.3f, 0.7f, 0.2f), 0.1f };
        if (height < 45.0f)  return { BiomeType::FOREST,    glm::vec3(0.1f, 0.5f, 0.1f), 0.8f };
        if (height < 65.0f)  return { BiomeType::MOUNTAINS, glm::vec3(0.4f, 0.4f, 0.4f), 0.2f };
        return { BiomeType::SNOW_PEAK, glm::vec3(0.9f, 0.9f, 1.0f), 0.0f };
    }
};

} // namespace Aethelgard
