import { Link, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100 text-gray-800">
      {/* Header */}
      <header className="bg-gradient-to-r from-indigo-600 to-indigo-500 shadow-lg">
        <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center">
          <h1 className="text-2xl font-bold text-white hover:text-indigo-100 transition-colors">
            <Link to="/" className="flex items-center gap-2">
              <span className="text-2xl">📚</span>
              <span>Library System</span>
            </Link>
          </h1>
          <nav className="mt-4 md:mt-0">
  <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
    <Link
      to="/"
      className="text-white hover:text-indigo-200 font-medium px-3 py-1 rounded-md transition-colors hover:bg-white/10"
    >
      Home
    </Link>
    <Link
      to="/add"
      className="text-white hover:text-indigo-200 font-medium px-3 py-1 rounded-md transition-colors hover:bg-white/10"
    >
      Add Book
    </Link>
    <Link
      to="/members"
      className="text-white hover:text-indigo-200 font-medium px-3 py-1 rounded-md transition-colors hover:bg-white/10"
    >
      Members
    </Link>
    <Link
  to="/lend"
  className="text-white hover:text-indigo-200 font-medium px-3 py-1 rounded-md transition-colors hover:bg-white/10"
>
  Lend Book
</Link>
<Link to="/lendings">View Lendings</Link>
<Link
  to="/reports/active-loans"
  className="text-blue-600 hover:underline"
>
  View Active Loans Report
</Link>
<Link to="/history" className="text-blue-600">🕓 Member History</Link>

    <Link
      to="/login"
      className="text-white hover:text-indigo-200 font-medium px-3 py-1 rounded-md transition-colors hover:bg-white/10"
    >
      Login
    </Link>
  </div>
</nav>


        </div>
      </header>

      {/* Page content */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-md p-6 sm:p-8">
          <Outlet />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-6 text-center">
        <div className="container mx-auto px-4">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Library Management System. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}