import React, { useState, useEffect } from "react";
import { fetchWalletDetails } from "../services/wallet";
import { Wallet, Transaction } from "../types/wallet";

interface Props {
  address: string;
}

const WalletDetails: React.FC<Props> = ({ address }) => {
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadWallet = async () => {
      try {
        const walletData = await fetchWalletDetails(address);
        setWallet(walletData);
        setError(null);
      } catch (err) {
        setError("Failed to fetch wallet details");
        console.error(err);
      }
    };
    loadWallet();
  }, [address]);

  if (error) return <div className="result error">{error}</div>;
  if (!wallet) return <div className="result">Loading...</div>;

  return (
    <div className="result">
      <p><strong>Address:</strong> {wallet.address}</p>
      <p><strong>Balance:</strong> {wallet.balance} ETH</p>
      <h3>Transaction History</h3>
      {wallet.transactions.length > 0 ? (
        wallet.transactions.map((tx: Transaction, index: number) => (
          <div key={index}>
            <p><strong>Tx Hash:</strong> {tx.hash}</p>
            <p><strong>From:</strong> {tx.from}</p>
            <p><strong>To:</strong> {tx.to || "N/A"}</p>
            <p><strong>Value:</strong> {tx.value} ETH</p>
          </div>
        ))
      ) : (
        <p>No transactions found</p>
      )}
    </div>
  );
};

export default WalletDetails;