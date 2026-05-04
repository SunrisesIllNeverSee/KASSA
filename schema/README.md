# K-Bound Projection Schema

`K_bound_projections_schema.json` is the public schema sketch for the K-Governed Voice Architecture. It models a parent commitment state with independently extracted and hashed projection channels.

## Channels

| Channel | Meaning |
| --- | --- |
| `K_text` | Lexical content from transcript or text input |
| `K_pros` | Prosodic structure such as emphasis, pauses, contour, or stress |
| `K_tmp` | Temporal behavior such as timing, sequence, duration, or cadence |
| `K_affect` | Acoustic affect markers relevant to interpretation |

Each channel carries:

| Field | Purpose |
| --- | --- |
| `content` | Extracted projection content |
| `hash` | SHA-256 digest for that channel |
| `extractor_version` | Version of the extractor used to produce the projection |

The `parent_hash` binds the channel hashes into one K root. Downstream agents can consume K as read-only state instead of repeatedly reinterpreting each other's outputs.

## Provenance

The provenance block records:

| Field | Purpose |
| --- | --- |
| `raw_input_ref` | Pointer to immutable raw audio and transcript evidence |
| `extraction_timestamp` | ISO-8601 timestamp for extraction |
| `sig_weights` | Snapshot of the SigSystem weighting map used for extraction |

## Validate

This file is a schema/example contract, so the basic CI check is JSON validity:

```bash
python3 -m json.tool schema/K_bound_projections_schema.json > /dev/null
```

Production validation belongs in the private enforcement layer; this public repository documents the boundary and reproducibility scaffold.
