// ─────────────────────────────────────────────────────────────
// כל התוכן של האתר נמצא בקובץ הזה בלבד.
// All site content lives in this one file.
//
// • טקסט: משנים את מה שבין המירכאות.
// • תמונות: שמים את התמונה בתיקייה images ומעדכנים את שם הקובץ כאן.
// • פרויקט חדש: מעתיקים בלוק של פרויקט ב-projects ומשנים אותו.
//   הסדר כאן = הסדר באתר. הגריד חוזר על תבנית של 6, אז כל מספר פרויקטים עובד.
// • hero: חמש התמונות בקולאז' של מסך הפתיחה (slot a–e = המיקום בקומפוזיציה).
// ─────────────────────────────────────────────────────────────
window.SITE = {
  "site": {
    "name": "Tavor",
    "fullName": "Tavor [Surname]",
    "roles": [
      "Director of Photography",
      "Editor"
    ],
    "location": "[City]",
    "brandSuffix": "Production",
    "lede": "video & stills creator",
    "tagline": "FOR EVERY FIELD",
    "years": "2022 — 2026",
    "email": "hello@[yourdomain].com",
    "reelUrl": "https://vimeo.com/[your-showreel-id]",
    "statement": [
      {
        "text": "Light first, then rhythm. I shoot and edit "
      },
      {
        "text": "films that hold a breath",
        "italic": true
      },
      {
        "text": " a little longer than expected."
      }
    ],
    "social": [
      {
        "label": "Instagram",
        "url": "https://instagram.com/[handle]"
      },
      {
        "label": "Vimeo",
        "url": "https://vimeo.com/[handle]"
      },
      {
        "label": "IMDb",
        "url": "https://imdb.com/name/[id]"
      }
    ]
  },
  "topics": [
    {
      "slug": "interiors",
      "title": "Interiors",
      "blurb": "[One or two lines about this topic.]",
      "items": [
        { "image": "images/window.jpg", "alt": "Figure against a window with blinds", "caption": "[Caption]" },
        { "image": "images/stairs.jpg", "alt": "Light shaft in a stairwell", "caption": "[Caption]" }
      ]
    },
    {
      "slug": "horizon",
      "title": "Sea & Horizon",
      "blurb": "[One or two lines about this topic.]",
      "items": [
        { "image": "images/horizon.jpg", "alt": "Low sun on a dark sea horizon", "caption": "[Caption]" },
        { "image": "images/dunes.jpg", "alt": "Dunes in raking amber light", "caption": "[Caption]" },
        { "image": "images/fog.jpg", "alt": "Tree trunks fading into fog", "caption": "[Caption]" }
      ]
    },
    {
      "slug": "night",
      "title": "Night",
      "blurb": "[One or two lines about this topic.]",
      "items": [
        { "image": "images/road.jpg", "alt": "Red tail-light streaks at night", "caption": "[Caption]" },
        { "image": "images/pool.jpg", "alt": "Swimmer's shadow over pool caustics", "caption": "[Caption]" }
      ]
    },
    {
      "slug": "texture",
      "title": "Smoke & Texture",
      "blurb": "[One or two lines about this topic.]",
      "items": [
        { "image": "images/smoke.jpg", "alt": "Side-lit smoke against black", "caption": "[Caption]" },
        { "image": "images/fog.jpg", "alt": "Fog between tree trunks", "caption": "[Caption]" },
        { "image": "images/dunes.jpg", "alt": "Sand ridges in raking light", "caption": "[Caption]" }
      ]
    },
    {
      "slug": "structure",
      "title": "Light & Structure",
      "blurb": "[One or two lines about this topic.]",
      "items": [
        { "image": "images/stairs.jpg", "alt": "Light across a concrete stairwell", "caption": "[Caption]" },
        { "image": "images/window.jpg", "alt": "Window blinds with hard light", "caption": "[Caption]" }
      ]
    }
  ],
  "hero": [
    {
      "slot": "a",
      "topic": "interiors",
      "image": "images/window.jpg",
      "alt": "Silhouette of a figure against a window with blinds, hard light on the floor"
    },
    {
      "slot": "b",
      "topic": "horizon",
      "image": "images/horizon.jpg",
      "alt": "Low sun on a dark sea horizon"
    },
    {
      "slot": "c",
      "topic": "night",
      "image": "images/road.jpg",
      "alt": "Red tail-light streaks and out-of-focus headlights at night"
    },
    {
      "slot": "d",
      "topic": "texture",
      "image": "images/smoke.jpg",
      "alt": "Smoke lit from the side against black"
    }
  ],
  "projects": [
    {
      "slug": "the-long-field",
      "title": "The Long Field",
      "client": "[Client]",
      "role": "Director of Photography",
      "year": "2026",
      "cover": "images/dunes.jpg",
      "coverAlt": "Aerial view of dunes in raking amber light",
      "video": "https://vimeo.com/[video-id]",
      "summary": "[Two or three sentences on the brief, the visual approach and what you shot it on.]",
      "stills": [
        {
          "image": "images/dunes.jpg",
          "alt": "Dunes in raking light"
        },
        {
          "image": "images/smoke.jpg",
          "alt": "Side-lit smoke"
        },
        {
          "image": "images/stairs.jpg",
          "alt": "Light shaft in a stairwell"
        }
      ]
    },
    {
      "slug": "quiet-weather",
      "title": "Quiet Weather",
      "client": "[Client]",
      "role": "Cinematography & Edit",
      "year": "2025",
      "cover": "images/fog.jpg",
      "coverAlt": "Tree trunks fading into fog",
      "video": "https://vimeo.com/[video-id]",
      "summary": "[Two or three sentences on the brief, the visual approach and what you shot it on.]",
      "stills": [
        {
          "image": "images/fog.jpg",
          "alt": "Forest in fog"
        }
      ]
    },
    {
      "slug": "salt-hour",
      "title": "Salt Hour",
      "client": "[Client]",
      "role": "Director of Photography",
      "year": "2025",
      "cover": "images/horizon.jpg",
      "coverAlt": "Low sun on a dark sea horizon",
      "video": "https://vimeo.com/[video-id]",
      "summary": "[Two or three sentences on the brief, the visual approach and what you shot it on.]",
      "stills": [
        {
          "image": "images/horizon.jpg",
          "alt": "Sun on the horizon"
        }
      ]
    },
    {
      "slug": "night-drive",
      "title": "Night Drive",
      "client": "[Client]",
      "role": "Editor",
      "year": "2024",
      "cover": "images/road.jpg",
      "coverAlt": "Red tail-light streaks at night",
      "video": "https://vimeo.com/[video-id]",
      "summary": "[Two or three sentences on the brief, the visual approach and what you shot it on.]",
      "stills": [
        {
          "image": "images/road.jpg",
          "alt": "Night road"
        }
      ]
    },
    {
      "slug": "night-swimmers",
      "title": "Night Swimmers",
      "client": "[Client]",
      "role": "Director of Photography",
      "year": "2024",
      "cover": "images/pool.jpg",
      "coverAlt": "Overhead view of a swimmer's shadow over pool caustics",
      "video": "https://vimeo.com/[video-id]",
      "summary": "[Two or three sentences on the brief, the visual approach and what you shot it on.]",
      "stills": [
        {
          "image": "images/pool.jpg",
          "alt": "Pool caustics"
        }
      ]
    },
    {
      "slug": "interior-day",
      "title": "Interior, Day",
      "client": "[Client]",
      "role": "Cinematography & Edit",
      "year": "2023",
      "cover": "images/window.jpg",
      "coverAlt": "Silhouette of a figure against a window with blinds",
      "video": "https://vimeo.com/[video-id]",
      "summary": "[Two or three sentences on the brief, the visual approach and what you shot it on.]",
      "stills": [
        {
          "image": "images/window.jpg",
          "alt": "Figure at a window"
        }
      ]
    }
  ]
};
