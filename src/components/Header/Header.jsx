import { Container, Row} from "reactstrap";
import { NavLink} from "react-router-dom";

// import logo from "../../assets/picture/unnamed.png";
import "./header.css";

const nav__links = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/about",
    display: "About",
  },
  {
    path: "/tours",
    display: "Tours",
  },
];

const Header = () => {

  return (
    <header className="header">
      <Container>
        <Row>
          <div className="nav__wrapper d-flex align-items-center justify-content-between">
            {/* --logo-- */}
            {/* <div className="logo">
              <img src={logo} alt="" />
            </div> */}
            {/* --logo end-- */}

            {/* --menu start-- */}
            <div className="navigation">
              <ul className="menu d-flex allign-items-center gap-5">
                {nav__links.map((item, index) => (
                  <li className="nav__item" key={index}>
                    <NavLink to={item.path} className={navClass => navClass.isActive ? "active__link" : ""}>{item.display}</NavLink>
                  </li>
                ))}
              </ul>
            </div>
            {/* --menu end-- */}
          </div>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
