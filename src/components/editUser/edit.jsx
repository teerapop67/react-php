import React, { useState, useEffect, useMemo } from "react";
import "./edit.css";
import { Link } from "react-router-dom";

const EditUser = (props) => {
  const [userData, setUserData] = useState([]);
  const [beforeEdit, setBeforeEdit] = useState([]);

  useEffect(() => {
    setUserData({
      id: parseInt(props.idEdit),
      edit_username: beforeEdit[0].user_username,
      edit_password: beforeEdit[0].user_password,
      edit_email: beforeEdit[0].user_email,
      edit_name: beforeEdit[0].user_name,
    });
  }, []);

  useMemo(
    () =>
      props.users.map((evt) => {
        if (evt.user_Id === props.idEdit) beforeEdit.push(evt);
      }),
    [beforeEdit]
  );

  const editNew = (e, field) => {
    console.log("ID", props.idEdit);

    setUserData({
      ...userData,
      id: parseInt(props.idEdit),
      [field]: e.target.value,
    });
    console.log("data, ", userData);
  };

  const clickedEdit = () => {
    fetch("http://localhost/php-react/db_editUser.php", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          let userUpdate = props.users.map((evt) => {
            if (evt.user_Id === props.idEdit) {
              evt.user_username = beforeEdit[0].user_username;
              evt.user_password = beforeEdit[0].user_password;
              evt.user_email = beforeEdit[0].user_email;
              evt.user_name = beforeEdit[0].user_name;
            }
            return evt;
          });

          props.setUsers(userUpdate);
        } else {
          alert(data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="container-edit">
        <div className="wrapper">
          <h1>Edit</h1>
          <div className="insert-user">
            <div className="input-field">
              <input
                placeholder="Enter Username"
                type="text"
                id="_username"
                onChange={(e) => editNew(e, "edit_username")}
                required
                defaultValue={beforeEdit[0].user_username}
              />
              <input
                placeholder="Enter Password"
                type="password"
                id="_password"
                onChange={(e) => editNew(e, "edit_password")}
                required
                defaultValue={beforeEdit[0].user_password}
              />
              <input
                placeholder="Enter Email"
                type="text"
                id="_Email"
                onChange={(e) => editNew(e, "edit_email")}
                required
                defaultValue={beforeEdit[0].user_email}
              />
              <input
                placeholder="Enter Nickname"
                type="text"
                id="_name"
                onChange={(e) => editNew(e, "edit_name")}
                required
                defaultValue={beforeEdit[0].user_name}
              />
            </div>

            <button onClick={clickedEdit} className="insert-btn">
              <Link to="/totalUser"> Edit</Link>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditUser;
