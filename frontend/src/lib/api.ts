import type { Item } from "@/components/types";

const API_URL = "http://localhost:3001/items";

export async function fetchItems(): Promise<Item[]> {
    const res = await fetch(API_URL, { cache: "no-store" });
    return res.json();
}

export async function addItem(payload: Omit<Item, "id">): Promise<Item> {
    const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error("Erro ao adicionar item");
    return res.json();
}

export async function deleteItem(id: number): Promise<void> {
    const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
    });
    if (!res.ok) throw new Error("Erro ao deletar item");
}