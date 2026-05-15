#version 330 core
out vec4 FragColor;

in vec2 TexCoords;
uniform vec3 uViewPos;
uniform vec3 uSunDir;
uniform vec3 uSunColor;

// Atmospheric Constants
const float R_PLANET = 6371e3;
const float R_ATMOS = 6471e3;
const vec3 K_RAYLEIGH = vec3(5.5e-6, 13.0e-6, 22.4e-6); // Scattering coefficients
const float K_MIE = 21e-6;
const float H_RAYLEIGH = 8e3; // Scale height
const float H_MIE = 1.2e3;

const int NUM_SAMPLES = 16;
const int NUM_SAMPLES_LIGHT = 8;

float Density(float h, float H) {
    return exp(-h / H);
}

vec3 CalculateScattering(vec3 rayOrig, vec3 rayDir, float rayLen) {
    float stepLen = rayLen / float(NUM_SAMPLES);
    vec3 rayleigh = vec3(0.0);
    vec3 mie = vec3(0.0);
    float optDepthR = 0.0, optDepthM = 0.0;

    for (int i = 0; i < NUM_SAMPLES; i++) {
        vec3 p = rayOrig + rayDir * (stepLen * (float(i) + 0.5));
        float h = length(p) - R_PLANET;
        
        float dR = Density(h, H_RAYLEIGH) * stepLen;
        float dM = Density(h, H_MIE) * stepLen;
        optDepthR += dR;
        optDepthM += dM;

        // Sunlight transmittance to this point
        // (Simplified light-sample pass for brevity)
        vec3 tau = K_RAYLEIGH * optDepthR + K_MIE * 1.1 * optDepthM;
        vec3 transmittance = exp(-tau);
        
        rayleigh += transmittance * dR;
        mie += transmittance * dM;
    }

    float cosTheta = dot(rayDir, uSunDir);
    float phaseR = 3.0 / (16.0 * 3.14159) * (1.0 + cosTheta * cosTheta);
    float phaseM = 3.0 / (8.0 * 3.14159) * ((1.0 - 0.76 * 0.76) * (1.0 + cosTheta * cosTheta)) / 
                   ((2.0 + 0.76 * 0.76) * pow(1.0 + 0.76 * 0.76 - 2.0 * 0.76 * cosTheta, 1.5));

    return (rayleigh * K_RAYLEIGH * phaseR + mie * K_MIE * phaseM) * uSunColor * 20.0;
}

void main() {
    // Generate Sky Ray from screen UVs
    // (Ray Setup Logic as in clouds.frag)
    // vec3 color = CalculateScattering(rayOrig, rayDir, rayLen);
    // FragColor = vec4(color, 1.0);
}
