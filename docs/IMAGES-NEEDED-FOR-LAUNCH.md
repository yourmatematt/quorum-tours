# Images Needed for Launch

**Quorum Tours** | Pre-Launch Checklist

All images should be placed in `/public/images/` and will be served from the root path.

---

## Directory Structure

```
public/
└── images/
    ├── hero/
    │   ├── home-hero.jpg           ← Home page hero (REQUIRED)
    │   ├── operators-hero.jpg      ← For Operators page hero
    │   └── how-it-works-hero.jpg   ← How It Works page hero
    ├── tours/
    │   ├── werribee-wetlands.jpg   ← Example tour images
    │   ├── cairns-esplanade.jpg
    │   ├── daintree-rainforest.jpg
    │   ├── mallee-woodlands.jpg
    │   ├── bool-lagoon.jpg
    │   ├── kosciuszko-alpine.jpg
    │   ├── kimberley-broome.jpg
    │   ├── cradle-mountain.jpg
    │   └── [your-tour-slug].jpg    ← Real tour images
    ├── how-it-works/
    │   ├── step-1-browse-tours.jpg     ← Tours page screenshot
    │   ├── step-2-express-interest.jpg ← Interest button crop
    │   ├── step-3-commit-payment.jpg   ← Payment page screenshot
    │   ├── step-4-quorum-reached.jpg   ← Confirmed progress bar
    │   └── step-5-birding-experience.jpg ← Lifestyle photo
    ├── faces/
    │   ├── birder-1.jpg                ← Sync problem illustration
    │   ├── birder-2.jpg                ← Sync problem illustration
    │   ├── birder-3.jpg                ← Sync problem illustration
    │   ├── birder-4.jpg                ← Sync problem illustration
    │   └── operator-1.jpg              ← Sync problem illustration
    └── operators/
        └── [operator-id].jpg       ← Operator avatars (optional)
```

---

## Required Images (Minimum for Launch)

### 1. Home Page Hero (REQUIRED)
| File | Path | Dimensions | Notes |
|------|------|------------|-------|
| **home-hero.jpg** | `/public/images/hero/home-hero.jpg` | 1920 x 1080 min | Australian birding landscape |

**Stock search terms:**
- "Australian wetland sunrise birds"
- "Kakadu national park landscape"
- "Australian bush golden hour"
- "Queensland tropical birds habitat"
- "Murray River wetlands dawn"

**Requirements:**
- High resolution (1920px+ wide)
- Horizontal/landscape orientation
- Natural lighting preferred (golden hour ideal)
- Subject: Australian landscape with water, bush, or birds
- No people required

---

### 2. For Operators Hero (RECOMMENDED)
| File | Path | Dimensions | Notes |
|------|------|------------|-------|
| **operators-hero.jpg** | `/public/images/hero/operators-hero.jpg` | 1920 x 1080 min | Wildlife guide in action |

**Stock search terms:**
- "Wildlife guide binoculars australia"
- "Birdwatching tour guide"
- "Nature tour small group"
- "Tour guide pointing wildlife"

**Requirements:**
- Shows professional guiding scenario
- Can include people (guides, small groups)
- Australian landscape backdrop preferred
- Falls back to gradient if missing

---

### 3. How It Works Hero (OPTIONAL)
| File | Path | Dimensions | Notes |
|------|------|------------|-------|
| **how-it-works-hero.jpg** | `/public/images/hero/how-it-works-hero.jpg` | 1920 x 1080 min | Birders on tour |

**Stock search terms:**
- "Small group birdwatching"
- "Wildlife viewing group australia"
- "Nature tour participants"

**Requirements:**
- Shows community/group activity
- Light overlay applied (page stays bright)
- Falls back to subtle gradient if missing

---

### 4. Tour Card Images (Per Tour)

Each tour listing can have a thumbnail image. These appear in:
- Tours listing page (`/tours`)
- Home page featured tours
- Tour detail page hero banner
- Search results

| Usage | Dimensions | Aspect Ratio |
|-------|------------|--------------|
| Card thumbnail | 560 x 315 | 16:9 |
| Tour detail hero | 1920 x 800 | ~2.4:1 |

**Mock tour images (used in example data):**
```
/public/images/tours/werribee-wetlands.jpg    ← VIC wetlands
/public/images/tours/cairns-esplanade.jpg     ← QLD coastal
/public/images/tours/daintree-rainforest.jpg  ← QLD rainforest
/public/images/tours/mallee-woodlands.jpg     ← VIC mallee
/public/images/tours/bool-lagoon.jpg          ← SA wetlands
/public/images/tours/kosciuszko-alpine.jpg    ← NSW alpine
/public/images/tours/kimberley-broome.jpg     ← WA tropical
/public/images/tours/cradle-mountain.jpg      ← TAS wilderness
```

**For your real tour(s), name the file after the location/tour slug.**

**Stock search by region:**

| Region | Search Terms |
|--------|--------------|
| VIC | "Werribee wetlands", "Victorian bushland", "Mallee woodland australia" |
| QLD | "Cairns esplanade birds", "Daintree rainforest", "Atherton Tablelands" |
| NSW | "Kosciuszko national park", "Blue Mountains forest" |
| WA | "Broome shorebirds", "Kimberley landscape", "Pilbara" |
| TAS | "Cradle Mountain tasmania", "Tasmania wilderness" |
| NT | "Kakadu wetlands", "Top End landscape" |
| SA | "Bool Lagoon", "Coorong wetlands", "Murray River birds" |

---

### 5. Sync Problem Face Images (RECOMMENDED)

The "synchronization problem" section on How It Works uses face photos to humanize the illustration of birders and an operator who can't see each other's intentions.

| File | Path | Dimensions | Notes |
|------|------|------------|-------|
| **birder-1.jpg** | `/public/images/faces/birder-1.jpg` | 200 x 200 | Friendly face, outdoor enthusiast vibe |
| **birder-2.jpg** | `/public/images/faces/birder-2.jpg` | 200 x 200 | Diverse age/gender mix recommended |
| **birder-3.jpg** | `/public/images/faces/birder-3.jpg` | 200 x 200 | Natural lighting preferred |
| **birder-4.jpg** | `/public/images/faces/birder-4.jpg` | 200 x 200 | Casual outdoor attire |
| **operator-1.jpg** | `/public/images/faces/operator-1.jpg` | 200 x 200 | Professional guide look, friendly |

**Stock search terms:**
- "australian person portrait outdoor"
- "middle aged outdoor enthusiast portrait"
- "nature guide portrait friendly"
- "birdwatcher portrait"
- "retiree outdoor portrait australia"

**Requirements:**
- Square crop (will be displayed as circles)
- Natural, friendly expressions
- Mix of ages (target demographic 45-70)
- Outdoor/nature context preferred but not required
- Avoid overly corporate or staged looks

**Fallback:** Letter initials (A, B, C, D for birders, O for operator) display if images missing.

---

### 6. How It Works - User Journey Images (RECOMMENDED)

The "For Birders: Your Journey" section on the How It Works page uses visual images for each step. These help older users (45-70) understand the flow without reading dense text.

| Step | File | Path | Aspect Ratio | Frame Style |
|------|------|------|--------------|-------------|
| 1. Browse | **step-1-browse-tours.jpg** | `/public/images/how-it-works/step-1-browse-tours.jpg` | 16:9 | Browser frame |
| 2. Interest | **step-2-express-interest.jpg** | `/public/images/how-it-works/step-2-express-interest.jpg` | 4:3 | UI snippet |
| 3. Commit | **step-3-commit-payment.jpg** | `/public/images/how-it-works/step-3-commit-payment.jpg` | 4:3 | Browser frame |
| 4. Confirms | **step-4-quorum-reached.jpg** | `/public/images/how-it-works/step-4-quorum-reached.jpg` | 3:1 | UI snippet |
| 5. Birding | **step-5-birding-experience.jpg** | `/public/images/how-it-works/step-5-birding-experience.jpg` | 16:9 | Lifestyle photo |

**How to capture these:**

| Step | How to Create |
|------|---------------|
| Step 1 | Screenshot of `/tours` page showing tour cards with quorum status |
| Step 2 | Cropped screenshot of the "Express Interest" button area from a tour detail page |
| Step 3 | Screenshot of `/tours/[id]/join` page showing payment/commitment form |
| Step 4 | Cropped screenshot of the quorum progress bar at 100% with "Confirmed" badge |
| Step 5 | Stock photo: "small group birdwatching australia", "nature tour group binoculars" |

**Current state:** Placeholder UI shown until real images are added. The placeholders show the correct aspect ratio and frame style to guide screenshot capture.

---

### 7. Operator Avatars (Optional)

Operators can have profile photos. If not provided, the system shows a letter avatar.

| File | Path | Dimensions |
|------|------|------------|
| Operator photo | `/public/images/operators/[operator-id].jpg` | 400 x 400 |

**Not required for launch** - letter avatars work as fallback.

---

## Image Specifications

### Format & Optimization

| Format | Use Case | Notes |
|--------|----------|-------|
| **JPG** | Photos | Best compression for photos |
| **WebP** | All (preferred) | 25-35% smaller, modern browsers |
| **PNG** | Graphics with transparency | Logos, icons |

### Quality Settings
- JPG quality: 80-85%
- WebP quality: 80%
- Max file size target: 200KB for thumbnails, 500KB for heroes

### Recommended Sources

**Free Stock:**
- [Unsplash](https://unsplash.com) - Search "Australia birds", "Australian wildlife"
- [Pexels](https://pexels.com) - Good landscape selection
- [Pixabay](https://pixabay.com) - Variable quality

**Paid Stock (Better Australian Selection):**
- [iStock](https://istockphoto.com) - Best Australian bird photos
- [Adobe Stock](https://stock.adobe.com)
- [Shutterstock](https://shutterstock.com)

**Specialist:**
- [Australian Geographic](https://australiangeographic.com.au) - May require permission
- [eBird Macaulay Library](https://macaulaylibrary.org) - Bird photos, Creative Commons

---

## Quick Launch Checklist

### Minimum Viable (1 tour launch)

- [ ] `/public/images/hero/home-hero.jpg` - Home page hero **(REQUIRED)**
- [ ] `/public/images/tours/[your-tour].jpg` - First tour image

### Recommended (Professional experience)

- [ ] `/public/images/hero/operators-hero.jpg` - For Operators page
- [ ] `/public/images/hero/how-it-works-hero.jpg` - How It Works page
- [ ] 3-5 regional location images for tour cards
- [ ] Favicon (`/public/favicon.ico`)
- [ ] OG image for social sharing (`/public/og-image.jpg` - 1200x630)

### How It Works User Journey (Visual Step-by-Step)

- [ ] `/public/images/how-it-works/step-1-browse-tours.jpg` - Tours page screenshot
- [ ] `/public/images/how-it-works/step-2-express-interest.jpg` - Interest button crop
- [ ] `/public/images/how-it-works/step-3-commit-payment.jpg` - Payment page screenshot
- [ ] `/public/images/how-it-works/step-4-quorum-reached.jpg` - Confirmed progress bar crop
- [ ] `/public/images/how-it-works/step-5-birding-experience.jpg` - Birding lifestyle photo

### Sync Problem Face Images (How It Works Page)

- [ ] `/public/images/faces/birder-1.jpg` - Person portrait (birder)
- [ ] `/public/images/faces/birder-2.jpg` - Person portrait (birder)
- [ ] `/public/images/faces/birder-3.jpg` - Person portrait (birder)
- [ ] `/public/images/faces/birder-4.jpg` - Person portrait (birder)
- [ ] `/public/images/faces/operator-1.jpg` - Person portrait (tour guide/operator)

### Full Mock Data Coverage (Remove all placeholders)

All mock tour images:
- [ ] `/public/images/tours/werribee-wetlands.jpg`
- [ ] `/public/images/tours/cairns-esplanade.jpg`
- [ ] `/public/images/tours/daintree-rainforest.jpg`
- [ ] `/public/images/tours/mallee-woodlands.jpg`
- [ ] `/public/images/tours/bool-lagoon.jpg`
- [ ] `/public/images/tours/kosciuszko-alpine.jpg`
- [ ] `/public/images/tours/kimberley-broome.jpg`
- [ ] `/public/images/tours/cradle-mountain.jpg`

---

## How Images Are Used

### Home Page Hero (`HeroSection.tsx`)
```tsx
// Default path - just drop your image here
heroImage="/images/hero/home-hero.jpg"
```
- Full-bleed background with gradient overlay
- Text is white on dark overlay
- Fallback: gradient pattern if image missing

### Tour Cards (`TourCard.tsx`)
```tsx
// Pass image prop to show thumbnail
<TourCard
  image="/images/tours/werribee-wetlands.jpg"
  // ... other props
/>
```
- 160px tall thumbnail at top of card
- Status badge overlays on image
- Graceful fallback if image missing (text-only card)

### Tour Detail (`/tours/[id]/page.tsx`)
```tsx
// Set in tour data
image: '/images/tours/werribee-wetlands.jpg'
```
- 300-400px tall banner at page top
- Gradient overlay at bottom
- Hidden if no image provided

---

## After Adding Images

1. **Restart dev server** if running (`npm run dev`)
2. **Clear browser cache** (Ctrl+Shift+R / Cmd+Shift+R)
3. **Check console** for 404 errors on image paths
4. **Test responsive** - images should scale properly

---

## Example Stock Image URLs (For Reference)

These are example search results - download and save locally:

**Australian Wetlands:**
- Unsplash: search "australian wetland"
- Pexels: search "australia birds water"

**Birding Activity:**
- Unsplash: search "birdwatching binoculars"
- Pexels: search "nature guide"

**Australian Birds:**
- Unsplash: search "kookaburra", "cockatoo australia"
- Macaulay Library: specific species photos

---

*Document Version: 1.0*
*Created: 2026-01-27*
