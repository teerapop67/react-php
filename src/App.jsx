import React, { useState, lazy, Suspense } from "react";
import EditUser from "./components/editUser/edit";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/navbar";
const InsertUser = lazy(() => import("./components/insertUser/insertUser"));
const AllUser = lazy(() => import("./components/allUser/allUser"));

function App() {
  const [users, setUsers] = useState([]);
  const [newUsers, setNewUsers] = useState([]);
  const [idEdit, setIdEdit] = useState(0);

  return (
    <>
      <Router>
        <Navbar />
        <Suspense
          fallback={
            <>
              <h1>404 Page</h1>
            </>
          }
        >
          <div className="App">
            <Routes>
              <Route
                path="/"
                element={
                  <InsertUser
                    users={users}
                    setUsers={setUsers}
                    setNewUsers={setNewUsers}
                    newUsers={newUsers}
                  />
                }
              ></Route>
              <Route
                path="/totalUser"
                element={
                  <AllUser
                    setIdEdit={setIdEdit}
                    idEdit={idEdit}
                    users={users}
                    setUsers={setUsers}
                  />
                }
              ></Route>
              <Route
                path="/edit"
                element={
                  <EditUser idEdit={idEdit} users={users} setUsers={setUsers} />
                }
              ></Route>
            </Routes>
          </div>
        </Suspense>
      </Router>
    </>
  );
}

export default App;
