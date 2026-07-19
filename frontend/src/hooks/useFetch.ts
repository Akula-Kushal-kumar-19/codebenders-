import { useEffect, useState, useCallback } from 'react';

interface UseFetchOptions {
  skipOnMount?: boolean;
  onError?: (error: Error) => void;
  retryCount?: number;
  retryDelay?: number;
}

export const useFetch = <T,>(
  fetchFn: () => Promise<T>,
  options: UseFetchOptions = {}
) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    let lastError: Error | null = null;
    const retryCount = options.retryCount ?? 0;
    const retryDelay = options.retryDelay ?? 1000;
    
    for (let attempt = 0; attempt <= retryCount; attempt++) {
      try {
        const result = await fetchFn();
        setData(result);
        return result;
      } catch (err) {
        lastError = err instanceof Error ? err : new Error('Unknown error');
        
        if (attempt < retryCount) {
          // Wait before retrying
          await new Promise(resolve => setTimeout(resolve, retryDelay * (attempt + 1)));
        }
      }
    }
    
    if (lastError) {
      setError(lastError);
      options.onError?.(lastError);
    }
    setLoading(false);
    throw lastError;
  }, [fetchFn, options]);

  useEffect(() => {
    if (!options.skipOnMount) {
      fetch().catch(err => {
        // Error is already handled in fetch()
        console.error('Fetch failed:', err);
      });
    }
  }, []);

  return { data, loading, error, refetch: fetch };
};
