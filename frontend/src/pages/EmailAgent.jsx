import { useState } from "react";

function EmailAgent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState("");

  /* ---------------- SCAN EMAILS ---------------- */
  const scanEmails = async () => {
    if (!email || !password) {
      setError("Enter Gmail credentials");
      return;
    }
    if (!apiKey) {
      setError("Enter OpenAI API Key");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:3001/scan-emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          apiKey: apiKey,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Scan failed");
      }

      setDeals(data.deals);
      setSummary(data.summary);
      setError("");

    } catch (err) {
      setError(err.message);
      setDeals([]);
      setSummary(null);
    }

    setLoading(false);
  };

  /* ---------------- DOWNLOAD CSV ---------------- */
  const downloadCSV = () => {
    window.open("http://localhost:3001/download-csv");
  };

  /* ---------------- DEAL COLOR ---------------- */
  const getColor = (category) => {
    if (category === "Good Deal") return "bg-green-600";
    if (category === "Bad Deal") return "bg-red-600";
    return "bg-gray-600";
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">

      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <h1 className="text-4xl font-bold mb-2">
          🎯 AI Email Deal Agent
        </h1>
        <p className="text-gray-400 mb-6">
          Analyze sponsorship and brand deals from your inbox with AI
        </p>

        {/* LOGIN CARD */}
        <div className="bg-slate-900 p-6 rounded-xl mb-6 border border-slate-700">

          <h2 className="text-xl font-bold mb-4">
            Step 1: Connect Your Account
          </h2>

          {/* EMAIL INPUT */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Gmail Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 bg-slate-800 rounded-lg border border-slate-700 focus:border-blue-500 outline-none"
              placeholder="your-email@gmail.com"
            />
          </div>

          {/* PASSWORD INPUT */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Gmail App Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-slate-800 rounded-lg border border-slate-700 focus:border-blue-500 outline-none"
              placeholder="Enter app-specific password"
            />
            <p className="text-xs text-gray-400 mt-2">
              Generate at: <a href="https://myaccount.google.com/apppasswords" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Google Account</a>
            </p>
          </div>

          {/* API KEY INPUT */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              OpenAI API Key
            </label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="w-full p-3 bg-slate-800 rounded-lg border border-slate-700 focus:border-blue-500 outline-none"
              placeholder="sk-proj-xxxx"
            />
            <p className="text-xs text-gray-400 mt-2">
              Get from: <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">OpenAI Dashboard</a>
            </p>
          </div>

          {/* SCAN BUTTON */}
          <button
            onClick={scanEmails}
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-600 disabled:to-gray-700 px-6 py-3 rounded-lg font-bold transition-all"
          >
            {loading ? "🔍 Scanning Emails..." : "🔍 Scan Emails"}
          </button>

          {error && (
            <div className="mt-4 p-3 bg-red-900/30 border border-red-700 rounded-lg">
              <p className="text-red-300">
                ❌ {error}
              </p>
            </div>
          )}

        </div>

        {/* SUMMARY SECTION */}
        {summary && (
          <div className="bg-slate-900 p-6 rounded-xl mb-6 border border-slate-700">

            <h2 className="text-xl font-bold mb-4">
              📊 Summary
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">

              <div className="bg-green-900/40 p-4 rounded-lg border border-green-700">
                <div className="text-2xl font-bold text-green-400">{summary.good}</div>
                <div className="text-sm text-green-300">Good Deals</div>
              </div>

              <div className="bg-red-900/40 p-4 rounded-lg border border-red-700">
                <div className="text-2xl font-bold text-red-400">{summary.bad}</div>
                <div className="text-sm text-red-300">Bad Deals</div>
              </div>

              <div className="bg-gray-800/40 p-4 rounded-lg border border-gray-700">
                <div className="text-2xl font-bold text-gray-400">{summary.ignore}</div>
                <div className="text-sm text-gray-300">Not Deals</div>
              </div>

            </div>

            <button
              onClick={downloadCSV}
              className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 px-6 py-3 rounded-lg font-bold transition-all"
            >
              📥 Download CSV Report
            </button>

          </div>
        )}

        {/* DEALS TABLE */}
        {deals.length > 0 && (
          <div className="bg-slate-900 p-6 rounded-xl border border-slate-700">

            <h2 className="text-xl font-bold mb-4">
              💼 Analyzed Deals ({deals.length})
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">

                <thead>
                  <tr className="border-b border-slate-700 text-gray-300">
                    <th className="text-left p-3">Subject</th>
                    <th className="text-left p-3">From</th>
                    <th className="text-left p-3">Category</th>
                    <th className="text-left p-3">Brand</th>
                    <th className="text-left p-3">Value</th>
                    <th className="text-left p-3">Summary</th>
                  </tr>
                </thead>

                <tbody>
                  {deals.map((deal, i) => (
                    <tr key={i} className="border-b border-slate-800 hover:bg-slate-800/50 transition">

                      <td className="p-3 truncate max-w-xs">
                        {deal.subject}
                      </td>

                      <td className="p-3 truncate max-w-xs text-gray-400">
                        {deal.from}
                      </td>

                      <td className="p-3">
                        <span className={`px-3 py-1 rounded-lg font-bold text-white ${getColor(deal.category)}`}>
                          {deal.category}
                        </span>
                      </td>

                      <td className="p-3 text-gray-300">
                        {deal.brand || "—"}
                      </td>

                      <td className="p-3 font-semibold">
                        {deal.dealValue || "—"}
                      </td>

                      <td className="p-3 text-gray-400 truncate max-w-xs">
                        {deal.summary}
                      </td>

                    </tr>
                  ))}
                </tbody>

              </table>
            </div>

          </div>
        )}

        {/* EMPTY STATE */}
        {!loading && !summary && (
          <div className="bg-slate-900 p-12 rounded-xl border border-slate-700 text-center">
            <p className="text-gray-400 text-lg">
              👆 Fill in your credentials and click "Scan Emails" to analyze your inbox for deals
            </p>
          </div>
        )}

      </div>
    </div>
  );
}

export default EmailAgent;