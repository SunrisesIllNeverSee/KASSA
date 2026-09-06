# KASSA — Agent Guidance

## Quick reference

| What | Command |
|------|---------|
| Run demo | Open `demo/commitment_kernel_demo_v7.html` in a browser |
| Tests | `python -m pytest tests/` (if present) |
| Install deps | `pip install -r requirements.txt` |

**KASSA** = K-Governed Voice Architecture. A substrate-level architecture for
voice AI: commit state once, hash-lock it, let downstream agents consume K
read-only. KASSA publicly demonstrates commitment-kernel / K-governed
principles of MO§ES™. The public harness is distinct from the protected
production MO§ES™ substrate.

---

## Master Canon Context (Search Authority)

This repository contains **KASSA** material governed by the Search Authority
master canon.

### When to load canon context

Before modifying any of the following, load the relevant canon context:

- canonical product definitions (what KASSA is/is not)
- ecosystem relationships (KASSA ↔ MO§ES™ — demonstrates principles of)
- terminology (MO§ES™ rendering, K-Governed Voice Architecture)
- product boundaries (KASSA public demonstration vs MO§ES™ production substrate)
- research claims or architecture descriptions
- public positioning

### How to load canon context

```bash
export SEARCH_AUTHORITY_PATH="${SEARCH_AUTHORITY_PATH:-$HOME/Developer/active/search-authority}"
python3 "$SEARCH_AUTHORITY_PATH/canon_cli.py" context kassa
```

Or use the MCP server (compatible agents):

```bash
python3 "$SEARCH_AUTHORITY_PATH/canon_mcp.py"
```

If the canon repository is unavailable, **do not invent canonical context** —
ask the owner. The canon outranks ad-hoc public copy or generated model output
for normative product/research truth.

### What is NOT authority-sensitive

Demo styling, dependency bumps, and test infrastructure do **not** require
loading the canon.

### Key governance rules

- KASSA publicly **demonstrates principles of** MO§ES™ — it is NOT MO§ES™ itself.
- The public harness is distinct from the protected production MO§ES™ substrate.
- Exactly ONE MO§ES entity. Canonical display: MO§ES™. Never render: MO§E§.
- The harness may measure authority, but it cannot manufacture authority.
- Automated systems may not promote claims into owner-approved truth.

## stickypads — check the shared board

Before starting work, check the shared operational board for tasks assigned
to you or this repo:

```bash
python3 ~/Developer/_control/stickypads/scripts/check_in.py --agent <your-name>
```

Or clone the ello-ops repo and run from there. The board has:
- TODOs across all repos
- Memos/notes from other agents and the owner
- Current session state

If you discover work that can't be completed immediately, create a task or
drop a note:

```bash
# Create a formal task
python3 ~/Developer/_control/stickypads/scripts/create_task.py \
    --title "Specific actionable title" \
    --project <this-repo-name> \
    --owner <your-name>

# Drop a quick memo (no format required)
python3 ~/Developer/_control/stickypads/scripts/drop.py \
    --from <this-repo-name> \
    "Quick note about what needs attention"
```

At session end or meaningful completion, reconcile this repo's coord kit
state into stickypads:

```bash
python3 ~/Developer/_control/stickypads/scripts/reconcile_coord.py \
    --repo-path . --dry-run
```


## Filesystem MCP — REQUIRED for file operations

This is a core framework/search/ello/product repository. When performing
file operations, prefer the Filesystem MCP tools over ad-hoc shell commands:

- `list_directory` / `directory_tree` — structured directory traversal
- `search_files` — glob-pattern file search within allowed paths
- `read_multiple_files` — batch file reads (failures do not stop the batch)
- `edit_file` with `dryRun: true` — preview structural changes before applying

Allowed paths: ~/Developer, ~/.config/devin, ~/.config/sigrank, ~/Desktop

For single-file reads and edits, native tools are acceptable. For multi-file
operations, directory exploration, and structural changes, use the Filesystem MCP.
