import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

function Falcilar() {
  const { t } = useTranslation();
  const [falcilar, setFalcilar] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        const falciList = data.slice(0, 3).map((item, index) => ({
          id: item.id,
          name: item.name,
          info: item.company.catchPhrase,
          image: `https://i.pravatar.cc/150?img=${index + 1}`,
        }));
        setFalcilar(falciList);
      });
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden text-white flex flex-col items-center px-6 py-20 bg-gradient-to-br from-purple-900 via-indigo-900 to-black">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px] bg-purple-600/30 blur-3xl rounded-full animate-morph"></div>
        <div className="absolute bottom-[-120px] right-[-120px] w-[400px] h-[400px] bg-pink-500/30 blur-3xl rounded-full animate-morph animation-delay-2000"></div>
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full opacity-20 animate-ping"
            style={{
              width: Math.random() * 3 + "px",
              height: Math.random() * 3 + "px",
              top: Math.random() * 100 + "%",
              left: Math.random() * 100 + "%",
              animationDelay: Math.random() * 3 + "s",
              animationDuration: 3 + Math.random() * 2 + "s",
            }}
          ></div>
        ))}
      </div>

      <div className="text-4xl md:text-5xl font-extrabold mb-12 relative z-10 bg-gradient-to-r from-purple-300 via-pink-300 to-yellow-300 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(168,85,247,0.6)]">
        {t("Falcılar")}
      </div>
      <div className="text-purple-200 mb-10 italic text-center">
        {t(
          "Seçtiğin falcıya fincanını gönder, senin için özel yorum yapsın ✨"
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl relative z-10">
        {falcilar.map((falci) => (
          <div
            key={falci.id}
            onClick={() => navigate(`/falci/${falci.id}`)}
            className="bg-white/10 backdrop-blur-md border border-purple-300/30 rounded-2xl shadow-[0_0_30px_rgba(168,85,247,0.3)] hover:shadow-[0_0_60px_rgba(168,85,247,0.6)] transition-all duration-500 p-6 flex flex-col items-center cursor-pointer hover:scale-105"
          >
            <div className="relative w-32 h-32 mb-4">
              <img
                src={falci.image}
                alt={falci.name}
                className="w-full h-full object-cover rounded-full border-4 border-purple-400 shadow-[0_0_25px_rgba(168,85,247,0.5)]"
              />
            </div>
            <div className="text-purple-100 text-lg font-semibold mb-2">
              {falci.name}
            </div>
            <div className="text-purple-200 text-sm text-center italic">
              “{falci.info}”
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Falcilar;
