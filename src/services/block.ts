import { getBlock } from "./api";
import { Block } from "../types/block";

export const fetchBlockDetails = async (blockNumber: string): Promise<Block> => {
  const block = await getBlock(parseInt(blockNumber));
  if (!block) throw new Error("Block not found");

  return {
    number: block.number,
    transactionCount: block.transactions.length,
    timestamp: block.timestamp,
    miner: block.miner,
  };
};