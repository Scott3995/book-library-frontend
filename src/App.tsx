import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import AddBook from "./pages/AddBook";
import BookCopies from "./pages/BookCopies";
import Members from "./pages/Members";
import AddMember from "./pages/AddMember";
import Login from "./pages/Login";
import LendBook from "./pages/LendBook";
import LendingList from "./pages/LendingList"; // ✅ NEW

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="add" element={<AddBook />} />
        <Route path="copies/:isbn" element={<BookCopies />} />
        <Route path="members" element={<Members />} />
        <Route path="members/new" element={<AddMember />} />
        <Route path="login" element={<Login />} />
        <Route path="lend" element={<LendBook />} />
        <Route path="lendings" element={<LendingList />} /> {/* ✅ NEW */}
      </Route>
    </Routes>
  );
}

export default App;
