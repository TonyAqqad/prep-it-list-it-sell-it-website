# Copywriter Skill & Agent Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Create a reusable copywriter skill and industry-specific agent for conversion-focused copy.

**Architecture:** User-level skill at `~/.claude/skills/copywriter/SKILL.md` provides 7-step framework. Project-level agent at `prep-it-website/.claude/agents/copywriter.md` adds industry context and invokes the skill.

**Tech Stack:** Markdown skill files, Claude Code skill system

---

## Task 1: Create Copywriter Skill Directory

**Files:**
- Create: `~/.claude/skills/copywriter/` (directory)

**Step 1: Create the directory**

Run: `mkdir -p ~/.claude/skills/copywriter`
Expected: Directory created (no output)

**Step 2: Verify directory exists**

Run: `ls ~/.claude/skills/`
Expected: `copywriter` appears in listing alongside `cloudflare`, `frontend-design`, `writing-changelogs`

**Step 3: Commit**

N/A - user-level directory, not in git repo

---

## Task 2: Write Copywriter Skill

**Files:**
- Create: `~/.claude/skills/copywriter/SKILL.md`

**Step 1: Write the skill file**

```markdown
---
name: copywriter
description: Use when writing marketing copy, landing pages, CTAs, headlines, FAQs, or conversion-focused content
---

# Copywriter

Write conversion-focused copy using a 7-step framework synthesized from legendary copywriters.

## The 7-Step Framework

### 1. Analyze Awareness Level

Before writing, determine where the visitor is:

| Level | Description | Headline Approach |
|-------|-------------|-------------------|
| Unaware | Don't know they have a problem | Lead with story/intrigue |
| Problem-Aware | Know problem, not solutions | Agitate pain, hint at solution |
| Solution-Aware | Know solutions exist, not yours | Differentiate your approach |
| Product-Aware | Know you, not convinced | Proof and objection handling |
| Most Aware | Ready to buy | Direct offer, clear CTA |

Most visitors are **Problem-Aware** or **Solution-Aware**.

### 2. Write the Headline

Match headline type to awareness level:

- **Problem-Aware:** Use fascinations - "The [specific thing] that [unexpected result]"
- **Solution-Aware:** Lead with unique mechanism - "How [your method] gets [result] without [pain]"
- **Product-Aware:** Lead with proof - "[Specific number] [people] have [achieved result]"

Keep first sentence SHORT (5 words max). It's a doorway, not the house.

### 3. Above-Fold CTA

Every page needs a clear action above the fold:
- Benefit-focused text ("Get Your Free Quote" not "Submit")
- Trust signal nearby (rating, credential, response time)
- Secondary option (phone number for those ready now)

### 4. Build Proof

Credibility comes from specifics:
- **Story grounding:** "Last Tuesday in [specific place]..."
- **Specific numbers:** "127 homes" not "many homes"
- **Honesty trigger:** Acknowledge a limitation FIRST, then strengths (dirty laundry technique)

### 5. Write Body Copy (Slippery Slide)

Each sentence must compel reading the next:
- Short paragraphs (1-3 sentences)
- Seeds of curiosity at paragraph ends ("But that's not the real reason...")
- Vary rhythm: short punch, then longer flow
- "You/your" 3x more than "we/our"

### 6. Handle Objections (FAQ)

Raise objections BEFORE the reader does:
- State the fear directly: "You're probably wondering if this is worth the cost"
- Acknowledge it's valid
- Redirect with proof or reframe

Address the top 3-5 objections for your audience.

### 7. Bottom CTA (P.S. Technique)

Restate the core offer with:
- Reminder of main benefit
- Authentic scarcity only (real capacity limits, not fake timers)
- Clear next step

## Voice Guidelines

- Conversational neighbor, not corporate brochure
- Specific over vague always
- 8th-10th grade reading level
- Address fears directly but empathetically
- Personality over polish
```

**Step 2: Verify file exists and has correct frontmatter**

Run: `head -5 ~/.claude/skills/copywriter/SKILL.md`
Expected:
```
---
name: copywriter
description: Use when writing marketing copy, landing pages, CTAs, headlines, FAQs, or conversion-focused content
---
```

**Step 3: Verify word count is reasonable**

Run: `wc -w ~/.claude/skills/copywriter/SKILL.md`
Expected: ~400-500 words (should be under 600)

---

## Task 3: Create Agent Directory

**Files:**
- Create: `prep-it-website/.claude/agents/` (directory)

**Step 1: Create the directory**

Run: `mkdir -p .claude/agents`
Expected: Directory created (no output)

**Step 2: Verify directory exists**

Run: `ls .claude/`
Expected: `agents` directory appears (alongside `rules` if it exists)

---

## Task 4: Write Specialist Agent

**Files:**
- Create: `prep-it-website/.claude/agents/copywriter.md`

**Step 1: Write the agent file**

```markdown
# Prep It List It Sell It Copywriter

You write conversion-focused copy for a family-owned pre-listing home improvement company in Santa Clarita Valley.

**REQUIRED SKILL:** Invoke `copywriter` skill for the 7-step framework and techniques.

## Industry Context

### Market Position
- NO local competitors position for pre-listing work (you own this niche)
- National competitor Curbio has $7.5M lawsuit (trust vacuum in market)
- Only 30% of contractors finish on time/budget (differentiation opportunity)

### Seller Psychology (Research-Backed)
- 88% have concerns about selling their home
- 62% say selling impacts mental health (ranked above divorce in stress)
- 53% spent more time preparing than expected
- 75% spent more money on preparation than expected
- 52% would accept less money to avoid preparation stress

### Key Objections to Address
1. "Is it worth the cost?" → Frame as investment with ROI data
2. "Will I get my money back?" → Staged homes sell 5-10% higher
3. "How long will this take?" → Fast turnaround, most projects start within 3 days
4. "Can I trust a contractor?" → Family-owned, licensed, personal service

## Voice Specifics

- **Owner:** Bryan (use name sparingly for personal touch)
- **Location:** Based in Stevenson Ranch, serving Santa Clarita Valley
- **Established:** Family-owned since 2021
- **Response time:** Within 1-24 hours (always mention)
- **Credentials:** Licensed & insured (bonded status NOT confirmed - don't claim)

## Service Areas
Santa Clarita, Valencia, Stevenson Ranch, Newhall, Canyon Country, Saugus, Castaic

## Tone
- Neighborly, not corporate
- Confident but not boastful
- Empathetic to seller stress
- Direct about what you can and can't do
```

**Step 2: Verify file exists**

Run: `cat .claude/agents/copywriter.md | head -10`
Expected: Shows the header and first section of the agent file

---

## Task 5: Test the Skill (Baseline)

**Files:**
- None (testing only)

**Step 1: Test skill is discoverable**

In a new Claude Code conversation, type:
```
/copywriter
```

Expected: Skill should appear in autocomplete or be invocable

**Step 2: Test skill content loads**

Ask Claude:
```
What does the copywriter skill teach?
```

Expected: Claude describes the 7-step framework

---

## Task 6: Test the Agent Integration

**Files:**
- None (testing only)

**Step 1: Test agent with sample task**

In the prep-it-website project, ask:
```
Using the copywriter agent, write a headline and above-fold section for the homepage.
```

Expected output should include:
- Headline using fascination or awareness-matched format
- Reference to seller psychology (88% concerns, stress, etc.)
- Santa Clarita/SCV mention
- CTA with "Get Your Free Quote" or similar
- Trust indicator (response time, licensed, family-owned)

**Step 2: Verify framework was followed**

Check that output demonstrates:
- [ ] Awareness level considered
- [ ] Headline matches a recommended format
- [ ] CTA is benefit-focused
- [ ] Proof uses specific numbers
- [ ] Voice is conversational, not corporate

---

## Task 7: Commit Agent to Project

**Files:**
- Commit: `.claude/agents/copywriter.md`

**Step 1: Stage the agent file**

Run: `git add .claude/agents/copywriter.md`
Expected: File staged

**Step 2: Commit**

Run:
```bash
git commit -m "feat: add copywriter agent for industry-specific copy

- Industry context (seller psychology, market position)
- Voice guidelines (Bryan, family-owned, response time)
- Invokes user-level copywriter skill for framework

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>"
```

Expected: Commit successful

---

## Summary

| Task | Files | Purpose |
|------|-------|---------|
| 1 | `~/.claude/skills/copywriter/` | Create skill directory |
| 2 | `~/.claude/skills/copywriter/SKILL.md` | Write 7-step framework skill |
| 3 | `.claude/agents/` | Create agent directory |
| 4 | `.claude/agents/copywriter.md` | Write industry-specific agent |
| 5 | — | Test skill discoverability |
| 6 | — | Test agent integration |
| 7 | `.claude/agents/copywriter.md` | Commit agent to git |

**Total: 7 tasks**

---

*Plan created: 2025-12-26*
*Design source: docs/plans/2025-12-26-copywriter-skill-agent-design.md*
