import { Currentline, Purple, Orange, Cyan, Red } from "../../helpers/color";
import { Link } from "react-router-dom";
const Contact = ({ contact, confirmDelete }) => {
  return (
    <>
      <div className="col-md-6">
        <div className="card my-2" style={{ backgroundColor: Currentline }}>
          <div className="card-body">
            <div className="row align-item-center d-flex justify-content-around">
              <div className="col-md-4 col-sm-4">
                <img
                  src={contact.photo}
                  alt={contact.fullname}
                  style={{ border: `1px solid ${Purple}` }}
                  className="rounded img-fluid"
                />
              </div>
              <div className="col-md-7 col-sm-7">
                <ul className="list-group">
                  <li className="list-group-item list-group-item-dark">
                    نام و نام خانوادگی :{" "}
                    <span className="fw-bold">{contact.fullname}</span>
                  </li>
                  <li className="list-group-item list-group-item-dark">
                    شماره موبایل:{" "}
                    <span className="fw-bold">{contact.mobile}</span>
                  </li>
                  <li className="list-group-item list-group-item-dark">
                    آدرس ایمیل: <span className="fw-bold">{contact.email}</span>
                  </li>
                </ul>
              </div>
              <div className="col-md-1 col-sm-1 d-flex align-items-center flex-column">
                <Link
                  className="my-1 btn"
                  style={{ backgroundColor: Orange }}
                  to={`${contact.id}`}
                >
                  <i className="fa fa-eye"></i>
                </Link>
                <Link
                  className="my-1 btn"
                  style={{ backgroundColor: Cyan }}
                  to={`/contacts/edit/${contact.id}`}
                >
                  <i className="fa fa-pencil"></i>
                </Link>
                <button
                  className="my-1 btn"
                  style={{ backgroundColor: Red }}
                  onClick={confirmDelete}
                >
                  <i className="fa fa-trash"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Contact;
