#version 330 core
out vec4 FragColor;

in vec2 TexCoords;

uniform sampler2D uCurrentFrame;
uniform sampler2D uHistoryFrame;
uniform sampler2D uVelocityBuffer;

const float BLEND_FACTOR = 0.9; // 90% history, 10% current

void main() {
    // 1. Get Motion Vector
    vec2 velocity = texture(uVelocityBuffer, TexCoords).rg;
    vec2 historyUV = TexCoords - velocity;

    // 2. Sample Current and History
    vec3 current = texture(uCurrentFrame, TexCoords).rgb;
    
    // Boundary check for history
    if (historyUV.x < 0.0 || historyUV.x > 1.0 || historyUV.y < 0.0 || historyUV.y > 1.0) {
        FragColor = vec4(current, 1.0);
        return;
    }
    
    vec3 history = texture(uHistoryFrame, historyUV).rgb;

    // 3. Neighborhood Clamping (3x3) to prevent ghosting
    vec3 minColor = current;
    vec3 maxColor = current;
    
    vec2 texelSize = 1.0 / textureSize(uCurrentFrame, 0);
    for(int x = -1; x <= 1; ++x) {
        for(int y = -1; y <= 1; ++y) {
            vec3 neighbor = texture(uCurrentFrame, TexCoords + vec2(x, y) * texelSize).rgb;
            minColor = min(minColor, neighbor);
            maxColor = max(maxColor, neighbor);
        }
    }
    
    // Clamp history to the local neighborhood
    history = clamp(history, minColor, maxColor);

    // 4. Final Temporal Blend
    vec3 resolved = mix(current, history, BLEND_FACTOR);
    
    FragColor = vec4(resolved, 1.0);
}
