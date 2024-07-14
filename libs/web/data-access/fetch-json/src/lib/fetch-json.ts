export const fetchJson = async <T>(path: string): Promise<T> => {
  const response = await fetch(`http://127.0.0.1:5500/files/${path}.json`);
  return response.json();
};
