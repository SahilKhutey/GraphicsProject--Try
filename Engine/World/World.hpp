#pragma once

#include <World/StreamingSystem.hpp>
#include <Renderer/Shader.hpp>
#include <vector>

namespace Aether {

class World {
public:
    int Seed;
    
    World(int seed = 1337) : Seed(seed) {
        // Initialize systems
    }

    void Update(float deltaTime, const glm::vec3& observerPos) {
        // Update simulation systems (Weather, Time)
        // Update streaming system to load/unload chunks
    }

    void Render(const Shader& terrainShader) {
        // Render terrain chunks
        // Render water planes
        // Render vegetation
    }

private:
    // ChunkManager chunkManager;
    // WeatherSystem weatherSystem;
};

} // namespace Aether
