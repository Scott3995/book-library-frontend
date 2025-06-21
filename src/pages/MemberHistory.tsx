import { useEffect, useState } from "react";

export default function MemberHistory() {
  const [memberId, setMemberId] = useState("");
  const [history, setHistory] = useState([]);
  const [error, setError] = useState("");

  const handleFetchHistory = async () => {
    const auth = localStorage.getItem("auth");
    if (!memberId) return;

    try {
      const res = await fetch(`http://localhost:8080/lending/member-history/${memberId}`, {
        headers: {
          Authorization: "Basic " + auth,
        },
      });

      if (!res.ok) throw new Error(await res.text());

      const data = await res.json();
      setHistory(data);
      setError("");
    } catch (err: any) {
      setError("❌ " + err.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Member Lending History</h2>

      <div className="flex gap-4 mb-4">
        <input
          type="text"
          value={memberId}
          onChange={(e) => setMemberId(e.target.value)}
          placeholder="Enter Member ID"
          className="border px-3 py-2 rounded w-64"
        />
        <button
          onClick={handleFetchHistory}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Fetch History
        </button>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {history.length > 0 && (
        <table className="w-full table-auto border text-sm">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-2 py-1">Book Title</th>
              <th className="border px-2 py-1">Checkout</th>
              <th className="border px-2 py-1">Due</th>
              <th className="border px-2 py-1">Returned</th>
              <th className="border px-2 py-1">Fine</th>
              <th className="border px-2 py-1">Fine Paid</th>
            </tr>
          </thead>
          <tbody>
            {history.map((r: any) => (
              <tr key={r.id}>
                <td className="border px-2 py-1">{r.bookCopy?.metadata?.title}</td>
                <td className="border px-2 py-1">{r.checkoutDate}</td>
                <td className="border px-2 py-1">{r.dueDate}</td>
                <td className="border px-2 py-1">{r.returned ? "✅" : "❌"}</td>
                <td className="border px-2 py-1">
                  {r.fineAmount > 0 ? `$${r.fineAmount}` : "-"}
                </td>
                <td className="border px-2 py-1">{r.finePaid ? "✅" : "❌"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
