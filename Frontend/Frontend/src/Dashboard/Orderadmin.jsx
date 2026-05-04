import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Container } from "react-bootstrap";

const Orderadmin = () => {
  const [orders, setOrders] = useState([]);

  // Fetch orders
  const fetchOrders = () => {
    axios
      .get("http://localhost:5000/api/admin/order", {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`
  }
})
      .then((res) => setOrders(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Update status
  const updateStatus = (id, status) => {
    axios
      .put(
        `http://localhost:5000/api/admin/orders/${id}`,
        { status },
       {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`
  }
}
      )
      .then(() => {
        alert("Status Updated ✅");
        fetchOrders();
      })
      .catch((err) => console.log(err));
  };

  return (
    <Container className="mt-4">
      <h3>Orders Management</h3>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>User</th>
            <th>Total</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((o, index) => (
            <tr key={o._id}>
              <td>{index + 1}</td>

              {/* Adjust based on backend */}
              <td>{o.userId || o.user}</td>
              <td>₹{o.totalAmount || o.total}</td>

              <td>{o.status}</td>

              <td>
                {o.status !== "Delivered" && (
                  <Button
                    variant="success"
                    size="sm"
                    onClick={() => updateStatus(o._id, "Delivered")}
                  >
                    Mark Delivered
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Orderadmin;