import { ApiResponse } from '../types/artwork';

const BASE_URL = 'https://api.artic.edu/api/v1/artworks';

export async function fetchArtworks(page: number, limit: number): Promise<ApiResponse> {
  const res = await fetch(`${BASE_URL}?page=${page}&limit=${limit}`);

  if (!res.ok) throw new Error('Failed to fetch artworks');
  return res.json();
}
