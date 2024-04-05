import { useEffect, useState } from "react";
import { getErrorMessage } from "../utils/error-handling";

type UseFetchProps<TData> = {
  data?: TData;
  error?: string;
  loading: boolean;
};

export const useFetch = <TData extends object>(
  url: string,
  options: RequestInit
): UseFetchProps<TData> => {
  const [data, setData] = useState<TData | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData(url: string) {
      setLoading(true);
      setError(undefined);
      try {
        const response = await fetch(url, options);
        const data = await response.json();
        setData(data);
        setLoading(false);
      } catch (error) {
        const message = getErrorMessage(error);
        console.error(message);
        setError(message);
      } finally {
        setLoading(false);
      }
    }
    fetchData(url);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return { data, error, loading };
};
