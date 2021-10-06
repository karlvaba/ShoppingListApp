import { useState, useEffect } from 'react';

const dbUrl = "https://api.jsonbin.io/b/615dbfb6aa02be1d445545d0/1"

const getAll = () => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
      fetch(dbUrl)
      .then(res => {
        if (!res.ok) { // error coming back from server
          throw Error('could not fetch the data for that resource');
        } 
        return res.json();
      })
      .then(data => {
        setIsPending(false);
        setData(data);
        setError(null);
      })
      .catch(err => {
        // auto catches network / connection error
        setIsPending(false);
        setError(err.message);
      })
  }, [])

  return { data, isPending, error };
}
 
export default getAll;
