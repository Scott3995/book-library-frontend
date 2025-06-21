import { useEffect, useState } from "react";

export default function LendingList() {
  const [lendings, setLendings] = useState([]);
  const [message, setMessage] = useState("");

  const fetchLendings = async () => {
    const auth = localStorage.getItem("auth");

    try {
      const res = await fetch("http://localhost:8080/lending", {
        headers: {
          Authorization: "Basic " + auth,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch lendings");

      const data = await res.json();
      setLendings(data);
    } catch (err: any) {
      setMessage("❌ " + err.message);
    }
  };

  useEffect(() => {
    fetchLendings();
  }, []);

  const handleReturn = async (lendingId: number) => {
    const auth = localStorage.getItem("auth");

    try {
      const res = await fetch(`http://localhost:8080/lending/return/${lendingId}`, {
        method: "POST",
        headers: {
          Authorization: "Basic " + auth,
        },
      });

      if (!res.ok) throw new Error(await res.text());

      fetchLendings(); // Refresh list after return
    } catch (err: any) {
      setMessage("❌ " + err.message);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Current Lendings</h2>
      {message && <p className="text-red-500 mb-4">{message}</p>}

      <table className="w-full table-auto border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-2 py-1">Book</th>
            <th className="border px-2 py-1">Member</th>
            <th className="border px-2 py-1">Due Date</th>
            <th className="border px-2 py-1">Returned</th>
            <th className="border px-2 py-1">Fine</th>
            <th className="border px-2 py-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          {lendings.map((l: any) => (
            <tr key={l.id}>
              <td className="border px-2 py-1">{l.bookCopy?.metadata?.title}</td>
              <td className="border px-2 py-1">{l.member?.fullName}</td>
              <td className="border px-2 py-1">{l.dueDate}</td>
              <td className="border px-2 py-1">
                {l.returned ? "✅" : "❌"}
              </td>
              <td className="border px-2 py-1">
                {l.fineAmount ? `$${l.fineAmount}` : "-"}
              </td>
              <td className="border px-2 py-1">
                {!l.returned && (
                  <button
                    onClick={() => handleReturn(l.id)}
                    className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700"
                  >
                    Return
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
