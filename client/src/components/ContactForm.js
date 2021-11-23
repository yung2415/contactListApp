import React, { useState, useLayoutEffect, useRef } from "react";
import styles from "./ContactForm.module.css";

const ContactForm = (props) => {
  const [contactName, setContactName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [editing, setEditing] = useState(false);

  const addContactHandler = (event) => {
    event.preventDefault();
    if (contactName.trim().length === 0 || contactNumber.trim().length === 0) {
      return;
    }
    props.onAddContact(contactName, contactNumber, contactEmail);
    setContactName("");
    setContactNumber("");
    setContactEmail("");
  };

  const nameChangeHandler = (event) => {
    setContactName(event.target.value);
  };

  const phoneChangeHandler = (event) => {
    setContactNumber(event.target.value);
  };

  const emailChangeHandler = (event) => {
    setContactEmail(event.target.value);
  };

  const firstUpdate = useRef(true);
  useLayoutEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
    } else {
      setContactName(props.fillin.name);
      setContactEmail(props.fillin.email);
      setContactNumber(props.fillin.phone);
      setEditing(true);
    }
  }, [props.fillin]);

  return (
    <form onSubmit={addContactHandler} className={styles.contactForm}>
      <label for="name">Name:</label>
      <input type="text" onChange={nameChangeHandler} value={contactName} />
      <label for="phone">Phone:</label>
      <input
        type="number"
        onChange={phoneChangeHandler}
        value={contactNumber}
      />
      <label for="email">Email:</label>
      <input type="email" onChange={emailChangeHandler} value={contactEmail} />
      <button type="submit" style={{ display: !editing ? "block" : "none" }}>
        Add Contact
      </button>
      <button
        type="button"
        style={{ display: editing ? "block" : "none" }}
        onClick={() => {
          props.onFillin(
            props.fillin.id,
            contactName,
            contactNumber,
            contactEmail
          );
          setContactName("");
          setContactNumber("");
          setContactEmail("");
          setEditing(false);
        }}
      >
        Submit update
      </button>
    </form>
  );
};

export default ContactForm;
