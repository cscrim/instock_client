import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/Logo/InStock-Logo_1x.png";
import "./Header.scss";

function Header() {
  const location = useLocation();
  return (
    <section className="header-container">
      <header className="header">
        <div className="header__img-container">
          <Link to="/">
            <img src={logo} alt="Instock" className="header__logo" />
          </Link>
        </div>
        <nav className="header__nav">
          <Link
            to="/warehouses"
            className={`header__tab ${
              location.pathname === "/warehouses" ? "header__tab--active" : ""
            }`}
          >
            Warehouses
          </Link>
          <Link
            to="/inventory"
            className={`header__tab ${
              location.pathname === "/inventory" ? "header__tab--active" : ""
            }`}
          >
            Inventory
          </Link>
        </nav>
      </header>
    </section>
  );
}

export default Header;
