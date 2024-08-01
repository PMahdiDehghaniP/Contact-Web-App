import { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { getGroup, getContact } from "../../services/contactServices";
import Spinner from "../Spinner";
import { Currentline, Cyan, Purple } from "../../helpers/color";
import { ContactContext } from "../../context/contactContext";
const Viewcontact = () => {
  const { contactId } = useParams();
  const [state, setState] = useState({
    contact: {},
    group: {},
  });
  const { loading, setloading } = useContext(ContactContext);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setState({ ...state });
        setloading(true);
        const { data: contactData } = await getContact(contactId);
        const { data: contactgroup } = await getGroup(contactData.group);
        setState({
          ...state,
          contact: contactData,
          group: contactgroup,
        });
        setloading(false);
      } catch (err) {
        console.log(err.message);
        setloading(false);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <section className="view-contact-intro p3">
        <div className="container">
          <div className="row my-2 text-center">
            <p className="h3 fw-bold" style={{ color: Cyan }}>
              اطلاعات مخاطب
            </p>
          </div>
        </div>
      </section>

      <hr style={{ backgroundColor: Cyan }} />

      {loading ? (
        <Spinner />
      ) : (
        <>
          {Object.keys(state.contact).length > 0 && (
            <section className="view-contact mt-e">
              <div
                className="container p-2"
                style={{ borderRadius: "1em", backgroundColor: Currentline }}
              >
                <div className="row align-items-center">
                  <div className="col-md-3">
                    <img
                      src={state.contact.photo}
                      alt=""
                      className="img-fluid rounded"
                      style={{ border: `1px solid ${Purple}` }}
                    />
                  </div>
                  <div className="col-md-9">
                    <ul className="list-group">
                      <li className="list-group-item list-group-item-dark">
                        نام و نام خانوادگی :{" "}
                        <span className="fw-bold">
                          {state.contact.fullname}
                        </span>
                      </li>
                      <li className="list-group-item list-group-item-dark">
                        شماره موبایل :{" "}
                        <span className="fw-bold">{state.contact.mobile}</span>
                      </li>
                      <li className="list-group-item list-group-item-dark">
                        ایمیل :{" "}
                        <span className="fw-bold">{state.contact.email}</span>
                      </li>
                      <li className="list-group-item list-group-item-dark">
                        شغل :{" "}
                        <span className="fw-bold">{state.contact.job}</span>
                      </li>
                      <li className="list-group-item list-group-item-dark">
                        گروه :{" "}
                        <span className="fw-bold">{state.group.name}</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="row my-2">
                  <div className="d-grid gap-2 col-6 mx-auto">
                    <Link
                      to={"/contacts"}
                      className="btn"
                      style={{ backgroundColor: Purple }}
                    >
                      برگشت به صفحه اصلی
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          )}
        </>
      )}
    </>
  );
};
export default Viewcontact;
