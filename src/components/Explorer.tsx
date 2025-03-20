import React, { useState } from "react";
import TransactionDetails from "./TransactionDetails";
import BlockDetails from "./BlockDetails";
import "../assets/styles.css";

const Explorer: React.FC = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchType, setSearchType] = useState<"block" | "tx" | null>(null);
  const [searchResult, setSearchResult] = useState<{ type: "block" | "tx"; value: string } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = () => {
    setError(null);
    setIsLoading(true);
    if (/^\d+$/.test(searchInput)) {
      setSearchType("block");
      setSearchResult({ type: "block", value: searchInput });
    } else if (searchInput.startsWith("0x") && searchInput.length === 66) {
      setSearchType("tx");
      setSearchResult({ type: "tx", value: searchInput });
    } else {
      setSearchType(null);
      setSearchResult(null);
      setError("Please enter a valid Block Number or TX Hash (0x followed by 64 characters)");
    }
    setTimeout(() => setIsLoading(false), 500);
  };

  const handleReset = () => {
    setSearchInput("");
    setSearchType(null);
    setSearchResult(null);
    setError(null);
    setIsLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="kaiascan-container">
      {/* 상단 네비게이션 바 */}
      <header className="header">
        <div className="logo">KairosScan</div>
        <nav className="nav">
          <a href="#" className="nav-link">Home</a>
          <div className="dropdown">
            <a href="#" className="nav-link dropdown-toggle">Blockchain</a>
            <div className="dropdown-menu">
              <a href="#" className="dropdown-item">Blocks</a>
              <a href="#" className="dropdown-item">Transactions</a>
              <a href="#" className="dropdown-item">Validators</a>
            </div>
          </div>
          <div className="dropdown">
            <a href="#" className="nav-link dropdown-toggle">Tokens</a>
            <div className="dropdown-menu">
              <a href="#" className="dropdown-item">Token Transfers</a>
              <a href="#" className="dropdown-item">Token Holders</a>
            </div>
          </div>
          <a href="#" className="nav-link">NFTs</a>
        </nav>
      </header>

      {/* 상단 광고 배너 */}
      <div className="ad-banner">
        <span className="ad-text">
          Sponsored: <a href="#">KaiaScan Open API</a> - Your Gateway to the most extensive Kaia Blockchain Data. Start Building with OAPI NOW!
        </span>
      </div>

      {/* 검색 영역 */}
      <div className="search-container">
        <div className="search-bar">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search by Block Number or TX Hash"
            className="search-input"
          />
          <button onClick={handleSearch} className="search-button">
            <i className="fas fa-search search-icon"></i>
          </button>
          <button onClick={handleReset} className="reset-button">
            Reset
          </button>
        </div>
      </div>

      {/* 에러 및 로딩 메시지 */}
      {error && <div className="result error">{error}</div>}
      {isLoading && (
        <div className="loading-container">
          <div className="metaverse-spinner"></div>
          <p className="loading-text">Loading...</p>
        </div>
      )}

      {/* 결과 영역 */}
      {!isLoading && searchResult && (
        <div className="result-container">
          {/* 탭 네비게이션 */}
          <div className="tabs">
            <button className="tab active">Overview</button>
            <button className="tab">Event Logs</button>
            <button className="tab">Internal Transactions</button>
            <button className="tab">Input Data</button>
            <button className="tab">Raw Data</button>
          </div>

          {/* 결과 표시 */}
          {searchResult.type === "block" && (
            <div className="result-section">
              <BlockDetails blockNumber={searchResult.value} />
            </div>
          )}
          {searchResult.type === "tx" && (
            <div className="result-section">
              <TransactionDetails txHash={searchResult.value} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Explorer;