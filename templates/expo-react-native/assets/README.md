# Assets Directory

This directory should contain your app's static assets.

## Required Files

### Mobile App Icons
- `icon.png` - App icon for iOS and Android (1024x1024 PNG)
- `adaptive-icon.png` - Android adaptive icon (1024x1024 PNG with transparency)
- `splash.png` - Splash screen image

### Web
- `favicon.png` - Web favicon (48x48 PNG recommended, can be other sizes)

## Image Guidelines

- Use high-resolution images (Expo will automatically generate appropriate sizes)
- For icons, use PNG format with transparency
- For splash screens, consider different aspect ratios for various devices
- Optimize images to reduce bundle size

## Example Structure

```
assets/
├── icon.png              # 1024x1024 app icon
├── splash.png            # Splash screen
├── adaptive-icon.png     # 1024x1024 Android adaptive icon
├── favicon.png           # Web favicon
└── images/               # Additional images
    ├── logo.png
    └── background.png
```

## Generating Icons

You can use online tools or Expo's built-in features to generate app icons:
- [Expo Icon Generator](https://docs.expo.dev/develop/user-interface/splash-screen-and-app-icon/)
- Use the `eas` CLI: `npx eas-cli build:configure`

## Notes

- The `.placeholder` files in this directory are just examples. Replace them with actual images.
- You can organize additional images in subdirectories (e.g., `images/`, `fonts/`, etc.)
- Use `require('./assets/image.png')` in React Native to reference static assets
