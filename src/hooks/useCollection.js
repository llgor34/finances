import { projectFirestore } from '../firebase/config';
import { useState, useEffect, useRef } from 'react';

export const useCollection = (collection, _query, _orderBy) => {
  const [isPending, setIsPending] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [error, setError] = useState(null);

  const query = useRef(_query).current;
  const orderBy = useRef(_orderBy).current;

  useEffect(() => {
    setIsPending(true);
    let ref = projectFirestore.collection(collection);

    if (query) {
      ref = ref.where(...query);
    }

    if (orderBy) {
      ref = ref.orderBy(...orderBy);
    }

    const unsub = ref.onSnapshot(
      (snapshot) => {
        const results = [];
        snapshot.docs.forEach((doc) => {
          results.push({ ...doc.data(), id: doc.id });
        });

        // update state
        setDocuments(results);
        setError(null);
      },
      (error) => {
        console.log(error);
        setError(error.message);
      }
    );

    setIsPending(false);

    // unsubscribe on unmount
    return () => unsub();
  }, [collection, query, orderBy]);

  return { error, isPending, documents };
};
