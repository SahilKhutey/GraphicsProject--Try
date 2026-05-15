#pragma once

#include <glad/glad.h>
#include <vector>

namespace Aether {

class BindlessTextureManager {
public:
    struct TextureHandle {
        GLuint64 handle;
        unsigned int id;
    };

    std::vector<TextureHandle> ActiveHandles;

    GLuint64 RegisterTexture(unsigned int textureID) {
        // 1. Get the 64-bit Handle
        GLuint64 handle = glGetTextureHandleARB(textureID);
        
        // 2. Make it Resident (available for sampling)
        glMakeTextureHandleResidentARB(handle);
        
        ActiveHandles.push_back({ handle, textureID });
        return handle;
    }

    void UnregisterTexture(unsigned int textureID) {
        for (auto it = ActiveHandles.begin(); it != ActiveHandles.end(); ++it) {
            if (it->id == textureID) {
                glMakeTextureHandleNonResidentARB(it->handle);
                ActiveHandles.erase(it);
                break;
            }
        }
    }

    void BindToShader(unsigned int shaderID) {
        // Pass the array of 64-bit handles to an SSBO for the shader to access
    }
};

} // namespace Aether
