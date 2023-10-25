import axios from "axios";
import { useState, useEffect } from "react";

export const useFetchRequests = (url) => {
  const [data, setData] = useState([]);

  const fetchRequest = async () => {
    const response = await axios.get(url);
    if (response && response.data) {
      setData(response.data.data);
      console.log(response)
    }
  };

  useEffect(() => {
    fetchRequest();
  }, []);

  return { data };
};

export const usePostRequest = (url, object) => { };

export const useUpdateRequest = (url, object) => { };

export const useDeleteRequest = (url, query) => { };
