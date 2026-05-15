#pragma once

#include <glm/glm.hpp>
#include <vector>

namespace Aether {

class TemporalSystem {
public:
    int frameIndex = 0;
    glm::vec2 currentJitter;
    glm::mat4 prevViewProjection;

    TemporalSystem() : prevViewProjection(1.0f) {}

    glm::vec2 GetNextJitter(int width, int height) {
        // 8-sample Halton Sequence (2,3)
        static const glm::vec2 halton8[] = {
            {0.5f, 0.33f}, {0.25f, 0.66f}, {0.75f, 0.11f}, {0.125f, 0.44f},
            {0.625f, 0.77f}, {0.375f, 0.22f}, {0.875f, 0.55f}, {0.0625f, 0.88f}
        };

        currentJitter = (halton8[frameIndex % 8] - 0.5f) / glm::vec2(width, height);
        frameIndex++;
        return currentJitter;
    }

    void UpdateHistory(const glm::mat4& viewProjection) {
        prevViewProjection = viewProjection;
    }

    // Ping-pong history buffers will be managed in the RenderSystem
};

} // namespace Aether
