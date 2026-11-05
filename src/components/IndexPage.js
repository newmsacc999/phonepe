import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./IndexPage.css";

const operators = [
  { id: "jio", label: "Jio", logo: "https://cdn.shopify.com/s/files/1/0843/6233/0338/files/Reliance_Jio_Logo__October_2015.svg?v=1793084107" },
  { id: "airtel", label: "Airtel", logo: "https://cdn.shopify.com/s/files/1/0843/6233/0338/files/Bharti_Airtel_Logo.svg?v=1793084450" },
  { id: "vi", label: "Vi", logo: "https://cdn.shopify.com/s/files/1/0843/6233/0338/files/vi.svg?v=1793084534" },
  { id: "bsnl", label: "BSNL", logo: "https://cdn.shopify.com/s/files/1/0843/6233/0338/files/vecteezy_bsnl-app-transparent-logo_52031093.png?v=1793086970" },
];

export default function IndexPage() {
  const [number, setNumber] = useState("");
  const [selectedOption, setSelectedOption] = useState("jio");
  const [error, setError] = useState("");
  const [secondsLeft, setSecondsLeft] = useState(10 * 60 + 28);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = window.setInterval(() => {
      setSecondsLeft((seconds) => (seconds > 0 ? seconds - 1 : 0));
    }, 1000);
    return () => window.clearInterval(timer);
  }, []);

  const timerText = secondsLeft > 0
    ? `${String(Math.floor(secondsLeft / 60)).padStart(2, "0")}:${String(secondsLeft % 60).padStart(2, "0")}`
    : "EXPIRED";

  const handleRecharge = () => {
    const digits = number.replace(/\D/g, "").slice(0, 10);
    if (!/^\d{10}$/.test(digits)) {
      setError("Please enter a valid 10-digit mobile number");
      return;
    }
    setError("");
    navigate(`/recharge/${digits}/${selectedOption}`);
  };

  return (
    <div className="recharge-ui">
      <header className="recharge-header">
        <div className="recharge-brand">
          <div className="recharge-brand-icon" aria-hidden="true">↗</div>
          <div>
            <div className="recharge-brand-title">Mobile Recharge</div>
            <div className="recharge-brand-subtitle">Fast • Simple • Convenient</div>
          </div>
        </div>
        <div className="recharge-header-actions">
          <button type="button" aria-label="Help" className="recharge-header-btn">?</button>
          <button type="button" aria-label="Notifications" className="recharge-header-btn">♧</button>
        </div>
      </header>

      <main className="recharge-content">
        <section className="recharge-offerbar">
          <span className="recharge-clock">◷</span>
          <span>Special Offer Ends In</span>
          <strong>{timerText}</strong>
        </section>

        <section className="recharge-banner">
          <img src="https://i.ibb.co/rKZmvB09/indexmain.jpg" alt="Mobile recharge offer" />
        </section>

        <section className="recharge-form-card">
          <div className="recharge-card-heading">
            <div className="recharge-heading-icon">▣</div>
            <div className="recharge-heading-copy">
              <h1>Recharge your mobile</h1>
              <p>Select operator and enter number</p>
            </div>
            <span className="recharge-secure">✓ SECURE</span>
          </div>

          <div className="recharge-field-label">Network provider</div>
          <div className="recharge-operator-grid">
            {operators.map((operator) => (
              <button
                type="button"
                key={operator.id}
                className={`recharge-operator ${selectedOption === operator.id ? "active" : ""}`}
                aria-pressed={selectedOption === operator.id}
                onClick={() => setSelectedOption(operator.id)}
              >
                <span className="recharge-operator-check">✓</span>
                <span className="recharge-operator-logo">
                  <img src={operator.logo} alt={operator.label} />
                </span>
                <span className="recharge-operator-name">{operator.label}</span>
              </button>
            ))}
          </div>

          <label className="recharge-field-label" htmlFor="mobile-recharge-number">Mobile number</label>
          <div className={`recharge-mobile-field ${error ? "has-error" : ""}`}>
            <div className="recharge-mobile-shell">
              <span className="recharge-country-code">+91</span>
              <input
                id="mobile-recharge-number"
                type="tel"
                inputMode="numeric"
                autoComplete="tel-national"
                maxLength={10}
                placeholder="00000 00000"
                value={number}
                onChange={(event) => {
                  setNumber(event.target.value.replace(/\D/g, "").slice(0, 10));
                  if (error) setError("");
                }}
                onKeyDown={(event) => event.key === "Enter" && handleRecharge()}
              />
              <span className="recharge-contact-icon">♙</span>
            </div>
            {error && <div className="recharge-error" role="alert">{error}</div>}
          </div>

          <button className="recharge-submit" type="button" onClick={handleRecharge}>
            <span>Recharge Now</span><span className="recharge-submit-arrow">→</span>
          </button>

          <div className="recharge-trust-row">
            <span>♙ Protected</span><span>✦ Instant plans</span><span>✓ Verified</span>
          </div>
        </section>
        <footer className="recharge-footer-note">Choose your operator and enter your mobile number to continue.</footer>
      </main>
    </div>
  );
}
