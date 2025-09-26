"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useState } from "react";
import { ethers } from "ethers";

export default function ConnectWallet() {
  const [address, setAddress] = useState(null);

  // X402 connection handler
  const connectX402 = async () => {
    try {
      if (!window.ethereum) throw new Error("X402 wallet not installed");
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const addr = await signer.getAddress();
      setAddress(addr);
      alert("Connected X402: " + addr);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <ConnectButton />
      <button
        onClick={connectX402}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "#0c2f78",
          color: "white",
          borderRadius: "8px",
        }}
      >
        Connect X402 Wallet
      </button>
      {address && <p>Connected X402 Address: {address}</p>}
    </div>
  );
}
