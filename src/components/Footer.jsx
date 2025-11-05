import React from "react";
import { IoLogoInstagram } from "react-icons/io5";
import { FaFacebook, FaTwitter } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import { useTranslation } from "react-i18next";

function Footer() {
  const { t } = useTranslation();

  const openLink = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="bg-gradient-to-t from-[#0F172A] via-[#1E1F4D] to-[#312E81] py-8 text-center text-white text-sm select-none font-medium">
      <div className="mb-4">
        {t("© 2025 Falsız Kalma. Tüm hakları saklıdır.")}
      </div>
      <div className="flex justify-center space-x-8 text-3xl">
        <div
          role="link"
          tabIndex={0}
          onClick={() => openLink("https://www.instagram.com/")}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ")
              openLink("https://www.instagram.com/");
          }}
          className="hover:text-pink-400 transition-colors duration-300 cursor-pointer"
          aria-label="Instagram"
        >
          <IoLogoInstagram />
        </div>
        <div
          role="link"
          tabIndex={0}
          onClick={() => openLink("https://www.facebook.com/")}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ")
              openLink("https://www.facebook.com/");
          }}
          className="hover:text-blue-400 transition-colors duration-300 cursor-pointer"
          aria-label="Facebook"
        >
          <FaFacebook />
        </div>
        <div
          role="link"
          tabIndex={0}
          onClick={() => openLink("https://twitter.com/")}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ")
              openLink("https://twitter.com/");
          }}
          className="hover:text-indigo-400 transition-colors duration-300 cursor-pointer"
          aria-label="Twitter"
        >
          <FaTwitter />
        </div>
        <div
          role="link"
          tabIndex={0}
          onClick={() =>
            openLink("https://workspace.google.com/intl/tr/gmail/")
          }
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ")
              openLink("https://workspace.google.com/intl/tr/gmail/");
          }}
          className="hover:text-green-400 transition-colors duration-300 cursor-pointer"
          aria-label="Email"
        >
          <MdOutlineMail />
        </div>
      </div>
    </div>
  );
}

export default Footer;
