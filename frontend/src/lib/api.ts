// src/lib/api.ts
import type { Item } from "@/components/types";

/** Em produção (Vercel), defina NEXT_PUBLIC_API_URL. Em dev cai para localhost. */
const DEFAULT_DEV_API = "http://localhost:3001";
const ENV_BASE = (process.env.NEXT_PUBLIC_API_URL ?? "").replace(/\/+$/, "");

function apiBase(): string {
  const base = ENV_BASE.length > 0 ? ENV_BASE : DEFAULT_DEV_API;
  return base.replace(/\/+$/, "");
}

function url(path: string): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${apiBase()}${p}`;
}

function hasKey<T extends object>(obj: T, k: PropertyKey): k is keyof T {
  return obj != null && Object.prototype.hasOwnProperty.call(obj, k);
}

async function json<T>(input: RequestInfo, init?: RequestInit): Promise<T> {
  const res = await fetch(input, {
    cache: "no-store",
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });

  // tentar ler texto sempre; depois tentar JSON
  const text = await res.text().catch(() => "");
  let parsed: unknown = null;
  try {
    parsed = text ? JSON.parse(text) : null;
  } catch {
    parsed = text || null;
  }

  if (!res.ok) {
    let msg = `HTTP ${res.status} ${res.statusText}`;
    if (typeof parsed === "string" && parsed.trim()) {
      msg = parsed;
    } else if (parsed && typeof parsed === "object") {
      // procura "message" ou "error" de forma segura
      if (hasKey(parsed as Record<string, unknown>, "message")) {
        const v = (parsed as Record<string, unknown>)["message"];
        if (typeof v === "string" && v.trim()) msg = v;
      } else if (hasKey(parsed as Record<string, unknown>, "error")) {
        const v = (parsed as Record<string, unknown>)["error"];
        if (typeof v === "string" && v.trim()) msg = v;
      }
    }
    throw new Error(msg);
  }

  return parsed as T;
}

/* === Itens ============================================================ */

export async function fetchItems(): Promise<Item[]> {
  return json<Item[]>(url("/items"));
}

export async function addItem(payload: Omit<Item, "id">): Promise<Item> {
  return json<Item>(url("/items"), {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function deleteItem(id: number): Promise<void> {
  await json<void>(url(`/items/${id}`), { method: "DELETE" });
}

// Opcional:
// export async function toggleItem(id: number, comprado: boolean): Promise<Item> {
//   return json<Item>(url(`/items/${id}/toggle?purchased=${comprado}`), { method: "PATCH" });
// }
