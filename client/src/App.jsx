import Home from "./pages/Home";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  const path = window.location.pathname;

  if (path === "/login") {
    return <Login />;
  }

  if (path === "/admin") {
    return <AdminDashboard />;
  }

  return <Home />;
}

export default App;