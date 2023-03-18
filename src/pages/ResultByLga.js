import axios from "axios";
import React, { useEffect, useState } from "react";
import "./ResultByLga.scss";

const lagosLGAs = [
  "Filter LGA:",
  "Agege",
  "Ajeromi-Ifelodun",
  "Alimosho",
  "Amuwo-Odofin",
  "Apapa",
  "Badagry",
  "Epe",
  "Eti-Osa",
  "Ibeju-Lekki",
  "Ifako-Ijaiye",
  "Ikeja",
  "Ikorodu",
  "Kosofe",
  "Lagos Island",
  "Lagos Mainland",
  "Mushin",
  "Ojo",
  "Oshodi-Isolo",
  "Shomolu",
  "Surulere",
];

function ResultByLga() {
  const [lga, setLga] = useState("");
  const [people, setPeople] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://api.airtable.com/v0/appgbjvsRUEJaLLcX/Results?maxRecords=3&view=Grid%20view",
        {
          headers: { Authorization: `Bearer keyT7TJmBkPGhXhoJ` },
        }
      )
      .then((response) => {
        console.log(response.data.records);
        setPeople(response.data.records);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const lgaChangeHandler = (e) => {
    setLga(e.target.value);
  };
  return (
    <div className="head">
      <div className="heading">
        <p>LGA Won by</p>
        <div className="form__inner">
          <div className="form__inner__input">
            <select value={lga} onChange={lgaChangeHandler}>
              {lagosLGAs.map((data, index) => (
                <option value={data}>{data}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="polling_units_table_cover">
        <div className="polling_units_table_inner">
          <div>
            <p>Candidate</p>
          </div>
          <div>
            <p>Party</p>
          </div>
          <div>
            <p>Votes</p>
          </div>
          <div>
            <p>precent</p>
          </div>
          <div>
            <p>precent</p>
          </div>
        </div>
        {people?.map((data, index) => {
          const color = index % 2 === 0 ? "#FFFFFF" : "#fcfcfc";
          return (
            <div
              style={{ backgroundColor: color }}
              className="polling_units_table_inner"
            >
              <div>
                <p>{data.s}</p>
              </div>
              <div>
                <p>{data.fileds}</p>
              </div>
              <div>
                <p>{data.lga}</p>
              </div>
              <div>
                <p>120</p>
              </div>
              <div>
                <p>120</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ResultByLga;
