import { useEffect, useState } from 'react';
import { Artwork } from '../types/artwork';
import { fetchArtworks } from '../api/artworksApi';

export function useArtworks(page: number, rows: number) {
  const [data, setData] = useState<Artwork[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let active = true;
    setLoading(true);

    fetchArtworks(page, rows)
      .then(res => {
        if (!active) return;
        setData(res.data);
        setTotal(res.pagination.total);
      })
      .catch(console.error)
      .finally(() => setLoading(false));

    return () => {
      active = false;
    };
  }, [page, rows]);

  return { data, total, loading };
}
