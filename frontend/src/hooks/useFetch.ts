import { useEffect, useState } from 'react';

interface UseFetchOptions {
  skipOnMount?: boolean;
  onError?: (error: Error) => void;
}

export const useFetch = <T,>(
  fetchFn: () => Promise<T>,
  options: UseFetchOptions = {}
) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetch = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchFn();
      setData(result);
      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error');
      setError(error);
      options.onError?.(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!options.skipOnMount) {
      fetch();
    }
  }, []);

  return { data, loading, error, refetch: fetch };
};
