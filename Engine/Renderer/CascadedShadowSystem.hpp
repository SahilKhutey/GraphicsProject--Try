#pragma once

#include <glad/glad.h>
#include <glm/glm.hpp>
#include <glm/gtc/matrix_transform.hpp>
#include <vector>

namespace Aether {

struct CascadeData {
    glm::mat4 LightSpaceMatrix;
    float SplitDepth;
};

class CascadedShadowSystem {
public:
    unsigned int shadowMapFBO;
    unsigned int shadowMapAtlas;
    const unsigned int ATLAS_SIZE = 4096;
    const int CASCADE_COUNT = 4;
    
    std::vector<float> CascadeSplits;
    CascadeData Cascades[4];

    CascadedShadowSystem(float nearPlane, float farPlane) {
        float lambda = 0.7f;
        for (int i = 1; i <= CASCADE_COUNT; i++) {
            float p = (float)i / (float)CASCADE_COUNT;
            float log = nearPlane * pow(farPlane / nearPlane, p);
            float lin = nearPlane + (farPlane - nearPlane) * p;
            CascadeSplits.push_back(lambda * log + (1.0f - lambda) * lin);
            Cascades[i-1].SplitDepth = CascadeSplits.back();
        }

        glGenFramebuffers(1, &shadowMapFBO);
        glGenTextures(1, &shadowMapAtlas);
        glBindTexture(GL_TEXTURE_2D, shadowMapAtlas);
        glTexImage2D(GL_TEXTURE_2D, 0, GL_DEPTH_COMPONENT, ATLAS_SIZE, ATLAS_SIZE, 0, GL_DEPTH_COMPONENT, GL_FLOAT, NULL);
        glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_MIN_FILTER, GL_LINEAR);
        glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_MAG_FILTER, GL_LINEAR);
        glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_WRAP_S, GL_CLAMP_TO_BORDER);
        glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_WRAP_T, GL_CLAMP_TO_BORDER);
        float borderColor[] = { 1.0f, 1.0f, 1.0f, 1.0f };
        glTexParameterfv(GL_TEXTURE_2D, GL_TEXTURE_BORDER_COLOR, borderColor);

        glBindFramebuffer(GL_FRAMEBUFFER, shadowMapFBO);
        glFramebufferTexture2D(GL_FRAMEBUFFER, GL_DEPTH_ATTACHMENT, GL_TEXTURE_2D, shadowMapAtlas, 0);
        glDrawBuffer(GL_NONE);
        glReadBuffer(GL_NONE);
        glBindFramebuffer(GL_FRAMEBUFFER, 0);
    }

    void Update(const glm::mat4& view, const glm::vec3& lightDir, float fov, float aspect, float near, float far) {
        for (int i = 0; i < CASCADE_COUNT; i++) {
            float cascadeNear = (i == 0) ? near : CascadeSplits[i - 1];
            float cascadeFar = CascadeSplits[i];
            Cascades[i].LightSpaceMatrix = calculateLightSpaceMatrix(view, lightDir, fov, aspect, cascadeNear, cascadeFar);
        }
    }

private:
    glm::mat4 calculateLightSpaceMatrix(const glm::mat4& view, const glm::vec3& lightDir, float fov, float aspect, float near, float far) {
        const auto proj = glm::perspective(glm::radians(fov), aspect, near, far);
        const auto inv = glm::inverse(proj * view);

        std::vector<glm::vec4> frustumCorners;
        for (unsigned int x = 0; x < 2; ++x) {
            for (unsigned int y = 0; y < 2; ++y) {
                for (unsigned int z = 0; z < 2; ++z) {
                    const glm::vec4 pt = inv * glm::vec4(2.0f * x - 1.0f, 2.0f * y - 1.0f, 2.0f * z - 1.0f, 1.0f);
                    frustumCorners.push_back(pt / pt.w);
                }
            }
        }

        glm::vec3 center = glm::vec3(0, 0, 0);
        for (const auto& v : frustumCorners) { center += glm::vec3(v); }
        center /= frustumCorners.size();

        const auto lightView = glm::lookAt(center - lightDir, center, glm::vec3(0.0f, 1.0f, 0.0f));

        float minX = std::numeric_limits<float>::max(); float maxX = std::numeric_limits<float>::lowest();
        float minY = std::numeric_limits<float>::max(); float maxY = std::numeric_limits<float>::lowest();
        float minZ = std::numeric_limits<float>::max(); float maxZ = std::numeric_limits<float>::lowest();
        for (const auto& v : frustumCorners) {
            const auto trf = lightView * v;
            minX = std::min(minX, trf.x); maxX = std::max(maxX, trf.x);
            minY = std::min(minY, trf.y); maxY = std::max(maxY, trf.y);
            minZ = std::min(minZ, trf.z); maxZ = std::max(maxZ, trf.z);
        }

        // Stability Snapping
        float worldUnitsPerTexel = (maxX - minX) / ATLAS_SIZE;
        minX = floor(minX / worldUnitsPerTexel) * worldUnitsPerTexel;
        maxX = floor(maxX / worldUnitsPerTexel) * worldUnitsPerTexel;
        minY = floor(minY / worldUnitsPerTexel) * worldUnitsPerTexel;
        maxY = floor(maxY / worldUnitsPerTexel) * worldUnitsPerTexel;

        const glm::mat4 lightProjection = glm::ortho(minX, maxX, minY, maxY, -500.0f, 500.0f);
        return lightProjection * lightView;
    }
};

} // namespace Aether
