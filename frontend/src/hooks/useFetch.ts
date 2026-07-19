import { useEffect, useState, useCallback, useRef } from 'react';

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
  const hasRunRef = useRef(false);

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
        setLoading(false);
        return result;
      } catch (err) {
        lastError = err instanceof Error ? err : new Error('Unknown error');
        console.error('Fetch error attempt', attempt + 1, ':', lastError);
        
        if (attempt < retryCount) {
          // Wait before retrying
          await new Promise(resolve => setTimeout(resolve, retryDelay * (attempt + 1)));
        }
      }
    }
    
    if (lastError) {
      setError(lastError);
      options.onError?.(lastError);
      console.error('Final fetch error:', lastError);
    }
    setLoading(false);
    if (lastError) throw lastError;
  }, [fetchFn, options]);

  useEffect(() => {
    // Only run once on mount to prevent infinite loops
    if (!hasRunRef.current && !options.skipOnMount) {
      hasRunRef.current = true;
      fetch().catch(err => {
        console.error('Fetch failed:', err);
      });
    }
  }, []); // Empty dependency array - only run on mount

  return { data, loading, error, refetch: fetch };
};
