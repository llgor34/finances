import { projectFirestore, timestamp } from '../firebase/config';
import { useReducer, useEffect, useState } from 'react';

const initial = {
  document: null,
  isPending: false,
  error: null,
  success: null,
};

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case 'ADDED_DOCUMENT':
      return {
        ...state,
        success: true,
        isPending: false,
        document: action.payload,
        error: null,
      };

    case 'DELETED_DOCUMENT':
      return {
        ...state,
        isPending: false,
        document: null,
        error: null,
        success: true,
      };

    case 'IS_PENDING':
      return {
        ...state,
        isPending: true,
        document: null,
        success: false,
        error: null,
      };

    case 'ERROR':
      return {
        ...state,
        isPending: false,
        error: action.payload,
        document: null,
        success: false,
      };

    default:
      return state;
  }
};

const useFirestore = (collection) => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [response, dispatch] = useReducer(firestoreReducer, initial);

  // collection ref
  const ref = projectFirestore.collection(collection);

  // only dispatch if not cancelled
  const dispatchIfNotCancelled = (action) => {
    if (!isCancelled) {
      dispatch(action);
    }
  };

  // add a new document
  const addDocument = async (doc) => {
    dispatch({ type: 'IS_PENDING' });

    try {
      const createdAt = timestamp.fromDate(new Date());
      const addedDocument = await ref.add({ ...doc, createdAt });
      dispatchIfNotCancelled({
        type: 'ADDED_DOCUMENT',
        payload: addedDocument,
      });
    } catch (err) {
      dispatchIfNotCancelled({ type: 'ERROR', payload: err.message });
    }
  };

  // delete a document
  const deleteDocument = async (id) => {
    dispatch({ type: 'IS_PENDING' });
    try {
      await ref.doc(id).delete();
      dispatchIfNotCancelled({
        type: 'DELETED_DOCUMENT',
      });
    } catch (err) {
      dispatchIfNotCancelled({ type: 'ERROR', payload: err.message });
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { response, addDocument, deleteDocument };
};

export { useFirestore };
