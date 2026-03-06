# AGENT-READY DATA MODEL — NULLABLE FIELDS

**For:** Claude Code / Cowork
**Date:** 2026-03-05
**Status:** ADD THESE WHEN TOUCHING SEAT/LINEAGE TYPES — no logic changes needed

---

## WHAT THIS IS

The agent participation layer (PPA5 Component 8) is a future system. But the seat engine and lineage records need to accept agent data when it arrives. These are nullable fields that get added now and ignored until the agent system exists. Zero logic changes. Just schema.

---

## SEATS — add to seat type / record

```typescript
// Agent provenance (all nullable — populated when agent system exists)
agent_id?: string | null;              // which agent facilitated this purchase
agent_operator_id?: string | null;     // human/entity that operates the agent
constitutional_frame_hash?: string | null; // SHA-256 of agent's governance constraints at time of action
intent_id?: string | null;             // if purchase originated from a staged intent
referral_chain?: object | null;        // attribution chain — array of {agent_id, operator_id, role}
```

## LINEAGE EVENTS — add to event type / record

```typescript
// Agent provenance per-event (all nullable)
agent_id?: string | null;
agent_operator_id?: string | null;
constitutional_frame_hash?: string | null;
```

## PRODUCTS/LISTINGS — no changes

Agents interact with the marketplace layer, not the product record. Nothing to add here.

---

## RULES

- All fields nullable. All default to null.
- The engine does NOT read, validate, or act on these fields. It stores them.
- When the agent system exists, it will populate these fields at purchase/event time.
- The hash chain should include agent fields in the hash computation IF they are present (non-null). If null, they are excluded from the hash input. This means agent-facilitated purchases will produce different hashes than direct purchases — which is correct, because they ARE different events.
- Do NOT build agent registration, frame validation, intent staging, or referral attribution. Those are separate systems. This note is only about making the seat/lineage data model ready.

---

## ALSO LEAVE SOCKETS FOR (same principle — nullable, no logic)

**Signature fields on seats:**
```typescript
classical_signature?: string | null;   // ECDSA sig (future)
pq_signature?: string | null;          // ML-DSA/FIPS 204 sig (future)
```

**Emblem fields on seats:**
```typescript
emblem_url?: string | null;            // generated emblem artifact location
emblem_hash?: string | null;           // SHA-256 of emblem for verification
```

These follow the same pattern: add the field, leave it null, build the system later.

---

*Reference: PPA5-CASCADE-REGISTER-v2, Components 4 and 8. FTO-QUICK-REFERENCE.md for what NOT to build.*
