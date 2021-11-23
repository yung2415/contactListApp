import React, { Fragment, useState, useEffect } from "react";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";
import Axios from "axios";

function App() {
  const [contacts, setContacts] = useState([]);
  const [editContact, setEditContact] = useState({});

  const addContactHandler = (cName, cPhone, cEmail) => {
    Axios.post("https://mysql4scl.herokuapp.com/create", {
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
    Axios.put("https://mysql4scl.herokuapp.com/update", {
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
    Axios.get("https://mysql4scl.herokuapp.com/contacts").then((response) => {
      setContacts(response.data);
    });
  };

  const deleteContact = (id) => {
    Axios.delete(`https://mysql4scl.herokuapp.com/${id}`).then(() => {
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
