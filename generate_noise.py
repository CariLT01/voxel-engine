from PIL import Image
import random

# Create a new grayscale image (mode 'L') with 16x16 size
img = Image.new('RGB', (16, 16))

# Access the pixel map
pixels = img.load()

def mix(a, b, t):
    return a * (1 - t) + b * t

#     float brightness = mix(0.5, 1.0, clamp(rawBrightness, 0.0, 1.0));

# Fill each pixel with a random value between 0 and 255
for y in range(16):
    for x in range(16):
        raw_value = random.uniform(0, 1)
        value = mix(0.95, 1.0, raw_value)

        mr, mg, mb = 255 / 255, 255 / 255, 255 / 255


        r = int((value * mr) * 255)
        g = int((value * mg) * 255)
        b = int((value * mb) * 255)

        pixels[x, y] = (r, g, b)

# Save and show the image
img.save("noise_manual_16x16.png")
img.show()