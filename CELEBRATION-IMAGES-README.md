# Celebration Carousel Images Setup

## Overview
The celebration carousel displays images in an infinite scrolling animation on the home page.

## Folder Structure
```
wedding/
├── public/
│   └── images/
│       └── celebration/    ← Place your images here
│           ├── 1.jpg
│           ├── 2.jpg
│           ├── 3.jpg
│           └── ...
└── copy-celebration-images.sh
```

## Method 1: Manual Copy
1. Place your celebration photos in `public/images/celebration/`
2. Name them sequentially: `1.jpg`, `2.jpg`, `3.jpg`, etc.
3. Supported formats: `.jpg`, `.jpeg`, `.png`

## Method 2: Automated Script
1. Create a folder in Documents: `~/Documents/celebration-photos/`
2. Add all your celebration photos to this folder (any names)
3. Run the script:
   ```bash
   cd ~/wedding
   ./copy-celebration-images.sh
   ```
4. The script will automatically:
   - Copy all images from `~/Documents/celebration-photos/`
   - Rename them sequentially (1.jpg, 2.jpg, 3.jpg, etc.)
   - Place them in `public/images/celebration/`

## Changing Number of Images
If you want to use a different number of images (default is 7):

1. Open `src/components/CelebrationCarousel.js`
2. Find the line:
   ```javascript
   const celebrationImages = Array.from({ length: 7 }, (_, i) => ({
   ```
3. Change `7` to your desired number of images

## Example: Quick Copy from Documents
If you have images in Documents folder:

```bash
# Copy specific images
cp ~/Documents/IMG_1234.jpg ~/wedding/public/images/celebration/1.jpg
cp ~/Documents/IMG_5678.jpg ~/wedding/public/images/celebration/2.jpg
cp ~/Documents/IMG_9012.jpg ~/wedding/public/images/celebration/3.jpg
# ... and so on
```

Or use the automated script for bulk copying!

## Recommended Image Sizes
- Minimum width: 300px
- Minimum height: 250-350px
- Format: JPG (for best web performance)
- The carousel alternates between small (14rem × 14rem) and large (14rem × 17rem) images
