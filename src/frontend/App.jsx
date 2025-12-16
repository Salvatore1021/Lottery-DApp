import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { CONTRACT_ADDRESS, ABI } from "./contractConfig";
import "./App.css";

function App() {
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  
  const [ticketPrice, setTicketPrice] = useState("0");
  const [balance, setBalance] = useState("0");
  const [players, setPlayers] = useState([]);
  const [lastWinner, setLastWinner] = useState("None");
  const [charity, setCharity] = useState("Fetching Partner...");
  
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // 1. Connect Wallet
  const connectWallet = async () => {
    if (!window.ethereum) return alert("Please install MetaMask");
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      setAccount(address);
      
      const tempContract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
      setContract(tempContract);
      setStatus("Wallet connected");
    } catch (err) {
      console.error(err);
      setStatus("Connection failed");
    }
  };

  // 2. Load Data
  const loadInfo = async () => {
    if (!contract) return;
    setIsLoading(true);
    try {
      const price = await contract.ticketPrice();
      setTicketPrice(ethers.formatEther(price));

      const bal = await contract.getBalance();
      setBalance(ethers.formatEther(bal));

      const p = await contract.getPlayers();
      setPlayers(p);

      const w = await contract.lastWinner();
      setLastWinner(w === "0x0000000000000000000000000000000000000000" ? "None" : w);

      const c = await contract.charityAddress();
      setCharity(c);
      
    } catch (err) {
      console.error(err);
      setStatus("Error loading data");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (contract) loadInfo();
  }, [contract]);

  // 3. Buy Ticket
  const buyTicket = async () => {
    if (!contract) return alert("Connect Wallet First");
    try {
      setStatus("Buying ticket... confirm in MetaMask.");
      const price = await contract.ticketPrice();
      const tx = await contract.buyTicket({ value: price });
      await tx.wait();
      setStatus("Success! Ticket bought.");
      loadInfo();
    } catch (err) {
      console.error(err);
      setStatus("Transaction failed or rejected.");
    }
  };

  // 4. Pick Winner
  const pickWinner = async () => {
    if (!contract) return alert("Connect Wallet First");
    try {
      setStatus("Picking winner...");
      const tx = await contract.pickWinner();
      await tx.wait();
      setStatus("Winner picked!");
      loadInfo();
    } catch (err) {
      console.error(err);
      setStatus("Transaction failed (Only Owner)");
    }
  };

  return (
    <div className="app-container">
      <div className="lottery-card">
        {/* CHANGED TITLE AS REQUESTED */}
        <h1>🎉 Lottery DApp</h1>
        <p className="sub-text">
          Ticket Price: <strong>{ticketPrice} ETH</strong>
        </p>

        {/* Wallet Connection */}
        {!account ? (
          <button className="btn-connect" onClick={connectWallet}>
            Connect Wallet
          </button>
        ) : (
          <div className="wallet-info">
            <span className="stat-label">Connected: </span>
            <span className="stat-value-small">
              {account.slice(0, 6)}...{account.slice(-4)}
            </span>
          </div>
        )}

        <hr className="divider" />

        {/* Stats Grid */}
        <div className="stats-grid">
          <div className="stat-box">
            <div className="stat-label">Pot Balance</div>
            <div className="stat-value">{balance} ETH</div>
          </div>
          <div className="stat-box">
            <div className="stat-label">Players</div>
            <div className="stat-value">{players.length}</div>
          </div>
        </div>

        {/* Buy Button */}
        <button className="btn-buy" onClick={buyTicket} disabled={isLoading}>
          🎟 Buy Ticket
        </button>

        {/* Charity Section (Kept logic, just updated look) */}
        <div className="charity-section">
          <div className="stat-label" style={{ color: "#155724" }}>❤️ Charity Partner</div>
          <div className="charity-address">{charity}</div>
          <div className="stat-label" style={{ marginTop: "5px" }}>
            Receives 10% of every pot
          </div>
        </div>

        {/* Admin Section */}
        <button className="btn-winner" onClick={pickWinner} disabled={isLoading}>
          👑 Pick Winner
        </button>

        {/* Footer Info */}
        <div className="footer-info">
          <div className="stat-label">Last Winner:</div>
          <div className="charity-address" style={{ color: "#d35400", borderColor: "#ffeaa7" }}>
             {lastWinner}
          </div>
        </div>
        
        <p className="status-text">{status}</p>
        <button className="btn-refresh" onClick={loadInfo}>🔄 Refresh Data</button>
      </div>
    </div>
  );
}

export default App;