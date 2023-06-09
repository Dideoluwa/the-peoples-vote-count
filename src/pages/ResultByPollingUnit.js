import axios from "axios";
import React, { useEffect, useState } from "react";
import "./ResultsBypollingUnit.scss";
import styles from "./Result.module.css";

const lagosLGAs = [
  "Filter results by LGA",
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

function ResultByPollingUnit() {
  const [lga, setLga] = useState("");
  const [people, setPeople] = useState([]);
  const [filter, setFilter] = useState([]);
  const [localGovernmentResult, setLocalGovernmentResult] = useState([]);
  const [filteredResults, setFilteredResults] = useState(localGovernmentResult);
  const [search, setSearch] = useState("");
  const [sortedData, setSortedData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const filterResultByLga = people?.filter((data, index) => {
      return data?.fields?.Status === "Accepted";
    });
    setFilter(filterResultByLga);
  }, [people]);

  useEffect(() => {
    if (lga === "Filter results by LGA") {
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

  const lgaChangeHandler = (e) => {
    setLga(e.target.value);
  };

  const searchHandler = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    const filterResults = localGovernmentResult?.filter((data, index) =>
      data.fields["PU Address"].toLowerCase().includes(search.toLowerCase())
    );
    setFilteredResults(filterResults);
  }, [search, localGovernmentResult]);

  useEffect(() => {
    const sorted = [...filteredResults].sort((a, b) => {
      return a.fields["PU Address"].localeCompare(b.fields["PU Address"]);
    });
    setSortedData(sorted);
  }, [filteredResults]);

  const totalPages = Math.ceil(sortedData.length / 10);

  const startIndex = (currentPage - 1) * 10;
  const endIndex = startIndex + 10;
  const currentData = sortedData?.slice(startIndex, endIndex);

  let disable = currentPage >= totalPages ? "disabled" : "";
  let disable2 = currentPage <= 1 ? "disabled" : "";

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
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
          <input
            type="text"
            placeholder="Search"
            onChange={searchHandler}
            value={search}
          />
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
      <div className={styles.polling_units_table_cover}>
        <div className={styles.polling_units_table_inner2}>
          <div>
            <p>POLLING UNIT</p>
          </div>
          <div>
            <p>WARD</p>
          </div>
          <div>
            <p>LGA</p>
          </div>

          <div>
            <p>Result</p>
          </div>

          <div>
            <p>LP</p>
          </div>

          <div>
            <p>APC</p>
          </div>
          <div>
            <p>PDP</p>
          </div>
          <div>
            <p>TOTAL</p>
          </div>
        </div>
        {currentData?.map((data, index) => {
          const color = index % 2 === 0 ? "#FFFFFF" : "#fcfcfc";
          return (
            <div
              style={{ backgroundColor: color }}
              className={styles.polling_units_table_inner2}
            >
              <div>
                <p style={{ wordBreak: "break-all" }}>
                  {data.fields["PU Address"]}
                </p>
              </div>
              <div>
                <p style={{ wordBreak: "break-all" }}>{data.fields.Ward}</p>
              </div>
              <div>
                <p style={{ wordBreak: "break-all" }}>{data.fields.LGA}</p>
              </div>

              <div>
                <a
                  href={data.fields["Result Sheet"]}
                  target="_blank"
                  rel="noreferrer"
                >
                  Click Link
                </a>
              </div>

              <div>
                <p>{data.fields.LP}</p>
              </div>
              <div>
                <p>{data.fields.APC}</p>
              </div>
              <div>
                <p>{data.fields.PDP}</p>
              </div>
              <div>
                <p>{data.fields["Total Valid Votes"]}</p>
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

export default ResultByPollingUnit;
