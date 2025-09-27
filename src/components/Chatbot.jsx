import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MessageCircle, X, Bot, User } from "lucide-react";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState("category");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedTrader, setSelectedTrader] = useState(null);
  const [bets, setBets] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    { type: "bot", text: "👋 Hi, which category do you wish to apply?" },
  ]);

  // Mock trader data
  const mockTraders = {
    Sports: {
      address: "0x1234...5678",
      winRate: "87.3%",
      roi: "+124.5%",
      name: "SportsMaster",
      totalBets: 245,
    },
    Finance: {
      address: "0x9876...4321",
      winRate: "78.9%",
      roi: "+89.2%",
      name: "WallStreetAce",
      totalBets: 189,
    },
    DeFi: {
      address: "0x5555...9999",
      winRate: "92.1%",
      roi: "+156.7%",
      name: "DeFiWhale",
      totalBets: 167,
    },
    Politics: {
      address: "0x7777...3333",
      winRate: "81.4%",
      roi: "+98.3%",
      name: "PoliticalOracle",
      totalBets: 203,
    },
  };

  const categories = ["Sports", "Finance", "DeFi", "Politics"];

  const addMessage = (type, text) =>
    setMessages((prev) => [...prev, { type, text }]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSelectedTrader(mockTraders[category]);
    addMessage("user", category);

    setTimeout(() => {
      addMessage("bot", `Here's the top trader in ${category}:`);
      setStep("trader");
    }, 500);
  };

  const handleCopyTradeChoice = (choice) => {
    addMessage("user", choice);

    if (choice === "Yes") {
      setTimeout(() => {
        addMessage("bot", "How many bets would you like to mirror?");
        setStep("bets");
      }, 500);
    } else {
      setTimeout(() => {
        addMessage("bot", "No worries! Feel free to explore other categories.");
        setStep("category");
      }, 500);
    }
  };

  const handleBetsSubmit = () => {
    if (!bets || isNaN(bets) || parseInt(bets) <= 0) {
      addMessage("bot", "Please enter a valid number of bets.");
      return;
    }
    addMessage("user", `${bets} bets`);
    setTimeout(() => {
      addMessage("bot", "Amount per bet (USDC)?");
      setStep("amount");
    }, 500);
  };

  const handleAmountSubmit = async () => {
    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
      addMessage("bot", "Please enter a valid amount.");
      return;
    }

    const totalCost = parseInt(bets) * parseFloat(amount);
    addMessage("user", `$${amount} USDC per bet`);

    setTimeout(() => {
      addMessage(
        "bot",
        `Total cost: ${bets} × $${amount} = $${totalCost.toFixed(
          2
        )} USDC. Starting mirror trade...`
      );
    }, 500);

    setLoading(true);

    try {
      // Replace x402 payment logic with simple mock response
      await new Promise((res) => setTimeout(res, 1000));
      addMessage(
        "bot",
        `✅ Mirroring started successfully! Session ID: MIR-${Math.random()
          .toString(36)
          .substr(2, 9)}`
      );
      setStep("success");
    } catch (error) {
      console.error(error);
      addMessage("bot", "❌ Error starting mirror trade. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const resetChat = () => {
    setStep("category");
    setSelectedCategory("");
    setSelectedTrader(null);
    setBets("");
    setAmount("");
    setMessages([
      { type: "bot", text: "👋 Hi, which category do you wish to apply?" },
    ]);
  };

  const TraderCard = ({ trader }) => (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle className="text-lg">{trader.name}</CardTitle>
        <CardDescription className="text-sm text-gray-600">
          {trader.address}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-green-600">
              {trader.winRate}
            </p>
            <p className="text-sm text-gray-500">Win Rate</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-blue-600">{trader.roi}</p>
            <p className="text-sm text-gray-500">ROI</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-purple-600">
              {trader.totalBets}
            </p>
            <p className="text-sm text-gray-500">Total Bets</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <>
      {/* Floating Chat Icon */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="h-14 w-14 rounded-full shadow-lg bg-blue-600 hover:bg-blue-700"
          size="icon"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </div>

      {/* Chat Dialog */}
      <Dialog
        open={isOpen}
        onOpenChange={(open) => {
          setIsOpen(open);
          if (!open) resetChat(); // Reset chat when modal is closed
        }}
      >
        <DialogContent className="sm:max-w-md h-[600px] flex flex-col">
          <DialogHeader className="flex flex-row items-center justify-between">
            <DialogTitle className="flex items-center gap-2">
              <Bot className="h-5 w-5" />
              Trading Assistant
            </DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </DialogHeader>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.type === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`flex items-start gap-2 max-w-[80%] ${
                    message.type === "user" ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  {/* Icon */}
                  <div className="flex-shrink-0">
                    {message.type === "user" ? (
                      <User className="h-5 w-5 text-blue-500" />
                    ) : (
                      <Bot className="h-5 w-5 text-green-500" />
                    )}
                  </div>
                  {/* Message Bubble */}
                  <div
                    className={`p-3 rounded-lg ${
                      message.type === "user"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-900"
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              </div>
            ))}

            {/* Trader Card */}
            {step === "trader" && selectedTrader && (
              <div className="mt-4">
                <TraderCard trader={selectedTrader} />
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="border-t p-4">
            {step === "category" && (
              <div className="grid grid-cols-2 gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    onClick={() => handleCategorySelect(category)}
                    variant="outline"
                    className="w-full"
                  >
                    {category}
                  </Button>
                ))}
              </div>
            )}

            {step === "trader" && (
              <div className="space-y-2">
                <p className="text-sm text-gray-600 mb-2">
                  Do you want to copy trade this trader?
                </p>
                <div className="flex gap-2">
                  <Button
                    onClick={() => handleCopyTradeChoice("Yes")}
                    className="flex-1"
                  >
                    Yes
                  </Button>
                  <Button
                    onClick={() => handleCopyTradeChoice("No")}
                    variant="outline"
                    className="flex-1"
                  >
                    No
                  </Button>
                </div>
              </div>
            )}

            {step === "bets" && (
              <div className="space-y-2">
                <input
                  type="number"
                  placeholder="Number of bets"
                  value={bets}
                  onChange={(e) => setBets(e.target.value)}
                  className="w-full p-2 border rounded-md"
                />
                <Button onClick={handleBetsSubmit} className="w-full">
                  Submit
                </Button>
              </div>
            )}

            {step === "amount" && (
              <div className="space-y-2">
                <input
                  type="number"
                  step="0.01"
                  placeholder="Amount per bet (USDC)"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full p-2 border rounded-md"
                />
                <Button
                  onClick={handleAmountSubmit}
                  className="w-full"
                  disabled={loading}
                >
                  {loading ? "Processing..." : "Start Mirror Trading"}
                </Button>
              </div>
            )}

            {step === "success" && (
              <Button onClick={resetChat} className="w-full">
                Start New Chat
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Chatbot;
