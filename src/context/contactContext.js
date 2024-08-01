import { createContext } from "react";
export const ContactContext = createContext({
  loading: false,
  setloading: () => {},
  contact: {},
  setContacts: () => {},
  contacts: [],
  filteredContacts: [],
  setFilteredContacts: () => {},
  groups: [],
  onContactChange: () => {},
  deleteContact: () => {},
  updateContact: () => {},
  createContact: () => {},
  contactSearch: () => {},
});
