# Actual testing results

Tested 16 October 2026 using desktop Chrome controlled by Playwright. Source checks use Node.js. No runtime libraries are required by the delivered app.

## Redesign verification: 54 acceptance checks and 21 content checks passed

The update reran the 25-check application regression suite below and passed a 29-check structured-reader suite. The reader suite visits all **47 topics**, submits their Quick Checks, opens all **nine Quick Reviews** and all **nine final-quiz gateways**. It tests the two-attempt wrong-answer path, refresh persistence, recovered history, manual completion, active-topic resume, automatic completion gating and exclusion of unviewed cards.

All nine lesson readers and their Quick Review screens were checked for document overflow at **1024px tablet** and **390px phone** widths. Desktop coverage uses 1500px. The mobile outline starts collapsed and expands on request. Desktop and phone screenshots were visually inspected; cards, equations, tables, feedback and topic buttons remain separated.

A version-1 backup was imported into the update. Its existing session objects were compared for exact equality, original question bookmarks survived, and two previously read section groups became nine completed cards. An old section-index bookmark remained usable. A new backup then round-tripped completed cards and a partially attempted Quick Check; the first rejected choice stayed disabled after restoring it.

The original ten content checks still pass. Eleven additional checks in `validate-study.cjs` verify structured data for every lesson, all 47 original-topic coverage mappings, no paragraph/HTML card blobs, bullet lengths (maximum 25 words), short worked steps, definitions/formulas/examples, complete comparison tables, stable card IDs and source references, 47 valid Quick Checks, absence of duplicate instructional cards, and absence of broken replacement characters.

Runtime compilation records were deep-compared against the pre-update database and are unchanged. Raw suite summaries are saved in `tests/browser-results.json` and `tests/redesign-results.json`. `REDESIGN.md` describes the migration and completion rules. The 29-check subsection below records the earlier baseline test run; the current update specifically reran its core 25 checks and the 29 redesign checks.

Two final focused checks also passed: the redesigned reader launches directly from `file://` with its phone outline initially collapsed; and mistake/revision history orders resumed answers by answer time, so an older session answered later takes precedence over an earlier result in a newer session.

## Browser suite: 29 checks passed

1. New dashboard starts with zero progress.
2. First incorrect response shows a hint without revealing the solution.
3. Refresh preserves the consumed attempt and disables the rejected choice.
4. Second incorrect response reveals the correct answer and explanation.
5. Correct second response is recorded as recovered.
6. A five-question session reports three first-attempt correct, one recovered and one unresolved.
7. My Mistakes retains both recovered and unresolved questions.
8. Compilation practice resumes the same session and exact question after refresh.
9. Export produces a JSON backup containing attempts and bookmarks.
10. The exported backup passes validation and restores through the import interface.
11. Flagged source question 111 has no graded-practice control.
12. Random practice over a 126-item bank includes exactly 115 resolved questions and excludes question 111 and the other flagged items.
13–18. Dashboard, Chapters, Weak Topics, Revision, Statistics and Settings render without the app's error state.
19. Search returns real linked destinations.
20–24. At a 390-pixel viewport, Dashboard, Compilation, lesson reader, Statistics and Settings have no horizontal document overflow.
25. No browser JavaScript errors were recorded during the suite.

Four additional checks passed: direct `file://` launch opens the dashboard; a malformed backup is rejected; light-theme preferences survive refresh; an original source-page image opens successfully in the reader.

The desktop dashboard and mobile dashboard were rendered to screenshots and visually inspected. Page images were checked through extraction/rendered source review. The website includes no fake progress values.

## Content checks: 10 passed

Run `node validate.cjs` from this folder. It verifies chapter/lesson counts; stable bank IDs and per-bank counts; four ordered choices and valid lesson/page mapping; equality of both retained banks; exclusion of unresolved records; 45 separate lesson questions with valid keys and feedback; existence of all PDFs and 129 page images; section/page references; JSON/browser data agreement; and the arithmetic detecting question 111's incorrect choices.

All 252 inline source keys were additionally cross-checked against their respective final answer keys during extraction. Their agreement does not resolve defective source questions: those records are explicitly excluded from grading.

## Verification limits

- In this sandbox, Chrome's download event was canceled by the environment. Export's generated Blob contents were captured and then restored through the real import interface. The backup payload and restore behavior passed; saving a download through a normal user's browser was not independently verified here.
- Hosted owner authentication and every possible browser/OS combination were not exercised by the local suite.
- No student performance data is shipped in the source or deployment. Tests use isolated browser contexts.
- Browser testing verifies application behavior; it is not an independent expert scientific certification. Source ambiguities are listed in `COVERAGE.md` and in the app.
