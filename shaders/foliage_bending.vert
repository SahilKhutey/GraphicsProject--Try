#version 330 core
layout(location = 0) in vec3 aPos;
layout(location = 1) in vec3 aNormal;
layout(location = 2) in vec2 aTexCoords;
layout(location = 3) in float aWeight; // Vertex bending weight (0=root, 1=tip)

uniform mat4 model;
uniform mat4 view;
uniform mat4 projection;

uniform float uTime;
uniform vec3 uWindDir;
uniform float uWindStrength;

// Interaction Forces
uniform vec3 uPlayerPos;
uniform float uInteractionRadius = 1.5;

void main() {
    vec4 worldPos = model * vec4(aPos, 1.0);
    
    // 1. Layered Wind Simulation
    float globalSway = sin(uTime * 0.5 + worldPos.x * 0.1) * uWindStrength;
    float localFlutter = sin(uTime * 2.0 + worldPos.z * 1.5) * 0.2;
    vec3 windOffset = uWindDir * (globalSway + localFlutter) * aWeight;

    // 2. Player Interaction Bending
    vec3 diff = worldPos.xyz - uPlayerPos;
    float dist = length(diff);
    vec3 interactionOffset = vec3(0.0);
    
    if (dist < uInteractionRadius) {
        float falloff = 1.0 - (dist / uInteractionRadius);
        vec3 bendDir = normalize(diff);
        interactionOffset = bendDir * falloff * 1.2 * aWeight;
    }

    // 3. Final Position
    vec3 finalPos = aPos + windOffset + interactionOffset;
    
    gl_Position = projection * view * model * vec4(finalPos, 1.0);
}
