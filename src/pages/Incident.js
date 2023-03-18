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

function Incident() {
  const [lga, setLga] = useState("Agege");
  const [people, setPeople] = useState([]);
  const [filter, setFilter] = useState([]);
  const [localGovernmentResult, setLocalGovernmentResult] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://api.airtable.com/v0/appgbjvsRUEJaLLcX/Incidents?maxRecords=3&view=Grid%20view",
        {
          headers: { Authorization: `Bearer keyT7TJmBkPGhXhoJ` },
        }
      )
      .then((response) => {
        // console.log(response.data.records);
        setPeople(response.data.records);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const filterResultByLga = people?.filter((data, index) => {
      return data?.fields?.Status === "Accepted";
    });
    setFilter(filterResultByLga);
  }, [people]);

  useEffect(() => {
    const resultByLga = filter?.filter((data, index) => {
      return data?.fields?.LGA?.toLowerCase() === lga?.toLowerCase();
    });
    setLocalGovernmentResult(resultByLga);
  }, [filter, lga]);

  const lgaChangeHandler = (e) => {
    setLga(e.target.value);
  };
  return (
    <div className="head">
      <div className="heading">
        <p>Most incidence reported from:</p>
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
        <div className="polling_units_table_inner2">
          <div>
            <p>Type</p>
          </div>
          <div>
            <p>Caption</p>
          </div>
          <div>
            <p>LGA</p>
          </div>
          <div>
            <p>PU Address</p>
          </div>
        </div>
        {localGovernmentResult?.map((data, index) => {
          const color = index % 2 === 0 ? "#FFFFFF" : "#fcfcfc";
          return (
            <div
              style={{ backgroundColor: color }}
              className="polling_units_table_inner2"
            >
              <div>
                <p>{data.fields.Type}</p>
              </div>
              <div>
                <p>{data?.fields.Caption || `No caption Available`}</p>
              </div>
              <div>
                <p>{data.fields.LGA}</p>
              </div>
              <div>
                <p>{data.fields["PU Address"]}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Incident;
