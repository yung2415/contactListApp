import React from "react";
import styles from "./ContactList.module.css";

const ContactList = (props) => {
  return (
    <>
      {props.datas.map((data) => (
        <div className={styles.card} key={data.id}>
          <h3>{data.name}</h3>
          <p>Phone: {data.phone}</p>
          <p>Email: {data.email}</p>
          <button
            onClick={() => {
              props.onUpdate(data.id, data.name, data.phone, data.email);
            }}
          >
            Edit
          </button>
          <button
            onClick={() => {
              props.onDelete(data.id);
            }}
          >
            Delete
          </button>
        </div>
      ))}
    </>
  );
};

export default ContactList;
