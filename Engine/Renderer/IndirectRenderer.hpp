#pragma once

#include <glad/glad.h>
#include <glm/glm.hpp>
#include <vector>

namespace Aether {

struct DrawCommand {
    uint32_t count;
    uint32_t instanceCount;
    uint32_t firstIndex;
    int32_t  baseVertex;
    uint32_t baseInstance;
};

class IndirectRenderer {
public:
    unsigned int indirectBuffer;
    unsigned int cullingShader;
    
    void Initialize() {
        // 1. Create Indirect Command Buffer
        glGenBuffers(1, &indirectBuffer);
        glBindBuffer(GL_DRAW_INDIRECT_BUFFER, indirectBuffer);
        glBufferData(GL_DRAW_INDIRECT_BUFFER, sizeof(DrawCommand) * 10, NULL, GL_DYNAMIC_DRAW);
    }

    void Render(unsigned int meshVAO, int commandCount) {
        // 1. Run GPU Culling Pass
        glUseProgram(cullingShader);
        // ... Set Uniforms & Dispatch ...
        glMemoryBarrier(GL_COMMAND_BARRIER_BIT | GL_SHADER_STORAGE_BARRIER_BIT);

        // 2. Draw everything in one call
        glBindVertexArray(meshVAO);
        glBindBuffer(GL_DRAW_INDIRECT_BUFFER, indirectBuffer);
        glMultiDrawElementsIndirect(GL_TRIANGLES, GL_UNSIGNED_INT, (void*)0, commandCount, 0);
    }
};

} // namespace Aether
