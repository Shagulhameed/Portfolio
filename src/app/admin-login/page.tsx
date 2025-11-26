"use client";

import { useState } from "react";

export default function AdminOtpLogin() {
  const [step, setStep] = useState<"email" | "code">("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  const sendOtp = async () => {
    setError("");
    setStatus("Sending code...");

    const res = await fetch("/api/admin-otp/request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    if (res.ok) {
      setStatus("Code sent to your email.");
      setStep("code");
    } else {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Failed to send code");
      setStatus("");
    }
  };

  const verifyOtp = async () => {
    setError("");
    setStatus("Verifying...");

    const res = await fetch("/api/admin-otp/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, code }),
    });

    if (res.ok) {
      setStatus("Login success. Redirecting...");
      window.location.href = "/dashboard";
    } else {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Invalid code");
      setStatus("");
    }
  };

  return (
    <main className="container py-5 text-center" style={{ maxWidth: 480 }}>
      <h1 className="mb-2">Admin Login</h1>
      <p className="text-muted mb-4">OTP will be sent only to your email.</p>

      {step === "email" && (
        <>
          <input
            type="email"
            className="form-control my-3"
            style={{ maxWidth: 320, margin: "0 auto" }}
            placeholder="Enter your admin email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error) setError("");
            }}
          />
          {error && <p className="text-danger">{error}</p>}
          {status && <p className="text-success">{status}</p>}

          <button className="btn btn-primary" onClick={sendOtp}>
            Send Code
          </button>
        </>
      )}

      {step === "code" && (
        <>
          <p className="mb-2">We sent a 6-digit code to {email}</p>
          <input
            type="text"
            className="form-control my-3 text-center"
            style={{ maxWidth: 200, margin: "0 auto", letterSpacing: "0.3em" }}
            maxLength={6}
            placeholder="XXXXXX"
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
              if (error) setError("");
            }}
          />
          {error && <p className="text-danger">{error}</p>}
          {status && <p className="text-success">{status}</p>}

          <button className="btn btn-primary me-2" onClick={verifyOtp}>
            Verify & Login
          </button>
          <button
            className="btn btn-link"
            onClick={() => {
              setStep("email");
              setCode("");
            }}
          >
            Change email
          </button>
        </>
      )}
    </main>
  );
}
