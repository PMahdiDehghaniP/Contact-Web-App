import SearchContact from "./contact/SearchContact";
import { Purple, Background } from "../helpers/color";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  return (
    <nav
      className="navbar navbar-dark shadow-lg navbar-expand-sm"
      style={{ backgroundColor: Background }}
    >
      <div className="container">
        <div className="row w-100">
          <div className="col">
            <div className="navbar-brand">
              <i className="fa fa-id-badge mx-2" style={{ color: Purple }}></i>
              وب اپلیکیشن میدیریت <span style={{ color: Purple }}>مخاطبین</span>
            </div>
          </div>
          {location.pathname === "/contacts" ? (
            <div className="col">
              <SearchContact/>
            </div>
          ) : null}
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
