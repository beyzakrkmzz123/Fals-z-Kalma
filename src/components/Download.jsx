import React from "react";
import { useTranslation } from "react-i18next";

function Download() {
  const { t } = useTranslation();

  return (
    <div
      className="relative bg-gradient-to-b from-[#0F172A] via-[#1E1F4D] to-[#312E81] py-20 px-6 text-center text-white select-none"
      id="download"
    >
      <div className="text-3xl font-bold mb-8 relative inline-block">
        {t("Uygulamayı Hemen İndir")}
        <div className="h-1 w-20 bg-gradient-to-r from-pink-400 to-indigo-400 rounded mt-2 mx-auto"></div>
      </div>

      <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
        <div
          role="link"
          tabIndex={0}
          onClick={() =>
            window.open("https://www.apple.com/app-store/", "_blank")
          }
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              window.open("https://www.apple.com/app-store/", "_blank");
            }
          }}
          className="flex items-center justify-center gap-2 bg-gradient-to-r from-pink-500 to-indigo-600 text-white px-8 py-4 rounded-full font-semibold shadow-lg cursor-pointer hover:scale-105 transform transition duration-300 select-none"
          aria-label="App Store"
        >
          App Store
        </div>

        <div
          role="link"
          tabIndex={0}
          onClick={() => window.open("https://play.google.com/store", "_blank")}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              window.open("https://play.google.com/store", "_blank");
            }
          }}
          className="flex items-center justify-center gap-2 bg-gradient-to-r from-pink-500 to-indigo-600 text-white px-8 py-4 rounded-full font-semibold shadow-lg cursor-pointer hover:scale-105 transform transition duration-300 select-none"
          aria-label="Google Play"
        >
          Google Play
        </div>
      </div>
    </div>
  );
}

export default Download;
