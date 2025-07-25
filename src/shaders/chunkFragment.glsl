
in vec3 vNormal;
in vec2 vUv;
//in float vAo;

uniform sampler2D chunkTexture;

out vec4 outColor;

void main() {
    
    vec3 lightDir = vec3(0.5, 1, 0.5);
    
    vec4 textureColor = texture(chunkTexture, vUv);

    float rawBrightness = dot(normalize(vNormal), normalize(lightDir));
    float brightness = mix(0.5, 1.0, clamp(rawBrightness, 0.0, 1.0));

    //float aoMultiplier = 1. - ((1. - (1. / (vAo + 1.))) * 0.5);

    //g//l_FragColor = vec4(vec3(brightness * aoMultiplier) * textureColor, 1.0);
    outColor = vec4(vec3(brightness) * textureColor.rgb, textureColor.a);
    //outColor = vec4(vNormal, 1.);
}