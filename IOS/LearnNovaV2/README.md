# Learnova · Chemistry

Pure HTML, CSS and JavaScript. No framework, backend, account or runtime AI is required for local use. A private hosted draft was registered, but source synchronization was blocked by the execution environment; no hosted deployment is claimed.

## Launch

Open `index.html` in Chrome or Edge. For a stable browser storage origin, serve this folder instead:

```powershell
python -m http.server 8000
```

Then open `http://localhost:8000`. Keep using the same browser and address. Browser storage is specific to that address; use Settings → Export Study Data before moving between the local and hosted copies. Clearing browser/site data removes progress.

The site bundles all educational material and source PDFs locally. It makes no AI requests or third-party font/library requests. An internet connection is not needed for the local copy.

## Included

- Chapter 7: four acid–base lessons.
- Chapter 8: five redox and electrochemistry lessons.
- 45 development-authored lesson quiz questions, separate from compilation questions.
- 47 short topics, 230 structured learning cards, 47 inline Quick Checks and nine Quick Review guides.
- Two original 126-question source banks (252 records). Both banks have matching stems, choice order and keys; duplicates remain separate and traceable.
- 230 automatically graded compilation records. Eleven problematic questions per source bank are retained for inspection and excluded from grading.
- Two-attempt quizzes, hints, recoveries, mistake history, topic practice, spaced revision, bookmarks, search, statistics, appearance preferences and validated JSON backups.
- All 129 lesson source pages as local images, preserving diagrams, tables and handwritten notes. All eleven PDFs (191 pages total) are bundled.

## Source and maintenance

`data/curriculum.json` is the editable curriculum database. `data/curriculum.js` is the same object assigned to `window.CURRICULUM`, permitting launch from a local file without a fetch request. Update both together. Each lesson’s `study.topics` contains typed cards and its Quick Check; `study.review` contains the short revision guide. `data/quizzes.js` contains the unchanged full lesson assessments. `data/inventory.json` records source inventory; `data/redesign-coverage.json` maps every original topic group to its replacement cards. Stable IDs must be retained when updating content.

`reader.js` renders cards, comparisons, formulas, numbered examples and the inline checks. `reader.css` scopes the learning-interface design. Only one topic is rendered at a time; the original PDF pages are optional collapsed references. On phones, the topic outline starts collapsed.

Reading completion is per card. A card automatically completes after six seconds of qualifying visible time (at least 45% visible in an active browser tab) and a completed topic Quick Check. Viewing time alone never completes it. Read checkboxes and Mark topic read provide manual confirmation. Quiz mastery remains separate. Review mode does not automatically mark learning cards read.

Existing IndexedDB and version-1 backups are retained. On first use, each old read section maps to all its corresponding cards. Old topic-index bookmarks still open their topic; full quiz and compilation IDs are unchanged. Sessions, attempts, dates, active practice and bookmarks are not cleared. Use the same browser and address to retain storage automatically. When changing address or moving from a hosted copy, export from the old copy and import into the update.

`app.js` implements IndexedDB persistence and the shared session engine. An IndexedDB database named `learnova-study`, schema 1, stores a state record in the `study` object store. Future schema upgrades should add or migrate records without deleting the database. Preferences alone use LocalStorage. A paused attempt retains its choices, hint state and remaining attempt. Deliberately starting or retaking a quiz creates a new historical session.

Accuracy denominators use completed question responses, including deliberate retakes; partial first-attempt misses appear in mistake history immediately. Topic classification uses the most recent eight completed responses after three distinct questions have been assessed. Strong ≥80%, Improving 60–79%, Needs Practice 40–59%, Weak <40%. Lesson mastery requires every reading section marked read and ≥80% first-attempt accuracy on the latest completed lesson quiz. Opening a lesson alone never completes it. Reading checkboxes are student confirmations, not proof of comprehension.

Revision is due immediately for unresolved questions, after one day for second-attempt recoveries, and after 3, 6, 12, 24 and at most 30 days for successive first-attempt successes. Historical mistakes are retained after recovery. Weak practice samples existing content; it does not generate runtime questions. Small available pools may repeat between sessions; randomized order is saved in each session.

The dashboard displays lesson and compilation completion separately. There is no opaque weighted overall score. Revision has its own session completion. The default session size is 10 and can be changed in Settings.

Reset controls require confirmation. A compilation reset removes sessions containing compilation records, including mixed revision sessions; export before resetting. Imported backups replace current data only after validation and confirmation.

See `REDESIGN.md` for update details, `COVERAGE.md` for unresolved source issues and `TESTING.md` for actual test results. Run `node validate.cjs` and `node validate-study.cjs` for repeatable content checks. The `dist/` directory, when present, is the deployment copy of the same static files.
