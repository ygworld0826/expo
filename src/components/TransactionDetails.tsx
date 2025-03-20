import React, { useState, useEffect } from "react";
import { fetchTransactionDetails } from "../services/transaction";
import { Transaction } from "../types/transaction";
import "../assets/styles.css";

interface Props {
  txHash: string;
}

const TransactionDetails: React.FC<Props> = ({ txHash }) => {
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTransaction = async () => {
      try {
        const tx = await fetchTransactionDetails(txHash);
        setTransaction(tx);
        setError(null);
      } catch (err: any) {
        setError(err.message || "Failed to fetch transaction details. Please check the txHash or network connection.");
        console.error("TransactionDetails error:", err);
      }
    };
    loadTransaction();
  }, [txHash]);

  if (error) return <div className="result error">{error}</div>;
  if (!transaction) return <div className="result">Loading...</div>;

  return (
    <div className="transaction-details">
      <h2>Transaction <span className="currency">ⓒ</span></h2>
      <table className="transaction-table">
        <tbody>
          <tr>
            <td className="label">TX Hash</td>
            <td className="value">
              {transaction.hash}
              <button className="copy-button" onClick={() => navigator.clipboard.writeText(transaction.hash)}>
                📋
              </button>
            </td>
          </tr>
          <tr>
            <td className="label">Status</td>
            <td className="value">
              {transaction.status === 1 ? (
                <span className="status success">✓ Success</span>
              ) : transaction.status === 0 ? (
                <span className="status failed">Failed</span>
              ) : (
                <span className="status pending">Pending</span>
              )}
            </td>
          </tr>
          <tr>
            <td className="label">Block #</td>
            <td className="value">
              <a href="#" className="link">{transaction.blockNumber || "Pending"}</a>
            </td>
          </tr>
          <tr>
            <td className="label">Time</td>
            <td className="value">
              {transaction.timestamp
                ? `${new Date(transaction.timestamp * 1000).toLocaleString()} (${Math.floor((Date.now() / 1000 - transaction.timestamp) / 60)} min ago)`
                : "N/A"}
            </td>
          </tr>
          <tr>
            <td className="label">TX Type</td>
            <td className="value">{transaction.txType}</td>
          </tr>
          <tr>
            <td className="label">From</td>
            <td className="value">
              <a href="#" className="link">{transaction.from}</a>
              <button className="copy-button" onClick={() => navigator.clipboard.writeText(transaction.from)}>
                📋
              </button>
            </td>
          </tr>
          <tr>
            <td className="label">To</td>
            <td className="value">
              {transaction.to ? (
                <>
                  <a href="#" className="link">{transaction.to}</a>
                  <button className="copy-button" onClick={() => navigator.clipboard.writeText(transaction.to!)}>
                    📋
                  </button>
                </>
              ) : (
                "N/A"
              )}
            </td>
          </tr>
          <tr>
            <td className="label">Amount</td>
            <td className="value">{transaction.amount} KAIA ($0)</td>
          </tr>
          <tr>
            <td className="label">TX Fee</td>
            <td className="value">{transaction.txFee} KAIA ($0.0001)</td>
          </tr>
          <tr>
            <td className="label">Gas Price</td>
            <td className="value">{transaction.gasPrice} KAIA</td>
          </tr>
          <tr>
            <td className="label">Effective Gas Price</td>
            <td className="value">{transaction.effectiveGasPrice} KAIA</td>
          </tr>
          <tr>
            <td className="label">Gas Limit & Usage by TX</td>
            <td className="value">
              {transaction.gasLimit} / {transaction.gasUsed} (
              {((parseInt(transaction.gasUsed) / parseInt(transaction.gasLimit)) * 100).toFixed(2)}%)
            </td>
          </tr>
          <tr>
            <td className="label">Burnt Fee</td>
            <td className="value">{transaction.burntFee} KAIA ($0.0001)</td>
          </tr>
          <tr>
            <td className="label">Fee Payer</td>
            <td className="value">{transaction.feePayer}</td>
          </tr>
          <tr>
            <td className="label">Nonce</td>
            <td className="value">{transaction.nonce}</td>
          </tr>
          <tr>
            <td className="label">Method ID</td>
            <td className="value">{transaction.methodId}</td>
          </tr>
          <tr>
            <td className="label">Method Sig</td>
            <td className="value">
              {transaction.methodSig} <span className="method-sig">🛠️</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TransactionDetails;