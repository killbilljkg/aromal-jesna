#!/bin/bash

# Script to copy celebration images from Documents to the wedding site
# Place your celebration photos in ~/Documents/celebration-photos/
# and they will be copied and renamed sequentially

SOURCE_DIR="$HOME/Documents/celebration-photos"
DEST_DIR="$HOME/wedding/public/images/celebration"

# Check if source directory exists
if [ ! -d "$SOURCE_DIR" ]; then
  echo "❌ Source directory not found: $SOURCE_DIR"
  echo "📁 Please create this folder and add your celebration photos"
  exit 1
fi

# Create destination directory if it doesn't exist
mkdir -p "$DEST_DIR"

# Copy and rename images
counter=1
for img in "$SOURCE_DIR"/*.{jpg,jpeg,JPG,JPEG,png,PNG}; do
  # Check if file exists (handles case when no files match)
  if [ -f "$img" ]; then
    # Get file extension
    extension="${img##*.}"
    # Convert to lowercase
    extension=$(echo "$extension" | tr '[:upper:]' '[:lower:]')
    # Convert to jpg if needed
    if [ "$extension" = "jpeg" ] || [ "$extension" = "png" ]; then
      extension="jpg"
    fi

    # Copy and rename
    cp "$img" "$DEST_DIR/${counter}.${extension}"
    echo "✅ Copied: $(basename "$img") → ${counter}.${extension}"
    counter=$((counter + 1))
  fi
done

total=$((counter - 1))
echo ""
echo "🎉 Successfully copied $total images to celebration folder"
echo "📍 Location: $DEST_DIR"
echo ""
echo "To use different number of images, update CelebrationCarousel.js:"
echo "Change: Array.from({ length: 7 }, ...)"
echo "To:     Array.from({ length: $total }, ...)"
