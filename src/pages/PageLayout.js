import React, { useEffect, useState } from "react";
import logo from "../assets/logo1.png";
import twitter from "../assets/twitter.png";
import ig from "../assets/ig.png";
import lp from "../assets/lp.png";
import apc from "../assets/apc.png";
import pdp from "../assets/pdp.png";
import others from "../assets/others.png";
import voters from "../assets/people.png";
import "./PageLayout.scss";
import { NavLink, Outlet } from "react-router-dom";
import axios from "axios";

const PageLayout = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [people, setPeople] = useState([]);
  const lgaChangeHandler = () => {
    setIsOpen(null);
  };

  const [countdown, setCountdown] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const eventTime = new Date();
      eventTime.setHours(8, 0, 0, 0);

      const distance = eventTime - now;
      const days = Math.floor(distance / (1000 * 60 * 60 * 24))
        .toString()
        .padStart(2, "0");
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      )
        .toString()
        .padStart(2, "0");
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
        .toString()
        .padStart(2, "0");

      setCountdown({ days, hours, minutes });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

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

  function formatNumber(num) {
    console.log(people);
    return num?.toString().padStart(2, "0");
  }

  return (
    <div>
      {!isOpen && (
        <div className="homepage" onChange={lgaChangeHandler}>
          <div className="homepage_header">
            <div className="homepage_header_inner">
              <div className="homepage_header_wrapper">
                <div className="homepage_header_wrapper_inner">
                  <img src={logo} alt="logo" />
                </div>
              </div>
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
                  <h5>{formatNumber(countdown?.days)}</h5>
                  <h5>Days</h5>
                </div>
                <div className="time_inner">
                  <h5>{formatNumber(countdown?.hours)}</h5>
                  <h5>Hours</h5>
                </div>
                <div className="time_inner">
                  <h5>{formatNumber(countdown?.minutes)}</h5>
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

      {/* main page for election */}
      {isOpen && (
        <div className="election_table">
          <div className="header">
            <div className="homepage_header_inner">
              <div className="homepage_header_wrapper">
                <div className="homepage_header_wrapper_inner">
                  <img src={logo} alt="logo" />
                </div>
              </div>
            </div>
            <a
              href="https://wa.me/message/U76ZSMNPTCORK1"
              target="_blank"
              rel="noreferrer"
            >
              <div className="contact">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18.3167 9.50835C18.0334 4.67502 13.6417 0.950029 8.58341 1.78336C5.10008 2.35836 2.30841 5.18335 1.76675 8.66668C1.45008 10.6833 1.86677 12.5917 2.7751 14.1667L2.03342 16.925C1.86675 17.55 2.44174 18.1167 3.0584 17.9417L5.77508 17.1917C7.00841 17.9167 8.45008 18.3333 9.99174 18.3333C14.6917 18.3333 18.5917 14.1917 18.3167 9.50835ZM14.0668 13.1C13.9918 13.25 13.9001 13.3917 13.7834 13.525C13.5751 13.75 13.3501 13.9167 13.1001 14.0167C12.8501 14.125 12.5751 14.175 12.2834 14.175C11.8584 14.175 11.4001 14.075 10.9251 13.8667C10.4417 13.6584 9.96676 13.3833 9.49176 13.0417C9.00843 12.6917 8.55842 12.3 8.12508 11.875C7.69175 11.4417 7.3084 10.9833 6.9584 10.5083C6.61673 10.0333 6.34175 9.55835 6.14175 9.08335C5.94175 8.60835 5.84176 8.15002 5.84176 7.71669C5.84176 7.43336 5.89175 7.15836 5.99175 6.90836C6.09175 6.65002 6.2501 6.41669 6.4751 6.20836C6.74177 5.94169 7.03342 5.81669 7.34175 5.81669C7.45842 5.81669 7.57506 5.84169 7.68339 5.89169C7.79173 5.94169 7.89175 6.01669 7.96675 6.12502L8.93339 7.49168C9.00839 7.60001 9.06674 7.69168 9.10007 7.78335C9.14174 7.87501 9.15841 7.95834 9.15841 8.04168C9.15841 8.14168 9.12509 8.24169 9.06676 8.34169C9.00842 8.44169 8.9334 8.54168 8.8334 8.64168L8.51673 8.97501C8.46673 9.02501 8.4501 9.07502 8.4501 9.14169C8.4501 9.17502 8.4584 9.20835 8.46673 9.24168C8.4834 9.27501 8.49176 9.30002 8.5001 9.32502C8.5751 9.46669 8.7084 9.64167 8.89174 9.85834C9.0834 10.075 9.28344 10.3 9.50011 10.5167C9.72511 10.7417 9.94176 10.9417 10.1668 11.1333C10.3834 11.3167 10.5667 11.4417 10.7084 11.5167C10.7334 11.525 10.7584 11.5417 10.7834 11.55C10.8168 11.5667 10.8501 11.5667 10.8918 11.5667C10.9668 11.5667 11.0168 11.5417 11.0668 11.4917L11.3834 11.175C11.4917 11.0667 11.5918 10.9917 11.6834 10.9417C11.7834 10.8834 11.8751 10.85 11.9834 10.85C12.0668 10.85 12.1501 10.8667 12.2418 10.9083C12.3334 10.95 12.4334 11 12.5334 11.075L13.9168 12.0584C14.0251 12.1334 14.1001 12.225 14.1501 12.325C14.1917 12.4334 14.2167 12.5333 14.2167 12.65C14.1667 12.7917 14.1334 12.95 14.0668 13.1Z"
                    fill="#25D366"
                  />
                </svg>

                <p> Submit your vote</p>
              </div>
            </a>
          </div>
          <div className="body">
            <div className="body_head">
              <h2>Lagos Governorship Election</h2>
              <p>total Valid votes 900,000</p>
            </div>
            <div className="body_inner">
              <div>
                {" "}
                <div className="body_inner_chart">
                  <div
                    style={{ backgroundColor: "#1d91e93a", width: "70%" }}
                    className="body_inner_chart_guage"
                  ></div>
                  <div className="body_inner_chart_guage_text">
                    <div className="body_inner_chart_guage_text_wrapper">
                      <img src={lp} alt="logo" />
                    </div>

                    <p>630,000 votes 70%</p>
                  </div>
                </div>
                <div className="body_inner_chart">
                  <div
                    style={{ backgroundColor: "#FBEDEC", width: "15%" }}
                    className="body_inner_chart_guage"
                  ></div>
                  <div className="body_inner_chart_guage_text">
                    <div className="body_inner_chart_guage_text_wrapper">
                      <img src={apc} alt="logo" />
                    </div>

                    <p>630,000 votes 70%</p>
                  </div>
                </div>
                <div className="body_inner_chart">
                  <div
                    style={{ backgroundColor: "#E4F1EC", width: "7%" }}
                    className="body_inner_chart_guage"
                  ></div>
                  <div className="body_inner_chart_guage_text">
                    <div className="body_inner_chart_guage_text_wrapper">
                      <img src={pdp} alt="logo" />
                    </div>

                    <p>630,000 votes 70%</p>
                  </div>
                </div>
                <div className="body_inner_chart">
                  <div
                    style={{ backgroundColor: "#EFEFEF", width: "3%" }}
                    className="body_inner_chart_guage"
                  ></div>
                  <div className="body_inner_chart_guage_text">
                    <div className="body_inner_chart_guage_text_wrapper">
                      <img src={others} alt="logo" />
                    </div>

                    <p>630,000 votes 70%</p>
                  </div>
                </div>
              </div>

              <div className="body_inner_image">
                <img src={voters} alt="people" />
              </div>
            </div>
            <div className="body_table">
              <div className="body_table_header">
                <NavLink
                  exact
                  to="/"
                  className={(navData) => (navData.isActive ? "active" : "")}
                >
                  LGA
                </NavLink>

                <NavLink
                  exact
                  to="/polling-unit"
                  className={(navData) => (navData.isActive ? "active" : "")}
                >
                  Polling Unit
                </NavLink>

                <NavLink
                  exact
                  to="/incident-report"
                  className={(navData) => (navData.isActive ? "active" : "")}
                >
                  Incidents
                </NavLink>
              </div>
              <div className="outlet">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PageLayout;
