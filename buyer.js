// import express from "express";
// import cors from "cors";
// import { paymentMiddleware } from "x402-express";
// import dotenv from "dotenv";

// dotenv.config();
// const app = express();
// app.use(express.json());

// // Enable CORS for frontend testing
// app.use(cors({ origin: "*" }));

// // Setup payment middleware for mirror trade
// app.use(
//   paymentMiddleware(
//     process.env.PAYMENT_ADDRESS, // seller public address
//     {
//       "POST /buyer/mirror": {
//         price: "$5", // amount per bet
//         network: "polygon-amoy",
//         config: {
//           description: "Mirror trade session",
//           inputSchema: {
//             type: "object",
//             properties: {
//               category: { type: "string" },
//               trader: { type: "string" },
//               bets: { type: "number" },
//               amount: { type: "number" },
//             },
//           },
//         },
//       },
//     },
//     { url: process.env.FACILITATOR_URL }
//   )
// );

// app.post("/buyer/mirror", async (req, res) => {
//   try {
//     const { category, trader, bets, amount, totalCost } = req.body;

//     console.log("=== Mirror Trade Request ===");
//     console.log("Category:", category);
//     console.log("Trader:", trader);
//     console.log("Bets:", bets);
//     console.log("Amount per bet:", amount);
//     console.log("Total Cost:", totalCost);

//     // Log payment middleware status (if available)
//     // This middleware automatically checks payment, but we can wrap in try/catch for debug
//     let sessionId = "MIR-" + Math.random().toString(36).substr(2, 9);
//     console.log("Generated Session ID:", sessionId);

//     res.json({
//       mirrorTrade: { sessionId, category, trader, bets, amount, totalCost },
//       payment: {
//         status: "attempted",
//         message: "Check console logs for detailed payment info",
//       },
//     });
//   } catch (err) {
//     console.error("❌ Error processing mirror trade:", err);
//     res.status(500).json({ error: err.message });
//   }
// });

// app.listen(4022, () => {
//   console.log("Buyer backend running on http://localhost:4022");
// });
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { ethers } from "ethers";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
console.log("USDC_ADDRESS:", process.env.USDC_ADDRESS);
if (!process.env.USDC_ADDRESS) throw new Error("USDC_ADDRESS not set in env");

// USDC testnet contract info
const USDC_ADDRESS = process.env.USDC_ADDRESS; // testnet USDC
const USDC_ABI = [
  "function mint(address to, uint256 amount) public",
  "function approve(address spender, uint256 amount) public returns (bool)"
];

const FACILITATOR_ADDRESS = process.env.FACILITATOR_ADDRESS;

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const buyerWallet = new ethers.Wallet(process.env.BUYER_PRIVATE_KEY, provider);
const usdcContract = new ethers.Contract(USDC_ADDRESS, USDC_ABI, buyerWallet);

app.post("/buyer/mirror", async (req, res) => {
  try {
    const { category, trader, bets, amount, totalCost } = req.body;

    console.log("Mirror trade request:", { category, trader, bets, amount, totalCost });

    // 1️⃣ Mint USDC to buyer wallet if needed
    const mintAmount = ethers.parseUnits(totalCost.toString(), 6); // 6 decimals for USDC
    const mintTx = await usdcContract.mint(buyerWallet.address, mintAmount);
    await mintTx.wait();
    console.log("USDC minted:", mintAmount.toString());

    // 2️⃣ Approve facilitator to spend USDC
    const approveTx = await usdcContract.approve(FACILITATOR_ADDRESS, mintAmount);
    await approveTx.wait();
    console.log("USDC approved for facilitator:", mintAmount.toString());

    // 3️⃣ Generate mirror trade session ID
    const sessionId = "MIR-" + Math.random().toString(36).substr(2, 9);

    res.json({
      mirrorTrade: { sessionId, category, trader, bets, amount, totalCost },
      payment: { status: "success", message: "Minted and approved USDC" }
    });

  } catch (err) {
    console.error("Error in mirror trade:", err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(4022, () => {
  console.log("Buyer backend running on http://localhost:4022");
});
