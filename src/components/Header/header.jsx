import { Link } from "react-router-dom";
import logo from "../../assets/Logo/InStock-Logo_1x.png";
import "./Header.scss";

function Header() {
  return (
    <section className="header-container">
      <header className="header">
        <div className="header__img-container">
          <Link to="/">
            <img src={logo} alt="Instock" className="header__logo" />
          </Link>
        </div>
        <nav className="header__nav">
          {/* Link to /warehouses */}
          <Link to="/warehouses" className="header__tab header__tab--active">
            Warehouses
          </Link>
          {/* Link to /inventory */}
          <Link to="/inventory" className="header__tab">
            Inventory
          </Link>
        </nav>
      </header>
    </section>
  );
}

export default Header;
