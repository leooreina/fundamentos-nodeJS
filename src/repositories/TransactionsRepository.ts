import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  private balance: Balance;

  constructor() {
    this.transactions = [];
    this.balance = { income: 0, outcome: 0, total: 0 };
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const incomes = this.transactions
      .filter(transaction => transaction.type === 'income')
      .reduce((prevValue, { value }) => prevValue + value, 0);

    const outcomes = this.transactions
      .filter(transaction => transaction.type === 'outcome')
      .reduce((prevValue, { value }) => prevValue + value, 0);

    this.balance = {
      income: incomes,
      outcome: outcomes,
      total: incomes - outcomes,
    };

    return this.balance;
  }

  public create({ title, value, type }: TransactionDTO): Transaction {
    const transactionToCreate = new Transaction({
      title,
      value,
      type,
    });
    this.transactions.push(transactionToCreate);
    this.balance = this.getBalance();
    return transactionToCreate;
  }
}

export default TransactionsRepository;
