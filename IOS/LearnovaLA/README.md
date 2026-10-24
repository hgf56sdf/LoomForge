# Learnova — Language Arts

Offline-ready Grade 12, Unit 1 study and practice site based on the supplied mid-term study guide.

## Start the site

On Windows, open **Launch Learnova.ps1** in PowerShell. Keep the PowerShell window open while studying; press **Ctrl+C** there to stop the local server. The script starts a small local-only web server and opens the site in your browser. It uses Python 3 if installed (the Codex Desktop bundled runtime is detected automatically). Node, an account, an AI API, or an Internet connection is not required.

The service worker caches the application on the first visit. After that, the site can be used offline in the same browser. Progress is saved in that browser using IndexedDB, with a localStorage fallback.

## Included

- Four vocabulary lessons covering all 23 source words, with examples, optional flashcards, and a quick check per lesson.
- Five grammar lessons and seven Reading Skills lessons, each with a quick check and Quick Review.
- The original 35 practice questions, grouped by Literature (15), Vocabulary (10), and Grammar (10), with passages, choices, source pages, hints, explanations, and two attempts.
- Dashboard, progress, mistakes, weak-topic calculation, smart revision, bookmarks, and search.
- Export/import progress backups and a confirmed reset control.
- Responsive dark interface with keyboard focus indicators.

## Project files

- `index.html`, `app.css`, `content.js`, `app.js`: editable source.
- `app.min.js`, `app.min.css`: self-contained production assets loaded by the site; no source maps are shipped.
- `sw.js`, `manifest.webmanifest`: offline cache and install metadata.
- `Launch Learnova.ps1`: local launch method.

The Practice section is a static client-side study aid. Its bundled content can be inspected with browser developer tools; it does not claim answer-key confidentiality.

## Publish with Firebase Hosting

This folder includes `firebase.json` for static Firebase Hosting. From this folder, install/use Firebase CLI, sign in, select your Firebase project, then deploy:

```powershell
npx firebase-tools login
npx firebase-tools use YOUR_FIREBASE_PROJECT_ID
npx firebase-tools deploy --only hosting
```

Firebase returns the live `https://YOUR_FIREBASE_PROJECT_ID.web.app` URL after a successful deploy. A Firebase project and an authenticated CLI session are required.
