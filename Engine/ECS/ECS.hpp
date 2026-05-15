#pragma once

#include <cstdint>
#include <vector>
#include <unordered_map>
#include <bitset>
#include <glm/glm.hpp>

namespace Aether {

// ECS Core Types
using Entity = uint64_t;
const uint32_t MAX_COMPONENTS = 32;
using ComponentMask = std::bitset<MAX_COMPONENTS>;

// Core Components
struct TransformComponent {
    glm::vec3 Position = glm::vec3(0.0f);
    glm::vec3 Rotation = glm::vec3(0.0f);
    glm::vec3 Scale = glm::vec3(1.0f);
};

struct MeshComponent {
    unsigned int VAO;
    unsigned int ElementCount;
    bool Visible = true;
};

struct TerrainComponent {
    int ChunkX, ChunkZ;
    bool Generated = false;
};

struct CameraComponent {
    float Fov = 45.0f;
    bool IsActive = false;
};

struct WeatherComponent {
    float RainIntensity = 0.0f;
    float FogDensity = 0.01f;
};

// Base System
class System {
public:
    virtual void Update(float deltaTime) = 0;
    virtual ~System() = default;
};

} // namespace Aether
