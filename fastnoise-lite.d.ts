declare module "fastnoise-lite" {
  /**
   * FastNoiseLite main class for generating noise.
   */
  class FastNoiseLite {
    /**
     * Create a new FastNoiseLite instance.
     * @param seed Optional seed for deterministic noise (default: Math.random()).
     */
    constructor(seed?: number);

    /** Set the seed. */
    SetSeed(seed: number): void;

    /** Choose the noise algorithm. */
    SetNoiseType(type: FastNoiseLite.NoiseType): void;

    /** Set the frequency of the noise. */
    SetFrequency(frequency: number): void;

    /**
     * Get 2D noise value at (x, y).
     * @returns Value in range [-1, 1]
     */
    GetNoise2D(x: number, y: number): number;

    /**
     * Get 3D noise value at (x, y, z).
     * @returns Value in range [-1, 1]
     */
    GetNoise3D(x: number, y: number, z: number): number;

    /** Alias for GetNoise3D. */
    GetNoise(x: number, y: number, z: number): number;
  }

  namespace FastNoiseLite {
    /** Supported noise types. */
    enum NoiseType {
      OpenSimplex2 = 0,
      OpenSimplex2S = 1,
      Perlin = 2,
      Cellular = 3,
      Simplex = 4,
      Value = 5,
      Cubic = 6,
      WhiteNoise = 7,
    }
  }

  // CommonJS export
  export = FastNoiseLite;
}
