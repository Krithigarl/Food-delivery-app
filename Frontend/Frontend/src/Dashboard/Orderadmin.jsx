import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminOrders() {

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {

    const res = await axios.get(
      "http://localhost:5000/api/order"
    );

    setOrders(res.data);
  };

  const updateStatus = async (id, status) => {

    await axios.put(
      `http://localhost:5000/api/order/${id}/status`,
      { status }
    );

    fetchOrders();
  };

  return (
    <div>

      <h2>Admin Orders</h2>

      {orders.map((order) => (

        <div
          key={order._id}
          style={{
            border: "1px solid black",
            padding: "20px",
            marginBottom: "20px",
          }}
        >

          <h3>{order._id}</h3>

          <p>{order.status}</p>

          <select
            value={order.status}
            onChange={(e) =>
              updateStatus(order._id, e.target.value)
            }
          >
            <option>Placed</option>

            <option>Confirmed</option>

            <option>Preparing</option>

            <option>Out for Delivery</option>

            <option>Delivered</option>

            <option>Cancelled</option>

          </select>

        </div>
      ))}
    </div>
  );
}