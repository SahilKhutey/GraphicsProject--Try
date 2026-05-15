#pragma once

#include <glm/glm.hpp>
#include <glm/gtc/matrix_transform.hpp>

namespace Aethelgard {

class ThirdPersonCamera {
public:
    glm::vec3 Position;
    glm::vec3 Target;
    float Distance = 15.0f;
    float Yaw = 0.0f;
    float Pitch = 20.0f;
    
    // Constraints
    float MinPitch = -20.0f;
    float MaxPitch = 85.0f;
    float MinDistance = 5.0f;
    float MaxDistance = 100.0f;

    ThirdPersonCamera(glm::vec3 target = glm::vec3(0.0f)) : Target(target) {
        UpdatePosition();
    }

    glm::mat4 GetViewMatrix() const {
        return glm::lookAt(Position, Target, glm::vec3(0.0f, 1.0f, 0.0f));
    }

    void ProcessMouseMovement(float xoffset, float yoffset) {
        Yaw   += xoffset * 0.1f;
        Pitch += yoffset * 0.1f;

        if (Pitch > MaxPitch) Pitch = MaxPitch;
        if (Pitch < MinPitch) Pitch = MinPitch;

        UpdatePosition();
    }

    void ProcessMouseScroll(float yoffset) {
        Distance -= yoffset * 2.0f;
        if (Distance < MinDistance) Distance = MinDistance;
        if (Distance > MaxDistance) Distance = MaxDistance;
        
        UpdatePosition();
    }

    void SetTarget(glm::vec3 newTarget) {
        Target = newTarget;
        UpdatePosition();
    }

private:
    void UpdatePosition() {
        float horizontalDist = Distance * cos(glm::radians(Pitch));
        float verticalDist   = Distance * sin(glm::radians(Pitch));

        float offsetX = horizontalDist * sin(glm::radians(Yaw));
        float offsetZ = horizontalDist * cos(glm::radians(Yaw));

        Position.x = Target.x - offsetX;
        Position.z = Target.z - offsetZ;
        Position.y = Target.y + verticalDist;
    }
};

} // namespace Aethelgard
