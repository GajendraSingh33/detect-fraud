"use client";
import { useState, useEffect } from "react";

export default function RulesPage() {
  const [rules, setRules] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [field, setField] = useState("");
  const [operator, setOperator] = useState("");
  const [value, setValue] = useState("");
  const [weight, setWeight] = useState("");

  // fetch rules
  useEffect(() => {
    const savedRules = localStorage.getItem("rules");
    if (savedRules) {
      setRules(JSON.parse(savedRules));
    }
  }, []);

  // save rules
  const saveRules = (updatedRules: any[]) => {
    setRules(updatedRules);
    localStorage.setItem("rules", JSON.stringify(updatedRules));
  };

  // add rule
  const addRule = (e: any) => {
    e.preventDefault();
    if (!name || !field || !operator || !value || !weight) return;

    const newRule = {
      id: Date.now(),
      name,
      definition: `${field} ${operator} ${value} → Risk ${weight}`,
      field,
      operator,
      value,
      weight,
    };

    saveRules([...rules, newRule]);

    setName("");
    setField("");
    setOperator("");
    setValue("");
    setWeight("");
  };

  // delete rule
  const deleteRule = (id: number) => {
    const updatedRules = rules.filter((rule) => rule.id !== id);
    saveRules(updatedRules);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Fraud Detection Rules</h1>

      {/* 🔹 Simple Hint Box */}
      <div className="mb-4 text-sm text-gray-700 bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded">
        <p className="font-semibold">How to write a rule:</p>
        <ul className="list-disc ml-6 mt-1">
          <li><strong>Field</strong>: What to check (example: amount, country, ip)</li>
          <li><strong>Operator</strong>: The condition (example: &gt;, &lt;, =, !=)</li>
          <li><strong>Value</strong>: The number or text to compare (example: 500, IN)</li>
          <li><strong>Weight</strong>: Risk score (higher = more risky)</li>
        </ul>
        <p className="mt-2 text-gray-600">
          👉 Example: If <em>amount &gt; 500</em>, then add <em>10 risk points</em>.
        </p>
      </div>

      {/* Add Rule Form */}
      <form onSubmit={addRule} className="mb-6 flex gap-2">
        <input
          type="text"
          placeholder="Rule Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded w-32"
        />
        <input
          type="text"
          placeholder="Field (e.g. amount)"
          value={field}
          onChange={(e) => setField(e.target.value)}
          className="border p-2 rounded w-32"
        />
        <input
          type="text"
          placeholder="Operator (e.g. >)"
          value={operator}
          onChange={(e) => setOperator(e.target.value)}
          className="border p-2 rounded w-24"
        />
        <input
          type="text"
          placeholder="Value (e.g. 500)"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="border p-2 rounded w-24"
        />
        <input
          type="number"
          placeholder="Weight"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          className="border p-2 rounded w-20"
        />
        <button type="submit" className="bg-black text-white px-4 py-2 rounded">
          Add Rule
        </button>
      </form>

      {/* Rules Table */}
      <table className="min-w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 text-left">Name</th>
            <th className="p-2 text-left">Definition</th>
            <th className="p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rules.length === 0 ? (
            <tr>
              <td colSpan={3} className="p-2 text-center text-gray-500">
                No rules found
              </td>
            </tr>
          ) : (
            rules.map((rule) => (
              <tr key={rule.id} className="border-t">
                <td className="p-2">{rule.name}</td>
                <td className="p-2">{rule.definition}</td>
                <td className="p-2">
                  <button
                    onClick={() => deleteRule(rule.id)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
