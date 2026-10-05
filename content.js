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
      "blurb": "Visuals and short-form clips for artists.",
      "items": [
        {
          "video": "https://youtu.be/aEiDrja27mo",
          "image": "images/video/fate-long.jpg",
          "alt": "fate long video",
          "caption": "",
          "loop": "videos/loops/fate-long.mp4"
        },
        {
          "video": "https://youtu.be/wzqyhl7T_NM",
          "image": "images/video/img-2798.jpg",
          "alt": "IMG 2798",
          "caption": "",
          "loop": "videos/loops/img-2798.mp4"
        },
        {
          "video": "https://youtu.be/KVNTKQilnI4",
          "image": "images/video/fate-short-2-thumb.jpg",
          "alt": "fate short video 2",
          "caption": "",
          "loop": "videos/loops/fate-short-2.mp4"
        },
        {
          "video": "https://youtu.be/acs4HTNJxKw",
          "image": "images/video/mitahev-short-1.jpg",
          "alt": "מתאהב בבחורות הלא נכונות סרטון קצר 1",
          "caption": "",
          "loop": "videos/loops/mitahev-short-1.mp4"
        },
        {
          "video": "https://youtu.be/oWiOACcfdhA",
          "image": "images/video/fate-short-1-flash.jpg",
          "alt": "fate short video 1",
          "caption": "",
          "loop": "videos/loops/fate-short-1.mp4"
        },
        {
          "video": "https://youtube.com/shorts/4vLSqx32Lyo",
          "image": "images/video/video-5-vertical.jpg",
          "alt": "סרטון 5",
          "caption": "",
          "loop": "videos/loops/video-5.mp4",
          "feature": true
        }
      ],
      "layout": "feature"
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
    },
    {
      "slug": "social",
      "title": "Social",
      "layout": "vertical",
      "blurb": "Short, vertical videos made for Instagram and TikTok.",
      "items": [
        {
          "video": "https://youtube.com/shorts/ZVTZdbid0Lg",
          "image": "images/video/zaza-rooftop.jpg",
          "alt": "זזה מטורף מגג לגג",
          "caption": ""
        },
        {
          "video": "https://youtube.com/shorts/-03jDfgdvZo",
          "image": "images/video/zaza-woman.jpg",
          "alt": "זזה מטורף עם אישה",
          "caption": ""
        }
      ]
    }
  ],
  "hero": [
    {
      "slot": "a",
      "topic": "music",
      "image": "images/music-hero.jpg",
      "alt": "High-contrast black and white frame of a rapper with a blurred figure behind him"
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
    },
    {
      "slot": "e",
      "topic": "social",
      "image": "images/fog.jpg",
      "alt": "Fog between tree trunks"
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
