import { ethers } from "ethers";
import { getBalance } from "./api";
import { Wallet } from "../types/wallet";

export const fetchWalletDetails = async (address: string): Promise<Wallet> => {
  const balance = await getBalance(address);
  const balanceInEth = ethers.formatEther(balance);

  const transactions: { hash: string; from: string; to: string | null | undefined; value: string }[] = [];

  return {
    address,
    balance: balanceInEth,
    transactions,
  };
};