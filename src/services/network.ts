import { ethers } from "ethers";
import { getBlockNumber, getBlock, getGasPrice } from "./api";
import { NetworkStatus } from "../types/network";

export const fetchNetworkStatus = async (): Promise<NetworkStatus> => {
  const latestBlockNumber = await getBlockNumber();
  const latestBlock = await getBlock(latestBlockNumber);
  const previousBlock = await getBlock(latestBlockNumber - 10);

  if (!latestBlock || !previousBlock) {
    throw new Error("Failed to fetch block data");
  }

  const avgBlockTime = (latestBlock.timestamp - previousBlock.timestamp) / 10;
  const txSpeed = latestBlock.transactions.length / avgBlockTime;
  const gasPrice = await getGasPrice();

  return {
    latestBlock: latestBlockNumber,
    avgBlockTime,
    txSpeed,
    avgGasPrice: ethers.formatUnits(gasPrice, "gwei"),
  };
};