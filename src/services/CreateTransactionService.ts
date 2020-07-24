import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface TransactionRequestDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface BalanceRequestDTO {
  income: number;
  outcome: number;
  total: number;
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  private balance: BalanceRequestDTO;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
    this.balance = transactionsRepository.getBalance();
  }

  public execute({ title, value, type }: TransactionRequestDTO): Transaction {
    if (type === 'outcome' && value > this.balance.total) {
      throw Error('Outcome value is above the total in the balance');
    }

    if (type === 'outcome') {
      this.balance.outcome += value;
    }

    if (type === 'income') {
      this.balance.income += value;
    }

    this.balance.total = this.balance.income - this.balance.outcome;

    const transaction = this.transactionsRepository.create({
      transaction: {
        title,
        value,
        type,
      },
      balance: {
        income: this.balance.income,
        outcome: this.balance.outcome,
        total: this.balance.total,
      },
    });

    return transaction;
  }
}

export default CreateTransactionService;
