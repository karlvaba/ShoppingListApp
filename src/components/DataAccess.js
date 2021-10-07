import { useState, useEffect } from 'react';

const dbUrl = "https://api.jsonbin.io/b/615e085caa02be1d44556536/latest"

const getAll = () => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
      fetch(dbUrl)
      .then(res => {
        if (!res.ok) { 
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
        setIsPending(false);
        setError(err.message);
      })
  }, [])

  return { data, isPending, error };
}
 
export default getAll;

export function update(data) {
  fetch('https://api.jsonbin.io/b/615e21759548541c29bf2c80', {
			method: 'PUT',
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data)
  }).then(() => {
    console.log("fetch done")	
  }).catch(err => {
    console.log(err)
  })
}



