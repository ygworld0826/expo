import { ethers } from "ethers";
import { getTransaction, getTransactionReceipt } from "./api";
import { Transaction } from "../types/transaction";

export const fetchTransactionDetails = async (txHash: string): Promise<Transaction> => {
  try {
    const tx = await getTransaction(txHash);
    if (!tx) throw new Error("Transaction not found: Invalid or non-existent txHash");

    const receipt = await getTransactionReceipt(txHash);
    if (!receipt) throw new Error("Transaction receipt not found");

    const block = await tx.getBlock();
    const timestamp = block?.timestamp;

    const txType = tx.type === 2 ? "Fee Delegated Smart Contract Execution" : "Unknown";
    const amount = ethers.formatEther(tx.value);
    const gasPrice = ethers.formatUnits(tx.gasPrice, "gwei");
    const effectiveGasPrice = gasPrice;
    const gasLimit = tx.gasLimit.toString();
    const gasUsed = receipt?.gasUsed.toString() || "0";
    const txFee = ethers.formatEther(BigInt(receipt?.gasUsed || 0) * tx.gasPrice);
    const burntFee = "0";
    const feePayer = (tx as any).feePayer || "N/A";
    const feeRatio = (tx as any).feeRatio || "1";
    const feePayerFee = txFee;
    const fromFee = "0";
    const nonce = tx.nonce.toString();
    const methodId = tx.data.slice(0, 10);
    const methodSig = "N/A";

    return {
      hash: tx.hash,
      status: receipt?.status,
      blockNumber: tx.blockNumber,
      timestamp,
      txType,
      from: tx.from,
      to: tx.to,
      amount,
      txFee,
      gasPrice,
      effectiveGasPrice,
      gasLimit,
      gasUsed,
      burntFee,
      feePayer,
      feeRatio,
      feePayerFee,
      fromFee,
      nonce,
      methodId,
      methodSig,
    };
  } catch (error) {
    console.error("Error fetching transaction details:", error);
    throw error;
  }
};