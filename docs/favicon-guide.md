# Favicon Guide — Create & Update

## Current Setup

- **File**: `client/public/favicon.png`
- **HTML reference**: `client/index.html` line 25
  ```html
  <link rel="icon" type="image/png" href="/favicon.png" />
  ```

## Free Tools for Creating Favicons

| Tool | Best for | URL |
|------|----------|-----|
| Favicon.io | Text, image, or emoji → favicon | favicon.io |
| RealFaviconGenerator | Multi-platform favicon set from an uploaded image | realfavicongenerator.net |
| Canva | Designing from scratch (free tier) | canva.com |
| GIMP | Local open-source raster image editor | gimp.org |
| Inkscape | Local open-source vector/SVG editor | inkscape.org |

## Step-by-Step: Creating a Favicon with Favicon.io

1. Go to favicon.io
2. Choose a generation method:
   - **Text → Favicon** — type a letter/word, pick font, color, and background
   - **Image → Favicon** — upload an existing image to convert
   - **Emoji → Favicon** — pick an emoji
3. Customize the settings (size, font, colors) as needed
4. Click **Download** — you'll get a ZIP containing multiple formats (`.ico`, `.png`, etc.)
5. Extract the ZIP and locate the PNG file you want to use

## Replacing the Favicon in This Project

1. **Overwrite the file** — replace `client/public/favicon.png` with your new PNG favicon
2. **If changing format** (e.g., to `.ico` or `.svg`):
   - Place the new file in `client/public/`
   - Update the `<link>` tag in `client/index.html` line 25 to match the new filename and MIME type:
     ```html
     <!-- Example for .ico -->
     <link rel="icon" type="image/x-icon" href="/favicon.ico" />

     <!-- Example for .svg -->
     <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
     ```
3. **Recommended size**: 256×256 px or 512×512 px PNG for best quality across browsers

## Deploying the Change

1. Commit the updated favicon (and any HTML changes) to the `static-spa` branch
2. Push to the remote — GitHub Actions will handle deployment automatically

## Troubleshooting

- **Browser cache**: Hard-refresh with `Cmd + Shift + R` (macOS) or `Ctrl + Shift + R` (Windows/Linux), or clear the browser cache
- **Verify the file**: Open `https://<your-domain>/favicon.png` directly in the browser to confirm the new file is served
- **Check the HTML**: Ensure the `href` and `type` in the `<link>` tag match the actual filename and format in `client/public/`
