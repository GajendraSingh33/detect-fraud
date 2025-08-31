"use client";
import React, { useEffect, useState } from "react";

type Transaction = {
  time: string;
  user: string;
  amount: number;
  merchant: string;
  category: string;
  device: string;
  status: string;
  score: number | string;
};

export default function Transactions() {
  const [txs, setTxs] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTxs = async () => {
      try {
        const res = await fetch("/api/transactions");
        const data = await res.json();
        console.log("Fetched transactions:", data); // 👈 Debug here
        setTxs(data);
      } catch (err) {
        console.error("Error fetching transactions:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTxs();

    // Optional: refresh every 5 seconds
    const interval = setInterval(fetchTxs, 5000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <div className="p-4">Loading transactions...</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Transactions</h2>
      <table className="w-full border-collapse rounded-lg shadow">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-2">Time</th>
            <th className="p-2">User</th>
            <th className="p-2">Amount</th>
            <th className="p-2">Merchant</th>
            <th className="p-2">Category</th>
            <th className="p-2">Device</th>
            <th className="p-2">Status</th>
            <th className="p-2">Score</th>
          </tr>
        </thead>
        <tbody>
          {txs.length === 0 ? (
            <tr>
              <td colSpan={8} className="text-center p-4">
                No transactions yet. Try running the Simulator.
              </td>
            </tr>
          ) : (
            txs.map((t, i) => (
              <tr key={i} className="border-t">
                <td className="p-2">{t.time}</td>
                <td className="p-2">{t.user}</td>
                <td className="p-2">${t.amount}</td>
                <td className="p-2">{t.merchant}</td>
                <td className="p-2">{t.category}</td>
                <td className="p-2">{t.device}</td>
                <td className="p-2">{t.status}</td>
                <td className="p-2">{t.score}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
