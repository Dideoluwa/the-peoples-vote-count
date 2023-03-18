import axios from "axios";
import React, { useEffect, useState } from "react";
import "./ResultsBypollingUnit.scss";

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

function ResultByPollingUnit() {
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
        <div className="pollen_units_table_input">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.58341 17.5C13.9557 17.5 17.5001 13.9556 17.5001 9.58334C17.5001 5.21108 13.9557 1.66667 9.58341 1.66667C5.21116 1.66667 1.66675 5.21108 1.66675 9.58334C1.66675 13.9556 5.21116 17.5 9.58341 17.5Z"
              stroke="#C4C4C4"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M17.9797 18.6869C18.175 18.8821 18.4915 18.8821 18.6868 18.6869C18.8821 18.4916 18.8821 18.175 18.6868 17.9798L17.9797 18.6869ZM16.1868 15.4798L15.8333 15.1262L15.1261 15.8333L15.4797 16.1869L16.1868 15.4798ZM18.6868 17.9798L16.1868 15.4798L15.4797 16.1869L17.9797 18.6869L18.6868 17.9798Z"
              fill="#C4C4C4"
            />
          </svg>
          <input type="text" placeholder="Search" />
        </div>
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
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ResultByPollingUnit;
