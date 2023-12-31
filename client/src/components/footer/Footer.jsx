import React from "react";

import { BsLinkedin } from "react-icons/bs";
import { BsGithub } from "react-icons/bs";
import { BsInstagram } from "react-icons/bs";

const Footer = () => {
  return (
    <>
      <footer className="font-sans justify-center flex flex-col bg-indigo-300 gap-6 text-center">
        <div className="flex flex-col gap-3 text-center">
          <strong>Albi's Socials</strong>
          <div className="flex flex-row gap-10 text-4xl justify-center">
            <a href="https://linkedin.com/" target="_blank">
              <BsLinkedin />
            </a>
            <a
              href="https://github.com/Albikras?tab=repositories"
              target="_blank"
            >
              <BsGithub />
            </a>
            <a href="https://www.instagram.com/albikrasniqi1/" target="_blank">
              <BsInstagram />
            </a>
          </div>
        </div>
        <div className="flex flex-col gap-3 text-center">
          <strong>Tony's Socials</strong>
          <div className="flex flex-row gap-10 text-4xl justify-center">

            <a
              href="https://www.linkedin.com/in/anthony-rooyakkers-ba968a273/"
              target="_blank"
            >
            <a href="https://www.linkedin.com/in/anthony-rooyakkers-ba968a273/" target="_blank">

              <BsLinkedin />
            </a>
            <a href="https://github.com/Douped" target="_blank">
              <BsGithub />
            </a>
            <a href="https://www.instagram.com/tony.tuesday/" target="_blank">
              <BsInstagram />
            </a>
          </div>
        </div>

        <small className="font-sans justify-center flex flex-row">
          &copy; Albi Krasniqi -- Tony Rooyakkers
        </small>
      </footer>
    </>
  );
};

export default Footer;
