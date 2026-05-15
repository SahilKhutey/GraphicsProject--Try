#version 330 core
out vec4 FragColor;

in vec2 TexCoords;
uniform sampler3D uCloudNoise;
uniform sampler2D uWeatherMap;

uniform vec3 uViewPos;
uniform vec3 uSunDir;
uniform vec3 uSunColor;
uniform mat4 uInvView;
uniform mat4 uInvProj;

uniform float uCloudHeightBottom;
uniform float uCloudHeightTop;
uniform float uCoverage;
uniform float uDensity;
uniform float uTime;

const int MAX_STEPS = 64;
const float STEP_SIZE = 50.0;

// Henyey-Greenstein Phase Function for forward scattering
float HG(float cosTheta, float g) {
    float g2 = g * g;
    return (1.0 - g2) / (4.0 * 3.14159 * pow(1.0 + g2 - 2.0 * g * cosTheta, 1.5));
}

// Beer-Lambert Law for light absorption
float Beer(float density) {
    return exp(-density);
}

float GetCloudDensity(vec3 p) {
    if (p.y < uCloudHeightBottom || p.y > uCloudHeightTop) return 0.0;
    
    float heightFraction = (p.y - uCloudHeightBottom) / (uCloudHeightTop - uCloudHeightBottom);
    float heightGradient = smoothstep(0.0, 0.2, heightFraction) * smoothstep(1.0, 0.8, heightFraction);
    
    vec3 uvw = p * 0.0005 + vec3(uTime * 0.05);
    float noise = texture(uCloudNoise, uvw).r;
    
    float coverage = texture(uWeatherMap, p.xz * 0.0001).r * uCoverage;
    float density = smoothstep(1.0 - coverage, 1.0, noise);
    
    return density * heightGradient * uDensity;
}

void main() {
    // 1. Setup Ray from Screen Space to World Space
    vec4 rayDirClip = vec4(TexCoords * 2.0 - 1.0, 1.0, 1.0);
    vec4 rayDirView = uInvProj * rayDirClip;
    rayDirView /= rayDirView.w;
    vec3 rayDirWorld = normalize((uInvView * vec4(rayDirView.xyz, 0.0)).xyz);
    
    vec3 p = uViewPos;
    float transmittance = 1.0;
    vec3 scatteredLight = vec3(0.0);
    
    // 2. Raymarch the Cloud Volume
    for (int i = 0; i < MAX_STEPS; i++) {
        p += rayDirWorld * STEP_SIZE;
        float d = GetCloudDensity(p);
        
        if (d > 0.01) {
            float lightDensity = GetCloudDensity(p + uSunDir * 50.0); // Simple self-shadowing
            float lightTransmittance = Beer(lightDensity * 2.0);
            
            float phase = HG(dot(rayDirWorld, uSunDir), 0.8);
            vec3 stepLight = uSunColor * lightTransmittance * phase * d;
            
            scatteredLight += stepLight * transmittance;
            transmittance *= Beer(d * STEP_SIZE);
            
            if (transmittance < 0.01) break; // Early termination
        }
    }
    
    FragColor = vec4(scatteredLight, 1.0 - transmittance);
}
