export interface Transaction {
  hash: string;
  status?: number | null;
  blockNumber?: number | null;
  timestamp?: number;
  txType: string;
  from: string;
  to: string | null | undefined;
  amount: string;
  txFee: string;
  gasPrice: string;
  effectiveGasPrice: string;
  gasLimit: string;
  gasUsed: string;
  burntFee: string;
  feePayer: string;
  feeRatio: string;
  feePayerFee: string;
  fromFee: string;
  nonce: string;
  methodId: string;
  methodSig: string;
}