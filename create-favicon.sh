#!/bin/bash
# Script to create favicon files from the tech cube image

# Check if source image exists
if [ ! -f "assets/img/tech-cube.png" ]; then
    echo "❌ Error: assets/img/tech-cube.png not found!"
    echo "Please save the tech cube image as assets/img/tech-cube.png first"
    exit 1
fi

echo "🎨 Creating favicon files from tech cube..."

# Create 512x512 source (for high quality)
sips -z 512 512 assets/img/tech-cube.png --out assets/img/tech-cube-512.png

# Create 16x16 favicon
sips -z 16 16 assets/img/tech-cube-512.png --out assets/img/favicon-16.png

# Create 32x32 favicon
sips -z 32 32 assets/img/tech-cube-512.png --out assets/img/favicon-32.png

# Create 180x180 for Apple touch icon
sips -z 180 180 assets/img/tech-cube-512.png --out assets/img/apple-touch-icon.png

# Create 192x192 for Android
sips -z 192 192 assets/img/tech-cube-512.png --out assets/img/android-chrome-192.png

# Create 512x512 for Android
cp assets/img/tech-cube-512.png assets/img/android-chrome-512.png

# Convert to ICO format using sips (creates a multi-size .ico)
# Note: sips doesn't create true .ico, so we'll use PNG with .ico extension for now
# For a true .ico file, you'd need ImageMagick or online converter
cp assets/img/favicon-32.png favicon.ico

echo "✅ Favicon files created successfully!"
echo ""
echo "Files created:"
echo "  - favicon.ico (32x32)"
echo "  - assets/img/favicon-16.png"
echo "  - assets/img/favicon-32.png"
echo "  - assets/img/apple-touch-icon.png (180x180)"
echo "  - assets/img/android-chrome-192.png"
echo "  - assets/img/android-chrome-512.png"
echo ""
echo "For a true .ico file with multiple sizes, visit:"
echo "https://favicon.io/favicon-converter/"
echo "and upload assets/img/tech-cube-512.png"
