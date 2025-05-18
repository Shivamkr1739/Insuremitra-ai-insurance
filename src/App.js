import React, { useState } from "react";
import "./index.css";

export default function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [formData, setFormData] = useState({
    age: "",
    income: "",
    dependents: "",
    location: "",
    claim: "",
    file: null,
  });

  const sendChat = () => {
    if (!input.trim()) return;
    const userMsg = { from: "user", content: input };

    const messageLower = input.toLowerCase();

    let botReply = "🤖 Recommended: HealthSecure Plan – ₹399/month for your family.";

    if (messageLower.includes("health")) {
      botReply = "🤖 Recommended: HealthSecure Plan – ₹399/month for your family.";
    } else if (messageLower.includes("critical")) {
      botReply = "🤖 Recommended: Critical Care Plus – ₹699/month with extended coverage.";
    } else if (messageLower.includes("life")) {
      botReply = "🤖 Recommended: LifeProtect Plan – ₹499/month for life insurance benefits.";
    } else if (messageLower.includes("car")) {
      botReply = "🤖 Recommended: AutoSafe Plan – ₹299/month with comprehensive car insurance.";
    }

    const botMsg = {
      from: "bot",
      content: botReply,
    };

    setMessages([...messages, userMsg, botMsg]);
    setInput("");
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const recommendPlan = () => {
    alert(`Plan for Age ${formData.age}, Income ₹${formData.income}: Basic + Critical Care Combo`);
  };

  const submitClaim = () => {
    alert("📁 Claim submitted. Our AI is verifying the documents.");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans text-gray-800">
      <h1 className="text-3xl font-bold text-center mb-6">🧠 InsureMitra</h1>

      {/* Chatbot */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-xl font-semibold mb-2">🤖 Ask Mitra</h2>
        <div className="h-40 overflow-y-auto bg-gray-100 p-2 rounded mb-2">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`text-sm mb-1 ${
                msg.from === "user" ? "text-right text-blue-600" : "text-left text-green-700"
              }`}
            >
              {msg.content}
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask in Hindi or English"
            className="flex-grow border px-2 py-1 rounded"
          />
          <button onClick={sendChat} className="bg-blue-600 text-white px-4 py-1 rounded">
            Send
          </button>
        </div>
      </div>

      {/* Plan Recommendation */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-xl font-semibold mb-2">📋 Plan Recommendation</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="Age"
            className="border px-2 py-1 rounded"
          />
          <input
            name="income"
            value={formData.income}
            onChange={handleChange}
            placeholder="Monthly Income"
            className="border px-2 py-1 rounded"
          />
          <input
            name="dependents"
            value={formData.dependents}
            onChange={handleChange}
            placeholder="Dependents"
            className="border px-2 py-1 rounded"
          />
          <input
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Location"
            className="border px-2 py-1 rounded"
          />
        </div>
        <button onClick={recommendPlan} className="mt-4 bg-green-600 text-white px-4 py-2 rounded">
          Suggest Plan
        </button>
      </div>

      {/* Claim Submission */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-2">📁 Claim Submission</h2>
        <textarea
          name="claim"
          value={formData.claim}
          onChange={handleChange}
          placeholder="Describe your issue"
          className="w-full border px-2 py-1 rounded mb-2"
        />
        <input type="file" name="file" onChange={handleChange} className="mb-2" />
        <button onClick={submitClaim} className="bg-indigo-600 text-white px-4 py-2 rounded">
          Submit
        </button>
      </div>
    </div>
  );
}
