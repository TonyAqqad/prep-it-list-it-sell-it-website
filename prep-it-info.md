# Prep It List It Sell It Services — GHL AI Employee Snapshot Build Brief

**Primary URL:** https://prepitlistitsellit.com/  
**Primary Goal:** Build a lean GoHighLevel (GHL) “AI Receptionist” system (Voice AI + supporting SMS/workflows) to capture and qualify inbound leads, schedule/coordinate consultations, and route urgent calls to a human.

---

## 1) What We Know (Verified From Website)

### Business Identity
- **Business name (as displayed on site):** Prep It List It Sell It Services
- **Positioning line:** “Residential & Commercial Property Improvements - Project Mgmt”
- **Established:** 2021 (per site copy)
- **Service area:** Santa Clarita Valley and surrounding areas (per site copy)

### Contact Details
- **Office phone:** (661) 360-9252
- **Direct phone:** (661) 382-7784
- **Email:** webster_consulting@outlook.com
- **Address:** 25101 The Old Road, Suite 123, Stevenson Ranch, CA 91381

### Lead Intake (Website Contact Form)
The current website form collects:
- Full Name (required)
- Phone (required)
- Email (required)
- **Type of Service (required):** Residential / Commercial
- **Preferred Consultation Date (required)** (date only; no time field)

Form confirmation message sets expectation:
- “We will get back promptly within **1–24 hours**.”

### Social Proof / Testimonials (Key Themes)
- On-time and communicative (“provided me with updates”)
- “Free estimate”
- “Above and beyond” (extra unplanned work, no extra charges)
- Quality workmanship and attention to detail (exterior painting example)
- Competitive pricing

**Named person referenced repeatedly in testimonials:** “Bryan” (likely owner/primary operator; confirm)

---

## 2) Snapshot Strategy (Lean Build)

### Recommended AI Employees (Lean)
**Voice AI (1):**
- `receptionist` (handles both inbound routing + lead intake)

**SMS (1–2, optional but recommended):**
- `receptionist` (SMS) for missed-call text-back + webform follow-up
- `estimate_follow_up` (SMS) to re-engage leads after an estimate is sent (optional)

Reasoning: This business appears service-based with inbound call + estimate/consultation flow. Keep the system simple and reliable before expanding.

---

## 3) AI Receptionist (Voice) — Required Behaviors

### Voice Agent Goals
1. Answer inbound calls professionally and capture every lead (no “missed lead”).
2. Identify the caller’s intent quickly (new estimate vs existing project vs general question).
3. Collect the minimum info needed for the team to follow up fast (within 1–24 hours).
4. Route truly urgent/high-value calls to a human (CALL_TRANSFER), otherwise take a structured message.
5. Send an SMS confirmation recap after the call (SMS action).

### Voice Agent Tone
- Friendly, professional, clear, and efficient.
- “Small family-owned business” vibe; helpful and human.
- Never overpromise timelines/pricing; confirm details are reviewed by the team.

### Intake Flow (New Lead / Estimate Request)
Collect (in order):
1. **Service type:** Residential or Commercial (matches website form)
2. **Name**
3. **Phone number** (confirm best callback number)
4. **Email** (optional on voice, but try to capture)
5. **Project address** (or at least city + ZIP) to confirm service area
6. **What they need help with** (short description)
7. **Timeline** (including any listing deadline if “prep for sale”)
8. **Preferred consultation date** (and preferred time window; the site only captures date—confirm process)
9. **How they heard about you** (optional; helps marketing attribution)

Close with a recap and expectation:
- “Thanks — we’ll get back to you within 1–24 hours.”

### Existing Customer / In-Progress Project Calls
Collect:
- Name + phone + job address
- What’s needed (status update, change request, issue)
- Urgency/safety concerns

Escalate to human for:
- Safety hazards (gas/electrical/water intrusion)
- Complaints requiring immediate attention
- “I need Bryan now / manager now”

### Voice AI Actions (Must-Have)
1. **CALL_TRANSFER** (to human)
   - Trigger examples:
     - Caller requests Bryan / owner / manager
     - Safety/emergency risk
     - Large commercial opportunity (optional rule)
2. **SMS** (send recap + next steps)
   - Send immediately after a lead-intake call:
     - “Thanks for calling {{business_name}}. We’ve got your request for a {{service_type}} project. We’ll reach out within 1–24 hours. Reply with any extra details or photos.”

---

## 4) GHL Build Requirements (Snapshot Components)

### Custom Values Needed (Fill These Before Deployment)
- Use **E.164** format for phone numbers (example: `+16615551234`).
- `business_name`: Prep It List It Sell It Services
- `business_type`: Residential & commercial property improvements / project management
- `business_phone`: +16613609252
- `business_email`: webster_consulting@outlook.com
- `business_address`: 25101 The Old Road, Suite 123, Stevenson Ranch, CA 91381
- `business_city`: Stevenson Ranch
- `business_state`: CA
- `business_timezone`: America/Los_Angeles
- `website_url`: https://prepitlistitsellit.com/
- `owner_name`: (confirm; testimonials reference “Bryan”)
- `escalation_contact`: (confirm name)
- `escalation_phone`: +16613827784 (confirm which number to transfer to and when)
- `services_list`: (confirm; see “Open Questions”)
- `primary_service`: (confirm; likely “Home improvement / listing prep”)
- `brand_tone`: Friendly, professional, efficient, detail-oriented

### Contact Fields / Tags (Recommended)
Create tags for easy routing/reporting:
- `PILISI_RESIDENTIAL`, `PILISI_COMMERCIAL`
- `PILISI_NEW_LEAD`, `PILISI_EXISTING_CUSTOMER`
- `PILISI_CONSULT_REQUESTED`
- `PILISI_URGENT`

Optional custom fields:
- `service_type` (Residential/Commercial)
- `preferred_consultation_date`
- `project_address`
- `project_description`
- `timeline`
- `lead_source`

### Pipeline (Recommended)
Single pipeline works to start:
1. New Lead
2. Attempting Contact
3. Consultation Scheduled
4. Estimate Sent
5. Won
6. Lost

### Workflows (Manual Build in GHL UI)
Minimum set:
1. **Missed Call Text-Back** (SMS): instant reply + request details
2. **New Lead Confirmation** (SMS/email): for webform submissions and/or Voice AI captured leads
3. **Consultation Reminder** (SMS): 24h + 2h before consultation (if scheduled)
4. **Estimate Follow-Up** (SMS, optional): Day 2 + Day 7 “any questions / want to schedule?”

---

## 5) Knowledge Base / FAQs (Draft — Needs Client Confirmation)

Add a shared FAQ KB for SMS agents and summarize key items in the voice prompt:
- Service area (list cities/ZIPs served)
- Business hours + after-hours callback policy (site implies “24/7” contact, callback within 1–24 hours)
- How estimates/consultations work (free estimate? on-site walkthrough?)
- Typical timelines (varies by scope; confirm)
- Types of work performed (painting, repairs, listing prep, etc. — confirm)
- Licensing/insurance (confirm)
- Payment methods and deposit policy (confirm)
- Warranty/guarantee policy (confirm)

---

## 6) Notes From Similar Companies (What’s Working)

Common patterns across “pre-listing improvement / listing prep / project-management” companies:
- **Fast response SLA** (“within 1 business day” or similar) and clear next step (walkthrough/consultation)
- **Fixed-scope proposal** framing (clear plan + timeline + what’s included)
- **Project management** emphasis (updates, coordination, fewer headaches)
- **Proof** (before/after gallery, case studies, reviews)
- **Financing / pay-at-closing options** are common in this niche (only mention if this business offers it)

Use these patterns to shape scripts:
- Always steer to a scheduled consultation and a clear “what happens next”.
- Reinforce trust: family-owned, 5-star service, quality, communication.

---

## 7) Open Questions (Must Confirm With Client)

### Business Ops
1. **Exact business hours** for human callbacks + best callback windows
2. Confirm “24/7” means: AI answers 24/7, but humans respond within 1–24 hours?
3. Who is “Bryan” (owner?) and the correct **transfer-to** number + availability rules
4. Do they want calls for multiple brands handled by the same receptionist?
   - (From project brief) SCV Moves, SCV Water Heater, Webster & Sons Construction, SCV DMV Services, Honey Do List

### Services & Pricing
5. Confirm the **services list** (top 8–12 services) and any exclusions
6. Estimate policy: free? minimum charge? any inspection fee?
7. Typical timelines by job size; emergency handling rules

### Scheduling
8. Do they want the AI to **book consultations** directly on a GHL calendar, or just collect preferred dates?
9. Consultation type: phone vs on-site; duration; what to prepare

### Reviews & Reputation
10. Provide Google Business Profile link + preferred review link for review requests
