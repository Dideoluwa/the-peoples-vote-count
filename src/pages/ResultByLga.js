import axios from "axios";
import React, { useEffect, useState } from "react";
import "./ResultByLga.scss";
import styles from "./Result.module.css";
// import sanwo from "../assets/sanwo.png";
// import jandor from "../assets/jandor.png";
// import grv from "../assets/grv.png";

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
      .get(
        `${process.env.REACT_APP_BASE_URL}/${process.env.REACT_APP_KEY}/Results`,
        {
          headers: { Authorization: `Bearer ${process.env.REACT_APP_TOKEN}` },
        }
      )
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
            {/* <div className={styles.imgWrapperInner}>
              <img src={sanwo} alt="gov" />
            </div> */}
            <p>Babajide Olusola Sanwo-Olu</p>
          </div>

          <div>
            <p style={{ color: "#DB6758" }}>APC</p>
          </div>
          <div>
            <p>{Number(APC).toLocaleString() || `Yet to be uploaded`}</p>
          </div>
          <div>
            <p>
              {((APC / TOTAL || 0) * 100)?.toFixed(2) + "%" ||
                `Yet to be uploaded`}
            </p>
          </div>
        </div>

        <div className={styles.polling_units_table_inner}>
          <div>
            {/* <div className={styles.imgWrapperInner}>
              <img src={grv} alt="gov" />
            </div> */}
            <p>Gbadebo Rhodes-Vivour</p>
          </div>
          <div>
            <p style={{ color: "#1D90E9" }}>LP</p>
          </div>
          <div>
            <p>{Number(LP).toLocaleString() || `Yet to be uploaded`}</p>
          </div>
          <div>
            <p>
              {((LP / TOTAL || 0) * 100)?.toFixed(2) + "%" ||
                `Yet to be uploaded`}
            </p>
          </div>
        </div>

        <div className={styles.polling_units_table_inner}>
          <div>
            {/* <div className={styles.imgWrapperInner}>
              <img src={jandor} alt="gov" />
            </div> */}

            <p>Adediran Azeez Olajide</p>
          </div>
          <div>
            <p style={{ color: "#4CA080" }}>PDP</p>
          </div>
          <div>
            <p>{Number(PDP).toLocaleString() || `Yet to be uploaded`}</p>
          </div>
          <div>
            <p>
              {((PDP / TOTAL || 0) * 100)?.toFixed(2) + "%" ||
                `Yet to be uploaded`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResultByLga;
