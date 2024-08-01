import { Purple } from "../../helpers/color";
import { useContext } from "react";
import { ContactContext } from "../../context/contactContext";
const SearchContact = () => {
  const {contactSearch } = useContext(ContactContext);
  return (
    <div className="input-group mx-2 w-75" dir="ltr">
      <span
        className="input-group-text"
        id="basic-addon1"
        style={{ backgroundColor: Purple }}
      >
        <i className="fa fa-search"></i>
      </span>
      <input
        dir="rtl"
        type="text"
        onChange={event => contactSearch(event.target.value)}
        className="form-control"
        placeholder="جستجو مخاطب"
        aria-label="Search"
        aria-describedby="basic-addon1"
      />
    </div>
  );
};
export default SearchContact;
