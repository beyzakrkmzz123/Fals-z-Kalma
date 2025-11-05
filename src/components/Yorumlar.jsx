import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

function Yorumlar() {
  const { t } = useTranslation();
  const [yorumlar, setYorumlar] = useState([]);

  useEffect(() => {
    Promise.all([
      fetch("https://jsonplaceholder.typicode.com/users").then((res) =>
        res.json()
      ),
      fetch("https://jsonplaceholder.typicode.com/comments?_limit=3").then(
        (res) => res.json()
      ),
    ]).then(([users, comments]) => {
      const data = comments.map((yorum, index) => {
        const user = users[index % users.length];
        return {
          id: yorum.id,
          name: user.name,
          body: yorum.body,
          stars: 3 + ((index + Math.floor(Math.random() * 3)) % 3),
        };
      });
      setYorumlar(data);
    });
  }, []);

  return (
    <div
      className="relative bg-gradient-to-b from-[#3B0764] via-[#6D28D9] to-[#0F172A] py-24 px-6 text-center text-white select-none overflow-hidden"
      id="yorumlar"
    >
      <div className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px] bg-purple-500/30 blur-3xl rounded-full animate-morph"></div>
      <div className="absolute bottom-[-120px] right-[-150px] w-[400px] h-[400px] bg-pink-500/30 blur-3xl rounded-full animate-morph animation-delay-2000"></div>

      <div className="absolute inset-0 overflow-hidden">
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

      <div className="relative z-10 text-3xl font-bold mb-10">
        {t("Kullanıcı Yorumları")}
        <div className="h-1 w-24 bg-gradient-to-r from-pink-400 to-indigo-400 rounded mt-2 mx-auto"></div>
      </div>

      <div className="relative z-10 grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {yorumlar.map((yorum, index) => (
          <div
            key={yorum.id}
            className="bg-white/10 backdrop-blur-md border border-white/10 text-white p-6 rounded-2xl shadow-[0_0_25px_rgba(168,85,247,0.3)] hover:shadow-[0_0_40px_rgba(236,72,153,0.5)] transition duration-500"
          >
            <div className="flex justify-center mb-4">
              <div
                className="w-16 h-16 rounded-full border-2 border-pink-400 shadow-md"
                style={{
                  backgroundImage: `url(https://i.pravatar.cc/150?img=${
                    index + 1
                  })`,
                  backgroundSize: "cover",
                }}
              ></div>
            </div>

            <div className="font-semibold text-pink-300 mb-2">{yorum.name}</div>

            <div className="text-gray-200 text-sm mb-3 italic">
              "{yorum.body}"
            </div>

            <div className="flex justify-center items-center gap-1 mt-2">
              {Array.from({ length: 5 }).map((_, i) =>
                i < yorum.stars ? (
                  <AiFillStar
                    key={i}
                    className="text-yellow-400 w-6 h-6 drop-shadow-[0_0_8px_rgba(250,204,21,0.6)]"
                  />
                ) : (
                  <AiOutlineStar
                    key={i}
                    className="text-yellow-500/40 w-6 h-6"
                  />
                )
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Yorumlar;
