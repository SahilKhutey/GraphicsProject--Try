#pragma once

#include <glm/glm.hpp>
#include <vector>
#include <cmath>

namespace Aether {

struct HydrologyData {
    bool isRiver;
    float flowAccumulation;
    float moistureBoost;
};

class HydrologySystem {
public:
    static const float RIVER_THRESHOLD = 500.0f; // Minimum accumulation to form a river

    static HydrologyData GetHydrologyAt(float x, float z, float flowAcc) {
        HydrologyData data;
        data.flowAccumulation = flowAcc;
        data.isRiver = flowAcc > RIVER_THRESHOLD;
        
        // 1. Moisture Propagation
        // Rivers boost local moisture, affecting Biome generation
        data.moistureBoost = 0.0f;
        if (data.isRiver) {
            data.moistureBoost = 0.5f * (flowAcc / 1000.0f);
        }

        return data;
    }

    static float CalculateRiverWidth(float flowAcc) {
        // Larger rivers are wider: width = sqrt(flowAcc)
        return std::sqrt(flowAcc) * 0.5f;
    }
};

} // namespace Aether
