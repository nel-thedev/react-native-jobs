import { useState, useEffect } from 'react';
import axios from 'axios';
import { REACT_APP_RAPID_API_KEY as rapidApiKey } from '@env';

// const rapidApiKey = REACT_APP_RAPID_API_KEY;
// console.log('API KEY', rapidApiKey, 'process.env', process.env);

const useFetch = (endpoint, query) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const options = {
    method: 'GET',
    url: `https://jsearch.p.rapidapi.com/${endpoint}`,
    headers: {
      'X-RapidAPI-Key': rapidApiKey,
      'X-RapidAPI-Host': 'jsearch.p.rapidapi.com',
    },
    params: { ...query },
  };

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await axios.request(options);
      setData(response.data.data);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      alert('There is an error');
      console.log(error);
    } finally {
      setIsLoading(false);
    }

    useEffect(() => {
      fetchData();
    }, []);

    const refetch = () => {
      setIsLoading(true);
      fetchData();
    };

    return { data, isLoading, error, refetch };
  };
};
