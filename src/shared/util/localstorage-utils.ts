

export const getLocalStorage = <T,>(key: string): T | null => {
  const jsonData = localStorage.getItem(key);
  const data = jsonData ? JSON.parse(jsonData) as T : null;
  return data;
}

export const setLocalStorage = <T,>(key: string, data: T) => {
  localStorage.setItem(key, JSON.stringify(data));
}

export const removeLocalStorage = (key: string) => {
  localStorage.removeItem(key);
}
