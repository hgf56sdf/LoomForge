# Structured learning redesign

Updated 16 October 2026. This is an update to the existing HTML/CSS/JavaScript application.

## All nine lessons converted

| Lesson | Topics | Presentation |
|---|---:|---|
| Introduction to Acids and Bases | 5 | Properties table; individual model cards; proton pairs; Lewis examples; ionizable-proton table |
| Strengths of Acids and Bases | 5 | Strength comparison; staged ionization; Kₐ/Kᵦ tables; calculations; conjugate-strength rules |
| Reactions Between Acids and Bases | 6 | Neutralization; titration procedure; numbered calculations; indicator table; hydrolysis; buffer cards |
| Hydrogen Ion Concentration and pH | 4 | K_w; log rules; numbered conversions; everyday-scale table |
| Oxidation and Reduction | 5 | Loss/gain comparison; assignment rules; agent table; molecular examples; annotation reminders |
| Balancing Redox Equations | 4 | Numbered methods; acidic/basic examples; source corrections; practice equations |
| Voltaic Cells | 6 | Circuit roles; electrode comparison; hydrogen reference; notation; voltage steps; complete potential table |
| Batteries | 6 | Component tables; primary/secondary comparison; electrode equations; fuel cells; corrosion; protection |
| Electrolysis | 6 | Cell-type comparison; gas ratios; molten/brine contrast; aluminum; plating |
| **Total** | **47** | **230 cards, 47 Quick Checks, 9 Quick Reviews** |

The previous 47 topic groups map explicitly to the new cards in `data/redesign-coverage.json`. Larger concepts are separated into cards with one focus: for example water autoionization, Arrhenius acid, Arrhenius base and ammonia each have separate cards. Comparisons use tables; calculation steps are numbered; formulas use a dedicated component. Original diagrams, tables, handwritten pages and exercises remain available in collapsed source references. Dense previous lesson paragraphs are removed from runtime lesson sections.

Card types: concept, definition, comparison, formula, example, calculation, important note and summary. Each card has a stable ID and source-page references. Quick Review uses independently authored essential notes rather than truncating paragraphs at runtime. It does not mark the original cards complete.

## Existing features retained

Dashboard, chapter overview, full lesson quizzes, Compilation Questions, two-attempt feedback, mistakes, weak-topic practice, spaced revision, statistics, bookmarks, search, preferences and backup/restore remain connected to the original application. The full 45-question lesson-quiz bank is unchanged. The 252 compilation records are deep-compared with the prior curriculum: wording, choice order, formulas, answers, source IDs, page references and validation flags are unchanged.

Quick Checks are additional questions with IDs beginning `quick-`. They have the same two-attempt rule and save partial attempts. They participate in mistake history, recovery, topic statistics and revision. Retrying creates another historical session. They do not replace or automatically pass the final lesson quiz.

## Progress migration

- IndexedDB name, object store and schema number are unchanged.
- Existing state is extended, not replaced.
- Old completed reading groups map to their corresponding completed cards.
- Old lesson/section bookmarks still open the mapped topic.
- New card bookmarks and the last active topic persist.
- Existing quiz/compilation sessions, answer attempts and bookmarks retain their IDs and values.
- Version-1 backups import; new backups include card completion and Quick Check attempts.
- Reading completion and quiz mastery remain separate measures.

The app can preserve browser data only at the same browser storage origin. If launching at a different address or device, use Export Study Data in the original copy and Import Study Data in the update. No student data is embedded in the downloadable application.

## Completion behavior

Each visible card accumulates qualifying focused time. Six seconds plus a completed topic Quick Check permits automatic reading completion. A fast scroll alone or merely opening a topic does not complete cards. Only cards actually viewed qualify; hidden topics cannot accrue time. Read checkboxes and Mark topic read allow explicit manual completion. This is a transparent reading signal, not a claim that eye movement or comprehension can be measured.

All earlier source ambiguities remain documented and excluded from automatic grading. See `COVERAGE.md`.
