import React, { useState, useEffect } from "react";
import { fetchBlockDetails } from "../services/block";
import { Block } from "../types/block";
import "../assets/styles.css";

interface Props {
  blockNumber: string;
}

const BlockDetails: React.FC<Props> = ({ blockNumber }) => {
  const [block, setBlock] = useState<Block | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadBlock = async () => {
      try {
        const blockData = await fetchBlockDetails(blockNumber);
        setBlock(blockData);
        setError(null);
      } catch (err) {
        setError("Failed to fetch block details");
        console.error(err);
      }
    };
    loadBlock();
  }, [blockNumber]);

  if (error) return <div className="result error">{error}</div>;
  if (!block) return <div className="result">Loading...</div>;

  return (
    <div className="block-details">
      <h2>Block <span className="currency">ⓒ</span></h2>
      <table className="block-table">
        <tbody>
          <tr>
            <td className="label">Block #</td>
            <td className="value">{block.number}</td>
          </tr>
          <tr>
            <td className="label">Time</td>
            <td className="value">
              {new Date(block.timestamp * 1000).toLocaleString()} (
              {Math.floor((Date.now() / 1000 - block.timestamp) / 60)} min ago)
            </td>
          </tr>
          <tr>
            <td className="label">Transactions</td>
            <td className="value">{block.transactionCount}</td>
          </tr>
          <tr>
            <td className="label">Validator</td>
            <td className="value">
              <a href="#" className="link">{block.miner}</a>
              <button className="copy-button" onClick={() => navigator.clipboard.writeText(block.miner)}>
                📋
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default BlockDetails;