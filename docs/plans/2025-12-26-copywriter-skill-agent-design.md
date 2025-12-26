# Copywriter Skill & Agent Design

**Date:** 2025-12-26
**Status:** Locked

---

## Overview

Two-part system for conversion-focused copywriting:
1. **Skill** (general, reusable) - 7-step copywriting framework synthesized from 5 legendary copywriters
2. **Agent** (industry-specific) - Prep It List It Sell It context that invokes the skill

---

## Part 1: Copywriter Skill

**Location:** `~/.claude/skills/copywriter/SKILL.md`

**Trigger:** Use when writing marketing copy, landing pages, CTAs, headlines, FAQs, or conversion-focused content

### The 7-Step Framework

| Step | Purpose | Key Technique |
|------|---------|---------------|
| 1. Analyze | Determine visitor awareness level | Schwartz: Unaware → Most Aware spectrum |
| 2. Headline | Match headline to awareness | Halbert: Fascinations for Problem-Aware |
| 3. Above-Fold CTA | Clear action + trust | Industry: Response time, credentials |
| 4. Proof | Build credibility | Furey: Story grounding; Halbert: Specific numbers |
| 5. Body | Pull reader through | Sugarman: Slippery slide, seeds of curiosity |
| 6. FAQ/Objections | Handle resistance | Sugarman: Dirty laundry (raise objection first) |
| 7. Bottom CTA | Close with urgency | Halbert: P.S. technique; authentic scarcity only |

### Voice Guidelines

- Conversational neighbor, not corporate
- Specific over vague ("127 homes" not "many")
- "You/your" more than "we/our"
- 8th-10th grade reading level
- Address fears empathetically

### Research Sources

Synthesized from:
- Gary Halbert (fascinations, A-pile, starving crowd)
- Eugene Schwartz (awareness levels, intensification)
- Joseph Sugarman (slippery slide, dirty laundry, 24 triggers)
- Matt Furey (story grounding, personality, zero resistance)
- Ben Settle (infotainment, anti-corporate voice, polarization)

---

## Part 2: Specialist Agent

**Location:** `prep-it-website/.claude/agents/copywriter.md`

**Purpose:** Industry-specific context for Prep It List It Sell It

### Industry Knowledge

**Market Position:**
- NO local competitors position for pre-listing work (market gap)
- National competitor Curbio has $7.5M lawsuit (trust vacuum)
- Only 30% of contractors finish on time/budget

**Seller Psychology:**
- 88% have concerns about selling
- 62% say selling impacts mental health
- 53% spent more time preparing than expected
- 75% spent more money on preparation than expected

**Key Objections:**
- "Is it worth the cost?"
- "Will I get my money back?"
- "How long will this take?"
- "Can I trust a contractor?"

### Voice Specifics

- Family-owned since 2021, based in Stevenson Ranch
- Owner is Bryan - personal, not corporate
- Response within 1-24 hours
- Licensed & insured (bonded: not confirmed)

---

## Invocation Flow

```
User/Agent requests copy
        ↓
Agent spawns with industry context
        ↓
Agent invokes copywriter skill
        ↓
Skill provides 7-step framework
        ↓
Agent applies framework WITH industry context
        ↓
Output: Technically sound + industry-appropriate copy
```

**Key principle:** Skill teaches HOW. Agent knows WHO and WHAT.

---

## Implementation Order

1. Create skill first (it's the dependency)
2. Create agent second (references the skill)
3. Test with sample task

---

## Success Criteria

- Agent produces copy using 7-step framework
- Output includes industry-specific details
- Voice matches guidelines (conversational, specific, empathetic)

---

*Design locked: 2025-12-26*
