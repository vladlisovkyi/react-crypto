import { useState, useEffect } from "react";
import axios, { AxiosResponse, AxiosError } from "axios";

interface UseFetchProps<T> {
  url: string;
  initialData?: T | null;
}

interface UseFetchResult<T> {
  data: T | null;
  isLoading: boolean;
  error: AxiosError<any> | null;
}

const useFetch = <T>({
  url,
  initialData = null,
}: UseFetchProps<T>): UseFetchResult<T> => {
  const [data, setData] = useState<T | null>(initialData);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<AxiosError<any> | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: AxiosResponse<T> = await axios.get(
          `https://api.coingecko.com/api/v3/${url}`
        );

        setData(response.data);
        setIsLoading(false);
        setError(null);
      } catch (error) {
        setError(error as any);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, isLoading, error };
};

export default useFetch;
