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
    "location": "Herzliya",
    "brandSuffix": "Production",
    "lede": "visuals creator",
    "tagline": "Tavor Production",
    "years": "2022 — 2026",
    "email": "tavor2005@gmail.com",
    "contactLine": "Feel free to contact me",
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
        "text": " and give every brief a point of view."
      }
    ],
    "social": [
      {
        "label": "WhatsApp",
        "url": "https://wa.me/972529682466"
      },
      {
        "label": "Instagram",
        "url": "https://www.instagram.com/tavor_production"
      },
      {
        "label": "TikTok",
        "url": "https://www.tiktok.com/@tavor_m"
      }
    ],
    "about": {
      "photo": "images/about-tavor.jpg",
      "photoAlt": "Tavor on a staircase landing, shooting down with a camera",
      "photoCaption": "[Photo of you]",
      "heading": "I'm Tavor",
      "bio": [
        "I shoot, edit and create for artists, brands and anyone with an idea worth showing.",
        "Music videos, short clips for Instagram and TikTok, promos for businesses, and edits I make just because. Tell me what you have in mind and we'll build it together."
      ],
      "location": "Herzliya",
      "available": "Music · Sport · Business · Art · Stills",
      "cta": "Say hello"
    },
    "ledeAccent": "creator"
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
      "layout": "video",
      "carousel": true,
      "font": "gothic"
    },
    {
      "slug": "stills",
      "title": "Stills",
      "layout": "grid",
      "carousel": true,
      "foot": { "text": "For more", "name": "Instagram", "href": "https://www.instagram.com/tavor_production", "icon": "instagram" },
      "blurb": "",
      "items": [
        {
          "image": "images/stills/s19.jpg",
          "ratio": "1800/1200",
          "alt": "Singer in a Favre jersey facing a crowd under blue light",
          "caption": ""
        },
        {
          "image": "images/stills/s04.jpg",
          "ratio": "1800/1200",
          "alt": "Two basketball players going up for the tip-off",
          "caption": ""
        },
        {
          "image": "images/stills/s02.jpg",
          "ratio": "1800/1400",
          "alt": "Smiling young man in a white t-shirt against a pale wall",
          "caption": ""
        },
        {
          "image": "images/stills/s11.jpg",
          "ratio": "1800/1200",
          "alt": "Man spraying graffiti on a colourful wall",
          "caption": ""
        },
        {
          "image": "images/stills/s17.jpg",
          "ratio": "1800/1200",
          "alt": "Singer in a red and black jacket reaching toward the crowd",
          "caption": ""
        },
        {
          "image": "images/stills/s09.jpg",
          "ratio": "1800/1200",
          "alt": "Player in yellow holding the ball by a dark door",
          "caption": ""
        },
        {
          "image": "images/stills/s14.jpg",
          "ratio": "1800/931",
          "alt": "Monkey holding a water bottle on a hillside",
          "caption": ""
        },
        {
          "image": "images/stills/s10.jpg",
          "ratio": "1800/1364",
          "alt": "Young man in a white shirt by a pool with a pink flamingo float",
          "caption": ""
        },
        {
          "image": "images/stills/s05.jpg",
          "ratio": "1800/1280",
          "alt": "Basketball game under way in a school gym",
          "caption": ""
        },
        {
          "image": "images/stills/s13.jpg",
          "ratio": "1800/1200",
          "alt": "Woman cooking in a street kitchen",
          "caption": ""
        },
        {
          "image": "images/stills/s18.jpg",
          "ratio": "1800/1445",
          "alt": "Singer in a Favre jersey seen from behind, black and white",
          "caption": ""
        },
        {
          "image": "images/stills/s07.jpg",
          "ratio": "1800/1200",
          "alt": "Basketball player drinking from a water bottle",
          "caption": ""
        },
        {
          "image": "images/stills/s12.jpg",
          "ratio": "1800/1200",
          "alt": "Person playing guitar on a wooden porch among trees",
          "caption": ""
        },
        {
          "image": "images/stills/s03.jpg",
          "ratio": "1800/1200",
          "alt": "Man in a prayer shawl reading at a lectern",
          "caption": ""
        },
        {
          "image": "images/stills/s06.jpg",
          "ratio": "1800/1725",
          "alt": "Players stretching with their arms raised",
          "caption": ""
        },
        {
          "image": "images/stills/s20.jpg",
          "ratio": "1800/1200",
          "alt": "Performer on a dark stage in blue light with phones raised",
          "caption": ""
        },
        {
          "image": "images/stills/s08.jpg",
          "ratio": "1800/1200",
          "alt": "Player in a yellow jersey on court with the bench behind him",
          "caption": ""
        },
        {
          "image": "images/stills/s16.jpg",
          "ratio": "1800/1200",
          "alt": "Wooden structures by the water seen through leaves",
          "caption": ""
        },
        {
          "image": "images/stills/s15.jpg",
          "ratio": "1800/1587",
          "alt": "Figure climbing red steps among trees",
          "caption": ""
        },
        {
          "image": "images/stills/s01.jpg",
          "ratio": "1800/1200",
          "alt": "Soldier in a beret beside an Israeli flag",
          "caption": ""
        }
      ],
      "font": "mono"
    },
    {
      "slug": "business",
      "title": "Promo",
      "layout": "vertical",
      "carousel": true,
      "blurb": "",
      "items": [
        {
          "video": "https://youtu.be/PqyONhNPsjY",
          "ratio": "9/16",
          "image": "images/video/promo-interview.jpg",
          "loop": "videos/loops/promo-interview.mp4",
          "alt": "A woman laughing mid-interview on a basketball court",
          "caption": ""
        },
        {
          "video": "https://youtube.com/shorts/P1PwGRQwjCA",
          "image": "images/video/promo-warehouse.jpg",
          "loop": "videos/loops/promo-warehouse.mp4",
          "alt": "A warehouse manager in an orange vest talking to camera",
          "caption": ""
        },
        {
          "video": "https://youtu.be/qFG7CK7zIZY",
          "image": "images/video/promo-command.jpg",
          "loop": "videos/loops/promo-command.mp4",
          "alt": "A young man and woman answering a street question",
          "caption": ""
        },
        {
          "video": "https://youtube.com/shorts/xXHyCzSY3eI",
          "image": "images/video/promo-recovery.jpg",
          "loop": "videos/loops/promo-recovery.mp4",
          "alt": "Pro Recovery boots being laid out in a martial arts hall",
          "caption": ""
        }
      ],
      "font": "mono"
    },
    {
      "slug": "creative",
      "title": "Edits",
      "layout": "vertical",
      "carousel": true,
      "more": { "eyebrow": "More on", "name": "TikTok", "handle": "@tavor_m", "href": "https://www.tiktok.com/@tavor_m", "icon": "tiktok" },
      "blurb": "",
      "items": [
        {
          "video": "https://youtube.com/shorts/8T4l5FpoOkY",
          "image": "images/video/edits-hashisha.jpg",
          "loop": "videos/loops/edits-hashisha.mp4",
          "alt": "A basketball player shooting over a defender",
          "caption": ""
        },
        {
          "video": "https://youtube.com/shorts/NSqNsbH6660",
          "image": "images/video/edits-adir.jpg",
          "loop": "videos/loops/edits-adir.mp4",
          "alt": "A basketball player in yellow driving between two defenders",
          "caption": ""
        }
      ],
      "font": "gothic"
    },
    {
      "slug": "social",
      "title": "Social",
      "layout": "vertical",
      "carousel": true,
      "blurb": "Short, vertical videos made for Instagram and TikTok.",
      "items": [
        {
          "video": "https://youtu.be/EFBuUVs1IhU",
          "image": "images/video/social-wine-tasting.jpg",
          "loop": "videos/loops/social-wine-tasting.mp4",
          "alt": "Two men tasting white wine, one pouring from a bottle",
          "caption": ""
        },
        {
          "video": "https://youtube.com/shorts/-03jDfgdvZo",
          "image": "images/video/zaza-woman.jpg",
          "loop": "videos/loops/zaza-woman.mp4",
          "alt": "זזה מטורף עם אישה",
          "caption": ""
        },
        {
          "video": "https://youtube.com/shorts/z2NK7m4g7Dk",
          "image": "images/video/social-night-training.jpg",
          "loop": "videos/loops/social-night-training.mp4",
          "alt": "A coach in a white shirt calling a night training session",
          "caption": ""
        },
        {
          "video": "https://youtube.com/shorts/21VrdcbH-iU",
          "image": "images/video/social-grapes.jpg",
          "loop": "videos/loops/social-grapes.mp4",
          "alt": "Hands tipping crushed grapes into a steel tank",
          "caption": ""
        },
        {
          "video": "https://youtube.com/shorts/cHRI4mekWAg",
          "image": "images/video/social-basketball.jpg",
          "loop": "videos/loops/social-basketball.mp4",
          "alt": "A basketball player dribbling in a gym",
          "caption": ""
        },
        {
          "video": "https://youtube.com/shorts/cOL_9H7WTyo",
          "image": "images/video/social-pressing.jpg",
          "loop": "videos/loops/social-pressing.mp4",
          "alt": "Pressed grape skins in close-up",
          "caption": ""
        },
        {
          "video": "https://youtube.com/shorts/84e0p0KcbvQ",
          "image": "images/video/social-wine-glass.jpg",
          "loop": "videos/loops/social-wine-glass.mp4",
          "alt": "A man in a patterned shirt holding a glass of wine",
          "caption": ""
        }
      ],
      "font": "gothic"
    }
  ],
  "hero": [
    {
      "slot": "c",
      "topic": "business",
      "image": "images/video/promo-cover.jpg",
      "alt": "A woman talking to camera in a basketball hall"
    },
    {
      "slot": "a",
      "topic": "music",
      "image": "images/music-hero.jpg",
      "alt": "High-contrast black and white frame of a rapper with a blurred figure behind him"
    },
    {
      "slot": "b",
      "topic": "stills",
      "image": "images/stills-cover.jpg",
      "alt": "A performer on a dark stage in blue light, with phones raised toward him"
    },
    {
      "slot": "d",
      "topic": "creative",
      "image": "images/video/edits-cover.jpg",
      "alt": "A basketball player shooting over a defender"
    },
    {
      "slot": "e",
      "topic": "social",
      "image": "images/video/social-cover.jpg",
      "alt": "White wine being poured into a glass"
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
