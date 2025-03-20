import { ethers } from "ethers";

const KAIROS_RPC_URL = "https://public-en.node.kaia.io";
const provider = new ethers.JsonRpcProvider(KAIROS_RPC_URL);

export const getBlockNumber = async (): Promise<number> => {
  return await provider.getBlockNumber();
};

export const getBlock = async (blockNumber: string | number) => {
  return await provider.getBlock(blockNumber);
};

export const getTransaction = async (txHash: string) => {
  return await provider.getTransaction(txHash);
};

export const getTransactionReceipt = async (txHash: string) => {
  return await provider.getTransactionReceipt(txHash);
};

export const getBalance = async (address: string) => {
  return await provider.getBalance(address);
};

export const getCode = async (address: string) => {
  return await provider.getCode(address);
};

export const getGasPrice = async () => {
  const feeData = await provider.getFeeData();
  return feeData.gasPrice!;
};