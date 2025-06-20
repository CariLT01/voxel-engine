import { Vector3 } from "three";

export class Collider {
    p1: Vector3;
    p2: Vector3;

    constructor(pos1: Vector3, pos2: Vector3) {
        this.p1 = pos1;
        this.p2 = pos2;
    }

    add(pos: Vector3) {
        return new Collider(
            this.p1.clone().add(pos),
            this.p2.clone().add(pos)
        );

    }

    intersect(collider: Collider) {
        const x = Math.min(this.p2.x, collider.p2.x) - Math.max(this.p1.x, collider.p1.x);
        const y = Math.min(this.p2.y, collider.p2.y) - Math.max(this.p1.y, collider.p1.y);
        const z = Math.min(this.p2.z, collider.p2.z) - Math.max(this.p1.z, collider.p1.z);

        return x > 0 && y > 0 && z > 0;
    }

    time(x: number, y: number): number {
        if (y !== 0) {
            return x / y;
        }

        if (x > 0) {
            return Number.NEGATIVE_INFINITY;
        } else if (x < 0) {
            return Number.POSITIVE_INFINITY;
        } else {
            // x is 0, division by zero is NaN
            return NaN;
        }
    }


    collide(collider: Collider, velocity: Vector3) {



        let x_entry = this.time(collider.p1.x - this.p2.x, velocity.x);
        let x_exit = this.time(collider.p2.x - this.p1.x, velocity.x);
        if (!(velocity.x > 0)) {
            x_entry = this.time(collider.p2.x - this.p1.x, velocity.x);
            x_exit = this.time(collider.p1.x - this.p2.x, velocity.x);
        }

        let y_entry = this.time(collider.p1.y - this.p2.y, velocity.y);
        let y_exit = this.time(collider.p2.y - this.p1.y, velocity.y);
        if (!(velocity.y > 0)) {
            y_entry = this.time(collider.p2.y - this.p1.y, velocity.y);
            y_exit = this.time(collider.p1.y - this.p2.y, velocity.y);
        }

        let z_entry = this.time(collider.p1.z - this.p2.z, velocity.z);
        let z_exit = this.time(collider.p2.z - this.p1.z, velocity.z);
        if (!(velocity.z > 0)) {
            z_entry = this.time(collider.p2.z - this.p1.z, velocity.z);
            z_exit = this.time(collider.p1.z - this.p2.z, velocity.z);
        }

        if (x_entry < 0 && y_entry < 0 && z_entry < 0) {
            return;
        }

        if (x_entry > 1 || y_entry > 1 || z_entry > 1) {
            return;
        }

        const entry = Math.max(x_entry, y_entry, z_entry);
        const exit = Math.min(x_exit, y_exit, z_exit);

        if (entry > exit) {
            return;
        }

        // Find normal

        const nx = (entry === x_entry)
            ? (velocity.x > 0 ? -1 : 1)
            : 0;
        const ny = (entry === y_entry)
            ? (velocity.y > 0 ? -1 : 1)
            : 0;
        const nz = (entry === z_entry)
            ? (velocity.z > 0 ? -1 : 1)
            : 0;
        
        return {
            entry: entry,
            normal: new Vector3(nx, ny, nz)
        };
    }
}