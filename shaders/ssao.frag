#version 330 core
out float FragColor;

in vec2 TexCoords;

uniform sampler2D gNormal;
uniform sampler2D gDepth;
uniform sampler2D texNoise;

uniform vec3 samples[64];
uniform mat4 projection;
uniform mat4 view;

const vec2 noiseScale = vec2(800.0/4.0, 600.0/4.0); // ScreenRes / NoiseSize

void main() {
    // 1. Get View-Space Position and Normal
    float depth = texture(gDepth, TexCoords).r;
    vec3 normal = texture(gNormal, TexCoords).rgb;
    
    // (Position Reconstruction logic from depth)
    vec3 fragPos = vec3(0.0); // Placeholder

    // 2. Get Random Rotation from Noise Texture
    vec3 randomVec = texture(texNoise, TexCoords * noiseScale).xyz;

    // 3. Create TBN Matrix (Tangent-Bitangent-Normal)
    vec3 tangent = normalize(randomVec - normal * dot(randomVec, normal));
    vec3 bitangent = cross(normal, tangent);
    mat3 TBN = mat3(tangent, bitangent, normal);

    // 4. Sample Hemisphere and Accumulate Occlusion
    float occlusion = 0.0;
    float radius = 0.5;
    float bias = 0.025;

    for(int i = 0; i < 64; ++i) {
        // From tangent to view-space
        vec3 samplePos = TBN * samples[i]; 
        samplePos = fragPos + samplePos * radius; 
        
        // Project sample position to screen UV
        vec4 offset = vec4(samplePos, 1.0);
        offset = projection * offset;
        offset.xyz /= offset.w;
        offset.xyz = offset.xyz * 0.5 + 0.5;
        
        float sampleDepth = texture(gDepth, offset.xy).r; // Sample depth from G-Buffer
        
        // Range check and Occlusion Test
        float rangeCheck = smoothstep(0.0, 1.0, radius / abs(fragPos.z - sampleDepth));
        occlusion += (sampleDepth >= samplePos.z + bias ? 1.0 : 0.0) * rangeCheck;           
    }
    
    FragColor = 1.0 - (occlusion / 64.0);
}
