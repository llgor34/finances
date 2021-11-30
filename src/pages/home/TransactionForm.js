import { useState, useEffect } from 'react';
import { useFirestore } from '../../hooks/useFirestore';

const TransactionForm = (props) => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const { response, addDocument } = useFirestore('transactions');

  const { uid } = props;

  const handleSubmit = (e) => {
    e.preventDefault();

    addDocument({ name, amount, uid });
  };

  useEffect(() => {
    if (response.success) {
      setAmount('');
      setName('');
    }
  }, [response.success]);

  return (
    <>
      <h3>Add a Transaction</h3>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Transaction name:</span>
          <input
            type="text"
            required
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </label>
        <label>
          <span>Amount ($):</span>
          <input
            type="number"
            required
            onChange={(e) => setAmount(e.target.value)}
            value={amount}
          />
        </label>
        {!response.isPending && <button>Add Transaction</button>}
        {response.isPending && <button disabled>Adding...</button>}
      </form>
    </>
  );
};

export default TransactionForm;
