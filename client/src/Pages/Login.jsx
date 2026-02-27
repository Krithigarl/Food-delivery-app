import React, { useEffect, useState } from 'react'
import axios from "axios";
const Login = () => {
  const [formData, setFormData] = useState({ Email: "", Password: "" });
  const [message, setMessage] = useState("");
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

   const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const res = await axios.post(
        "http://localhost:5000/api/users/login",
        formData
      );
      setMessage(res.data.message);
      console.log("JWT Token:", res.data.token);
    } catch (err) {
      setMessage(err.response?.data?.message || "Error occurred");
    }
  };
  return (
    <div> <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="Email"
          placeholder="Email"
          value={formData.Email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="Password"
          placeholder="Password"
          value={formData.Password}
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
    </div></div>
  )
}

export default Login