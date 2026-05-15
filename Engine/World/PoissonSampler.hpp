#pragma once

#include <glm/glm.hpp>
#include <vector>
#include <random>
#include <cmath>

namespace Aether {

class PoissonSampler {
public:
    static std::vector<glm::vec2> Generate(float width, float height, float minRadius, int k = 30) {
        std::vector<glm::vec2> points;
        std::vector<glm::vec2> active;
        
        float cellSize = minRadius / std::sqrt(2.0f);
        int cols = std::ceil(width / cellSize);
        int rows = std::ceil(height / cellSize);
        
        std::vector<int> grid(cols * rows, -1);
        
        std::random_device rd;
        std::mt19937 gen(rd());
        std::uniform_real_distribution<float> dist(0, 1);

        // Initial Sample
        glm::vec2 start(dist(gen) * width, dist(gen) * height);
        active.push_back(start);
        points.push_back(start);
        grid[int(start.x / cellSize) + int(start.y / cellSize) * cols] = 0;

        while (!active.empty()) {
            int idx = std::uniform_int_distribution<int>(0, active.size() - 1)(gen);
            glm::vec2 p = active[idx];
            bool found = false;

            for (int i = 0; i < k; i++) {
                float angle = dist(gen) * 2.0f * 3.14159f;
                float r = minRadius + dist(gen) * minRadius;
                glm::vec2 candidate = p + glm::vec2(std::cos(angle), std::sin(angle)) * r;

                if (candidate.x >= 0 && candidate.x < width && candidate.y >= 0 && candidate.y < height) {
                    int col = int(candidate.x / cellSize);
                    int row = int(candidate.y / cellSize);
                    
                    bool ok = true;
                    for (int x = -1; x <= 1; x++) {
                        for (int y = -1; y <= 1; y++) {
                            int neighborIdx = (col + x) + (row + y) * cols;
                            if (neighborIdx >= 0 && neighborIdx < grid.size() && grid[neighborIdx] != -1) {
                                float d = glm::distance(candidate, points[grid[neighborIdx]]);
                                if (d < minRadius) ok = false;
                            }
                        }
                    }

                    if (ok) {
                        grid[col + row * cols] = points.size();
                        points.push_back(candidate);
                        active.push_back(candidate);
                        found = true;
                        break;
                    }
                }
            }

            if (!found) {
                active.erase(active.begin() + idx);
            }
        }
        return points;
    }
};

} // namespace Aether
