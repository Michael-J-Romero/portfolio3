# Variant System

This directory contains prototype-facing variant definitions and state infrastructure.

## Purpose
Use this system to explore design directions without moving or duplicating the page-level component structure.

## Rules
- Keep existing page components in place.
- Add new variant options under `src/variants/...`.
- Read active variant state from the provider instead of hardcoding temporary experiments into components.
- Use the hidden developer panel to toggle variants during review.

## Current coverage
- Global background style, grid, motion, scroll, and contrast variants
- Hero headline variants
- Hero supporting copy variants
- Hero visual composition variants
- Hero resume placement variant
- About copy density variants
- About capability layout variants
- About section tone variants
- Featured projects intro framing variants
- Featured projects layout variants
- Featured projects card-density variants

## Expansion direction
Future component variants should follow the same pattern:
1. Add typed state in `config/types.ts`
2. Add defaults in `config/defaultVariantState.ts`
3. Add control metadata in `config/variantControls.ts`
4. Add component-specific variant files in a logical subdirectory such as `src/variants/projects/...`
5. Read variant state inside the existing component and branch there
