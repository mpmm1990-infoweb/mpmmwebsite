/**
 * DatabaseManagerTool — Custom Sanity Studio Tool
 *
 * Renders a "Database Manager" panel inside Sanity Studio that lets an
 * authorised admin select document types and bulk-delete them, or wipe the
 * entire dataset, without leaving the browser.
 *
 * Registered in studio.config.ts via the `tools` array.
 */
import React, { useState, useCallback } from "react";
import { useClient } from "sanity";

// Clean, zero-dependency inline SVG icons compatible with Next.js Turbopack & Sanity Studio
const DBIcon = () => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
  </svg>
);

const Trash = () => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 6h18" />
    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    <line x1="10" x2="10" y1="11" y2="17" />
    <line x1="14" x2="14" y1="11" y2="17" />
  </svg>
);

// ─── Types ────────────────────────────────────────────────────────────────────
interface DocCount {
  type : string;
  count: number;
}

// ─── Small reusable UI atoms ──────────────────────────────────────────────────
const Card = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      background     : "var(--card-bg, #1a1a2e)",
      border         : "1px solid #333",
      borderRadius   : 8,
      padding        : "1.25rem 1.5rem",
      marginBottom   : "1rem",
    }}
  >
    {children}
  </div>
);

const Badge = ({
  label,
  count,
  color = "#4a9eff",
}: {
  label: string;
  count: number;
  color?: string;
}) => (
  <span
    style={{
      display        : "inline-flex",
      alignItems     : "center",
      gap            : 6,
      padding        : "3px 10px",
      borderRadius   : 9999,
      fontSize       : 12,
      fontWeight     : 600,
      background     : `${color}22`,
      border         : `1px solid ${color}55`,
      color          ,
      marginRight    : 6,
      marginBottom   : 6,
    }}
  >
    {label} <strong style={{ color: "#fff" }}>{count}</strong>
  </span>
);

const Btn = ({
  onClick,
  disabled,
  danger,
  children,
}: {
  onClick: () => void;
  disabled?: boolean;
  danger?: boolean;
  children: React.ReactNode;
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    style={{
      display        : "inline-flex",
      alignItems     : "center",
      gap            : 6,
      padding        : "8px 18px",
      borderRadius   : 6,
      border         : "none",
      cursor         : disabled ? "not-allowed" : "pointer",
      fontWeight     : 600,
      fontSize       : 13,
      background     : disabled ? "#444" : danger ? "#c0392b" : "#2563eb",
      color          : disabled ? "#888" : "#fff",
      transition     : "background 0.2s",
    }}
  >
    {children}
  </button>
);

// ─── Main Tool Component ──────────────────────────────────────────────────────
export function DatabaseManagerTool() {
  const client = useClient({ apiVersion: "2024-01-01" });

  const [counts,    setCounts]   = useState<DocCount[]>([]);
  const [selected,  setSelected] = useState<Set<string>>(new Set());
  const [log,       setLog]      = useState<string[]>([]);
  const [loading,   setLoading]  = useState(false);
  const [fetched,   setFetched]  = useState(false);
  const [confirm,   setConfirm]  = useState<"none" | "selected" | "all">("none");

  const pushLog = (msg: string) => setLog((prev) => [...prev, msg]);

  // ── Fetch document type breakdown ──────────────────────────────────────────
  const fetchCounts = useCallback(async () => {
    setLoading(true);
    pushLog("Fetching document inventory …");
    try {
      const docs: { _type: string }[] = await client.fetch(
        `*[!(_id in path("_.**"))]{_type}`
      );
      const map: Record<string, number> = {};
      for (const d of docs) {
        map[d._type] = (map[d._type] || 0) + 1;
      }
      const result = Object.entries(map)
        .map(([type, count]) => ({ type, count }))
        .sort((a, b) => b.count - a.count);
      setCounts(result);
      setFetched(true);
      pushLog(
        `Found ${docs.length} document(s) across ${result.length} type(s).`
      );
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      pushLog(`ERROR: ${msg}`);
    } finally {
      setLoading(false);
    }
  }, [client]);

  // ── Toggle type selection ──────────────────────────────────────────────────
  const toggle = (type: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(type) ? next.delete(type) : next.add(type);
      return next;
    });
  };

  // ── Core delete function ───────────────────────────────────────────────────
  const deleteDocs = useCallback(
    async (types: string[] | "all") => {
      setLoading(true);
      setConfirm("none");

      try {
        let query: string;
        if (types === "all") {
          query = `*[!(_id in path("_.**"))]{_id}`;
        } else {
          const typeList = types.map((t) => `"${t}"`).join(", ");
          query = `*[_type in [${typeList}]]{_id}`;
        }

        pushLog("Querying documents to delete …");
        const docs: { _id: string }[] = await client.fetch(query);

        // Also get drafts for these types
        const draftQuery =
          types === "all"
            ? `*[_id in path("drafts.**")]{_id}`
            : `*[_id in path("drafts.**") && _type in [${types.map((t) => `"${t}"`).join(",")}]]{_id}`;
        const drafts: { _id: string }[] = await client.fetch(draftQuery);

        const allIds = [...docs, ...drafts].map((d) => d._id);
        pushLog(`Deleting ${allIds.length} document(s) …`);

        const CHUNK = 100;
        let deleted = 0;
        for (let i = 0; i < allIds.length; i += CHUNK) {
          const chunk = allIds.slice(i, i + CHUNK);
          const tx = client.transaction();
          for (const id of chunk) tx.delete(id);
          await tx.commit({ visibility: "async" });
          deleted += chunk.length;
          pushLog(`  … ${deleted}/${allIds.length} deleted`);
        }

        pushLog(`✔ Done! ${deleted} document(s) deleted.`);
        // Refresh counts
        await fetchCounts();
        setSelected(new Set());
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : String(err);
        pushLog(`ERROR: ${msg}`);
      } finally {
        setLoading(false);
      }
    },
    [client, fetchCounts]
  );

  // ─── Render ──────────────────────────────────────────────────────────────
  const totalSelected = counts
    .filter((c) => selected.has(c.type))
    .reduce((sum, c) => sum + c.count, 0);
  const totalAll = counts.reduce((sum, c) => sum + c.count, 0);

  return (
    <div
      style={{
        maxWidth    : 760,
        margin      : "0 auto",
        padding     : "2rem 1rem",
        fontFamily  : "system-ui, sans-serif",
        color       : "#e2e8f0",
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "1.5rem" }}>
        <span style={{ fontSize: 28, color: "#60a5fa", display: "flex" }}><DBIcon /></span>
        <div>
          <h2 style={{ margin: 0, fontSize: 22, fontWeight: 700 }}>
            Database Manager
          </h2>
          <p style={{ margin: 0, fontSize: 13, color: "#94a3b8" }}>
            Inspect and selectively delete Sanity content documents. Schemas are never affected.
          </p>
        </div>
      </div>

      {/* Warning Banner */}
      <Card>
        <p style={{ margin: 0, color: "#fbbf24", fontWeight: 600, fontSize: 14 }}>
          ⚠ Danger Zone — deletions are permanent and cannot be undone.
        </p>
        <p style={{ margin: "0.4rem 0 0", fontSize: 13, color: "#94a3b8" }}>
          Only content documents will be removed. Your schema configurations
          (types, fields) remain completely intact.
        </p>
      </Card>

      {/* Step 1 — Fetch */}
      <Card>
        <h3 style={{ margin: "0 0 0.75rem", fontSize: 15 }}>
          Step 1 — Scan the dataset
        </h3>
        <Btn onClick={fetchCounts} disabled={loading}>
          {loading && !fetched ? "Scanning …" : "🔍 Scan Dataset"}
        </Btn>
      </Card>

      {/* Step 2 — Select & Delete */}
      {fetched && (
        <Card>
          <h3 style={{ margin: "0 0 0.75rem", fontSize: 15 }}>
            Step 2 — Select document types to delete
          </h3>

          {counts.length === 0 ? (
            <p style={{ color: "#22c55e", fontWeight: 600 }}>
              ✔ Dataset is empty — nothing to delete.
            </p>
          ) : (
            <>
              <div style={{ marginBottom: "1rem" }}>
                {counts.map(({ type, count }) => (
                  <label
                    key={type}
                    style={{
                      display        : "inline-flex",
                      alignItems     : "center",
                      gap            : 6,
                      marginRight    : 8,
                      marginBottom   : 8,
                      cursor         : "pointer",
                      padding        : "4px 12px",
                      borderRadius   : 6,
                      border         : `1px solid ${selected.has(type) ? "#ef4444" : "#334155"}`,
                      background     : selected.has(type) ? "#ef444411" : "#1e293b",
                      color          : selected.has(type) ? "#fca5a5" : "#cbd5e1",
                      fontWeight     : 600,
                      fontSize       : 13,
                      transition     : "all 0.15s",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={selected.has(type)}
                      onChange={() => toggle(type)}
                      style={{ accentColor: "#ef4444" }}
                    />
                    {type}
                    <Badge label="" count={count} color="#64748b" />
                  </label>
                ))}
              </div>

              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                {/* Delete Selected */}
                <Btn
                  onClick={() => setConfirm("selected")}
                  disabled={loading || selected.size === 0}
                  danger
                >
                  <Trash /> Delete Selected ({totalSelected} docs)
                </Btn>

                {/* Delete All */}
                <Btn
                  onClick={() => setConfirm("all")}
                  disabled={loading}
                  danger
                >
                  <Trash /> Wipe Entire Dataset ({totalAll} docs)
                </Btn>

                {/* Select All / None */}
                <Btn
                  onClick={() =>
                    setSelected(
                      selected.size === counts.length
                        ? new Set()
                        : new Set(counts.map((c) => c.type))
                    )
                  }
                  disabled={loading}
                >
                  {selected.size === counts.length ? "Deselect All" : "Select All"}
                </Btn>
              </div>

              {/* Confirmation prompts */}
              {confirm === "selected" && (
                <div
                  style={{
                    marginTop   : "1rem",
                    padding     : "0.75rem 1rem",
                    background  : "#450a0a",
                    borderRadius: 6,
                    border      : "1px solid #7f1d1d",
                    color       : "#fca5a5",
                    fontSize    : 13,
                  }}
                >
                  <strong>
                    Are you sure? This will permanently delete {totalSelected}{" "}
                    document(s) across{" "}
                    {[...selected].join(", ")} — and their drafts.
                  </strong>
                  <div style={{ marginTop: 8, display: "flex", gap: 8 }}>
                    <Btn
                      onClick={() => deleteDocs([...selected])}
                      danger
                      disabled={loading}
                    >
                      Yes, Delete Selected
                    </Btn>
                    <Btn onClick={() => setConfirm("none")} disabled={loading}>
                      Cancel
                    </Btn>
                  </div>
                </div>
              )}

              {confirm === "all" && (
                <div
                  style={{
                    marginTop   : "1rem",
                    padding     : "0.75rem 1rem",
                    background  : "#450a0a",
                    borderRadius: 6,
                    border      : "1px solid #7f1d1d",
                    color       : "#fca5a5",
                    fontSize    : 13,
                  }}
                >
                  <strong>
                    ⚠ FINAL WARNING: This will delete ALL {totalAll} documents
                    from the entire dataset. This cannot be undone.
                  </strong>
                  <div style={{ marginTop: 8, display: "flex", gap: 8 }}>
                    <Btn
                      onClick={() => deleteDocs("all")}
                      danger
                      disabled={loading}
                    >
                      Yes, Wipe Everything
                    </Btn>
                    <Btn onClick={() => setConfirm("none")} disabled={loading}>
                      Cancel
                    </Btn>
                  </div>
                </div>
              )}
            </>
          )}
        </Card>
      )}

      {/* Activity Log */}
      {log.length > 0 && (
        <Card>
          <h3 style={{ margin: "0 0 0.75rem", fontSize: 15 }}>Activity Log</h3>
          <div
            style={{
              background    : "#0f172a",
              borderRadius  : 6,
              padding       : "0.75rem 1rem",
              fontFamily    : "monospace",
              fontSize      : 12,
              maxHeight     : 220,
              overflowY     : "auto",
              lineHeight    : 1.7,
              color         : "#94a3b8",
            }}
          >
            {log.map((line, i) => (
              <div
                key={i}
                style={{
                  color: line.startsWith("✔")
                    ? "#22c55e"
                    : line.startsWith("ERROR")
                    ? "#f87171"
                    : "#94a3b8",
                }}
              >
                {line}
              </div>
            ))}
          </div>
          <button
            onClick={() => setLog([])}
            style={{
              marginTop  : 8,
              background : "none",
              border     : "none",
              color      : "#64748b",
              cursor     : "pointer",
              fontSize   : 12,
            }}
          >
            Clear log
          </button>
        </Card>
      )}
    </div>
  );
}

// ─── Tool definition (exported for use in defineConfig plugins) ───────────────
export const databaseManagerTool = {
  name     : "database-manager",
  title    : "Database Manager",
  icon     : DBIcon,
  component: DatabaseManagerTool,
};
