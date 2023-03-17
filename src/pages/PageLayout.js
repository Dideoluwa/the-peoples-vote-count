import React, { useEffect, useState } from "react";
import apcImg from "../assets/apc.png";
import pdpImg from "../assets/pdp.png";
import logo from "../assets/logo.png";
import lpImg from "../assets/lp.png";
import twitter from "../assets/twitter.png";
import ig from "../assets/ig.png";
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

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / (1000 * 60)) % 60);

    setTimeLeft({ days, hours, minutes });

    const intervalId = setInterval(() => {
      const now = new Date();
      const difference = tomorrow8AM.getTime() - now.getTime();

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / (1000 * 60)) % 60);

      setTimeLeft({ days, hours, minutes });
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  function formatNumber(num) {
    return num?.toString().padStart(2, "0");
  }

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
            <div className="homepage_body_inner">
              <h1>
                Every vote <span>counts</span>
              </h1>
              <p>
                The People’s Count is a decentralized, non-partisan effort to
                count every vote and report every incident in the Lagos State
                gubernatorial election.
              </p>
              <div className="timer">
                <a href="https://wa.me/message/U76ZSMNPTCORK1">
                  <svg
                    width="25"
                    height="24"
                    viewBox="0 0 25 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M22.48 11.41C22.14 5.60995 16.87 1.13996 10.8 2.13996C6.62004 2.82996 3.27005 6.21994 2.62005 10.3999C2.24005 12.8199 2.74007 15.1099 3.83007 16.9999L2.94006 20.3099C2.74006 21.0599 3.43004 21.7399 4.17004 21.5299L7.43005 20.63C8.91005 21.5 10.64 21.9999 12.49 21.9999C18.13 21.9999 22.81 17.03 22.48 11.41ZM17.3801 15.7199C17.2901 15.8999 17.18 16.07 17.04 16.23C16.79 16.5 16.52 16.7 16.22 16.82C15.92 16.95 15.59 17.01 15.24 17.01C14.73 17.01 14.18 16.89 13.61 16.64C13.03 16.39 12.4601 16.0599 11.8901 15.6499C11.3101 15.2299 10.7701 14.7599 10.2501 14.2499C9.73005 13.7299 9.27003 13.1799 8.85003 12.6099C8.44003 12.0399 8.11005 11.4699 7.87005 10.8999C7.63005 10.3299 7.51006 9.77996 7.51006 9.25996C7.51006 8.91996 7.57006 8.58996 7.69006 8.28996C7.81006 7.97996 8.00007 7.69996 8.27007 7.44996C8.59007 7.12996 8.94005 6.97996 9.31005 6.97996C9.45005 6.97996 9.59002 7.00995 9.72002 7.06995C9.85002 7.12995 9.97005 7.21995 10.0601 7.34995L11.22 8.98994C11.31 9.11994 11.38 9.22994 11.42 9.33994C11.47 9.44994 11.49 9.54994 11.49 9.64994C11.49 9.76994 11.4501 9.88996 11.3801 10.01C11.3101 10.13 11.22 10.2499 11.1 10.3699L10.72 10.7699C10.66 10.8299 10.6401 10.8899 10.6401 10.9699C10.6401 11.0099 10.65 11.0499 10.66 11.0899C10.68 11.1299 10.6901 11.16 10.7001 11.1899C10.7901 11.36 10.95 11.5699 11.17 11.8299C11.4 12.0899 11.6401 12.3599 11.9001 12.6199C12.1701 12.8899 12.4301 13.1299 12.7001 13.3599C12.9601 13.5799 13.18 13.73 13.35 13.82C13.38 13.83 13.4101 13.8499 13.4401 13.8599C13.4801 13.8799 13.5201 13.88 13.5701 13.88C13.6601 13.88 13.7201 13.85 13.7801 13.79L14.16 13.41C14.29 13.28 14.4101 13.19 14.5201 13.13C14.6401 13.06 14.7501 13.0199 14.8801 13.0199C14.9801 13.0199 15.0801 13.0399 15.1901 13.0899C15.3001 13.1399 15.42 13.2 15.54 13.29L17.2001 14.4699C17.3301 14.5599 17.42 14.67 17.48 14.79C17.53 14.92 17.5601 15.0399 17.5601 15.1799C17.5001 15.3499 17.4601 15.5399 17.3801 15.7199Z"
                      fill="#25D366"
                    />
                  </svg>
                  <h6>Get started on Whatsapp</h6>
                </a>
              </div>
              <div className="checkback_info">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    opacity="0.4"
                    d="M9.99996 18.3333C14.6023 18.3333 18.3333 14.6023 18.3333 9.99996C18.3333 5.39759 14.6023 1.66663 9.99996 1.66663C5.39759 1.66663 1.66663 5.39759 1.66663 9.99996C1.66663 14.6023 5.39759 18.3333 9.99996 18.3333Z"
                    fill="#292D32"
                  />
                  <path
                    d="M13.0916 13.275C12.9833 13.275 12.875 13.25 12.775 13.1833L10.1916 11.6416C9.54995 11.2583 9.07495 10.4166 9.07495 9.67497V6.2583C9.07495 5.91663 9.35828 5.6333 9.69995 5.6333C10.0416 5.6333 10.325 5.91663 10.325 6.2583V9.67497C10.325 9.97497 10.575 10.4166 10.8333 10.5666L13.4166 12.1083C13.7166 12.2833 13.8083 12.6666 13.6333 12.9666C13.5083 13.1666 13.3 13.275 13.0916 13.275Z"
                    fill="#FAFAFA"
                  />
                </svg>

                <h6>
                  check back on election day <span>for collated results</span>
                </h6>
              </div>
              <div className="time">
                <div className="time_inner">
                  <h5>{formatNumber(timeLeft?.days)}</h5>
                  <h5>Days</h5>
                </div>
                <div className="time_inner">
                  <h5>{formatNumber(timeLeft?.hours)}</h5>
                  <h5>Hours</h5>
                </div>
                <div className="time_inner">
                  <h5>{formatNumber(timeLeft?.minutes)}</h5>
                  <h5>Mins</h5>
                </div>
              </div>
            </div>
          </div>
          <div className="contacts">
            <div className="contact_wrapper">
              <div className="contact_wrapper_inner">
                <a
                  href="https://twitter.com/thepeoplescount"
                  rel="noreferrer"
                  target="_blank"
                >
                  <img src={twitter} alt="twitter" />
                </a>
              </div>
            </div>

            <div className="contact_wrapper">
              <div className="contact_wrapper_inner">
                <a
                  href="https://instagram.com/thepeoplescount"
                  rel="noreferrer"
                  target="_blank"
                >
                  <img src={ig} alt="instagram" />
                </a>
              </div>
            </div>
          </div>
          <div className="contacts2">
            <div className="contact_wrapper">
              <div className="contact_wrapper_inner">
                <a
                  href="https://twitter.com/thepeoplescount"
                  rel="noreferrer"
                  target="_blank"
                >
                  {" "}
                  <img src={twitter} alt="twitter" />
                </a>
              </div>
            </div>

            <div className="contact_wrapper">
              <div className="contact_wrapper_inner">
                <a
                  href="https://instagram.com/thepeoplescount"
                  rel="noreferrer"
                  target="_blank"
                >
                  <img src={ig} alt="instagram" />
                </a>
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
