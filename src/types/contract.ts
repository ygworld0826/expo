export interface Transaction {
  hash: string;
  from: string;
}

export interface Contract {
  address: string;
  code: string;
  interactions: Transaction[];
}