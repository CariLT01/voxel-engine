out vec3 vNormal;
out vec2 vUv;
out float vAo;

// in int32 data
in uint data;

uniform int atlasHeight;


// unchanged helper
uint extractBits(uint value, uint offset, uint bits) {
    return (value >> offset) & ((1u << bits) - 1u);
}

void unpackVoxelData(
    uint data,
    out uint x,
    out uint y,
    out uint z,
    out uint normal,
    out uint index,
    out uint u,
    out uint v
) {
    x      = extractBits(data,  0u, 6u);  // bits 0–5
    y      = extractBits(data,  6u, 6u);  // bits 6–11
    z      = extractBits(data, 12u, 6u);  // bits 12–17
    normal = extractBits(data, 18u, 3u);  // bits 18–20
    index  = extractBits(data, 21u, 8u);  // bits 21–28
    u      = extractBits(data, 29u, 1u);  // bit 29
    v      = extractBits(data, 30u, 1u);  // bit 30
}

void main() {

    uint x;
    uint y;
    uint z;
    uint normal;
    uint index;
    uint u;
    uint v;
    unpackVoxelData(data, x, y, z, normal, index, u, v);

    vec3 position_ = vec3(min(float(x), 32.), min(float(y ), 32.), min(float(z ), 32.));
    vec3 normal_ = vec3(1.);
    if (normal == 1u) {
        normal_ = vec3(0., 0., 1.);
    } else if (normal == 2u) {
        normal_ = vec3(0., 0., -1.);
    } else if (normal == 3u) {
        normal_ = vec3(0., 1., 0.);
    } else if (normal == 4u) {
        normal_ = vec3(0., -1., 0.);
    } else if (normal == 5u) {
        normal_ = vec3(1., 0., 0.);
    } else if (normal == 6u) {
        normal_ = vec3(-1., 0., 0.);
    } else {
        normal_ = vec3(0., 0., 0.);
    }


    vNormal = normalize(mat3(transpose(inverse(modelMatrix))) * normal_);

    // Build UV

    int textureSize = 16;

    float tileU = (u == 0u) ? 0.0 : 1.0;
    float tileV = (v == 0u) ? 0.0 : 1.0;

    // Flip within the tile
    tileU = 1.0 - tileU;
    tileV = 1.0 - tileV;

    float beginX = 0.;
    float beginY = float(textureSize * int(index));
    float endX = float(textureSize);
    float endY = float(textureSize * int(index) + textureSize);



    float u_ = mix(beginX, endX, tileU) / float(textureSize);
    float v_ = mix(beginY, endY, tileV) / float(atlasHeight);
    


    vUv = vec2(u_, v_);
    vAo = 0.;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position_, 1.0);
}
