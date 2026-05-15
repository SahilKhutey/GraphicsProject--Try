#version 330 core
out vec4 FragColor;

in vec3 FragPos;
in vec3 Normal;
in vec2 TexCoords;

uniform vec3 viewPos;
uniform vec3 lightPos;
uniform vec3 lightColor;
uniform vec3 uSunDir;

// Weather Uniforms
uniform float uWetness; // 0.0 (Dry) to 1.0 (Totally Saturated)

// CSM Uniforms (as before)
uniform mat4 lightSpaceMatrices[4];
uniform float cascadePlaneDistances[4];
uniform sampler2D shadowMap;

// Material properties
uniform vec3  albedo;
uniform float metallic;
uniform float roughness;
uniform float ao;

const float PI = 3.14159265359;

// (PBR Functions: DistributionGGX, GeometrySmith, etc. as before)

void main() {		
    vec3 N = normalize(Normal);
    vec3 V = normalize(viewPos - FragPos);

    // --- WET SURFACE MODIFICATION ---
    // 1. Wet surfaces look darker (Albedo absorption)
    vec3 wetAlbedo = albedo * (1.0 - uWetness * 0.3); 
    
    // 2. Wet surfaces are smoother (Roughness decrease)
    float wetRoughness = mix(roughness, 0.05, uWetness * 0.8);
    
    // 3. Wet surfaces have more Fresnel reflection
    vec3 F0 = vec3(0.04); 
    F0 = mix(F0, wetAlbedo, metallic);
    F0 = mix(F0, vec3(0.1), uWetness * 0.5); // Add water-film specular
    // ---------------------------------

    // (Continue with standard Cook-Torrance BRDF using wetAlbedo and wetRoughness)
    // ...
}
