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

interface CreateTransactionDTO {
  transaction: TransactionDTO;
  balance: Balance;
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
    const incomes = this.transactions.filter(
      transaction => transaction.type === 'income',
    );
    const outcomes = this.transactions.filter(
      transaction => transaction.type === 'outcome',
    );
  }

  public create({ transaction, balance }: CreateTransactionDTO): Transaction {
    const transactionToCreate = new Transaction({
      title: transaction.title,
      value: transaction.value,
      type: transaction.type,
    });

    this.transactions.push(transactionToCreate);
    this.balance = balance;

    return transactionToCreate;
  }
}

export default TransactionsRepository;
