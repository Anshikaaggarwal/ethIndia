// src/utils/helpers.js

export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;   // return success flag
  } catch (err) {
    console.error("Failed to copy: ", err);
    return false;
  }
};

export const shortenAddress = (address) => {
  if (!address) return "";
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export const formatNumber = (num) => {
  if (Math.abs(num) >= 1.0e9) return (num / 1.0e9).toFixed(2) + "B";
  if (Math.abs(num) >= 1.0e6) return (num / 1.0e6).toFixed(2) + "M";
  if (Math.abs(num) >= 1.0e3) return (num / 1.0e3).toFixed(2) + "K";
  return num.toString();
};
