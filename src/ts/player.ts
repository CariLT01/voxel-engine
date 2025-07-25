import { PerspectiveCamera, Quaternion, Vector2, Vector3 } from "three";
import { Entity } from "./entity";
import { clamp } from "three/src/math/MathUtils";

export class Player extends Entity {

    private mouseDeltaX: number = 0;
    private mouseDeltaY: number = 0;
    private phi: number = 0;
    private theta: number = 0;
    private camera: PerspectiveCamera;
    private keysPressed = new Set<string>();

    constructor(camera: PerspectiveCamera, position: Vector3) {
        super(position);

        this.camera = camera;

        this.mouseEvents();
        this.keyboardEvents();


    }

    private updateRotation() {
        const xh = this.mouseDeltaX / innerWidth;
        const yh = this.mouseDeltaY / innerHeight;

        this.phi += -xh * 5;
        this.theta = clamp(this.theta + -yh * 5, -Math.PI / 2, Math.PI / 2);

        const qx = new Quaternion();
        qx.setFromAxisAngle(new Vector3(0, 1, 0), this.phi);
        const qy = new Quaternion();
        qy.setFromAxisAngle(new Vector3(1, 0, 0), this.theta);

        const q = new Quaternion();
        q.multiply(qx);
        q.multiply(qy);

        this.rotation.copy(q);

        this.mouseDeltaX = 0;
        this.mouseDeltaY = 0;


    }

    private updateTranslation(dt: number) {
        const forwardVelocity = (this.keysPressed.has('w') ? 1 : 0) + (this.keysPressed.has('s') ? -1 : 0);
        const strafeVelocity = (this.keysPressed.has('a') ? 1 : 0) + (this.keysPressed.has('d') ? -1 : 0);

        let SPEED = 10;

        if (this.isStandingInFluid() == true) {
            SPEED = 4;
        }

        const qx = new Quaternion();
        qx.setFromAxisAngle(new Vector3(0, 1, 0), this.phi);

        const forward = new Vector3(0, 0, -1);
        forward.applyQuaternion(qx);
        forward.multiplyScalar(forwardVelocity * SPEED);

        const left = new Vector3(-1, 0, 0);
        left.applyQuaternion(qx);
        left.multiplyScalar(strafeVelocity * SPEED);

        this.accel.add(left);
        this.accel.add(forward);


    }

    private keyboardEvents() {
        document.addEventListener("keydown", (e) => {
            this.keysPressed.add(e.key);
            if (this.keysPressed.has(" ")) {
                this.jump();
            }
        })
        document.addEventListener("keyup", (e) => {
            this.keysPressed.delete(e.key);
        })
    }

    private mouseEvents() {
        document.addEventListener("mousemove", (e) => {
            this.mouseDeltaX = e.movementX;
            this.mouseDeltaY = e.movementY;
        })
    }


    private updateCamera() {
        this.camera.quaternion.copy(this.rotation);
        this.camera.position.copy(this.position.clone().add(new Vector3(0, this.height * 0.9, 0)));
    }

    updatePlayer(delta: number) {
        this.updateRotation();
        this.updateTranslation(delta);

        this.update(delta);
        this.updateCamera();

    }

}