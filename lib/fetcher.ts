export const fetcher = async <T = unknown>(url: string): Promise<T> => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`An error occurred while fetching data: ${res.statusText}`);
  }
  return res.json();
};
