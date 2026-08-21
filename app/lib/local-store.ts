/**
 * A tiny IndexedDB key/value store for work-in-progress.
 *
 * Why IndexedDB and not localStorage: it holds Blobs and File objects
 * directly and has no ~5MB ceiling, so a real PDF fits.
 *
 * PRIVACY: this writes the user's document to disk, which survives closing
 * the tab. That is a genuine change from "gone the moment you leave", so
 * anything using it must SAY so in the UI and offer a one-click clear.
 * Entries older than MAX_AGE are dropped on open so a file cannot linger
 * indefinitely on a shared machine.
 */

const DB = "inerate-tools";
const STORE = "wip";
const MAX_AGE = 24 * 60 * 60 * 1000; // 24h

interface Entry<T> {
  key: string;
  savedAt: number;
  value: T;
}

function open(): Promise<IDBDatabase> {
  return new Promise((res, rej) => {
    const req = indexedDB.open(DB, 1);
    req.onupgradeneeded = () => {
      if (!req.result.objectStoreNames.contains(STORE)) {
        req.result.createObjectStore(STORE, { keyPath: "key" });
      }
    };
    req.onsuccess = () => res(req.result);
    req.onerror = () => rej(req.error);
  });
}

function tx<T>(mode: IDBTransactionMode, run: (s: IDBObjectStore) => IDBRequest): Promise<T | null> {
  return open()
    .then(
      (db) =>
        new Promise<T | null>((res, rej) => {
          const req = run(db.transaction(STORE, mode).objectStore(STORE));
          req.onsuccess = () => res(req.result as T);
          req.onerror = () => rej(req.error);
        }),
    )
    // Private-browsing and storage-blocked contexts throw here. Losing the
    // draft is acceptable; breaking the tool is not.
    .catch(() => null);
}

export async function saveWip<T>(key: string, value: T): Promise<void> {
  await tx("readwrite", (s) => s.put({ key, savedAt: Date.now(), value } satisfies Entry<T>));
}

export async function loadWip<T>(key: string): Promise<{ value: T; savedAt: number } | null> {
  const hit = await tx<Entry<T> | undefined>("readonly", (s) => s.get(key));
  if (!hit) return null;
  if (Date.now() - hit.savedAt > MAX_AGE) {
    await clearWip(key);
    return null;
  }
  return { value: hit.value, savedAt: hit.savedAt };
}

export async function clearWip(key: string): Promise<void> {
  await tx("readwrite", (s) => s.delete(key));
}
