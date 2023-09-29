import { useEffect, useState } from "react"

const useAxiosFetch = (url, axios, disabled = false) => {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState(null)
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        if (mounted) {
          setData(response.data);
          setStatus(response.status);
          setIsLoading(false);
        }
      } catch (error) {
        if (mounted) {
          setError(error);
          setIsLoading(false);
          setStatus(error.response.status);
        }
      }
    };
    if(!disabled) fetchData();
    return () => {
      mounted = false;
    };
  },[url]);

  return { data, isLoading, error, status };
};

export default useAxiosFetch;