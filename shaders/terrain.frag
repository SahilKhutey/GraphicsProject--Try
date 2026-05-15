#version 330 core
out vec4 FragColor;

in vec3 FragPos;
in vec3 Normal;
in vec2 TexCoords;

uniform vec3 viewPos;
uniform vec3 uSunDir;
uniform vec3 uSkyColor; // From Atmosphere Manager

// (Triplanar and Slope Blending logic as before)

void main() {
    // 1. Calculate Standard Lighting
    // (PBR or Blinn-Phong lighting logic)
    vec3 baseColor = vec3(0.5); // Placeholder

    // --- AERIAL PERSPECTIVE (Atmosphere Upgrade) ---
    float dist = length(FragPos - viewPos);
    
    // Beer-Lambert Transmittance (Exponential Decay)
    float density = 0.00005; // Base atmospheric density
    float transmittance = exp(-dist * density);
    
    // In-Scattering (The atmosphere glows at a distance)
    vec3 inScattering = uSkyColor * (1.0 - transmittance);
    
    // Final atmospheric blend
    vec3 finalColor = baseColor * transmittance + inScattering;
    // ----------------------------------------------

    FragColor = vec4(finalColor, 1.0);
}
