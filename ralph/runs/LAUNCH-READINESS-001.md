# PRD: Launch Readiness Validation Sprint

**ID:** LAUNCH-READINESS-001
**Created:** 2026-01-23
**Priority:** P0 (Critical Path)
**Estimated Effort:** 2-4 hours autonomous

---

## Executive Summary

Complete evidence collection and validation for all 20 pages of Quorum Tours to achieve launch readiness. Currently, 11 pages have evidence artifacts while 9 pages are missing evidence. This PRD defines an autonomous sprint to close the gap.

---

## Objective

Validate and document all 20 pages with complete evidence bundles, establishing a visual regression baseline and confirming WCAG AAA compliance across the entire application.

---

## Success Criteria

1. **Evidence Coverage:** 20/20 pages have complete artifact bundles
2. **Visual Baseline:** Screenshots at 3 breakpoints (375px, 768px, 1440px) for all pages
3. **Accessibility:** WCAG AAA audit reports for all pages
4. **Console Clean:** Zero JavaScript errors on any page
5. **Navigation Verified:** All internal links functional
6. **Performance Budgets:** LCP <2.5s on all pages

---

## Current State Analysis

### Pages WITH Evidence (11)
- `/` (home)
- `/tours` (tours-index)
- `/tours/[id]` (tour-detail)
- `/operators` (operators-index)
- `/operators/[id]` (operator-profile)
- `/for-operators`
- `/login`
- `/signup`
- `/operator` (dashboard home)
- `/admin`

### Pages MISSING Evidence (9)
1. `/tours/[id]/join`
2. `/tours/[id]/join/success`
3. `/how-it-works`
4. `/profile`
5. `/operator/tours`
6. `/operator/tours/create`
7. `/operator/bookings`
8. `/operator/earnings`
9. `/operator/help`

---

## Technical Approach

### Phase 1: Environment Setup (5 min)
1. Verify dev server running at localhost:3000
2. Confirm Playwright browser installed
3. Validate artifact directories exist

### Phase 2: Missing Evidence Collection (Parallel Execution)

**Swarm: QA**

For each of the 9 missing pages:
1. Navigate to page
2. Capture desktop screenshot (1440px)
3. Capture tablet screenshot (768px)
4. Capture mobile screenshot (375px)
5. Check console for errors
6. Run accessibility scan
7. Generate evidence bundle

**Naming Convention:**
```
artifacts/screenshots/<page-name>__<breakpoint>__fold.png
artifacts/a11y/<page-name>__a11y.md
artifacts/reports/<page-name>__console.txt
```

### Phase 3: Existing Evidence Verification (Sequential)

**Swarm: Integration**

1. Verify all existing evidence files are valid
2. Confirm no regressions from previous captures
3. Update any outdated screenshots if UI changed

### Phase 4: Navigation Graph Verification (Sequential)

**Swarm: Integration**

1. Map all internal links
2. Test each navigation path
3. Verify no dead routes
4. Document navigation structure

### Phase 5: Performance Audit (Sequential)

**Swarm: Integration**

1. Measure Core Web Vitals per page
2. Flag any pages exceeding LCP budget
3. Generate performance report

### Phase 6: Final Report Generation

1. Compile all evidence into summary
2. Update qabs-config.json with status
3. Generate launch readiness scorecard
4. Flag any blocking issues

---

## Deliverables

1. **Evidence Bundles:** 9 new bundles for missing pages
2. **Navigation Map:** `artifacts/reports/navigation-graph.md`
3. **Performance Report:** `artifacts/performance/vitals-summary.json`
4. **Launch Scorecard:** `artifacts/reports/LAUNCH-READINESS-SCORECARD.md`

---

## Agent Assignment

| Phase | Swarm | Agents |
|-------|-------|--------|
| 1 | Setup | dev-browser |
| 2 | QA | dev-browser (×9 parallel) |
| 3 | Integration | Explore |
| 4 | Integration | Explore |
| 5 | Integration | performance-engineer |
| 6 | Report | orchestrator |

---

## Dependencies

- Dev server running (`npm run dev`)
- Playwright browser installed
- All pages rendering without build errors

---

## Risks & Mitigations

| Risk | Mitigation |
|------|------------|
| Page errors blocking capture | Skip and flag, continue with others |
| Slow network affecting timing | Run locally, use cached assets |
| Dynamic content changing | Capture at consistent state |

---

## Out of Scope

- Backend functionality testing
- Database operations
- Authentication flow testing (beyond UI)
- Payment processing verification
- Third-party integration testing

---

## Acceptance Criteria

The sprint is complete when:
- [ ] All 20 pages have screenshot evidence (60 images total)
- [ ] All 20 pages have accessibility reports (20 reports)
- [ ] All 20 pages have console logs (20 logs, all clean)
- [ ] Navigation graph documented and verified
- [ ] Performance report generated
- [ ] Launch readiness scorecard shows READY status
- [ ] All evidence committed to repository

---

## Execution Command

```
/ralph-loop

Objective: Execute LAUNCH-READINESS-001 PRD
- Collect evidence for 9 missing pages
- Verify 11 existing pages
- Generate launch readiness scorecard
- Report completion status
```
