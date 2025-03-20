export interface Transaction {
  hash: string;
  from: string;
  to: string | null | undefined;
  value: string;
}

export interface Wallet {
  address: string;
  balance: string;
  transactions: Transaction[];
}