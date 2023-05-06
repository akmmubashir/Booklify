import axios from "axios";
import React, { useEffect, useState } from "react";
import { admindata } from "../url";

function Admins() {
  const [display, setdisplay] = useState([]);
  useEffect(() => {
    axios.get(admindata).then((res) => {
      setdisplay(res.data);
      console.log(res.data);
      const id = res.data._id;
      console.log(id);
    });
  }, []);
  return (
    <div>
      <section className="align-items-center row">
        <div className="col-lg-12 col-md-12 col-sm-12">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Username</th>
                <th>Role</th>
                <th>Status</th>
                <th>Email</th>
                <th>Phone</th>
              
              </tr>
            </thead>
            {display.map((admin) => {
              return (
                <>
                  <tbody>
                    <tr key={admin}>
                      <td> {admin.name}</td>
                      <td> {admin.username}</td>
                      <td> {admin.role}</td>
                      <td> {admin.status}</td>
                      <td> {admin.email}</td>
                      <td> {admin.phone}</td>
                    </tr>
                  </tbody>
                  {/* name,
          username,
          role,
          status,
          email,
          phone,
          password, */}
                </>
              );
            })}
          </table>
        </div>
      </section>
    </div>
  );
}

export default Admins;
