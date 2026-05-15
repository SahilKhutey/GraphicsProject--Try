#pragma once

#include <map>
#include <memory>
#include "TerrainChunk.hpp"

namespace Aethelgard {

class TerrainManager {
public:
    int ViewDistance = 4; // Radius in chunks

    void Update(const glm::vec3& cameraPos) {
        int currentChunkX = (int)floor(cameraPos.x / (TerrainChunk::CHUNK_SIZE - 1));
        int currentChunkZ = (int)floor(cameraPos.z / (TerrainChunk::CHUNK_SIZE - 1));

        // Basic "Keep in View" logic
        for (int z = -ViewDistance; z <= ViewDistance; z++) {
            for (int x = -ViewDistance; x <= ViewDistance; x++) {
                int targetX = currentChunkX + x;
                int targetZ = currentChunkZ + z;
                
                auto key = std::make_pair(targetX, targetZ);
                if (chunks.find(key) == chunks.end()) {
                    chunks[key] = std::make_unique<TerrainChunk>(targetX, targetZ);
                }
            }
        }
        
        // TODO: Implement chunk unloading for chunks outside ViewDistance + buffer
    }

    void Draw(const Shader& shader) {
        for (auto const& [key, chunk] : chunks) {
            chunk->Draw(shader);
        }
    }

private:
    std::map<std::pair<int, int>, std::unique_ptr<TerrainChunk>> chunks;
};

} // namespace Aethelgard
