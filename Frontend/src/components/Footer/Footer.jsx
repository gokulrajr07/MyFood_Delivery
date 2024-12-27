import React from "react";
import "./Footer.css"
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import logo from "../../assert/logo.png"
const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <img
            src={logo}
            alt="Food"
          />
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione quis ut explicabo cum mollitia quia illo expedita deleniti eos unde Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odit, impedit. </p>
          <div className="footer-social-icons">
          <FaFacebook />
          <FaXTwitter />
          <FaYoutube />
          <FaInstagram />
          </div>
        </div>
        <div className="footer-content-center">
            <h1>COMPANY</h1>
            <ul>
                <li>Home</li>
                <li>About us</li>
                <li>Delivery</li>
                <li>Privacy policy</li>
            </ul>
        </div>
        <div className="footer-content-right">
            <h2>GET IN TOUCH</h2>
            <ul>
                <li>+91 1234567890</li>
                <li>abc@gmail.com</li>
            </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">Copyright 2024 @ abc.com - All Right Reserved</p>
    </div>
  );
};

export default Footer;
