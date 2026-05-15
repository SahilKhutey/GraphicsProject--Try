#version 330 core
layout (location = 0) in vec3 aPos;
layout (location = 1) in vec3 aNormal;
layout (location = 2) in vec2 aTexCoords;
layout (location = 3) in mat4 instanceMatrix;

out vec3 FragPos;
out vec3 Normal;
out vec2 TexCoords;

uniform mat4 view;
uniform mat4 projection;
uniform float uTime;
uniform float uWindStrength;

void main() {
    vec4 worldPos = instanceMatrix * vec4(aPos, 1.0);
    
    // 1. Wind Animation
    // Sway intensity increases with height
    float height = aPos.y; 
    float windX = sin(uTime * 1.5 + worldPos.x * 0.1) * height * uWindStrength;
    float windZ = cos(uTime * 1.2 + worldPos.z * 0.1) * height * uWindStrength;
    
    worldPos.x += windX;
    worldPos.z += windZ;

    FragPos = vec3(worldPos);
    Normal = mat3(transpose(inverse(instanceMatrix))) * aNormal;
    TexCoords = aTexCoords;

    gl_Position = projection * view * worldPos;
}
