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
    "fullName": "Tavor Production",
    "roles": [
      "Shooting",
      "Editing",
      "Creative"
    ],
    "location": "[City]",
    "brandSuffix": "Production",
    "lede": "shooting, editing & creative",
    "tagline": "FOR EVERY FIELD",
    "years": "2022 — 2026",
    "email": "hello@[yourdomain].com",
    "reelUrl": "https://vimeo.com/[your-showreel-id]",
    "statement": [
      {
        "text": "I shoot, edit and shape content for "
      },
      {
        "text": "artists, brands and anyone with an idea",
        "italic": true
      },
      {
        "text": " — and give every brief a point of view."
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
    ],
    "about": {
      "photo": "",
      "photoAlt": "Portrait of Tavor",
      "photoCaption": "[Photo of you]",
      "heading": "I'm Tavor",
      "bio": [
        "[Two or three sentences about you, in the first person: how you started and what pulls you to this work.]",
        "[One sentence about how you like to work with people.]"
      ],
      "location": "[City]",
      "available": "Music · Sport · Business · Art · Stills",
      "cta": "Say hello"
    }
  },
  "topics": [
    {
      "slug": "music",
      "title": "Music",
      "blurb": "Visuals, live sessions and short promo clips for artists.",
      "items": [
        {
          "image": "images/road.jpg",
          "alt": "Red tail-light streaks at night",
          "caption": "[Project name]"
        },
        {
          "image": "images/pool.jpg",
          "alt": "Swimmer’s shadow over pool caustics",
          "caption": "[Project name]"
        }
      ]
    },
    {
      "slug": "stills",
      "title": "Stills",
      "blurb": "Photography, portraits and still frames.",
      "items": [
        {
          "image": "images/horizon.jpg",
          "alt": "Low sun on a dark sea horizon",
          "caption": "[Project name]"
        },
        {
          "image": "images/fog.jpg",
          "alt": "Tree trunks fading into fog",
          "caption": "[Project name]"
        },
        {
          "image": "images/window.jpg",
          "alt": "Figure against a window with blinds",
          "caption": "[Project name]"
        }
      ]
    },
    {
      "slug": "business",
      "title": "Business",
      "blurb": "Promotional videos that make a brand easy to remember.",
      "items": [
        {
          "image": "images/window.jpg",
          "alt": "Figure against a window with blinds",
          "caption": "[Project name]"
        },
        {
          "image": "images/stairs.jpg",
          "alt": "Light across a concrete stairwell",
          "caption": "[Project name]"
        }
      ]
    },
    {
      "slug": "creative",
      "title": "Creative edits",
      "blurb": "Personal edits, where there are no rules.",
      "items": [
        {
          "image": "images/smoke.jpg",
          "alt": "Side-lit smoke against black",
          "caption": "[Project name]"
        },
        {
          "image": "images/dunes.jpg",
          "alt": "Sand ridges in raking light",
          "caption": "[Project name]"
        },
        {
          "image": "images/fog.jpg",
          "alt": "Fog between tree trunks",
          "caption": "[Project name]"
        }
      ]
    }
  ],
  "hero": [
    {
      "slot": "a",
      "topic": "music",
      "image": "images/window.jpg",
      "alt": "Silhouette of a figure against a window with blinds, hard light on the floor"
    },
    {
      "slot": "b",
      "topic": "stills",
      "image": "images/horizon.jpg",
      "alt": "Low sun on a dark sea horizon"
    },
    {
      "slot": "c",
      "topic": "business",
      "image": "images/road.jpg",
      "alt": "Red tail-light streaks and out-of-focus headlights at night"
    },
    {
      "slot": "d",
      "topic": "creative",
      "image": "images/smoke.jpg",
      "alt": "Smoke lit from the side against black"
    }
  ],
  "projects": [
    {
      "slug": "the-long-field",
      "title": "The Long Field",
      "client": "[Client]",
      "role": "Promo video",
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
      "role": "Creative edit",
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
      "role": "Music video",
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
      "role": "Photography",
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
      "role": "Creative edit",
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
      "role": "Business promo",
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
