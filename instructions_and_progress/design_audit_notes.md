# Design Audit Notes

## Purpose
This file tracks visual and layout review notes before further implementation. The focus here is user-facing design quality: pacing, white space, hierarchy, noise level, section flow, and whether each element earns its space.

## Portfolio focus clarification
The portfolio should center on:
- web development projects, especially full-stack web applications
- teaching experience
- passion for game design through legacy work and the current project

The portfolio should not drift toward a broader concept/client showcase structure that weakens that focus.
Because of this, the `Selected Client & Concept Work` section has been removed from the live page flow.

## Review Pass 1
Scope:
- Floating navigation
- Hero section
- Hero to About transition

### Overall opening impression
The site direction is strong: dark palette, restrained accent, and a more premium tone than the initial scaffold. The main issue is not styling quality, it is composition density in the opening screen. The hero currently asks the user to process too many medium-priority elements at once.

### Section 1: Floating navigation
Status:
- Good baseline

What is working:
- Floating glass treatment fits the intended tone.
- Compact-on-scroll behavior is appropriate for the site direction.
- Nav item count is restrained.
- The CTA is small enough that it does not dominate.

What should be reviewed later:
- The nav may still feel slightly wide relative to the content mass below it.
- The active underline is functional, but could eventually be made subtler or more integrated.
- Once the hero is simplified, reassess whether the nav needs to sit slightly higher or shrink sooner.

Priority:
- Low for now. Do not redesign nav until hero density is reduced.

### Section 2: Hero
Status:
- Needs refinement before moving deeper into visual polish

Primary issue 1: headline length
The current headline is too long for a hero. Even though the copy is good, it behaves more like an about statement than a top-of-page headline. It consumes too much vertical space, weakens visual punch, and slows first-glance comprehension.

Why it matters:
- A hero should establish identity quickly.
- The first read should be scannable in one or two beats.
- Long hero copy pushes CTAs and supporting visuals further down, making the opening screen feel taller and busier.

Recommendation:
- Reduce the main headline to a shorter statement that can sit in 2 to 3 lines max on desktop.
- Push supporting nuance into the paragraph below.
- If the current wording must be preserved conceptually, use a shorter front-loaded version in the hero and retain the fuller explanation in About.

Potential direction examples:
- I build polished front-end experiences with an interactive mindset.
- Polished front-end experiences shaped by interactive systems thinking.
- Front-end development with roots in games, systems, and interaction.

Primary issue 2: right-side preview stack is visually expensive
The 3 hero preview cards are better than the previous placeholder state, but they still occupy too much attention relative to their practical value. Right now they function more as atmospheric decoration than as meaningful information, yet they claim a large amount of area and visual complexity.

Why it matters:
- The user does not yet need 3 separate preview objects before understanding who you are.
- Multiple stacked cards add edge density, labels, chips, and internal mockup lines, which increases busyness.
- They compete with the headline instead of reinforcing it.

Recommendation:
- Replace the current 3-card stack with one of these simpler directions:

Option A:
- One dominant mockup surface
- One smaller floating accent card
- Best if the goal is premium restraint

Option B:
- One unified collage frame containing 3 internal panes
- Keeps the idea of breadth without 3 separate card borders

Option C:
- Remove the stack entirely for now and use a single abstract visual panel with one small project tag group
- Best if the hero should feel more editorial and less product-preview driven

Current recommendation:
- Option A is the strongest next move.

Primary issue 3: hero has too many equal-weight elements
The current hero includes:
- Eyebrow
- Long headline
- Long supporting paragraph
- Two buttons
- Text link
- Three preview cards with labels, chips, and titles

This creates a pacing problem: too many elements are asking for attention at nearly the same visual priority.

Recommendation:
- Reduce the number of independently framed elements.
- Keep strong hierarchy:
  - eyebrow
  - concise headline
  - supporting paragraph
  - CTA row
  - one hero visual system

Secondary issue: CTA row is fine, but only after the headline is shortened
The CTA row itself is not the problem. It only starts to feel crowded because it appears after a long headline and a fairly full paragraph.

Recommendation:
- Re-evaluate CTAs only after simplifying the text block.
- Resume can remain tertiary, but it may work better as a nav/right-side utility instead of inside the hero.

### White space analysis for the hero
Current state:
- The hero has decent spacing values, but not enough true breathing room because the content objects themselves are too numerous.
- This is a composition issue more than a spacing-scale issue.

Key principle:
White space is not only empty margin. It is also the result of reducing how many competing shapes, borders, labels, and text blocks exist in a region.

Recommendation:
- Do not just add more padding.
- First reduce density.
- Then rebalance vertical spacing once the hero has fewer moving parts.

### Flow from Hero to About
Current state:
- The hero feels tall, so the About section starts later than ideal.
- About itself is structurally solid, but the user has to work through too much hero before reaching it.

Recommendation:
- Compress the hero so the page gains a stronger rhythm:
  - identity
  - supporting context
  - proof
- If the hero becomes more concise, About will feel like a natural continuation instead of a delayed second introduction.

## Recommended next design step
Do not move on to deeper section polish yet.

Next step should be:
- Refactor the hero composition first.

### Specific implementation targets for the next hero pass
1. Shorten the hero headline so it reads faster and uses less vertical space.
2. Simplify the right-side visual into either:
   - one dominant mockup plus one smaller accent card, or
   - one unified collage panel.
3. Keep the supporting paragraph, but tighten its measure and role.
4. Re-check spacing after density is reduced rather than simply increasing gaps.
5. Reassess whether the Resume link belongs inside the hero.

## Proposed review sequence after hero
1. Hero refinement and opening viewport balance
2. About section rhythm and card density
3. Featured Projects hierarchy and modal usefulness
4. Secondary/Interactive sections for consistency of pacing
5. Capabilities, Contact, Footer final cleanup

## Questions to resolve with user before next hero redesign
1. Preferred direction for the hero visual:
- One dominant mockup + one smaller accent card
- One unified collage frame
- Minimal abstract panel with very limited project cues

2. Preference for the hero headline strategy:
- Keep the current meaning but shorten aggressively
- Replace with a cleaner, more direct headline for design purposes
- Keep current copy elsewhere and write a new hero-first headline

## Review Pass 2
Scope:
- About section
- About to Featured Projects transition
- Featured Projects entry rhythm

### Section 3: About
Status:
- Structurally sound, but visually flatter and denser than it should be after the hero

What is working:
- Two-column layout is appropriate.
- The content direction is strong and credible.
- Capability cards are useful because they convert background into scannable strengths.
- The section feels calmer than the hero, which is the right instinct.

Primary issue 1: About copy still reads heavy after a dense hero
Even though the About section is better paced than the hero, it still presents two fairly long paragraphs immediately after a text-heavy opening. If the hero remains even moderately dense, About starts to feel like a second large reading block rather than a clean deepening section.

Why it matters:
- Users need rhythm, not just information.
- If hero and about are both text-forward, the page delays visual proof for too long.
- The section should feel like an intentional expansion, not another wall of explanation.

Recommendation:
- Preserve the meaning, but explore one of these structural variants:

Option A:
- Keep both paragraphs, but visually de-emphasize the second one.
- Treat the second paragraph more like a supporting note or inset statement.

Option B:
- Pull one key sentence or phrase out as a highlighted pull-line between paragraphs.
- This creates rhythm without deleting content.

Option C:
- Reduce paragraph length in About once the hero takes on more of the identity burden.
- Best if the page aims for faster pacing.

Current recommendation:
- Option A or B.

Primary issue 2: capability cards are useful but visually generic
The cards do their job, but they currently feel like competent system cards rather than part of a more authored portfolio presentation. They are balanced, but somewhat interchangeable.

Why it matters:
- This section is where your background should feel distinct.
- If the cards are too system-neutral, the section loses some personality.

Recommendation:
- Do not increase decoration.
- Instead, explore subtle layout character:

Variant direction 1:
- Keep a simple three-pillar grid, but make one card slightly more prominent.
- Best if you want a stronger hierarchy without extra noise.

Variant direction 2:
- Shift from standalone cards into wider split rows.
- Best if you want the section to feel less template-like.

Variant direction 3:
- Convert cards into a more list-editorial format with small labels and lighter surfaces.
- Best if the goal is maximum restraint.

Variant direction 4:
- Turn the three pillars into a connected sequence rather than isolated cards.
- Best if the section should feel more like a progression of strengths than a feature grid.

Current recommendation:
- Variant direction 1.

Primary issue 3: the section may need stronger separation from the hero
Right now the About section is clean, but the transition between Hero and About may feel more like one long continuous block than a new chapter.

Why it matters:
- The page should feel paced in chapters.
- About should feel like a reset in reading speed and visual pressure.

Recommendation:
- Consider one subtle transition device later:
  - more vertical breathing room above About
  - a faint section divider glow or tonal shift
  - a slightly more grounded background surface for the About area

Do not solve this with a hard divider line.

### White space analysis for About
Current state:
- Better than the hero, but still slightly information-dense.
- The problem is less spacing values and more paragraph weight plus equal-weight cards.

Recommendation:
- Add rhythm through hierarchy before adding more space.
- The section wants more contrast between primary and secondary information.

### Transition into Featured Projects
Status:
- This is where the page should begin paying off its setup, but the transition currently may feel slightly abrupt.

Why it matters:
- Featured Projects is the first strong proof section.
- It should feel earned and slightly elevated when it arrives.

Recommendation:
- Reassess the relationship between About and Featured once hero is refined.
- The ideal rhythm is:
  - Hero introduces
  - About contextualizes
  - Featured proves

Right now About and Featured are functionally in the right order, but the shift could be more intentional.

Potential transition ideas:
- Slightly stronger section intro treatment for Featured
- More breathing room after About
- A subtle surface/tonal shift as the page moves into proof-of-work mode

### Section 4: Featured Projects entry
Status:
- Strong baseline, but it risks feeling card-system heavy if earlier sections remain too dense

What is working:
- The asymmetry of first project dominant, then two-up layout is correct.
- Modal structure is already a good foundation.
- The section reads as the first real proof area.

Potential issue to watch:
- If hero and about are not simplified, Featured may arrive after too much reading and too many framed surfaces.
- That can make the whole page feel uniformly busy rather than strategically layered.

Potential UI variants to explore later for Featured:
Variant A:
- Keep current layout, but make the first project feel more editorial and less card-like.

Variant B:
- Reduce meta/tag density visible on collapsed cards.
- Show less by default, let modal carry more detail.

Variant C:
- Increase image/media dominance on the primary featured project card.

Current recommendation:
- Revisit after hero/about refinement, not before.

## Recommended next design step after this pass
Still do not move deeper into implementation across the page.

Next design decision should be:
- finalize the hero direction first,
- then review whether About should be more editorial, more hierarchical, or more restrained.

## Candidate About variants to add later to the developer panel
1. About copy mode
- Full narrative
- Balanced hierarchy
- Reduced narrative

2. Capability card layout
- Three-column grid
- Featured lead card
- Editorial list format
- Split feature rows
- Accent rail stack
- Split panel stack
- Beacon cards

3. About section tone
- Neutral surface
- Slightly elevated surface
- Stronger chapter separation

## Review Pass 3
Scope:
- Featured Web Projects section
- Card density and section proof rhythm
- Developer-panel variants for project presentation

### Section 4: Featured Web Projects
Status:
- Now moved into active prototyping with live section variants

What changed in this pass:
- Removed the concept-work drift from the section narrative.
- Reframed the project set around web delivery, education-facing web work, and fuller-stack application thinking.
- Added developer-panel controls for section framing, card layout, and card detail density.

Primary issue 1: this section has to prove web development focus immediately
The section cannot imply that branding concepts or broad visual exploration are a co-equal part of the portfolio. This is the first proof section, so it needs to communicate web development clearly and without mixed signals.

Why it matters:
- The user corrected the site positioning explicitly.
- Early proof sections shape how all later sections are interpreted.
- If this section drifts, the whole page starts to read like a broader creative showcase instead of a focused developer portfolio.

Recommendation:
- Keep the project set anchored to web work only.
- Use section intro variants only to tune tone, not to reintroduce concept-work framing.

Primary issue 2: card density can still make the page feel too uniformly busy
The previous version used cards with fairly high visible detail by default: image area, meta line, summary, tags, and CTA. That structure is strong, but after Hero and About it can make the page feel like another block of equally weighted surfaces.

Why it matters:
- The page needs pacing, not just consistency.
- Featured Projects should feel like a proof chapter, not just another card grid.

Recommendation:
- Keep multiple card-density options available in the panel:
  - Detailed cards for fuller proof
  - Compact cards for cleaner rhythm
  - Outcome-led cards when the section should emphasize what each project proves
  - Minimal cards when the section needs more breathing room
  - Signal cards when the section should foreground concise project cues instead of fuller summary text

Current recommendation:
- Outcome-led cards are the strongest default candidate right now.

Primary issue 3: layout hierarchy should stay adjustable until the hero settles
One dominant first project is still a strong direction, but it should remain testable against more balanced and more editorial layouts because the right answer depends on how dense the hero and about sections remain.

Recommendation:
- Keep these live layout variants in the developer panel:
  - Featured-first
  - Balanced grid
  - Editorial rail
  - Staggered mosaic
  - Showcase split

Current recommendation:
- Featured-first remains the strongest default because it gives the proof section a clear entry point.
- Editorial rail is the best fallback if the page still feels too card-heavy after hero refinement.

### White space analysis for Featured Projects
Current state:
- The section has enough literal spacing, but perceived density changes dramatically based on how much information each collapsed card shows.

Key principle:
White space in a proof section is heavily affected by interface weight.
Reducing visible metadata or card internals can improve pacing more effectively than simply adding more section padding.

Recommendation:
- Judge spacing together with card mode, not in isolation.

### Additional content and UI variant directions now available
Section framing variants:
- Direct portfolio proof
- Delivery-focused
- Product-thinking
- Selective proof
- Casebook tone

UI structure variants:
- Featured-first
- Balanced grid
- Editorial rail
- Staggered mosaic
- Showcase split

Card-density variants:
- Detailed cards
- Compact cards
- Outcome-led cards
- Minimal cards
- Signal cards

Surface treatment variants:
- Ambient gradients
- Framed UI chrome
- Blueprint lines

## Recommended next design step after this pass
Next step should be:
- compare the strongest Hero, About, and Featured combinations together,
- then move to the next proof/support section only after the opening third of the page feels correctly paced.

## Current recommended prototype combo
1. Hero visual: dominant mockup
2. Hero headline: concise or systems-forward
3. About copy: balanced
4. About cards: featured
5. Featured Projects intro: delivery-focused
6. Featured Projects layout: featured-first
7. Featured Projects cards: outcome-led

## Review Pass 4
Scope:
- About section variant expansion
- Three-pillar focus structure
- Layout reshaping beyond card styling

### Section 3: About variant update
Status:
- Live variants now reflect the intended focus more cleanly

What changed in this pass:
- Reduced the About focus area set from four items to three.
- Centralized the three About pillars into a single shared source of truth.
- Added two more fully reshaped About layouts beyond the earlier grid/featured/editorial set.

Current About pillars:
- Web Applications
- Game Development
- Teaching / Education

Why this is stronger:
- The old four-card set split the story too finely and created overlap between interactive thinking and design collaboration.
- The new three-pillar structure is cleaner, more legible, and closer to the actual portfolio narrative.
- This also gives every layout variant a better compositional foundation because three areas are easier to stage intentionally than four medium-weight cards.

New layout directions now available:
1. Split feature rows
- Wide horizontal rows with stronger title/body separation.
- Best when About should feel more authored and less like a utility grid.

2. Accent rail stack
- Keeps the clean vertical stack, but each pillar reads as its own lane with a blue accent rail rather than a numbered step.
- Best when you want the sequenced layout energy without implying chronology.

3. Split panel stack
- Uses a stronger left lead block and a more explicit split between the title side and the explanatory side.
- Best when the About section should feel structured and authored.

4. Beacon cards
- Keeps independent cards, but adds compact accent markers and glow-driven emphasis rather than sequence markers.
- Best when you want the blue-accent feel with a little less structure.

### About language adjustment
The old `Build / Systems / Explain` labels were useful as a design test, but they implied a false progression and were too abstract for the section.

Current supporting labels:
- Application UI
- Interaction Systems
- Education Practice

These are meant to behave like compact contextual tags rather than steps.

## Review Pass 5
Scope:
- Featured Web Projects variant expansion
- More content framing options
- More visible UI variation inside the same section

### Section 4: Featured Web Projects variant update
Status:
- Prototype coverage is now broad enough for actual comparison instead of just minor tuning

What changed in this pass:
- Added two more intro/frame directions so the section can read as more selective or more casebook-like.
- Added two more layout directions so the proof section can break away from standard grid behavior.
- Added two more collapsed-card density modes for cleaner or more signal-driven cards.
- Added a new surface-treatment control for the project media areas and modal previews.

New framing options:
1. Selective proof
- Best when the section should feel curated and intentional.

2. Casebook tone
- Best when the section should feel more like reasoned case studies than a portfolio gallery.

New UI options:
1. Staggered mosaic
- Breaks the cards into uneven vertical rhythm so the section feels less templated.

2. Showcase split
- Creates a stronger lead/support relationship with a dominant main card and tighter side column.

3. Minimal cards
- Reduces collapsed-card weight for a calmer reading experience.

4. Signal cards
- Replaces fuller summary content with smaller proof cues and context markers.

5. Surface treatment
- Lets the media panels feel more atmospheric, more UI-framed, or more blueprint-like.

Current recommendation:
- If the hero and about remain moderately dense, try this combination first:
  - Section framing: Selective proof
  - Layout: Showcase split
  - Card mode: Minimal cards
  - Surface treatment: Framed UI chrome

- If the page needs to feel more systems-forward:
  - Section framing: Casebook tone
  - Layout: Staggered mosaic
  - Card mode: Signal cards
  - Surface treatment: Blueprint lines

## Review Pass 6
Scope:
- Games & Interactive Work section
- Current-project emphasis versus archive rhythm
- Live prototype controls for interactive proof

### Section 5: Games & Interactive Work
Status:
- Now wired into the developer panel with section-specific variants

What changed in this pass:
- Moved the section content into a shared interactive-content source of truth.
- Added framing variants so the section can read as game roots, current + roots, systems-forward, or play/prototyping.
- Added multiple treatments for the featured Rhythm Drumming VR project.
- Added multiple layouts for the legacy archive beneath it.
- Added surface-treatment variants so the section can feel more ambient, more electric, or more schematic.

Primary issue 1: the section needs to support the portfolio story without feeling like a second portfolio inside the page
This section is important, but it should not overpower the web-development proof that comes before it. The right direction is to make it feel like meaningful depth and origin, not a competing main track.

Recommendation:
- Keep the section focused on what the game work explains about your interactive instincts.
- Use framing variants to decide whether it reads more like roots, a current side practice, or systems evidence.

Primary issue 2: current project versus archive needs adjustable hierarchy
The Rhythm Drumming VR project and the legacy games both matter, but the section should be able to shift between a strong featured-project read and a more archive-oriented rhythm depending on how dominant the earlier proof sections feel.

Live variants now available:
1. Section framing
- Game roots
- Current + roots
- Systems-forward
- Play + prototyping

2. Featured project treatment
- Spotlight card
- Split prototype panel
- Prototype lab

3. Legacy archive layout
- Archive grid
- Archive rail
- Signal cards

4. Surface treatment
- Ambient gradients
- Accent glow
- Schematic lines

Current recommendation:
- If the page needs the section to stay supportive rather than dominant:
  - Framing: Current + roots
  - Featured treatment: Split prototype panel
  - Legacy layout: Archive rail
  - Surface: Ambient gradients

- If the page should lean harder into systems and interaction:
  - Framing: Systems-forward
  - Featured treatment: Prototype lab
  - Legacy layout: Signal cards
  - Surface: Schematic lines

### White space analysis for Games & Interactive Work
Current state:
- The section has a natural risk of becoming too dense because it includes both a current feature and an archive.

Recommendation:
- Judge the section by the balance between the top feature and the archive treatment.
- The rail and signal variants are useful because they reduce the feeling of landing in another heavy card grid after Featured Projects.

## Review Pass 7
Scope:
- Capabilities / Skills section
- Supporting-proof rhythm after the interactive section
- Variant coverage for group layout and chip density

### Section 6: Capabilities
Status:
- Now wired into the developer panel with section-specific variants

What changed in this pass:
- Moved the capabilities content into a shared source of truth with group summaries and labels.
- Added multiple framing options so the section can read as capabilities, strengths, toolkit, or supporting proof.
- Added multiple layout modes so it can behave as a balanced grid, featured lead, horizontal bands, or editorial list.
- Added multiple item treatments so the internal skill entries can read as chips, minimal lines, or tighter grouped stacks.

Primary issue 1: this section should support the portfolio without feeling like a fallback resume dump
The section is useful, but it should not suddenly switch the page into a generic capabilities matrix. It needs enough flexibility to either act as a concise support layer or a more designed summary of how the work gets done.

Recommendation:
- Keep the section in a supporting role.
- Use the framing variants to decide whether it feels more like proof, more like toolkit context, or more like a concise strengths map.

Live variants now available:
1. Section framing
- Capabilities
- Working strengths
- Toolkit
- Supporting proof

2. Layout mode
- Balanced grid
- Featured lead
- Horizontal bands
- Editorial list

3. Skill item treatment
- Chips
- Minimal list
- Grouped stack

Current recommendation:
- If the page already has enough card-heavy sections above it:
  - Framing: Supporting proof
  - Layout: Editorial list
  - Item treatment: Minimal list

- If the section needs to feel more useful and authored:
  - Framing: Toolkit
  - Layout: Horizontal bands
  - Item treatment: Grouped stack

### White space analysis for Capabilities
Current state:
- This section can easily become visually repetitive because it is structurally simpler than the sections above it.

Recommendation:
- Prefer banded or editorial layouts if the page already contains several grid/card chapters.
- Minimal item treatment is the cleanest option when the goal is to keep the section in a supporting role.

## Review Pass 8
Scope:
- Contact and Footer closing sequence
- End-of-page tone and CTA structure
- Variant coverage for closing rhythm

### Section 7: Contact & Footer
Status:
- Now wired into the developer panel as a closing cluster

What changed in this pass:
- Added shared closing copy so Contact and Footer stay aligned.
- Added multiple contact framings so the ending can feel more direct, more conversational, more opportunity-focused, or more editorial.
- Added multiple contact layouts so the CTA can stay centered, split into message/action columns, or become a quieter stacked note.
- Added multiple background/surface treatments for the final section.
- Added footer tone variants so the footer can stay minimal, link-forward, or build-note oriented.

Primary issue 1: the page ending should feel intentional, not like a default CTA block
After a page with this much design iteration, the closing section should not collapse into a generic centered contact card. It needs enough variation to either act as a strong final CTA or a quieter closing note depending on the chosen page rhythm.

Recommendation:
- Choose the closing tone based on the density above it.
- If the earlier sections are already assertive, a quieter stacked or editorial closing is likely stronger.

Live variants now available:
1. Contact framing
- Direct contact
- Conversational
- Opportunities
- Editorial closing note

2. Contact layout
- Centered CTA
- Split closing
- Stacked note

3. Contact surface
- Ambient glow
- Accent glow
- Quiet surface

4. Footer tone
- Simple footer
- Network footer
- Build note footer

Current recommendation:
- If the page already has enough emphasis above the fold and in the mid-page proof sections:
  - Framing: Editorial closing note
  - Layout: Stacked note
  - Surface: Quiet surface
  - Footer: Build note footer

- If the page needs a stronger, clearer final CTA:
  - Framing: Opportunities
  - Layout: Split closing
  - Surface: Accent glow
  - Footer: Network footer

### White space analysis for Contact & Footer
Current state:
- The closing sequence is most sensitive to tone rather than complexity.

Recommendation:
- Avoid ending the page with a CTA that is louder than the work sections above it.
- The stacked and quiet variants are useful when the page already has enough energy and only needs a clean final landing.

## Review Pass 9
Scope:
- Global background system
- Page-level atmosphere versus scroll performance
- Live prototype controls for final background tone
- Global optimization controls for section transparency and atmosphere

### Page background
Status:
- Now wired into the developer panel as a page-level prototype layer

What changed in this pass:
- Replaced the old body and main pseudo-element background stack with root-level CSS background layers controlled by the developer panel.
- Added live controls for background style, grid overlay, and contrast level.
- Restored a lightweight background parallax option through root CSS variables instead of a separate background overlay component.
- Added a dedicated Optimization tab so section transparency and section atmosphere can be tuned or reduced globally.
- Reduced the background system to a smaller set of composable layers so page atmosphere can be changed without stacking more global CSS effects.
- Tightened the Lenis scroll setup so the RAF loop is cleaned up correctly and the default smoothing feels less heavy.
- Follow-up performance fix: removed full-screen `will-change` usage from the background layers and dropped the always-running Lenis RAF loop entirely after they showed up as the main idle-cost suspects.
- Follow-up architecture fix: replaced the fixed viewport background scene with a static app-bound layer after testing showed that disabling the entire component, not just its options, was what removed the lag.
- Follow-up reduction: removed the scene's duplicate full-page base layer and constrained the remaining decorative background treatment to the top of the page so it stops painting across the full document.
- Final fix direction: removed the background scene component entirely and converted the page atmosphere into static root-level CSS background layers so the background no longer exists as a rendered overlay subtree.
- User testing narrowed the strongest remaining hit to glass surfaces, which pointed away from ordinary gradients and toward fixed `backdrop-filter` usage as the dominant cost.
- Final cleanup pass: removed the temporary diagnostic overlay and debug-only controls after isolating the performance issue.

Primary issue 1: the old background atmosphere was doing too much work in global pseudo-elements
The earlier background direction had good tone, but it relied on multiple fixed overlays spread across global selectors. That made experimentation harder and increased the risk that page scrolling would feel heavier than it should.

Why it matters:
- Background treatment should support the page, not behave like another foreground system.
- Fixed grid and texture layers can make the whole site feel more expensive to render when they are always present.
- A page-level prototype tool is more useful when the background can be tuned independently from section content.

Recommendation:
- Keep the background centralized in root-level CSS rather than a rendered decorative component.
- Treat atmosphere as a controlled layer system instead of a growing collection of global overlays.
- Avoid promoting multiple full-screen layers with `will-change` unless profiling proves they are necessary.
- Prefer page-bound decorative layers over fixed full-viewport background systems when performance is uncertain.
- Prefer root-level static page backgrounds over dedicated decorative background components when remote/browser performance is questionable.

Primary issue 2: not every page direction wants the same amount of structure
Some variant combinations need a visible grid and stronger system cues. Others need less scaffolding so the sections themselves carry the design weight.

Live variants now available:
1. Background style
- Minimal
- Halo
- Mesh
- Aurora
- Contrast
- Ink

2. Grid overlay
- None
- Fine
- Wide
- Blueprint

3. Contrast level
- Soft
- Balanced
- High

4. Background parallax
- None
- Soft
- Depth

5. Optimization controls
- Section surfaces: Airy / Balanced / Solid
- Section atmosphere: Full / Reduced / Off

Primary issue 3: motion needs restraint because the page already contains section-level interaction and reveal behavior
The background can add atmosphere, but it should not compete with the hero, card surfaces, or section reveals. Motion is useful only when it stays peripheral.

Recommendation:
- Prefer native scrolling over always-on JS smooth-scroll loops unless there is a measured reason to accept the extra runtime cost.
- Keep the finalized background system static and let section-level motion carry the page if needed.
- If parallax is enabled, keep it subtle and root-level only.
- Use the Optimization tab when you want to reintroduce translucency without bringing back the expensive glass path.

### White space and page-flow analysis for the background
Current state:
- The new background system improves perceived breathing room because the grid, glow, and motion can now be reduced instead of being globally baked in.
- This makes it easier to judge actual section density without the page always carrying the same visual scaffolding.

Key principle:
Page calmness is affected as much by background structure as by section spacing.
If the background is too assertive, even well-spaced sections can still feel busy.

Current recommendation:
- For the strongest all-purpose comparison baseline, start with:
  - Style: Halo
  - Grid: Fine or None
  - Contrast: Balanced

- If the page should feel more systems-forward:
  - Style: Mesh or Ink
  - Grid: Blueprint
  - Contrast: High

- If the page should feel cleaner and more editorial:
  - Style: Minimal
  - Grid: None
  - Contrast: Soft or Balanced

## Recommended next design step after this pass
Next step should be:
- compare a small set of full-page combinations that include both section variants and background variants,
- then reduce the global option set to the most credible directions before doing another hero-specific refinement pass.

Current recommendation:
- Featured lead card remains the safest option.
- Split feature rows are the strongest alternate if the section needs a more distinctive authored feel.

### White space analysis for the updated About section
Current state:
- The three-pillar structure already improves perceived breathing room because there are fewer equal-weight surfaces competing at once.
- Layout choice now matters more than raw spacing values.

Recommendation:
- Evaluate About using the relationship between copy weight and layout shape.
- The split and sequence variants are especially useful if the hero remains text-heavy, because they reduce the feeling of landing in another generic card block.
