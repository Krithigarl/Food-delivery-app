import { useEffect, useState } from "react";
import axios from "axios";

import OrderTracker from "./OrderTracker";

export default function MyOrders() {

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

  return (
    <div>

      <h2>My Orders</h2>

      {orders.map((order) => (

        <div
          key={order._id}
          style={{
            border: "1px solid #ccc",
            padding: "20px",
            marginBottom: "20px",
          }}
        >

          <h3>Order ID: {order._id}</h3>

          <p>Total: ₹{order.totalAmount}</p>

          <p>Status: {order.status}</p>

          <OrderTracker status={order.status} />

        </div>
      ))}
    </div>
  );
}