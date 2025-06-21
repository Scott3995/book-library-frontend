import { useEffect, useState } from "react";

interface LendingRecord {
  id: number;
  bookCopy: {
    metadata: {
      title: string;
    };
  };
  member: {
    fullName: string;
  };
  dueDate: string;
  returned: boolean;
  fineAmount: number;
}

export default function LendingList() {
  const [lendings, setLendings] = useState<LendingRecord[]>([]);
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

  const handlePayFine = async (id: number) => {
    const auth = localStorage.getItem("auth");

    try {
      const res = await fetch(`http://localhost:8080/lending/pay-fine/${id}`, {
        method: "POST",
        headers: { Authorization: "Basic " + auth },
      });

      if (!res.ok) throw new Error(await res.text());

      const updated = await res.json();
      setLendings((prev) =>
        prev.map((l) => (l.id === id ? updated : l))
      );
    } catch (err: any) {
      alert("❌ Failed to pay fine: " + err.message);
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
          {lendings.map((l) => (
            <tr key={l.id}>
              <td className="border px-2 py-1">
                {l.bookCopy?.metadata?.title || "N/A"}
              </td>
              <td className="border px-2 py-1">{l.member?.fullName || "N/A"}</td>
              <td className="border px-2 py-1">{l.dueDate}</td>
              <td className="border px-2 py-1">{l.returned ? "✅" : "❌"}</td>
              <td className="border px-2 py-1">
                {l.fineAmount > 0 ? `$${l.fineAmount}` : "-"}
              </td>
              <td className="border px-2 py-1 space-x-2">
                {!l.returned && (
                  <button
                    onClick={() => handleReturn(l.id)}
                    className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700"
                  >
                    Return
                  </button>
                )}
                {l.fineAmount > 0 && l.returned && (
                  <button
                    onClick={() => handlePayFine(l.id)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 text-sm"
                  >
                    Pay Fine (${l.fineAmount})
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
