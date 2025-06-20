function resolveAABB3D(
    ax: number, ay: number, az: number, aw: number, ah: number, ad: number,
    bx: number, by: number, bz: number, bw: number, bh: number, bd: number
): { newX: number, newY: number, newZ: number } {
    const aMinX = ax;
    const aMaxX = ax + aw;
    const aMinY = ay;
    const aMaxY = ay + ah;
    const aMinZ = az;
    const aMaxZ = az + ad;

    const bMinX = bx;
    const bMaxX = bx + bw;
    const bMinY = by;
    const bMaxY = by + bh;
    const bMinZ = bz;
    const bMaxZ = bz + bd;

    const overlapX1 = aMaxX - bMinX;
    const overlapX2 = bMaxX - aMinX;
    const overlapY1 = aMaxY - bMinY;
    const overlapY2 = bMaxY - aMinY;
    const overlapZ1 = aMaxZ - bMinZ;
    const overlapZ2 = bMaxZ - aMinZ;

    const overlapX = overlapX1 < overlapX2 ? overlapX1 : -overlapX2;
    const overlapY = overlapY1 < overlapY2 ? overlapY1 : -overlapY2;
    const overlapZ = overlapZ1 < overlapZ2 ? overlapZ1 : -overlapZ2;

    // Find smallest penetration
    const absX = Math.abs(overlapX);
    const absY = Math.abs(overlapY);
    const absZ = Math.abs(overlapZ);

    if (absX < absY && absX < absZ) {
        return { newX: ax - overlapX, newY: ay, newZ: az };
    } else if (absY < absZ) {
        return { newX: ax, newY: ay - overlapY, newZ: az };
    } else {
        return { newX: ax, newY: ay, newZ: az - overlapZ };
    }
}