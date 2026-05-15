#pragma once

#include <glm/glm.hpp>
#include <vector>

namespace Aether {

struct InteractionForce {
    glm::vec3 position;
    float radius;
    float strength;
};

class VegetationInteractionManager {
public:
    InteractionForce Player;
    std::vector<InteractionForce> Impulses; // Explosions, impacts, etc.
    
    void Update(const glm::vec3& playerPos) {
        Player.position = playerPos;
        Player.radius = 1.8f;
        Player.strength = 1.0f;

        // Cleanup old impulses
        // ... (Logic for fading out explosion forces over time)
    }

    void BindToShader(unsigned int shaderID) {
        // glUniform3fv(glGetUniformLocation(shaderID, "uPlayerPos"), 1, &Player.position[0]);
        // glUniform1f(glGetUniformLocation(shaderID, "uInteractionRadius"), Player.radius);
    }
};

} // namespace Aether
