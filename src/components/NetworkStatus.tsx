import React, { useState, useEffect } from "react";
import { fetchNetworkStatus } from "../services/network";
import { NetworkStatus as NetworkStatusType } from "../types/network";

const NetworkStatus: React.FC = () => {
  const [status, setStatus] = useState<NetworkStatusType | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadStatus = async () => {
      try {
        const networkStatus = await fetchNetworkStatus();
        setStatus(networkStatus);
        setError(null);
      } catch (err) {
        setError("Failed to fetch network status");
        console.error(err);
      }
    };
    loadStatus();
    const interval = setInterval(loadStatus, 30000); // 30초마다 갱신
    return () => clearInterval(interval);
  }, []);

  if (error) return <div className="result error">{error}</div>;
  if (!status) return <div className="result">Loading...</div>;

  return (
    <div className="result">
      <p><strong>Latest Block:</strong> {status.latestBlock}</p>
      <p><strong>Average Block Time:</strong> {status.avgBlockTime} seconds</p>
      <p><strong>Transaction Speed:</strong> {status.txSpeed} tx/s</p>
      <p><strong>Average Gas Price:</strong> {status.avgGasPrice} Gwei</p>
    </div>
  );
};

export default NetworkStatus;