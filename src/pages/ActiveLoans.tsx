import { useEffect, useState } from "react";

export default function ActiveLoans() {
  const [loans, setLoans] = useState([]);
  const [error, setError] = useState("");

  const fetchActiveLoans = async () => {
    const auth = localStorage.getItem("auth");
    try {
      const res = await fetch("http://localhost:8080/lending/active-loans", {
        headers: { Authorization: "Basic " + auth },
      });

      if (!res.ok) throw new Error(await res.text());

      const data = await res.json();
      setLoans(data);
    } catch (err: any) {
      setError("❌ " + err.message);
    }
  };

  useEffect(() => {
    fetchActiveLoans();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Active Loans Report</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {loans.length === 0 ? (
        <p className="text-gray-600">No active loans found.</p>
      ) : (
        <table className="w-full table-auto border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-2 py-1">Book Title</th>
              <th className="border px-2 py-1">Copy ID</th>
              <th className="border px-2 py-1">Member</th>
              <th className="border px-2 py-1">Due Date</th>
              <th className="border px-2 py-1">Overdue</th>
            </tr>
          </thead>
          <tbody>
            {loans.map((loan: any) => {
              const isOverdue = new Date(loan.dueDate) < new Date();
              return (
                <tr key={loan.id} className={isOverdue ? "bg-red-100" : ""}>
                  <td className="border px-2 py-1">{loan.bookCopy?.metadata?.title}</td>
                  <td className="border px-2 py-1">{loan.bookCopy?.id}</td>
                  <td className="border px-2 py-1">{loan.member?.fullName}</td>
                  <td className="border px-2 py-1">{loan.dueDate}</td>
                  <td className="border px-2 py-1">
                    {isOverdue ? "❗Yes" : "No"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
