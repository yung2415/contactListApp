import React, { Fragment, useState, useEffect } from "react";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";
import Axios from "axios";

function App() {
  const [contacts, setContacts] = useState([]);
  const [editContact, setEditContact] = useState({});

  const addContactHandler = (cName, cPhone, cEmail) => {
    Axios.post("http://localhost:3001/create", {
      name: cName,
      phone: cPhone,
      email: cEmail,
    }).then(() => {
      getContact();
    });
  };

  const updateContactHandler = (id, name, phone, email) => {
    setEditContact({ id: id, name: name, phone: phone, email: email });
  };

  const updateByFillin = (id, name, phone, email) => {
    Axios.put("http://localhost:3001/update", {
      id: id,
      name: name,
      phone: phone,
      email: email,
    }).then(() => {
      setContacts(
        contacts.map((contact) => {
          return contact.id === id
            ? { id: contact.id, name: name, phone: phone, email: email }
            : contact;
        })
      );
    });
  };

  useEffect(() => {
    getContact();
  }, []);

  const getContact = () => {
    Axios.get("http://localhost:3001/contacts").then((response) => {
      setContacts(response.data);
    });
  };

  const deleteContact = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then(() => {
      setContacts(contacts.filter((contact) => contact.id !== id));
    });
  };

  return (
    <Fragment>
      <ContactForm
        onAddContact={addContactHandler}
        fillin={editContact}
        onFillin={updateByFillin}
      />
      <ContactList
        datas={contacts}
        onDelete={deleteContact}
        onUpdate={updateContactHandler}
      />
    </Fragment>
  );
}

export default App;
