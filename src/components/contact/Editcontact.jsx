import { Cyan, Purple, Orange } from "../../helpers/color";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";
import { getContact, updateContact } from "../../services/contactServices";
import Spinner from "../Spinner";
import { ContactContext } from "../../context/contactContext";
import { Formik, Field, ErrorMessage, Form } from "formik";
import { contactSchema } from "../../validation/contactValidation";
import { useImmer } from "use-immer";
import { toast } from "react-toastify";
const Editcontact = () => {
  const { contactId } = useParams();
  const navigate = useNavigate();
  const [contact, setContact] = useImmer({});
  const {
    loading,
    setloading,
    groups,
    contacts,
    setContacts,
    setFilteredContacts,
  } = useContext(ContactContext);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setloading(true);
        const { data: contactData } = await getContact(contactId);
        setloading(false);
        setContact(contactData);
      } catch (err) {
        console.log(err.message);
        setloading(false);
      }
    };
    fetchData();
  }, []);
  const setContactInfo = (event) => {
    setContact({
      ...contact,
      [event.target.name]: event.target.value,
    });
  };
  const submitForm = async (values) => {
    try {
      setloading(true);
      const { data, status } = await updateContact(values, contactId);

      if (status === 200) {
        toast.info("مخاطب با موفقیت  ویرایش شد", {icon : "✅"})
        setloading(false);
        const allcontacts = [...contacts];
        const contactIndex = allcontacts.findIndex(
          (c) => c.id === parseInt(contactId)
        );
        allcontacts[contactIndex] = { ...data };
        setContacts((draft) => {
          const contactIndex = draft.findIndex(
            (c) => c.id === parseInt(contactId)
          );
          draft[contactIndex] = { ...data };
        });
        setFilteredContacts((draft) => {
          const contactIndex = draft.findIndex(
            (c) => c.id === parseInt(contactId)
          );
          draft[contactIndex] = { ...data };
        });

        navigate("/contacts");
      }
    } catch (err) {
      console.log(err.message);
      setloading(false);
    }
  };
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <section className="p-3">
            <div className="container">
              <div className="row my-2">
                <div className="col text-center">
                  <p className="h4 fw-bold" style={{ color: Orange }}>
                    ویرایش مخاطب
                  </p>
                </div>
              </div>
              <hr style={{ backgroundColor: Orange }} />
              <div
                className="row p-2 w-75 mx-auto align-items-center"
                style={{ backgroundColor: "#44475a", borderRadius: "1em" }}
              >
                <div className="col-md-8">
                  <Formik
                    initialValues={{
                      fullname: contact.fullname,
                      photo: contact.photo,
                      mobile: contact.mobile,
                      job: contact.job,
                      email: contact.email,
                      group: contact.group,
                    }}
                    validationSchema={contactSchema}
                    onSubmit={(values) => {
                      submitForm(values);
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
                        <Field
                          as="select"
                          className="form-control"
                          name="group"
                        >
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
                          value={"ویرایش  مخاطب"}
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
                <div className="col-md-4">
                  <img
                    src={contact.photo}
                    className="img-fluid rounded"
                    style={{ border: `1px solid ${Purple}` }}
                  />
                </div>
              </div>
            </div>

            <div className="text-center mt-1">
              <img
                src={require("../../assets/man-taking-note.png")}
                height="300px"
                style={{ opacity: "60%" }}
              />
            </div>
          </section>
        </>
      )}
    </>
  );
};
export default Editcontact;
