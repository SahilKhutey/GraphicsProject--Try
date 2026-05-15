#pragma once

#include <ECS/ECS.hpp>
#include <Renderer/Shader.hpp>
#include <vector>

namespace Aether {

class RenderSystem : public System {
public:
    Shader* activeShader;
    glm::mat4 Projection;
    glm::mat4 View;

    void SetCamera(const glm::mat4& projection, const glm::mat4& view) {
        Projection = projection;
        View = view;
    }

    void Update(float deltaTime) override {
        // This is the core Render Loop
        // 1. Clear Buffers
        // 2. Bind activeShader
        // 3. Set Camera Uniforms
        
        // 4. Iterate over Entities (Simplified for this phase)
        /*
        for (auto const& entity : Registry::GetEntitiesWith<MeshComponent, TransformComponent>()) {
            auto& mesh = Registry::GetComponent<MeshComponent>(entity);
            auto& transform = Registry::GetComponent<TransformComponent>(entity);
            
            if (!mesh.Visible) continue;

            glm::mat4 model = CalculateModelMatrix(transform);
            activeShader->SetMat4("model", model);
            
            glBindVertexArray(mesh.VAO);
            glDrawElements(GL_TRIANGLES, mesh.ElementCount, GL_UNSIGNED_INT, 0);
        }
        */
    }

private:
    glm::mat4 CalculateModelMatrix(const TransformComponent& transform) {
        glm::mat4 model = glm::translate(glm::mat4(1.0f), transform.Position);
        // Add rotation/scale
        return model;
    }
};

} // namespace Aether
