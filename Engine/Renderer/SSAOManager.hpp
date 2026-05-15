#pragma once

#include <glm/glm.hpp>
#include <vector>
#include <random>

namespace Aether {

class SSAOManager {
public:
    std::vector<glm::vec3> ssaoKernel;
    unsigned int noiseTexture;
    
    void Initialize() {
        // 1. Generate Sample Kernel (64 Samples)
        std::uniform_real_distribution<float> randomVals(0.0, 1.0);
        std::default_random_engine generator;
        
        for (int i = 0; i < 64; ++i) {
            glm::vec3 sample(
                randomVals(generator) * 2.0 - 1.0, 
                randomVals(generator) * 2.0 - 1.0, 
                randomVals(generator)
            );
            sample = glm::normalize(sample);
            sample *= randomVals(generator);
            
            // Accelerate samples toward the origin (weighted distribution)
            float scale = (float)i / 64.0;
            scale = 0.1f + scale * scale * (1.0f - 0.1f);
            sample *= scale;
            ssaoKernel.push_back(sample);
        }

        // 2. Generate 4x4 Noise Texture for Rotation
        std::vector<glm::vec3> ssaoNoise;
        for (int i = 0; i < 16; i++) {
            glm::vec3 noise(randomVals(generator) * 2.0 - 1.0, randomVals(generator) * 2.0 - 1.0, 0.0f);
            ssaoNoise.push_back(noise);
        }
        
        // (Texture creation logic for noiseTexture using ssaoNoise)
    }
};

} // namespace Aether
