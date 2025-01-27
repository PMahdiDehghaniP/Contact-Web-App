import { Link } from "react-router-dom";
import Spinner from "../Spinner";
import { Green, Purple, Cyan } from "../../helpers/color";
import { useContext } from "react";
import { ContactContext } from "../../context/contactContext";
import { contactSchema } from "../../validation/contactValidation";
import { Field, Form, ErrorMessage, Formik } from "formik";
const Addcontact = () => {
  const { loading, groups, createContact } = useContext(ContactContext);
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <section className="p-3">
          <img
            src={require("../../assets/man-taking-note.png")}
            height={"400px"}
            style={{
              position: "absolute",
              zIndex: -1,
              top: "130px",
              left: "100px",
              opacity: "50%",
            }}
          />
          <div className="container">
            <div className="row">
              <div className="col">
                <p className="h4 fw-bold text-center" style={{ color: Green }}>
                  ساخت مخاطب جدید{" "}
                </p>
              </div>
            </div>
            <hr style={{ backgroundColor: Green }} />
            <div className="row mt-5">
              <div className="col-md-4">
                <Formik
                  initialValues={{
                    fullname: "",
                    photo: "",
                    mobile: "",
                    job: "",
                    email: "",
                    group: "",
                  }}
                  validationSchema={contactSchema}
                  onSubmit={(values) => {
                    createContact(values);
                  }}
                >
                  <Form>
                    <div className="mb-2">
                      <Field
                        name="fullname"
                        type="text"
                        className="form-control"
                        placeholder="نام  و نام  خانوادگی"
                      />
                      <ErrorMessage
                        name="fullname"
                        render={(msg) => (
                          <div className="text-danger">{msg}</div>
                        )}
                      />
                    </div>
                    <div className="mb-2">
                      <Field
                        name="photo"
                        type="text"
                        className="form-control"
                        placeholder="آدرس تصویر"
                      />
                      <ErrorMessage
                        render={(msg) => (
                          <div className="text-danger">{msg}</div>
                        )}
                        name="photo"
                      />
                    </div>
                    <div className="mb-2">
                      <Field
                        name="mobile"
                        type="number"
                        className="form-control"
                        placeholder="شماره موبایل"
                      />
                      <ErrorMessage
                        render={(msg) => (
                          <div className="text-danger">{msg}</div>
                        )}
                        name="mobile"
                      />
                    </div>
                    <div className="mb-2">
                      <Field
                        name="email"
                        type="email"
                        className="form-control"
                        placeholder="آدرس  ایمیل"
                      />
                      <ErrorMessage
                        render={(msg) => (
                          <div className="text-danger">{msg}</div>
                        )}
                        name="email"
                      />
                    </div>
                    <div className="mb-2">
                      <Field
                        type="text"
                        name="job"
                        className="form-control"
                        placeholder="شغل"
                      />
                      <ErrorMessage
                        render={(msg) => (
                          <div className="text-danger">{msg}</div>
                        )}
                        name="job"
                      />
                    </div>
                    <div className="mb-2">
                      <Field as="select" className="form-control" name="group">
                        <option value="">انتخاب گروه </option>
                        {groups.length > 0 &&
                          groups.map((group) => (
                            <option key={group.id} value={group.id}>
                              {group.name}
                            </option>
                          ))}
                      </Field>
                      <ErrorMessage
                        render={(msg) => (
                          <div className="text-danger">{msg}</div>
                        )}
                        name="group"
                      />
                    </div>
                    <div className="mx-2">
                      <input
                        type="submit"
                        className="btn"
                        style={{ backgroundColor: Purple }}
                        value={"ساخت مخاطب"}
                      />
                      <Link
                        to={"/contacts"}
                        className="btn mx-2"
                        style={{ backgroundColor: Cyan }}
                      >
                        انصراف
                      </Link>
                    </div>
                  </Form>
                </Formik>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};
export default Addcontact;
