import { useState } from "react";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000";

function Login() {
  const [isRegister, setIsRegister] =
    useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");

    const endpoint = isRegister
      ? "/api/auth/register"
      : "/api/auth/login";

    try {
      const response = await fetch(
        `${API_URL}${endpoint}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message);
        return;
      }

      localStorage.setItem(
        "token",
        data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      if (data.user.role === "admin") {
        window.location.href = "/admin";
      } else {
        window.location.href = "/";
      }
    } catch (error) {
      setMessage("Server error");
    }
  };

  return (
    <div className="auth-container">
      <form
        className="auth-form"
        onSubmit={handleSubmit}
      >
        <h2>
          {isRegister
            ? "Create Account"
            : "Login"}
        </h2>

        {isRegister && (
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
          />
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <button type="submit">
          {isRegister
            ? "Register"
            : "Login"}
        </button>

        {message && (
          <p className="auth-message">
            {message}
          </p>
        )}

        <button
          type="button"
          className="switch-auth"
          onClick={() =>
            setIsRegister(!isRegister)
          }
        >
          {isRegister
            ? "Already have an account? Login"
            : "Create new account"}
        </button>
      </form>
    </div>
  );
}

export default Login;