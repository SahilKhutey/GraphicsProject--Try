#version 330 core
out vec4 FragColor;

in vec2 TexCoords;

uniform sampler2D uMainScene;
uniform sampler2D uDepthMap;
uniform sampler3D uFroxelGrid;

uniform float uNear = 0.1;
uniform float uFar = 1000.0;

void main() {
    float depth = texture(uDepthMap, TexCoords).r;
    vec3 sceneColor = texture(uMainScene, TexCoords).rgb;

    // 1. Raymarching through the Froxel Grid
    vec3 accumulatedLight = vec3(0.0);
    float accumulatedTransmittance = 1.0;

    int numSlices = textureSize(uFroxelGrid, 0).z;
    float maxZ = depth; // Only raymarch up to the scene depth

    for (int z = 0; z < numSlices; z++) {
        float sliceDepth = float(z) / float(numSlices);
        if (sliceDepth > maxZ) break;

        vec4 sampleData = texture(uFroxelGrid, vec3(TexCoords, sliceDepth));
        vec3 scatteredLight = sampleData.rgb;
        float density = sampleData.a;

        // Beer-Lambert Extinction
        float transmittance = exp(-density * (uFar / numSlices));
        accumulatedLight += scatteredLight * accumulatedTransmittance;
        accumulatedTransmittance *= transmittance;
    }

    // 2. Final Composition
    vec3 finalColor = sceneColor * accumulatedTransmittance + accumulatedLight;
    
    FragColor = vec4(finalColor, 1.0);
}
