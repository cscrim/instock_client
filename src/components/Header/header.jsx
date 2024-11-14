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
        <button className="header__tab header__tab--active">Warehouses</button>
        <button className="header__tab">Inventory</button>
      </nav>
    </header>

    </section>
  );
}

export default Header;
