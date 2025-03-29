# Presentation Thumbnails

This directory is for storing the thumbnails for your presentation cards.

## How to Add Thumbnails

1. Take a screenshot or export a thumbnail image from your Canva presentations
2. Save the images as:
   - `presentation1-thumbnail.jpg` - For your first Canva presentation
   - `presentation2-thumbnail.jpg` - For your second Canva presentation
3. Place these files in this directory
4. Open the `index.html` file and uncomment the image tags in the presentation cards:

```html
<!-- Uncomment this line and the thumbnail will appear -->
<img src="images/presentation1-thumbnail.jpg" alt="Engineering Presentation Thumbnail" class="thumbnail-img">
```

## Image Guidelines

- Recommended size: 500x300 pixels
- Format: JPG or PNG
- Keep file size under 200KB for optimal loading speed 