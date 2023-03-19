import axios from "axios";
import React, { useEffect, useState } from "react";
import "./ResultByLga.scss";
import styles from "./Result.module.css";

const lagosLGAs = [
  "Filter LGA:",
  "Agege",
  "Ajeromi-Ifelodun",
  "Alimosho",
  "Amuwo-Odofin",
  "Apapa",
  "Badagry",
  "Epe",
  "ETI-OSA",
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

function ResultByLga() {
  const [lga, setLga] = useState("Agege");
  const [people, setPeople] = useState([]);
  const [filter, setFilter] = useState([]);
  const [localGovernmentResult, setLocalGovernmentResult] = useState([]);
  const [APC, setTotalApc] = useState(null);
  const [PDP, setTotalPdp] = useState(null);
  const [LP, setTotalLp] = useState(null);
  const [TOTAL, setTotal] = useState(null);

  useEffect(() => {
    axios
      .get("https://api.airtable.com/v0/appgbjvsRUEJaLLcX/Results", {
        headers: { Authorization: `Bearer keyT7TJmBkPGhXhoJ` },
      })
      .then((response) => {
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

  useEffect(() => {
    const totalApc = localGovernmentResult?.reduce((index, data) => {
      return index + data?.fields?.APC;
    }, 0);
    setTotalApc(totalApc);

    const totalPdp = localGovernmentResult?.reduce((index, data) => {
      return index + data?.fields?.PDP;
    }, 0);
    setTotalPdp(totalPdp);

    const totalLp = localGovernmentResult?.reduce((index, data) => {
      return index + data?.fields?.LP;
    }, 0);
    setTotalLp(totalLp);

    const total = localGovernmentResult?.reduce((index, data) => {
      return index + data?.fields["Total Valid Votes"];
    }, 0);
    setTotal(total);
  }, [localGovernmentResult]);

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
        {/* {localGovernmentResult?.map((data, index) => { */}
        {/* const color = index % 2 === 0 ? "#FFFFFF" : "#fcfcfc"; */}
        {/* return ( */}
        <div className={styles.polling_units_table_inner}>
          <div>
            <p>Babajide Olusola Sanwo-Olu</p>
          </div>
          <div>
            <p>APC</p>
          </div>
          <div>
            <p>{APC || `Yet to be uploaded`}</p>
          </div>
          <div>
            <p>
              {((APC / TOTAL) * 100)?.toFixed(2) + "%" || `Yet to be uploaded`}
            </p>
          </div>
        </div>

        <div className={styles.polling_units_table_inner}>
          <div>
            <p>Gbadebo Rhodes-Vivour</p>
          </div>
          <div>
            <p>LP</p>
          </div>
          <div>
            <p>{LP || `Yet to be uploaded`}</p>
          </div>
          <div>
            <p>
              {((LP / TOTAL) * 100)?.toFixed(2) + "%" || `Yet to be uploaded`}
            </p>
          </div>
        </div>

        <div className={styles.polling_units_table_inner}>
          <div>
            <p>Abdul-Azeez Olajide Adediran</p>
          </div>
          <div>
            <p>PDP</p>
          </div>
          <div>
            <p>{PDP || `Yet to be uploaded`}</p>
          </div>
          <div>
            <p>
              {((PDP / TOTAL) * 100)?.toFixed(2) + "%" || `Yet to be uploaded`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResultByLga;
