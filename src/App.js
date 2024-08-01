import "./App.css";
import { useEffect } from "react";
import { confirmAlert } from "react-confirm-alert";
import {
  Navbar,
  Addcontact,
  Viewcontact,
  Editcontact,
  Contacts,
} from "./components";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import {
  createContact,
  getAllContacts,
  getAllGroup,
  deleteContact,
} from "./services/contactServices";
import { Currentline, Foreground, Purple, Yellow } from "./helpers/color";
import { ContactContext } from "./context/contactContext";
import { useImmer } from "use-immer";
import { ToastContainer, toast } from "react-toastify";
const App = () => {
  const [loading, setloading] = useImmer(false);
  const [filteredContacts, setFilteredContacts] = useImmer([]);
  const [groups, setGroups] = useImmer([]);
  const [contacts, setContacts] = useImmer([]);
  const [contact, setcontact] = useImmer({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setloading(true);
        const { data: contactData } = await getAllContacts();
        const { data: groupData } = await getAllGroup();
        setContacts(contactData);
        setFilteredContacts(contactData);
        setGroups(groupData);
        setloading(false);
      } catch (err) {
        setloading(false);
        console.log(err.message);
      }
    };
    fetchData();
  }, []);
  const createContactForm = async (values) => {
    try {
      setloading((prevloading) => !prevloading);
      const { status, data } = await createContact(values);
      if (status === 201) {
        toast.success("مخاطب  با  موفقیت  ساخته شد !", { icon: "🚀" });
        setContacts((draft) => {
          draft.push(data);
        });
        setFilteredContacts((draft) => {
          draft.push(data);
        });
        setloading((prevloading) => !prevloading);
        navigate("/contacts");
      }
    } catch (err) {
      console.log(err.message);
      setloading((prevloading) => !prevloading);
    }
  };
  const confirmDelete = (contactId, contactFullname) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <>
            <div
              className="p-4"
              dir="rtl"
              style={{
                backgroundColor: Currentline,
                border: `1px solid ${Purple}`,
                borderRadius: "1rem",
              }}
            >
              <h1 style={{ color: Yellow }}>پاک کردن مخاطب</h1>
              <p style={{ color: Foreground }}>
                مطمئنی میخای کاربر با نام {contactFullname} رو پاک کنی؟
              </p>
              <button
                onClick={() => {
                  removeContact(contactId);
                  onClose();
                }}
                className="btn mx-2"
                style={{ backgroundColor: Purple }}
              >
                مطمئن هستم{" "}
              </button>
              <button
                onClick={onClose}
                className="btn"
                style={{ backgroundColor: Comment }}
              >
                انصراف
              </button>
            </div>
          </>
        );
      },
    });
  };
  const removeContact = async (contactId) => {
    try {
      setloading(true);
      setContacts((draft) => draft.filter((c) => c.id !== contactId));
      setFilteredContacts((draft) => draft.filter((c) => c.id !== contactId));
      const { status } = await deleteContact(contactId);
      if (status === 200) {
        toast.error("کاربر با  موفقیت   حذف شد ", { icon: "💣" });
        const { data: contactsData } = await getAllContacts();
        setContacts(contactsData);
        setloading(false);
      }
    } catch (err) {
      console.log(err.message);
      setloading(false);
    }
  };
  let filteredTimeOut;
  const contactSearch = (query) => {
    clearTimeout(filteredTimeOut);
    if (!query) {
      setFilteredContacts([...contacts]);
    }
    filteredTimeOut = setTimeout(() => {
      setFilteredContacts((draft) =>
        draft.filter((c) =>
          c.fullname.toString().toLowerCase().includes(query.toLowerCase())
        )
      );
    }, 1000);
  };
  return (
    <ContactContext.Provider
      value={{
        loading,
        setloading,
        contact,
        setContacts,
        contacts,
        groups,
        filteredContacts,
        setFilteredContacts,
        deleteContact: confirmDelete,
        createContact: createContactForm,
        contactSearch,
      }}
    >
      <div className="App">
        <ToastContainer rtl={true} position="top-right" theme="colored" />
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to={"/contacts"} />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/contacts/add" element={<Addcontact />} />
          <Route path="/contacts/edit/:contactId" element={<Editcontact />} />
          <Route path="/contacts/:contactId" element={<Viewcontact />} />
        </Routes>
      </div>
    </ContactContext.Provider>
  );
};

export default App;
