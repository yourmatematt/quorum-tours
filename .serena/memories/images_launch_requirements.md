# Images Required for Launch

## Components Updated for Image Support

| Component | File | Image Support |
|-----------|------|---------------|
| HeroSection | `src/components/home/HeroSection.tsx` | Background image with gradient overlay, fallback |
| TourCard | `src/components/TourCard.tsx` | Thumbnail image prop, fallback to text-only |
| Tour Detail | `src/app/tours/[id]/page.tsx` | Hero banner image, mock data includes images |
| OperatorHero (For Operators) | `src/components/for-operators/OperatorHero.tsx` | Background image with overlay, fallback gradient |
| HowItWorksHero | `src/components/how-it-works/HowItWorksHero.tsx` | Background image with light overlay, fallback |
| Tours Listing | `src/app/tours/page.tsx` | Mock data includes image paths per tour |
| OperatorCard | `src/components/ui/OperatorCard.tsx` | Already supports photo prop (letter fallback) |
| OperatorHero (Profile) | `src/components/ui/OperatorHero.tsx` | Already supports photo prop (SVG fallback) |

## Directory Structure
```
public/
└── images/
    ├── hero/
    │   ├── home-hero.jpg           ← REQUIRED
    │   ├── operators-hero.jpg      ← Recommended
    │   └── how-it-works-hero.jpg   ← Optional
    ├── tours/
    │   ├── werribee-wetlands.jpg
    │   ├── cairns-esplanade.jpg
    │   ├── daintree-rainforest.jpg
    │   ├── mallee-woodlands.jpg
    │   ├── bool-lagoon.jpg
    │   ├── kosciuszko-alpine.jpg
    │   ├── kimberley-broome.jpg
    │   └── cradle-mountain.jpg
    └── operators/
        └── [operator-id].jpg       ← Optional
```

## Image Specifications
- Hero images: 1920x1080 minimum, landscape orientation
- Tour cards: 560x315 (16:9), tour detail: 1920x800
- Operators: 400x400 (optional, letter avatar fallback)

## Fallback Behavior
- All components gracefully degrade if images are missing
- HeroSection: Falls back to gradient with organic shapes
- TourCard: Shows text-only card (no image section)
- Operator: Shows first letter of name or SVG icon

## Documentation
Full checklist: `docs/IMAGES-NEEDED-FOR-LAUNCH.md`
