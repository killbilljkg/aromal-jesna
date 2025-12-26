# Gallery Images Setup

## Overview
The gallery page displays all your couple photos in a responsive grid layout.

## Folder Structure
```
wedding/
└── public/
    └── images/
        └── gallery/    ← Add your gallery images here
            ├── 1.jpg
            ├── 2.jpg
            ├── 3.jpg
            └── ...
```

## Current Status
✅ Currently has 18 images copied from celebration folder

## Adding More Images

### Method 1: Add Individual Images
1. Place your new photos in `public/images/gallery/`
2. Name them sequentially starting from 19: `19.jpg`, `20.jpg`, `21.jpg`, etc.
3. Update the Gallery component:
   - Open `src/components/Gallery.js`
   - Find the line: `const images = Array.from({ length: 18 }, ...)`
   - Change `18` to your new total number (e.g., if you add 5 more images, change to `23`)

### Method 2: Replace All Images
If you want to replace all gallery images with a new set:

1. Delete existing images:
   ```bash
   rm ~/wedding/public/images/gallery/*.jpg
   ```

2. Copy your new images and rename them:
   ```bash
   cd ~/Documents/your-photo-folder
   counter=1
   for img in *.{jpg,jpeg,JPG,JPEG}; do
     cp "$img" ~/wedding/public/images/gallery/${counter}.jpg
     counter=$((counter + 1))
   done
   ```

3. Update `src/components/Gallery.js` with the new count

### Method 3: Quick Add from Specific Folder
If you have photos in `~/Documents/aromal/` or another folder:

```bash
# Count existing images first
existing=$(ls ~/wedding/public/images/gallery/*.jpg 2>/dev/null | wc -l)
next=$((existing + 1))

# Add new images starting from next number
cd ~/Documents/aromal/
for img in *.jpeg *.jpg; do
  [ -f "$img" ] && cp "$img" ~/wedding/public/images/gallery/${next}.jpg && echo "Added: ${next}.jpg" && next=$((next + 1))
done

# Update Gallery.js with the new total count
echo "Total images now: $((next - 1))"
echo "Update Gallery.js length to: $((next - 1))"
```

## Supported Formats
- `.jpg`
- `.jpeg`
- `.png` (will be converted to .jpg for web optimization)

## Recommended Image Sizes
- Minimum: 800 × 600 pixels
- Recommended: 1200 × 900 pixels or higher
- The gallery uses responsive grid that adapts to screen size
- Images will be displayed in a masonry-style grid

## Example: Adding 5 More Images
If you currently have 18 images and want to add 5 more:

1. Copy your 5 new photos as 19.jpg, 20.jpg, 21.jpg, 22.jpg, 23.jpg
2. Edit `src/components/Gallery.js`:
   ```javascript
   const images = Array.from({ length: 23 }, (_, i) => ({
   ```
3. Save and the page will reload with all 23 images
