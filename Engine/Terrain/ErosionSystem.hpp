#pragma once

#include <vector>
#include <glm/glm.hpp>
#include <random>

namespace Aether {

class ErosionSystem {
public:
    struct Params {
        int Iterations = 50000;
        float ErosionRate = 0.1f;
        float DepositionRate = 0.1f;
        float Gravity = 4.0f;
        int MaxLifetime = 30;
    };

    static void Simulate(std::vector<float>& heightmap, int size, const Params& params) {
        std::default_random_engine generator;
        std::uniform_real_distribution<float> distribution(0, (float)size - 1);

        for (int i = 0; i < params.Iterations; i++) {
            float posX = distribution(generator);
            float posZ = distribution(generator);
            float dirX = 0, dirZ = 0;
            float speed = 1, water = 1, sediment = 0;

            for (int lifetime = 0; lifetime < params.MaxLifetime; lifetime++) {
                int nodeX = (int)posX;
                int nodeZ = (int)posZ;
                int nodeIndex = nodeZ * size + nodeX;

                // Calculate gradient
                float gradX = (heightmap[nodeIndex + 1] - heightmap[nodeIndex]);
                float gradZ = (heightmap[nodeIndex + size] - heightmap[nodeIndex]);

                // Update droplet velocity and position
                dirX = (dirX * 0.5f) - gradX * 0.5f;
                dirZ = (dirZ * 0.5f) - gradZ * 0.5f;
                float len = sqrt(dirX * dirX + dirZ * dirZ);
                if (len != 0) { dirX /= len; dirZ /= len; }
                posX += dirX; posZ += dirZ;

                // Boundary check
                if (posX < 0 || posX >= size - 1 || posZ < 0 || posZ >= size - 1) break;

                // Erosion/Deposition logic
                float newHeight = heightmap[(int)posZ * size + (int)posX];
                float deltaHeight = newHeight - heightmap[nodeIndex];
                float capacity = std::max(-deltaHeight, 0.01f) * speed * water * 4.0f;

                if (sediment > capacity || deltaHeight > 0) {
                    float deposit = (deltaHeight > 0) ? std::min(deltaHeight, sediment) : (sediment - capacity) * params.DepositionRate;
                    sediment -= deposit;
                    heightmap[nodeIndex] += deposit;
                } else {
                    float erode = std::min((capacity - sediment) * params.ErosionRate, -deltaHeight);
                    sediment += erode;
                    heightmap[nodeIndex] -= erode;
                }

                speed = sqrt(speed * speed + deltaHeight * params.Gravity);
                water *= 0.99f;
            }
        }
    }
};

} // namespace Aether
