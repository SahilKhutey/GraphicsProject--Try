#pragma once

#include <glad/glad.h>
#include <glm/glm.hpp>
#include <vector>
#include <Utils/Noise.hpp>
#include <Renderer/Shader.hpp>

namespace Aether {

struct TerrainVertex {
    glm::vec3 Position;
    glm::vec3 Normal;
    glm::vec2 UV;
};

class TerrainChunk {
public:
    static const int CHUNK_SIZE = 129; // 128 quads + 1 vertex to close
    static const int CHUNK_SCALE = 1;

    TerrainChunk(int chunkX, int chunkZ) : x(chunkX), z(chunkZ) {
        GenerateMesh();
        SetupBuffers();
    }

    ~TerrainChunk() {
        glDeleteVertexArrays(1, &VAO);
        glDeleteBuffers(1, &VBO);
        glDeleteBuffers(1, &EBO);
    }

    void Draw(const Shader& shader) {
        glm::mat4 model = glm::translate(glm::mat4(1.0f), glm::vec3(x * (CHUNK_SIZE - 1), 0, z * (CHUNK_SIZE - 1)));
        shader.SetMat4("model", model);
        glBindVertexArray(VAO);
        glDrawElements(GL_TRIANGLES, static_cast<unsigned int>(indices.size()), GL_UNSIGNED_INT, 0);
        glBindVertexArray(0);
    }

private:
    int x, z;
    unsigned int VAO, VBO, EBO;
    std::vector<TerrainVertex> vertices;
    std::vector<unsigned int> indices;

    void GenerateMesh() {
        for (int i = 0; i < CHUNK_SIZE; i++) {
            for (int j = 0; j < CHUNK_SIZE; j++) {
                float worldX = (float)(x * (CHUNK_SIZE - 1) + j);
                float worldZ = (float)(z * (CHUNK_SIZE - 1) + i);
                
                // Phase 2 Settings: Frequency 0.01, Height Scale 40.0
                float height = Noise::GetValue(worldX * 0.01f, 0.0f, worldZ * 0.01f, 6, 0.5f, 2.0f) * 40.0f;
                
                TerrainVertex v;
                v.Position = glm::vec3(j, height, i);
                v.Normal = glm::vec3(0, 1, 0); // TODO: Implement real Normal calculation
                v.UV = glm::vec2((float)j / (CHUNK_SIZE - 1), (float)i / (CHUNK_SIZE - 1));
                vertices.push_back(v);
            }
        }

        for (int i = 0; i < CHUNK_SIZE - 1; i++) {
            for (int j = 0; j < CHUNK_SIZE - 1; j++) {
                int topLeft = i * CHUNK_SIZE + j;
                int topRight = topLeft + 1;
                int bottomLeft = (i + 1) * CHUNK_SIZE + j;
                int bottomRight = bottomLeft + 1;

                indices.push_back(topLeft);
                indices.push_back(bottomLeft);
                indices.push_back(topRight);
                indices.push_back(topRight);
                indices.push_back(bottomLeft);
                indices.push_back(bottomRight);
            }
        }
    }

    void SetupBuffers() {
        glGenVertexArrays(1, &VAO);
        glGenBuffers(1, &VBO);
        glGenBuffers(1, &EBO);

        glBindVertexArray(VAO);
        glBindBuffer(GL_ARRAY_BUFFER, VBO);
        glBufferData(GL_ARRAY_BUFFER, vertices.size() * sizeof(TerrainVertex), &vertices[0], GL_STATIC_DRAW);

        glBindBuffer(GL_ELEMENT_ARRAY_BUFFER, EBO);
        glBufferData(GL_ELEMENT_ARRAY_BUFFER, indices.size() * sizeof(unsigned int), &indices[0], GL_STATIC_DRAW);

        glEnableVertexAttribArray(0);
        glVertexAttribPointer(0, 3, GL_FLOAT, GL_FALSE, sizeof(TerrainVertex), (void*)0);
        glEnableVertexAttribArray(1);
        glVertexAttribPointer(1, 3, GL_FLOAT, GL_FALSE, sizeof(TerrainVertex), (void*)offsetof(TerrainVertex, Normal));
        glEnableVertexAttribArray(2);
        glVertexAttribPointer(2, 2, GL_FLOAT, GL_FALSE, sizeof(TerrainVertex), (void*)offsetof(TerrainVertex, UV));
        glBindVertexArray(0);
    }
};

} // namespace Aether
