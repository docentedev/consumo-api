import { useState, useEffect } from "react";
import type { ResponsePeople } from "./types";
import { getPeople } from "./index";

const useGetPeople = () => {
  const [data, setData] = useState<ResponsePeople | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    try {
      const result = await getPeople();
      setData(result);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, error };
};

export default useGetPeople;
