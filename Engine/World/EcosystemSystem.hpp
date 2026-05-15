#pragma once

#include <Terrain/EnvironmentGenerator.hpp>
#include <World/PoissonSampler.hpp>
#include <World/DensityField.hpp>
#include <glm/glm.hpp>
#include <vector>

namespace Aether {

struct VegetationInstance {
    glm::vec3 position;
    float scale;
    float rotation;
    int type; 
};

class EcosystemSystem {
public:
    static std::vector<VegetationInstance> PopulateChunk(int chunkX, int chunkZ, int chunkSize) {
        std::vector<VegetationInstance> instances;
        
        float worldStartX = (float)(chunkX * chunkSize);
        float worldStartZ = (float)(chunkZ * chunkSize);

        // 1. Get Variable Density for this region
        float radius = DensityField::GetExclusionRadius(worldStartX + chunkSize/2, worldStartZ + chunkSize/2);

        // 2. Run Poisson Disk Sampling (Blue Noise)
        auto points = PoissonSampler::Generate((float)chunkSize, (float)chunkSize, radius);

        // 3. Convert Points to World Space Instances
        for (auto& p : points) {
            float worldX = worldStartX + p.x;
            float worldZ = worldStartZ + p.y;
            
            auto env = EnvironmentGenerator::GeneratePoint(worldX, worldZ);
            
            // Only place if above water
            if (env.height > 0.0f) {
                VegetationInstance inst;
                inst.position = glm::vec3(worldX, env.height, worldZ);
                inst.scale = 0.8f + (rand() % 100 / 100.0f) * 0.4f;
                inst.rotation = (rand() % 360);
                
                // Select type based on Biome
                inst.type = (int)env.biome; 
                
                instances.push_back(inst);
            }
        }
        
        return instances;
    }
};

} // namespace Aether
