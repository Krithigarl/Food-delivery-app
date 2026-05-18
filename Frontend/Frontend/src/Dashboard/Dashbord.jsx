import { useEffect, useState } from "react";

import axios from "axios";

import {
  Pie,
  Bar,
} from "react-chartjs-2";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Colors,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

export default function AdminDashboard() {

  const [data, setData] = useState(null);

  
  useEffect(() => {

    fetchAnalytics();

  }, []);

  
  const fetchAnalytics = async () => {

    const res = await axios.get(
      "http://localhost:5000/api/admindash/analytics"
    );

    setData(res.data);
  };

  
  if (!data) return <h2>Loading...</h2>;

  
  // Pie Chart Data
  const pieData = {
    labels: [
      "Placed",
      "Preparing",
      "Out for Delivery",
      "Delivered",
    ],

    datasets: [
      {
        data: [
          data.statusData.placed,
          data.statusData.preparing,
          data.statusData.outForDelivery,
          data.statusData.delivered,
        ],
        backgroundColor: [
        "#3498db",
        "#f39c12",
        "#9b59b6",
        "#2ecc71",
      ],

      borderWidth: 2,
      },
    ],
  };

  
  // Bar Chart Data
  const barData = {
    labels: [
      "Orders",
      "Delivered",
      "Pending",
    ],

    datasets: [
      {
        label: "Order Statistics",

        data: [
          data.totalOrders,
          data.deliveredOrders,
          data.pendingOrders,
        ],
         backgroundColor: [
        "#1f77b4",
        "#2ecc71",
        "#e74c3c",
      ],

      },
    ],
  };

  
  return (
    <div className="p-md-4" >

      <h1 className="text-one">ADMIN DASHBOARD</h1>

      
      {/* Cards */}
      <div className="d-md-flex gap-md-4"
      >

        <div style={cardStyle}>
          <h3>Total Orders</h3>
          <p>{data.totalOrders}</p>
        </div>

        <div style={cardStyle}>
          <h3>Total Revenue</h3>
          <p>₹{data.totalRevenue}</p>
        </div>

        <div style={cardStyle}>
          <h3>Delivered Orders</h3>
          <p>{data.deliveredOrders}</p>
        </div>

      </div>

      
      {/* Charts */}
      <div
        className="d-md-flex gap-md-4 justify-content-center align-items-start flex-wrap"
      >

        <div  className="pie-chart">
          <h3 className="status">Order Status</h3>
          <Pie  options={{
          plugins: {
            legend: {
              position: "left",
            },
          },
        }} data={pieData} />
        </div>

        <div  className="pie-chart">
          <h3 className="status">Order Overview</h3>
          <Bar data={barData} />
        </div>

      </div>

    </div>
  );
}


const cardStyle = {
  padding: "20px",
  width: "400px",
  borderRadius: "10px",
  color: "#198754",
  backgroundColor: "#f0f0f0",
  marginBottom: "20px",
  boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
};