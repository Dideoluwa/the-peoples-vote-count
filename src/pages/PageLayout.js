import React, { useEffect, useState } from "react";
import apcImg from "../assets/apc.png";
import pdpImg from "../assets/pdp.png";
import logo from "../assets/logo.png";
import lpImg from "../assets/lp.png";
import axios from "axios";
import electionImg from "../assets/election.png";
import "./PageLayout.scss";

const reports = [
  {
    username: "ElectionObserver01",
    location: "Kaduna State",
    description:
      "The turnout has been impressive so far. The voters are enthusiastic and patient despite the long queues. Security personnel are present to maintain order and ensure peaceful conduct of the elections.",
    picture_link: "https://example.com/electionobserver01/kaduna1.jpg",
  },
  {
    username: "Voter01",
    location: "Lagos State",
    description:
      "I just cast my vote at Polling Unit 005 in Ikeja. The process was smooth and orderly. There were enough ballot papers and ink. I hope this election will be free and fair.",
    picture_link: "https://example.com/voter01/lagos1.jpg",
  },
  {
    username: "PollingOfficer01",
    location: "Kano State",
    description:
      "We are currently collating the results at the local government level. The turnout was high and there were no major incidents. We are working hard to ensure that the results are accurate and transparent.",
    picture_link: "https://example.com/pollingofficer01/kano1.jpg",
  },
  {
    username: "Observer02",
    location: "Rivers State",
    description:
      "There were reports of violence in some parts of the state. Some polling units were disrupted by thugs who snatched ballot boxes. The security personnel were overwhelmed and could not contain the situation.",
    picture_link: "https://example.com/observer02/rivers1.jpg",
  },
  {
    username: "Voter02",
    location: "Ogun State",
    description:
      "I am disappointed with the conduct of the election in my area. The ballot boxes were tampered with and some voters were intimidated. I hope the authorities will investigate and bring the culprits to justice.",
    picture_link: "https://example.com/voter02/ogun1.jpg",
  },
  {
    username: "Journalist01",
    location: "Abuja FCT",
    description:
      "The atmosphere is tense as the results are being announced. Supporters of the leading candidate are jubilant while those of the other candidate are protesting. Security personnel are trying to maintain order.",
    picture_link: "https://example.com/journalist01/abuja1.jpg",
  },
];

// const pollinUnits = [
//   { polling_unit: "Ward A, Polling Unit 001", ward: "Ward A", lga: "Alimosho" },
//   { polling_unit: "Ward B, Polling Unit 004", ward: "Ward B", lga: "Ikeja" },
//   { polling_unit: "Ward C, Polling Unit 002", ward: "Ward C", lga: "Kosofe" },
//   {
//     polling_unit: "Ward D, Polling Unit 003",
//     ward: "Ward D",
//     lga: "Lagos Mainland",
//   },
//   { polling_unit: "Ward E, Polling Unit 002", ward: "Ward E", lga: "Agege" },
//   {
//     polling_unit: "Ward F, Polling Unit 001",
//     ward: "Ward F",
//     lga: "Oshodi-Isolo",
//   },
//   { polling_unit: "Ward G, Polling Unit 001", ward: "Ward G", lga: "Eti-Osa" },
//   { polling_unit: "Ward H, Polling Unit 002", ward: "Ward H", lga: "Surulere" },
//   {
//     polling_unit: "Ward I, Polling Unit 003",
//     ward: "Ward I",
//     lga: "Ifako-Ijaiye",
//   },
//   {
//     polling_unit: "Ward J, Polling Unit 004",
//     ward: "Ward J",
//     lga: "Lagos Island",
//   },
// ];

const lagosLGAs = [
  "Select a LGA",
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

const PageLayout = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [people, setPeople] = useState([]);

  const lgaChangeHandler = () => {
    setIsOpen(null);
  };

  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    const now = new Date();
    const tomorrow8AM = new Date();
    tomorrow8AM.setDate(now.getDate() + 1);
    tomorrow8AM.setHours(8);
    tomorrow8AM.setMinutes(0);
    tomorrow8AM.setSeconds(0);

    const difference = tomorrow8AM.getTime() - now.getTime();

    const hours = Math.floor(difference / (1000 * 60 * 60));
    const minutes = Math.floor((difference / (1000 * 60)) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    setTimeLeft({ hours, minutes, seconds });

    const intervalId = setInterval(() => {
      const now = new Date();
      const difference = tomorrow8AM.getTime() - now.getTime();

      const hours = Math.floor(difference / (1000 * 60 * 60));
      const minutes = Math.floor((difference / (1000 * 60)) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({ hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    axios
      .get("https://api.airtable.com/v0/appk4neNtR84y3Ozm/Table%201", {
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

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div>
      {!isOpen && (
        <div className="homepage">
          <div className="homepage_header">
            <div className="homepage_header_inner">
              <div className="homepage_header_wrapper">
                <div className="homepage_header_wrapper_inner">
                  <img src={logo} alt="logo" />
                </div>
              </div>
              <p>The People's Count</p>
            </div>
          </div>
          <div className="homepage_body">
            <div>
              <h1>
                Every vote <span>counts</span>
              </h1>
              <p>
                A decentralized, non-partisan effort to count every vote and
                report every incident in the Lagos State gubernatorial election.{" "}
              </p>
              <div className="timer">
                <svg
                  width="25"
                  height="24"
                  viewBox="0 0 25 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.5 4.65C7.72 4.65 3.83 8.54 3.83 13.32C3.83 18.1 7.72 22 12.5 22C17.28 22 21.17 18.11 21.17 13.33C21.17 8.55 17.28 4.65 12.5 4.65ZM13.25 13C13.25 13.41 12.91 13.75 12.5 13.75C12.09 13.75 11.75 13.41 11.75 13V8C11.75 7.59 12.09 7.25 12.5 7.25C12.91 7.25 13.25 7.59 13.25 8V13Z"
                    fill="white"
                  />
                  <path
                    d="M15.39 3.45H9.61C9.21 3.45 8.89 3.13 8.89 2.73C8.89 2.33 9.21 2 9.61 2H15.39C15.79 2 16.11 2.32 16.11 2.72C16.11 3.12 15.79 3.45 15.39 3.45Z"
                    fill="white"
                  />
                </svg>

                <h6>
                  {timeLeft?.hours} : {timeLeft?.minutes} : {timeLeft?.seconds}
                </h6>
              </div>
              <div className="checkback_info">
                <p>
                  check back on election day{" "}
                  <span>for results and incident reports</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      {isOpen && (
        <div className="page-layout">
          <div className={`side-menu ${menuOpen ? "open" : "closed"}`}>
            {/* add menu content here */}
            <div className="side_menu_footer">
              <div>
                <svg
                  width="8"
                  height="8"
                  viewBox="0 0 8 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="0.5"
                    y="0.5"
                    width="7"
                    height="7"
                    rx="3.5"
                    fill="#FC0202"
                  />
                </svg>

                <p>Live incident report</p>
              </div>
            </div>
            {reports.map((data, index) => {
              return (
                <div className="side_menu_cover">
                  <div className="side_menu_cover_img_wrapper">
                    <img src={electionImg} alt="election" />
                  </div>
                  <div>
                    <span>
                      <p>{data.username} from </p>

                      <p> {` #${data.location}`}</p>
                    </span>
                    <p>"{data.description}"</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className={`main-content ${menuOpen ? "open" : "closed"}`}>
            {/* add main content here */}
            <div className="main_content_header">
              <div className="main_content_logo">
                <div className="main_content_logo_wrapper">
                  <div className="main_content_logo_wrapper_inner">
                    <img src={logo} alt="logo" />
                  </div>
                </div>
                <div className="form__inner__input">
                  <select value={lgaChangeHandler} onChange={lgaChangeHandler}>
                    {lagosLGAs.map((data, index) => (
                      <option value={data}>{data}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="menu-toggle-button">
                <div>
                  <p>Close incident reports 👉</p>
                </div>

                {!menuOpen ? (
                  <div className="button_wrapper" onClick={handleMenuToggle}>
                    <svg
                      width="6"
                      height="10"
                      viewBox="0 0 6 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5 9L0.999999 5L5 1"
                        stroke="#171717"
                        stroke-width="1.33"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
                ) : (
                  <div className="button_wrapper" onClick={handleMenuToggle}>
                    <svg
                      width="6"
                      height="10"
                      viewBox="0 0 6 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 1L5 5L1 9"
                        stroke="#171717"
                        stroke-width="1.33"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
                )}
              </div>
            </div>
            <div className="main_content_header_inner">
              <div>
                <h1>Lagos</h1>
                <div>
                  <p>Valid votes 467,500</p>
                  <p>Rejected votes 2,500</p>
                  <p>Accredited voters 276</p>
                </div>
              </div>
              <div className="main_content_header_partyImages">
                <div className="main_content_header_inner_img_cover">
                  <div className="main_content_header_inner_img_wrapper">
                    <img src={apcImg} alt="party" />
                  </div>
                  <p>156k votes</p>
                </div>

                <div className="main_content_header_inner_img_cover">
                  <div className="main_content_header_inner_img_wrapper">
                    <img src={lpImg} alt="party" />
                  </div>
                  <p>234.5k votes</p>
                </div>
                <div className="main_content_header_inner_img_cover">
                  <div className="main_content_header_inner_img_wrapper">
                    <img src={pdpImg} alt="party" />
                  </div>
                  <p>77k votes</p>
                </div>
              </div>
            </div>
            <div className="polling_units_table">
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

              <div className="pollen_units_table_input">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_128_45497)">
                    <path
                      d="M22 11.25H19.96C19.6 7.44 16.56 4.39 12.75 4.04V2C12.75 1.59 12.41 1.25 12 1.25C11.59 1.25 11.25 1.59 11.25 2V4.04C7.44 4.4 4.39 7.44 4.04 11.25H2C1.59 11.25 1.25 11.59 1.25 12C1.25 12.41 1.59 12.75 2 12.75H4.04C4.4 16.56 7.44 19.61 11.25 19.96V22C11.25 22.41 11.59 22.75 12 22.75C12.41 22.75 12.75 22.41 12.75 22V19.96C16.56 19.6 19.61 16.56 19.96 12.75H22C22.41 12.75 22.75 12.41 22.75 12C22.75 11.59 22.41 11.25 22 11.25ZM12 15.12C10.28 15.12 8.88 13.72 8.88 12C8.88 10.28 10.28 8.88 12 8.88C13.72 8.88 15.12 10.28 15.12 12C15.12 13.72 13.72 15.12 12 15.12Z"
                      fill="#C4C4C4"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_128_45497">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                <p>Switch to map view</p>
              </div>
            </div>
            <div className="polling_units_table_inner">
              <div>
                <p>POlling units</p>
              </div>
              <div>
                <p>ward</p>
              </div>
              <div>
                <p>lGA</p>
              </div>
              <div>
                <p>Votes</p>
              </div>
              <div>
                <p>Action</p>
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
                    <p>{data.fields.polling_unit}</p>
                  </div>
                  <div>
                    <p>{data.fields.ward}</p>
                  </div>
                  <div>
                    <p>{data.fields.lga}</p>
                  </div>
                  <div>
                    <p>{data.fields.votes}</p>
                  </div>
                  <div>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10.0001 18.3333C14.6025 18.3333 18.3334 14.6024 18.3334 10C18.3334 5.39762 14.6025 1.66666 10.0001 1.66666C5.39771 1.66666 1.66675 5.39762 1.66675 10C1.66675 14.6024 5.39771 18.3333 10.0001 18.3333Z"
                        stroke="#24BC3F"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M7.9375 12.0625L11.473 8.52692"
                        stroke="#24BC3F"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M12.0624 11.4731V7.93755H8.52686"
                        stroke="#24BC3F"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default PageLayout;
