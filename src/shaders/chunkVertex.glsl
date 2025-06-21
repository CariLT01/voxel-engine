out vec3 vNormal;
out vec2 vUv;
out float vAo;

// in int32 data
in int data;




uint extractBits(int value, int offset, int bits) {
    uint uvalue = uint(value);
    return (uvalue >> uint(offset)) & ((1u << uint(bits)) - 1u);
}

void unpackVoxelData(int data, out uint x, out uint y, out uint z, out uint normal, out uint index) {
    x = extractBits(data, 0, 5);
    y = extractBits(data, 5, 5);
    z = extractBits(data, 10, 5);
    normal = extractBits(data, 15, 3);
    index = extractBits(data, 18, 8);
}

void main() {

    uint x;
    uint y;
    uint z;
    uint normal;
    uint index;
    unpackVoxelData(data, x, y, z, normal, index);

    vec3 position = vec3(min(float(x + normal), 31.), min(float(y + normal), 31.), min(float(z + normal), 31.));
    vec3 normal_ = vec3(1.);



    vNormal = normalize(mat3(transpose(inverse(modelMatrix))) * normal_);
    vUv = vec2(0., 0.);
    vAo = 0.;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
