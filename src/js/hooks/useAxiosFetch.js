import { useEffect, useState } from "react"

const useAxiosFetch = (url, axios) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        if (mounted) {
          setData(response.data);
          setIsLoading(false);
        }
      } catch (error) {
        if (mounted) {
          setError(error);
          setIsLoading(false);
        }
      }
    };
    fetchData();
    return () => {
      mounted = false;
    };
  },[url]);

  return { data, isLoading, error };
};

export default useAxiosFetch;