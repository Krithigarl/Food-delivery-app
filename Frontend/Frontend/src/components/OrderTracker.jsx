import React from "react";
const steps = [
  "Placed",
  "Confirmed",
  "Preparing",
  "Out for Delivery",
  "Delivered",
];

export default function OrderTracker({ status }) {
  return (
    <div className="tracker">

      {steps.map((step, index) => {

        const completed =
          steps.indexOf(status) >= index;

        return (
          <div
            key={step}
            style={{
              marginBottom: "10px",
              color: completed ? "green" : "gray",
              fontWeight: "bold",
            }}
          >
            {completed ? "✓" : "○"} {step}
          </div>
        );
      })}
    </div>
  );
}