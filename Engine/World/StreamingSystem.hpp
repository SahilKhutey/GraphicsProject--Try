#pragma once

#include <ECS/ECS.hpp>
#include <Terrain/TerrainChunk.hpp>
#include <map>
#include <memory>

namespace Aether {

class StreamingSystem : public System {
public:
    int ViewDistance = 4;
    Entity Observer;

    StreamingSystem(Entity observer) : Observer(observer) {}

    void Update(float deltaTime) override {
        // 1. Get Observer Position (Assuming TransformComponent is at index 0)
        // glm::vec3 pos = Registry::GetComponent<TransformComponent>(Observer).Position;
        
        // 2. Calculate current region/chunk
        // 3. Spatially audit active entities
        // 4. Create new Chunk Entities if needed
    }

    void ForceGenerateChunk(int x, int z) {
        // Logic to create an entity and attach TerrainComponent
        Entity chunkEntity = GenerateEntityID();
        // AddComponent<TerrainComponent>(chunkEntity, {x, z, false});
    }

private:
    Entity GenerateEntityID() {
        static Entity lastID = 0;
        return ++lastID;
    }
};

} // namespace Aether
