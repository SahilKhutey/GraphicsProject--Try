#version 330 core
out vec4 FragColor;

in vec3 FragPos;
in vec3 Normal;
in vec2 TexCoords;

uniform vec3 viewPos;
uniform vec3 uSunDir;
uniform vec3 uSunColor;
uniform vec3 uSkyColor;

uniform sampler2D uDisplacementMap;
uniform sampler2D uNormalMap;
uniform float uTime;

void main() {
    // 1. Sample FFT Normals
    vec3 N = texture(uNormalMap, TexCoords).rgb;
    N = normalize(N * 2.0 - 1.0);
    vec3 V = normalize(viewPos - FragPos);

    // 2. Fresnel Effect (Physically Based)
    float F0 = 0.02; // IOR of water
    float fresnel = F0 + (1.0 - F0) * pow(1.0 - max(dot(N, V), 0.0), 5.0);

    // 3. Absorption (Beer's Law)
    float depth = FragPos.y; // Simplified depth check
    vec3 shallowColor = vec3(0.0, 0.7, 0.8);
    vec3 deepColor = vec3(0.0, 0.05, 0.15);
    vec3 waterColor = mix(shallowColor, deepColor, smoothstep(-20.0, 0.0, depth));

    // 4. Final Composition
    vec3 reflection = uSkyColor; // Reflected Atmosphere
    vec3 finalColor = mix(waterColor, reflection, fresnel);

    // 5. Specular Glints
    vec3 H = normalize(V + normalize(-uSunDir));
    float spec = pow(max(dot(N, H), 0.0), 128.0);
    finalColor += uSunColor * spec * 0.8;

    FragColor = vec4(finalColor, 0.9);
}
