[![CC BY-SA 4.0](https://licensebuttons.net/l/by-sa/4.0/88x31.png)](https://creativecommons.org/licenses/by-sa/4.0/) [![DOI](https://zenodo.org/badge/1387295198.svg)](https://doi.org/10.5281/zenodo.22977733)

# DYNAMOS

**Dynamic Neuro-Operational Systems Model**

> **How does a human system operate?**

DYNAMOS is an open, non-diagnostic systems-architecture framework for describing cognitive and behavioral dynamics under **meaning, load, interaction, context, and time**.

It is not a personality test, diagnostic instrument, or performance evaluation. DYNAMOS describes operating architecture rather than categories of people.

**Website:** https://eebyak.github.io/DYNAMOS/

---

## Why the names?

### DYNAMOS

**DYNAMOS** is the name of the **Dynamic Neuro-Operational Systems Model**. It is a constructed name rather than a strict first-letter initialism: **DYNA** from *Dynamic*, **MO** from *Model*, and **S** from *Systems*.

The name was also chosen with the Greek **δύναμις (*dynamis*)** in mind: power, capacity, or potential. That resonance fits the model's central question. DYNAMOS is less concerned with what kind of person someone *is* than with what a human system can do, sustain, shift, recover from, and become under different conditions.

### PRECEPTA

**PRECEPTA** is the name of the **Phenotypic Interface Layer**: the layer between underlying DYNAMOS architecture and patterns that become human-readable in everyday functioning.

During development, the idea behind the name was expressed as **perceived, socially legible cognitive-behavioral patterns inferred from observation, not mechanisms of origin**. The point is that PRECEPTA describes what can become visible at the interface without claiming that the visible pattern reveals one unique hidden cause.

The name also deliberately echoes Latin **_praecepta_**, the plural of **_praeceptum_** — precepts, rules, or instructions — from **_praecipere_**, with the older sense of taking beforehand and the later senses of instructing or prescribing. In DYNAMOS, the resonance is intentionally epistemic: PRECEPTA is what can be apprehended and formulated at the visible interface before the underlying mechanism is fully known.

Together, the two names express the architecture of the framework:

```text
DYNAMOS
underlying dynamic capacity and operating architecture
        ↓
PRECEPTA
patterns apprehended at the phenotypic interface
        ↓
observable functioning in context
```

---

## Current public version

| Component | Version | Status |
| --- | --- | --- |
| DYNAMOS model | `2.0.0` | Canonical public model |
| Questionnaire | `1.2.0-pilot` | Pilot self-reflection instrument |
| PRECEPTA derivation | `0.3.0-pilot` | Public experimental derivation grammar |
| PRECEPTA catalogue | 32 patterns | Canonical descriptions; derivation under empirical testing |

The canonical model contains:

- **26 continuous dimensions**
- **8 architectural categories**
- **32 PRECEPTA patterns**
- **5 PRECEPTA domains**
- a browser-based Explore workflow
- structured participant recognition, rejection, uncertainty, and missing-pattern feedback
- a privacy-minimized research contribution workflow
- a live aggregate research-status page

The current questionnaire uses a **1–10 self-rating scale**. Participants rate their typical functioning over time using the low/high anchors defined for each dimension. The scores are **not population norms or percentiles**.

---

## Model architecture

DYNAMOS separates lower-level operating dimensions from higher-order visible patterns.

### 1. DYNAMOS dimensions

The 26 dimensions are organized into eight architectural categories:

1. **State Dynamics**
   - ET — Entry Threshold
   - MR — Maintenance Robustness
   - XS — Exit Sensitivity
   - RC — Re-Entry Cost

2. **Process & Attention Architecture**
   - IG — Input Gate Tightness
   - MI — Mode Integrity
   - SF — State Friction
   - BC — Baseline Charge

3. **Meaning, Drive & Protection**
   - CD — Complexity Drive
   - PH — Precision Hunger
   - RS — Resonance Strength
   - PA — Protection Activation

4. **Time Dynamics & Recovery**
   - TD — Temporal Depth
   - DHL — Disruption Half-Life
   - RD — Recovery Demand
   - CC — Continuity Carrying

5. **Coupling Load**
   - CL-social
   - CL-cognitive
   - CL-sensory
   - CL-affective

6. **Feedback Sensitivity**
   - FB-S — Social Feedback Sensitivity
   - FB-I — Internal Feedback Sensitivity

7. **Integration Coherence**
   - IC-C — Conceptual Integration
   - IC-A — Affective Integration

8. **Sustainability & Context**
   - RSu — Regulation Sustainability
   - CG — Context Gating

No single dimension defines a trait, diagnosis, or PRECEPTA pattern.

### 2. PRECEPTA

**PRECEPTA** is the phenotypic interface layer between raw dimensions and human-readable interpretation.

The 32 canonical PRECEPTA patterns are organized into five domains:

- Cognitive & Learning
- Attention, Activation & Work Rhythm
- Social & Communication
- Emotional & Self-Regulation
- Sensory & Physical

A PRECEPTA pattern is a possible visible configuration produced by combinations of dimensions. The same outward pattern may arise from more than one underlying architecture. This **degeneracy principle** is deliberate.

Explore the catalogue:

https://eebyak.github.io/DYNAMOS/precepta/

---

## How PRECEPTA derivation works

The PRECEPTA derivation grammar is public and auditable.

https://eebyak.github.io/DYNAMOS/precepta/derivation/

The current derivation model distinguishes:

- **Core conditions** — carry the defining mechanism
- **Supporting conditions** — strengthen and order compatible candidates
- **Modifiers** — alter expression, cost, or sustainability without defining the base pattern
- **Context/dynamic requirements** — identify phenomena that a static score cannot directly establish

Current inference status across the 32 patterns:

- **19 directly inferable**
- **8 context-sensitive**
- **5 not directly inferable from static scores alone**

A pattern that is not directly inferable is not simply “missing a rule.” The model may deliberately withhold it because its defining phenomenon is not measured by the 26 static ratings. Targeted structured follow-up can then test the missing mechanism.

The machine-readable rules are in:

`model/precepta-derivation.json`

Targeted follow-ups are in:

`model/research/precepta-followups.json`

### Development logic

The derivation process is intentionally transparent:

```text
published phenomena and theory
            ↓
underlying operating mechanisms
            ↓
     DYNAMOS dimensions
            ↓
         PRECEPTA
            ↓
 formal derivation rules
            ↓
 participant feedback
            ↓
    empirical revision
```

Published research supplied theoretical foundations and recurring phenomena. Diagnostic categories were treated as phenomenological input rather than causal ground truth.

The exact 26-dimensional architecture, PRECEPTA signatures, and machine-readable derivation grammar are **DYNAMOS model constructions**. They are theory-driven, literature-anchored hypotheses being tested empirically; they are not validated psychometric or diagnostic rules.

---

## Interpretation principles

DYNAMOS interpretation follows several constraints:

- **No single dimension produces a trait.**
- **Every interpretation is conditional and context-sensitive.**
- **Degeneracy is expected:** similar surface patterns may arise from different architectures.
- **Costs are described before benefits.**
- **Withdrawal is not framed as failure.**
- **Regulation, masking, and compensation are not treated as deficits.**
- **Diagnostic labels are optional interpretive annotations, never organizing categories.**
- **Sustainability matters as much as moment-to-moment capacity.**
- **Context is part of the architecture, not noise.**

The model is therefore intended to make dynamics discussable without turning them into fixed categories of people.

---

## Explore your architecture

The public Explore workflow is available at:

https://eebyak.github.io/DYNAMOS/explore/

It:

1. collects 26 self-ratings;
2. applies the current PRECEPTA derivation grammar;
3. presents a provisional whole-profile interpretation;
4. asks participants whether the interpretation is recognized, partly recognized, rejected, or unclear;
5. asks whether an important pattern is missing;
6. uses targeted structured follow-up only where needed;
7. allows the participant to inspect the result before deciding whether to contribute the structured record to research.

The Explore result is a **model hypothesis**, not a diagnosis or statement of ability, suitability, or worth.

---

## Research programme

DYNAMOS is an active model-development programme.

Live public research status:

https://eebyak.github.io/DYNAMOS/research/

The research question is not whether participants can reproduce the model's own scores. The higher-order PRECEPTA interpretation is what is being tested.

**Recognition is useful. Disagreement is useful. Missing patterns are useful.**

Participant disagreement is treated as evidence about the derivation, not as participant error.

### Public statistics

The website displays aggregate statistics only. Pattern-level evidence is suppressed until the configured minimum cell size is reached, and overall recognition percentages are withheld for very small cohorts.

### Research status

DYNAMOS v2.0.0 is:

- theory-driven and literature-anchored;
- publicly specified and inspectable;
- non-diagnostic;
- not yet a validated psychometric instrument;
- without population norms, validated clinical thresholds, confirmed factor structure, or established diagnostic sensitivity/specificity.

The pilot is intended to identify where the model works, where it fails, and which derivation rules require revision.

---

## Privacy and data contribution

The research workflow is designed to collect the **pattern, not the participant's identity**.

The structured contribution schema is designed around:

- 26 scores
- model, questionnaire, and derivation version identifiers
- PRECEPTA patterns presented
- structured recognition feedback
- structured missing-pattern feedback
- targeted follow-up responses where applicable

It does not request a participant's:

- name
- email address
- employer
- diagnosis
- exact location
- free-text biography

Raw contributions are stored privately. The public website receives aggregate research statistics only.

Participation is voluntary. DYNAMOS should not be used as the sole or determinative basis for clinical, employment, educational, legal, access, selection, promotion, dismissal, grading, or other consequential decisions.

Responsible-use statement:

https://eebyak.github.io/DYNAMOS/responsible-use/

---

## Repository structure

The public repository separates model specification, research rules, and presentation.

```text
model/
  dynamos-v2.json                 canonical model metadata
  dimensions.json                 26 dimensions and architectural categories
  precepta.json                   canonical PRECEPTA catalogue
  precepta-derivation.json        experimental machine-readable derivation grammar
  research/
    precepta-followups.json       structured targeted follow-ups
    backend.json                  public research-endpoint configuration

src/
  pages/
    index.astro                   homepage
    model/                        model overview and dimension pages
    precepta/                     PRECEPTA catalogue, pattern pages, derivation method
    explore/                      questionnaire and local interpretation workflow
    research/                     live aggregate research dashboard
    faq/                          explanatory FAQ
    responsible-use.astro         safeguards and use boundaries
```

The website is generated with Astro and published through GitHub Pages.

The machine-readable model is intended to remain the canonical source; website pages and documentation should derive from it rather than become competing definitions.

---

## Citation

### Current release: DYNAMOS v2.0.0

Berkling, K. (2026). *DYNAMOS: Dynamic Neuro-Operational Systems Model* (Version 2.0.0). Zenodo.  
https://doi.org/10.5281/zenodo.22977734

**Version DOI:** `10.5281/zenodo.22977734`

Use this DOI when referring specifically to the archived v2.0.0 release.

### All versions / evolving project

**Concept DOI:** `10.5281/zenodo.22977733`

https://doi.org/10.5281/zenodo.22977733

Use the concept DOI when referring to DYNAMOS as an evolving project across releases.

Machine-readable citation metadata is provided in `CITATION.cff`.

---

## Licensing

DYNAMOS uses a dual-license structure.

### Model and content — CC BY-SA 4.0

The following are licensed under **Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)** unless otherwise noted:

- DYNAMOS model specification
- PRECEPTA
- documentation
- diagrams
- website content

Attribution:

> DYNAMOS — Dynamic Neuro-Operational Systems Model, © 2026 Kay Berkling, licensed under CC BY-SA 4.0.

### Software and website code — GPL-3.0-only

Software implementation, website code, and tool code are licensed under **GPL-3.0-only**.

See the repository license files for the complete legal terms.

---

## Responsible use

DYNAMOS is intended for reflection, communication, education, research, and system-aware design.

It is **not**:

- a diagnostic instrument;
- a clinical test;
- a personality type system;
- a measure of intelligence, competence, or human worth;
- a validated performance predictor;
- a substitute for qualified medical or psychological assessment.

Where diagnosis, treatment, accommodations, or other clinical decisions matter, use appropriate validated instruments and qualified professionals.

---

## Open development

DYNAMOS is intentionally inspectable.

You are encouraged to:

- inspect the model;
- inspect the derivation rules;
- question assumptions;
- test where interpretations fail;
- distinguish literature-supported foundations from model-constructed hypotheses;
- preserve disagreement rather than force a fit.

The current public research programme exists precisely so that the framework can be revised when evidence shows that it should be.

---

© 2026 Kay Berkling
