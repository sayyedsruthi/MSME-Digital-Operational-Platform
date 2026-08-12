import { Outlet } from "react-router-dom";
import factoryImage from "../assets/images/factory-hero.svg";

export default function AuthLayout() {
  return (
    <main className="auth-layout">
      <section className="auth-visual">
        <img src={factoryImage} alt="MSME manufacturing operations" />
        <div>
          <p className="eyebrow">MSME Digital Operations</p>
          <h1>Digitize inventory, orders, vendors, employees, and production.</h1>
        </div>
      </section>
      <section className="auth-panel">
        <Outlet />
      </section>
    </main>
  );
}
