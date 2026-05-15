#pragma once

#include <glm/glm.hpp>
#include <vector>
#include <unordered_set>
#include <future>

namespace Aether {

struct ChunkID {
    int x, z;
    bool operator==(const ChunkID& other) const { return x == other.x && z == other.z; }
};

} // namespace Aether

namespace std {
    template <> struct hash<Aether::ChunkID> {
        size_t operator()(const Aether::ChunkID& c) const {
            return hash<int>()(c.x) ^ (hash<int>()(c.z) << 1);
        }
    };
}

namespace Aether {

class StreamingManager {
public:
    int StreamingRadius = 5; // Chunks
    std::unordered_set<ChunkID> activeChunks;
    
    void Update(const glm::vec3& playerPos, float chunkSize) {
        int centerX = (int)std::floor(playerPos.x / chunkSize);
        int centerZ = (int)std::floor(playerPos.z / chunkSize);

        std::unordered_set<ChunkID> newActive;
        for (int x = -StreamingRadius; x <= StreamingRadius; x++) {
            for (int z = -StreamingRadius; z <= StreamingRadius; z++) {
                ChunkID id = { centerX + x, centerZ + z };
                newActive.insert(id);
                
                if (activeChunks.find(id) == activeChunks.end()) {
                    LoadChunkAsync(id);
                }
            }
        }

        // Unload out-of-range chunks
        for (auto& id : activeChunks) {
            if (newActive.find(id) == newActive.end()) {
                UnloadChunk(id);
            }
        }
        activeChunks = newActive;
    }

    void LoadChunkAsync(ChunkID id) {
        // Dispatch to Background Loading Thread
    }

    void UnloadChunk(ChunkID id) {
        // Free GPU and CPU resources
    }
};

} // namespace Aether
