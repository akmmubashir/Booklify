import axios from "axios";
import React, { useEffect, useState } from "react";
import {  teamlists } from "../url";

function Teams() {
  const [display, setdisplay] = useState([]);
  useEffect(() => {
    axios.get(teamlists).then((res) => {
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
                <th>Firm Name</th>
                <th>Firm Address</th>
                <th>Employee Name</th>
                <th>Employee Address</th>
                <th>Position</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Alternative Phone</th>
                <th>Description</th>
              
              </tr>
            </thead>
            {display.map((team) => {
              return (
                <>
                  <tbody>
                    <tr key={team}>
                      <td> {team.firmname}</td>
                      <td> {team.firmaddress}</td>
                      <td> {team.employeename}</td>
                      <td> {team.employeeaddress}</td>
                      <td> {team.position}</td>
                      <td> {team.email}</td>
                      <td> {team.phone}</td>
                      <td> {team.alterphone}</td>
                      <td> {team.description}</td>
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

export default Teams;
