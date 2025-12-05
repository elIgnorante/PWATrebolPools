const DB_NAME = 'trebol-pwa';
const DB_VERSION = 1;
const STORE_MESSAGES = 'pendingMessages';
const STORE_INSIGHTS = 'insights';

const openDatabase = () =>
  new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onerror = () => reject(request.error);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_MESSAGES)) {
        db.createObjectStore(STORE_MESSAGES, { keyPath: 'id', autoIncrement: true });
      }
      if (!db.objectStoreNames.contains(STORE_INSIGHTS)) {
        db.createObjectStore(STORE_INSIGHTS, { keyPath: 'id' });
      }
    };
    request.onsuccess = () => resolve(request.result);
  });

export const savePendingMessage = async (message) => {
  const db = await openDatabase();
  const tx = db.transaction(STORE_MESSAGES, 'readwrite');
  tx.objectStore(STORE_MESSAGES).add({ ...message, createdAt: new Date().toISOString() });
  return tx.complete;
};

export const listPendingMessages = async () => {
  const db = await openDatabase();
  const tx = db.transaction(STORE_MESSAGES, 'readonly');
  return tx.objectStore(STORE_MESSAGES).getAll();
};

export const clearPendingMessages = async () => {
  const db = await openDatabase();
  const tx = db.transaction(STORE_MESSAGES, 'readwrite');
  tx.objectStore(STORE_MESSAGES).clear();
  return tx.complete;
};

export const saveInsights = async (insights) => {
  const db = await openDatabase();
  const tx = db.transaction(STORE_INSIGHTS, 'readwrite');
  insights.forEach((insight) => tx.objectStore(STORE_INSIGHTS).put(insight));
  return tx.complete;
};

export const getInsights = async () => {
  const db = await openDatabase();
  const tx = db.transaction(STORE_INSIGHTS, 'readonly');
  return tx.objectStore(STORE_INSIGHTS).getAll();
};
