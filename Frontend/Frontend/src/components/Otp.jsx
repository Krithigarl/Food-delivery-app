import React, { useState } from "react";
import axios from "axios";

function Otp() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);


const sendOTP = async () => {
  try {
    await axios.post("http://localhost:5000/api/send-otp", {
      email: email
    });
    alert("OTP Sent");
    setStep(2);
  } catch (err) {
    console.error(err.response?.data || err.message);
  }
};
  const verifyOTP = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/verify-otp", {
        email,
        otp
      });
      alert(res.data.message);
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      {step === 1 && (
        <>
          <h2>Enter Email</h2>
          <input onChange={(e) => setEmail(e.target.value)} />
          <br /><br />
          <button onClick={sendOTP}>Send OTP</button>
        </>
      )}

      {step === 2 && (
        <>
          <h2>Enter OTP</h2>
          <input onChange={(e) => setOtp(e.target.value)} />
          <br /><br />
          <button onClick={verifyOTP}>Verify OTP</button>
        </>
      )}
    </div>
  );
}

export default Otp;