import express from "express";
import { paymentMiddleware } from "x402-express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use(paymentMiddleware(
  process.env.PAYMENT_ADDRESS, // seller wallet
  {
    "POST /mirror/start": {
      price: "$5",
      network: "polygon-amoy",
      config: {
        description: "Start a mirror trade session",
        inputSchema: {
          type: "object",
          properties: {
            category: { type: "string" },
            trader: { type: "string" },
            bets: { type: "number" },
            amount: { type: "number" }
          }
        }
      }
    }
  },
  { url: process.env.FACILITATOR_URL }
));

app.post("/mirror/start", (req, res) => {
  const { category, trader, bets, amount, totalCost } = req.body;
  console.log("Payment received for mirror trade:", { category, trader, bets, amount, totalCost });

  const sessionId = "MIR-" + Math.random().toString(36).substr(2, 9);

  res.json({
    message: "Mirror trade started",
    sessionId,
    category,
    trader,
    bets,
    amount,
    totalCost
  });
});

app.listen(4021, () => {
  console.log("Seller running at http://localhost:4021");
});
