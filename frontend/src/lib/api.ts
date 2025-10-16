// src/lib/api.ts
import type { Item } from "@/components/types";

/**
 * Em produção (Vercel), defina:
 * NEXT_PUBLIC_API_URL=https://sua-api.com
 * Em dev, cai para http://localhost:3001
 */
const DEFAULT_DEV_API = "http://localhost:3001";
const ENV_BASE = process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, ""); // sem barra final

function apiBase(): string {
  // Base prioridade: ENV → dev default
  return (ENV_BASE && ENV_BASE.length > 0 ? ENV_BASE : DEFAULT_DEV_API).replace(
    /\/+$/,
    ""
  );
}

function url(path: string) {
  const base = apiBase();
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
}

async function json<T>(input: RequestInfo, init?: RequestInit): Promise<T> {
  const res = await fetch(input, {
    // evita cache do Next em rotas server (SSRs e actions)
    cache: "no-store",
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
  });

  // tenta extrair mensagem do backend
  let body: any = null;
  const text = await res.text().catch(() => "");
  try {
    body = text ? JSON.parse(text) : null;
  } catch {
    body = text || null;
  }

  if (!res.ok) {
    const msg =
      (body && (body.message || body.error)) ||
      `HTTP ${res.status} ${res.statusText}`;
    throw new Error(typeof msg === "string" ? msg : "Erro na requisição");
  }

  return body as T;
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

/* opcional: marcar como comprado
export async function toggleItem(id: number, comprado: boolean): Promise<Item> {
  return json<Item>(url(`/items/${id}/toggle?purchased=${comprado}`), {
    method: "PATCH",
  });
}
*/
