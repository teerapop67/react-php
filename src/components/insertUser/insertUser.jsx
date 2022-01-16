import React, { useState } from "react";
import "./insertUser.css";

const InsertUser = (props) => {
  const [message, setMessage] = useState([]);

  const insertUsers = () => {
    fetch("http://localhost/php-react/db_addUser.php", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify(props.newUsers),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.id) {
          setMessage(data.msg);

          props.setUsers([...props.users, ...props.newUsers]);
        } else {
          alert(data.msg);
        }
      });
  };

  const newAddUser = (e, field) => {
    console.log(field, e.target.value);
    props.setNewUsers({ ...props.newUsers, [field]: e.target.value });
  };
  return (
    <>
      <div className="insert-user">
        <h1 style={{ color: "#fff" }}>Add new user</h1>

        <div className="input-field">
          <input
            placeholder="Enter Username"
            type="text"
            id="_username"
            onChange={(e) => newAddUser(e, "add_username")}
            required
          />
          <input
            placeholder="Enter Password"
            type="password"
            id="_password"
            onChange={(e) => newAddUser(e, "add_password")}
            required
          />
          <input
            placeholder="Enter Email"
            type="text"
            id="_Email"
            onChange={(e) => newAddUser(e, "add_email")}
            required
          />
          <input
            placeholder="Enter Nickname"
            type="text"
            id="_name"
            onChange={(e) => newAddUser(e, "add_name")}
            required
          />
        </div>

        <button onClick={insertUsers} className="insert-btn">
          ADD
        </button>
        <p style={{ color: "green" }}>{message}</p>
      </div>
    </>
  );
};

export default InsertUser;
