import React, { useContext } from 'react';
import { Transaction } from './Transaction';

import { GlobalContext } from '../context/GlobalState';

export const TransactionList = () => {
  const { transactions } = useContext(GlobalContext);

  return (
    <div>
      <p className='pt-[0.5rem] font-bold text-white'>History</p>
      <div className='pt-[0.5rem]'>
      <hr/>
      </div>
      
      <ul className="list">
        {transactions.map(transaction => (<Transaction key={transaction.id} transaction={transaction} />))}
      </ul>
    </div>
  )
}
