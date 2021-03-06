import { useState, useEffect } from 'react';

export const useFetchCharacter = ({
  type,
  query,
  page
}) => {

  const [ data, setData] = useState({});
  const [ loading, setLoading ] = useState(true);
  const baseUrl = `https://rickandmortyapi.com/api/`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${baseUrl}${type}/?${query? query : ''}${page? page : ''}`);
        const data = await response.json();
        setData(data);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    }
    fetchData();
  },[ baseUrl, type, query, page ]);

  return [ data, loading ];
}
