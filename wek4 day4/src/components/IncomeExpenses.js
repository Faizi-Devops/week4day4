import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

//Money formatter function
function moneyFormatter(num) {
  let p = num.toFixed(2).split('.');
  return (
    '$ ' +
    p[0]
      .split('')
      .reverse()
      .reduce(function (acc, num, i, orig) {
        return num === '-' ? acc : num + (i && !(i % 3) ? ',' : '') + acc;
      }, '') +
    '.' +
    p[1]
  );
}

export const IncomeExpenses = () => {
  const { transactions } = useContext(GlobalContext);

  const amounts = transactions.map(transaction => transaction.amount);

  const income = amounts
    .filter(item => item > 0)
    .reduce((acc, item) => (acc += item), 0);

  const expense = (
    amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) *
    -1
  );

  return (
    <div className="inc-exp-container">
        <div clas>
          <p className=' text-[0.75rem] font-bold'>INCOME</p>
  <p className="text-[#2ecc71;] font-bold">{moneyFormatter(income)}</p>
        </div>
        <div>
        <p className=' text-[0.75rem] font-bold'>EXPENSE</p> 
  <p className="text-[#c0392b] font-bold">{moneyFormatter(expense)}</p>
        </div>
      </div>
  )
}
