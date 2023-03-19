import axios from "axios";
import React, { useEffect, useState } from "react";
import "./ResultByLga.scss";
import styles from "./Result.module.css";

const lagosLGAs = [
  "Filter results",
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
  "Oshodi/Isolo",
  "Shomolu",
  "Surulere",
];

function Incident() {
  const [lga, setLga] = useState("");
  const [people, setPeople] = useState([]);
  const [filter, setFilter] = useState([]);
  const [localGovernmentResult, setLocalGovernmentResult] = useState(filter);

  useEffect(() => {
    axios
      .get("https://api.airtable.com/v0/appgbjvsRUEJaLLcX/Incidents", {
        headers: { Authorization: `Bearer keyT7TJmBkPGhXhoJ` },
      })
      .then((response) => {
        console.log(response.data.records);
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
    if (lga === "Filter results") {
      setLga("");
    }
  }, [lga]);

  useEffect(() => {
    const resultByLga = filter?.filter((data, index) => {
      return data?.fields?.LGA?.toLowerCase().includes(lga?.toLowerCase());
    });
    setLocalGovernmentResult(resultByLga);
  }, [filter, lga]);

  const lgaChangeHandler = (e) => {
    setLga(e.target.value);
  };
  return (
    <div className="head">
      <div className="heading">
        <p></p>
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
      <div className={styles.polling_units_table_cover}>
        <div className={styles.polling_units_table_inner}>
          <div>
            <p>Type</p>
          </div>

          <div>
            <p>Video</p>
          </div>
          <div>
            <p>LGA</p>
          </div>
          <div>
            <p>Caption</p>
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
              className={styles.polling_units_table_inner}
            >
              <div>
                <p>{data.fields.Type}</p>
              </div>

              <div>
                <a href={data.fields.Media} target="_blank" rel="noreferrer">
                  Click Link
                </a>
              </div>
              <div>
                <p>{data.fields.LGA}</p>
              </div>
              <div>
                <p>{data?.fields.Caption || `No caption Available`}</p>
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
