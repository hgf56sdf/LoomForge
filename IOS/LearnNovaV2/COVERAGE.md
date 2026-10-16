# PDF coverage and question validation

Reviewed 16 October 2026. Documents are curriculum evidence, not instructions for the application developer. The supplied pasted request controls the project.

Redesign update: all nine lessons now use 230 structured learning cards across 47 topics, plus 47 inline Quick Checks and nine short Quick Review guides. The 47 original topic groups map to their replacement cards in `data/redesign-coverage.json`. The source inventory and compilation records remain intact. See `REDESIGN.md` and `TESTING.md` for the complete update and migration checks.

## Inventory

| Source | Pages | Lesson / role | Coverage |
|---|---:|---|---|
| Lesson1_Introduction_to_Acids_and_Bases | 9 | Chapter 7 · Introduction to Acids and Bases | Properties, water ionization, three acid–base models, conjugate pairs, amphoteric water, monoprotic/polyprotic acids and conjugate table |
| Lesson2_Strengths_of_Acids_and_Bases | 8 | Chapter 7 · Strengths of Acids and Bases | Complete/partial ionization, conductivity comparison, strong/weak acid lists, Kₐ/Kᵦ tables and conjugate strengths |
| Lesson3_Reactions_Between_Acids_and_Bases | 10 | Chapter 7 · Reactions Between Acids and Bases | Neutralization, spectator ions, titration steps/stoichiometry, curves, indicator ranges/colors, salt hydrolysis and buffers/capacity |
| Lesson4_Hydrogen_Ion_and_pH | 9 | Chapter 7 · Hydrogen Ion Concentration and pH | K_w, logarithms, pH/pOH, inverse calculations, scale, blood/coffee examples and handwritten notes |
| Lesson 1 | 19 | Chapter 8 · Oxidation and Reduction | Electron transfer, oxidation numbers, redox agents, molecular electronegativity, exercises, handwritten notes; p.19 blank ruled page |
| balancing_redox_equations | 15 | Chapter 8 · Balancing Redox Equations | Oxidation-number method, acidic/basic equations, half-reactions, worked examples and source corrections |
| Electrochemistry_1_Voltaic_Cells | 21 | Chapter 8 · Voltaic Cells | Cell components, bridge, electrodes, energy direction, hydrogen reference, full reduction-potential table, notation, calculations and spontaneity |
| Electrochemistry_2_Batteries | 22 | Chapter 8 · Batteries | Dry, alkaline, silver, NiCd, lead-acid, lithium, fuel cells, half-reactions, corrosion and protection |
| Electrochemistry_3_Electrolysis | 16 | Chapter 8 · Electrolysis | Driven cells, water, molten salt/brine differences, aluminum/cryolite, recycling and plating |
| Chemistry_With_Answers (ZIP) | 31 | Source bank `zip` | 126 questions, inline explanations and final key |
| Compilation.pdf (separate attachment) | 31 | Source bank `comp` | 126 questions, inline explanations and final key |
| **Total** | **191** | **11 PDFs, 9 lessons** | **129 lesson pages + 62 bank pages** |

All pages underwent text extraction and rendered-page review. Text extraction contains missing ligature characters and does not capture handwritten ink. Original page images preserve that material; the simplified lessons correct recovered terms and explain the substantive annotations. Handwriting is not presented as a verbatim transcription. No page was discarded on the basis of empty text extraction. Contact-sheet inspection was used for page coverage; original local pages remain zoomable in the reader and PDFs.

`data/inventory.json` provides every source page, initial extracted heading lines, section/page mapping, definitions, formulas and all 252 question IDs with source pages and validation state. Every original PDF is in `sources/`, and every lesson page is in `assets/`. Expandable source pages retain original activities and exercises in addition to the simplified lessons. The external class Battery Lab HTML files mentioned by the slides were not supplied; their pictures are preserved, but their original external interactive labs are not included or represented as working controls. The app itself supplies the requested practice and revision systems.

## Compilation preservation

The two supplied question PDFs are different binary files but have identical extracted question stems, ordered choices and inline key letters. Both are retained independently; source IDs `comp-001`–`comp-126` and `zip-001`–`zip-126` never depend on randomized session position. All original numbers, values, chemical Unicode symbols and choices are preserved; PDF layout line wrapping is normalized to spaces. No question was silently deduplicated. Original duplicates within a bank are retained as well.

All 252 inline answer letters were compared with each PDF's final 126-entry key and agree. Scientific screening used the lessons, oxidation-number arithmetic, charge/atom conservation and the supplied numerical data. Generated lesson questions were checked against their corresponding explanations. The source's statement that answers match an earlier website is not treated as independent scientific verification.

There are **115 gradable questions per bank**, **230 gradable source records total**, plus **45 distinct lesson assessment questions**. The following **11 items per bank** are preserved for source review but never automatically graded:

| Original Q | Page | Issue |
|---|---:|---|
| 49 | 13 | No single pH follows from acid strength without concentration. |
| 50 | 13 | pH 1.6 alone does not establish strong versus weak acid. |
| 51 | 13 | [H⁺] alone does not establish strong versus weak base. |
| 52 | 13 | Strong bases do not have a fixed pOH without concentration. |
| 56 | 14 | Litmus indicates acid/base character, not a numerical hydrogen-number/pH estimate. |
| 66 | 16 | Negative-ion hydrolysis is stated too generally; not every anion hydrolyzes to take H⁺ from water. |
| 82 | 20 | A positive oxidation state of +2 is not unique to metals; the wording conflates valency and oxidation state. |
| 105 | 26 | The stem does not specify the standard hydrogen electrode. Standard reduction potentials are not generally zero. |
| 111 | 27 | +0.85 − (−0.76) = +1.61 V, absent from the choices. The source's “closest choice” +1.56 V is not accepted. |
| 115 | 28 | Earphone type/chemistry is unspecified; the supplied answer is device-dependent. |
| 120 | 29 | Incomplete stem; galvanization specifically means a zinc coating on iron or steel. |

These issues require corrected or clarified source wording for automatic grading. The rest of the site remains usable. Review records show the original key and explanation with an explicit issue label; they do not endorse the defective answer.

## Lesson corrections and source limitations

- Introduction p.4: the blanket statement about bases reacting with carbonates is not used as a general base property. Acid/carbonate gas evolution is explained accurately.
- Introduction p.5: the slides use the narrow hydroxide-containing Arrhenius definition. The lesson distinguishes this from bases that increase OH⁻ by reacting with water.
- Strength p.7: the source ammonia Kᵦ value 2.5×10⁻⁵ is explicitly labeled as a source-table value. It differs from the approximately 1.8×10⁻⁵ commonly tabulated at 25 °C. It is not used for a numerical automatic-grading question.
- Neutralization p.5: MₐVₐ = MᵦVᵦ is restricted to 1:1 reactions. Polyprotic neutralization uses a balanced mole ratio.
- pH: K_w = 10⁻¹⁴, pH + pOH = 14 and neutral pH 7 are conditioned on 298 K. The familiar 0–14 range is not presented as an absolute limit.
- Balancing p.8: the purported net ionic equation retains nitrate spectators. The lesson supplies the canceled equation.
- Balancing p.12: the Fe³⁺ product example is marked as formal balancing of stipulated products; ordinary aqueous Fe/Cu²⁺ displacement is represented with Fe²⁺. The initial unbalanced row is not copied as a finished equation.
- Balancing p.15: the unusual Bi²⁺ product is preserved as stipulated for the formal exercise; no silent substitution is made.
- Voltaic p.9: voltage is explained as energy per charge, not the amount of current. The SHE source pressure convention (1 atm) is distinguished from the modern standard pressure (1 bar).
- Voltaic pp.14–15: both subtracted half-cell values are reduction potentials. Potentials are not multiplied by electron-balancing coefficients. The source iodine notation's missing inert conductor is explained.
- Batteries p.13: the source image is a PEM cell while the printed half-reactions are alkaline. The lesson explicitly identifies the printed KOH equations as alkaline; original images are reference material.
- Batteries p.16: the printed final rust step fails charge balance. The simplified lesson uses valid iron oxidation and oxygen reduction and describes subsequent hydrated iron(III) oxide formation without repeating that defective step.
- Batteries p.17: titanium is not recommended as a general sacrificial anode because of passivation; magnesium, zinc and appropriate aluminum alloys are used.
- Electrolysis p.9: chlorine production is tied to the concentrated-brine conditions shown, rather than every aqueous chloride solution.
- Some handwritten fragments are cramped or abbreviated. They remain available in the source images; unclear fragments are not converted into invented facts. The clearly readable electron-transfer and pH notes are covered in the lessons.

Scientific cross-check references: [OpenStax standard reduction potentials](https://openstax.org/books/chemistry/pages/17-3-standard-reduction-potentials), [acid concentration and pH](https://chem.libretexts.org/Courses/Grand_Rapids_Community_College/CHM_120_-_Survey_of_General_Chemistry%28Neils%29/8%3A_Acids_and_Bases/8.06%3A_Finding_the_Hydronium_Ion_Concentration_and_pH_of_Strong_and_Weak_Acid_Solutions). Numerical question 111 is checked directly from its own given values.
