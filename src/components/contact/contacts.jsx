import { Currentline, Orange, Pink } from "../../helpers/color";
import Spinner from "../Spinner";
import Contact from "./contact";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ContactContext } from "../../context/contactContext";
const Contacts = () => {
  const { filteredContacts, loading, deleteContact } =
    useContext(ContactContext);
  return (
    <>
      <section className="container">
        <div className="grid">
          <div className="row">
            <div className="col">
              <p className="h3">
                <Link
                  className="btn mx-2 float-end m-2"
                  style={{ backgroundColor: Pink }}
                  to={"/contacts/add"}
                >
                  ایجاد مخاطب جدید <i className="fa fa-plus-circle mx-2"></i>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
      {loading ? (
        <Spinner />
      ) : (
        <section className="container">
          <div className="row">
            {filteredContacts.length > 0 ? (
              filteredContacts.map((c) => {
                return (
                  <Contact
                    key={c.id}
                    contact={c}
                    confirmDelete={() => {
                      deleteContact(c.id, c.fullname);
                    }}
                  />
                );
              })
            ) : (
              <div
                className="text-center py-5"
                style={{ backgroundColor: Currentline }}
              >
                <p className="h3" style={{ backgroundColor: Orange }}>
                  مخاطب یافت نشد
                </p>
                <img
                  src={require("../../assets/no-found.gif")}
                  alt=""
                  className="w-25"
                />
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
};
export default Contacts;
