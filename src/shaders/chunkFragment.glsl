
in vec3 vNormal;
in vec2 vUv;
in float vAo;

uniform sampler2D chunkTexture;

void main() {
    
    vec3 lightDir = vec3(0.5, 1, 0.5);
    
    vec3 textureColor = texture(chunkTexture, vUv).xyz;

    float brightness = max(dot(normalize(vNormal), normalize(lightDir)), 0.3);

    float aoMultiplier = 1. - ((1. - (1. / (vAo + 1.))) * 0.5);

    //g//l_FragColor = vec4(vec3(brightness * aoMultiplier) * textureColor, 1.0);
    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
}