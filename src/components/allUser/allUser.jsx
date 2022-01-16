import react, { useEffect, useState } from "react";
import "./alluser.css";
import { Link } from "react-router-dom";

const AllUser = (props) => {
  useEffect(() => {
    const handle = () => {
      fetch("http://localhost/php-react/db_allUser.php")
        .then((res) => {
          return res.json();
        })
        .then(async (data) => {
          if (data.success) {
            props.setUsers(data.user55);
          }
        })
        .catch((err) => {
          console.log("ERROR: ");
          console.log(err);
        });
    };

    handle();
  }, [props.users]);

  const delUser = () => {
    console.log("%%%%%");
    let userDel = props.users.filter((user) => {
      return user.user_Id !== props.idEdit;
    });

    fetch("http://localhost/php-react/db_del.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: props.idEdit }),
    })
      .then(async (res) => {
        let cloneData = await res.clone().json();
        console.log(cloneData);
        return cloneData;
      })
      .then((data) => {
        if (data.success) {
          props.setUsers(userDel);
          alert(data.msg);
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
      <div className="all-users">
        <h1 className="header">Total Users</h1>
        <div className="container-user">
          <div className="topic-header">
            <h3>ID</h3>
            <h3>Username</h3>
            <h3>Password</h3>
            <h3>Email</h3>
            <h3>Nickname</h3>
          </div>
          {props.users.map(
            ({
              user_Id,
              user_username,
              user_password,
              user_email,
              user_name,
            }) => (
              <div key={user_Id} className="show">
                <div className="topic">
                  <p>{user_Id}</p>
                </div>
                <div className="topic">
                  <p>{user_username}</p>
                </div>
                <div className="topic">
                  <p>{user_password}</p>
                </div>
                <div className="topic">
                  <p>{user_email}</p>
                </div>
                <div className="topic">
                  <p>{user_name}</p>
                </div>
                <div
                  className="btn"
                  style={{ backgroundColor: "green" }}
                  onClick={() => props.setIdEdit(user_Id)}
                >
                  <Link to="/edit">Edit</Link>
                </div>
                <div
                  className="btn"
                  style={{ backgroundColor: "red" }}
                  onClick={() => {
                    props.setIdEdit(user_Id);
                    delUser();
                  }}
                >
                  Del
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </>
  );
};

export default AllUser;
