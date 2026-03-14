import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Register = () => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "user",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();
    setMessage("");

    try {

      const res = await axios.post(
        "http://localhost:5000/api/users/register",
        formData
      );

      setMessage(res.data.message);

      // optional auto login
      if (res.data.success) {

        localStorage.setItem("username", formData.name);

      }

    } catch (err) {

      setMessage(err.response?.data?.message || "Error occurred");

    }
  };

  return (
    <div className="register-container">

      <form className="register-form" onSubmit={handleSubmit}>

        <h2>Create Account</h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
        >
          <option value="user">User</option>
          <option value="restaurant">Restaurant Admin</option>
          <option value="delivery">Delivery Partner</option>
        </select>

        <button type="submit">Register</button>

        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>

      </form>

      {message && <p>{message}</p>}

    </div>
  );
};

export default Register;