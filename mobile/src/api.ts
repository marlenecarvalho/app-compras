import Constants from 'expo-constants';

const API_URL = process.env.EXPO_PUBLIC_API_URL ?? ((Constants.expoConfig?.extra as any)?.EXPO_PUBLIC_API_URL) ??
 'http://http://192.168.10.38:3001';

 console.log('[API URL]', API_URL);

async function j(url: string, init?: RequestInit) {
  const r = await fetch(`${API_URL}${url}`, {
    ...init,
    headers: { 'Content-Type': 'application/json', ...(init?.headers || {}) },
  });
  if (!r.ok) throw new Error(await r.text());
  return r.json();
}
export const Api = {
  listItems: () => j('/items'),
  createItem: (p:{nome:string; quantidade:number; unidade:string; categoria:string}) =>
    j('/items', { method:'POST', body: JSON.stringify(p) }),
  toggle: (id:number, v:boolean) => j(`/items/${id}/toggle?purchased=${v}`, { method:'PATCH' }),
  remove: (id:number) => j(`/items/${id}`, { method:'DELETE' }),
  listCategories: () => j('/categories'),
};
