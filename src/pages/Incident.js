import axios from "axios";
import React, { useEffect, useState } from "react";
import "./ResultByLga.scss";
import styles from "./Result.module.css";

const lagosLGAs = [
  "Filter incident by LGA",
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
  const [sortedData, setSortedData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/${process.env.REACT_APP_KEY}/Incidents`,
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
    if (lga === "Filter incident by LGA") {
      setLga("");
    }
  }, [lga]);

  useEffect(() => {
    const resultByLga = filter?.filter((data, index) => {
      return data?.fields?.LGA?.toLowerCase().includes(lga?.toLowerCase());
    });
    setLocalGovernmentResult(resultByLga);
  }, [filter, lga]);

  useEffect(() => {
    const sorted = [...localGovernmentResult].sort((a, b) => {
      return a.fields.Type.localeCompare(b.fields.Type);
    });
    setSortedData(sorted);
  }, [localGovernmentResult]);

  const totalPages = Math.ceil(sortedData.length / 10);

  const startIndex = (currentPage - 1) * 10;
  const endIndex = startIndex + 10;
  const currentData = sortedData?.slice(startIndex, endIndex);

  let disable = currentPage >= totalPages ? "disabled" : "";
  let disable2 = currentPage <= 1 ? "disabled" : "";

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

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
        <div className={styles.polling_units_table_inner3}>
          <div>
            <p>Type</p>
          </div>

          <div>
            <p>Video</p>
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
        {currentData?.map((data, index) => {
          const color = index % 2 === 0 ? "#FFFFFF" : "#fcfcfc";
          return (
            <div
              style={{ backgroundColor: color }}
              className={styles.polling_units_table_inner3}
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
                <p>{data?.fields.Caption || `No caption Available`}</p>
              </div>
              <div>
                <p style={{ wordBreak: "break-all" }}>{data.fields.LGA}</p>
              </div>
              <div>
                <p>{data.fields["PU Address"]}</p>
              </div>
            </div>
          );
        })}
      </div>
      <div className={styles.button}>
        <button
          disabled={disable2}
          onClick={() => handlePageClick(currentPage - 1)}
        >
          Previous Page
        </button>

        <p>
          {currentPage} of {totalPages}
        </p>

        <button
          disabled={disable}
          onClick={() => handlePageClick(currentPage + 1)}
        >
          Next Page
        </button>
      </div>
    </div>
  );
}

export default Incident;
