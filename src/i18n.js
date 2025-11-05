import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  tr: {
    translation: {
      "Ana Sayfa": "Ana Sayfa",
      Falcılar: "Falcılar",
      "Fal Türleri": "Fal Türleri",
      Hakkımızda: "Hakkımızda",
      İletişim: "İletişim",
      "Giriş Yap": "Giriş Yap",
      "Üye Ol": "Üye Ol",
      "Öne Çıkan Özellikler": "Öne Çıkan Özellikler",
      "Gerçek Falcılar": "Gerçek Falcılar",
      "Alanında deneyimli yorumcular ile kişisel fallar.":
        "Alanında deneyimli yorumcular ile kişisel fallar.",
      "Anlık Bildirim": "Anlık Bildirim",
      "Falın hazır olduğunda telefonuna bildirim gelir.":
        "Falın hazır olduğunda telefonuna bildirim gelir.",
      "Geçmiş Fallar": "Geçmiş Fallar",
      "Önceki fallarını tekrar oku, kaybetme.":
        "Önceki fallarını tekrar oku, kaybetme.",
      "© 2025 Falsız Kalma. Tüm hakları saklıdır.":
        "© 2025 Falsız Kalma. Tüm hakları saklıdır.",
      "Uygulamayı Hemen İndir": "Uygulamayı Hemen İndir",
      "Kullanıcı Yorumları": "Kullanıcı Yorumları",
      "Fal Türleri": "Fal Türleri",
      "Kahve Falı": "Kahve Falı",
      "Tarot Falı": "Tarot Falı",
      "El Falı": "El Falı",
      "Geleneksel kahve telvesinden geleceği yorumlama sanatı.":
        "Geleneksel kahve telvesinden geleceği yorumlama sanatı.",
      "Kartların sembolleri ile geleceğe dair ipuçları.":
        "Kartların sembolleri ile geleceğe dair ipuçları.",
      "Avuç içindeki çizgilerden yaşam yolunuzu okur.":
        "Avuç içindeki çizgilerden yaşam yolunuzu okur.",
      "İletişim Bilgilerimiz": "İletişim Bilgilerimiz",
      Adres: "Adres",
      "Muğla, Türkiye": "Muğla, Türkiye",
      Telefon: "Telefon",
      "E-posta": "E-posta",
      "Kullanıcı Adı": "Kullanıcı Adı",
      Şifre: "Şifre",
      "Lütfen kullanıcı adı ve şifre girin":
        "Lütfen kullanıcı adı ve şifre girin",
      "Lütfen tüm alanları doldurun.": "Lütfen tüm alanları doldurun.",
      "Üyelik başarılı! Giriş sayfasına yönlendiriliyorsunuz.":
        "Üyelik başarılı! Giriş sayfasına yönlendiriliyorsunuz.",
      "Zaten üye misiniz? Giriş yapın": "Zaten üye misiniz? Giriş yapın",
      "Şifrenizi girin": "Şifrenizi girin",
      Dil: "Dil",
      "Yapay Zeka": "Yapay Zeka",
      "OpenAI destekli sistemle saniyeler içinde detaylı fal yorumları.":
        "OpenAI destekli sistemle saniyeler içinde detaylı fal yorumları.",
      "Yapay Zekaya Fal Baktır": "Yapay Zekaya Fal Baktır",
      "Gerçek Falcılara Fal Baktır": "Gerçek Falcılara Fal Baktır",
      "Fala İnanma, Falsız Kalma 🔮": "Fala İnanma, Falsız Kalma 🔮",
      "Kahve fincanını yükle, dakikalar içinde falın cebinde. Gerçek falcılar ve yapay zekâ destekli yorumlar seni bekliyor.":
        "Kahve fincanını yükle, dakikalar içinde falın cebinde. Gerçek falcılar ve yapay zekâ destekli yorumlar seni bekliyor.",
      "Seçtiğin falcıya fincanını gönder, senin için özel yorum yapsın ✨":
        "Seçtiğin falcıya fincanını gönder, senin için özel yorum yapsın ✨",
      "Kahvenin ortasında bir kalp var... Yakında aşk hayatında güzel gelişmeler olabilir ":
        "Kahvenin ortasında bir kalp var... Yakında aşk hayatında güzel gelişmeler olabilir ",
      "Bir yol görünmüş! Uzaklardan beklediğin haber yakında gelebilir ":
        "Bir yol görünmüş! Uzaklardan beklediğin haber yakında gelebilir ",
      "Kahve falında bir göz belirdi... Etrafında seni kıskanan biri olabilir ":
        "Kahve falında bir göz belirdi... Etrafında seni kıskanan biri olabilir ",
      "Para sembolleri görünüyor, maddi bir kazanç seni bulacak ":
        "Para sembolleri görünüyor, maddi bir kazanç seni bulacak ",
      "Bir kuş şekli var! Uzaktan gelen güzel bir haber kapıda ":
        "Bir kuş şekli var! Uzaktan gelen güzel bir haber kapıda ",
      "Yıldızlar parlıyor, şanslı bir döneme giriyorsun ":
        "Yıldızlar parlıyor, şanslı bir döneme giriyorsun ",
      "Kahvenin dibinde bir gül açmış, kalbini ısıtacak bir haber var ":
        "Kahvenin dibinde bir gül açmış, kalbini ısıtacak bir haber var ",
      "Bir dalga şekli görünüyor... Duyguların çok yoğun bir dönemdesin ":
        "Bir dalga şekli görünüyor... Duyguların çok yoğun bir dönemdesin ",
      "Kahve falında bir yüz beliriyor... Geçmişten biri seni hâlâ düşünüyor ":
        "Kahve falında bir yüz beliriyor... Geçmişten biri seni hâlâ düşünüyor ",
      "Bir anahtar şekli var! Yeni bir fırsat kapısı açılmak üzere ":
        "Bir anahtar şekli var! Yeni bir fırsat kapısı açılmak üzere ",

      "En fazla 3 fotoğraf yükleyebilirsin ☕":
        "En fazla 3 fotoğraf yükleyebilirsin ☕",
      "Lütfen en az bir fotoğraf yükle!": "Lütfen en az bir fotoğraf yükle!",
      Falcı: "Falcı",
      "Fotoğraf Yükle": "Fotoğraf Yükle",
      "Yüklenen 1": "Yüklenen 1",
      "Yüklenen 2": "Yüklenen 2",
      "Yüklenen 3": "Yüklenen 3",
      "Not: En fazla 3 fotoğraf yükleyebilirsin. Daha fazla yükleme için Premium üyelik yakında!":
        "Not: En fazla 3 fotoğraf yükleyebilirsin. Daha fazla yükleme için Premium üyelik yakında!",
      "Falcıya Gönderiliyor...": "Falcıya Gönderiliyor...",
      " Falcıya Gönder": " Falcıya Gönder",
      "🔮 Falcı kahveni inceliyor...": "🔮 Falcı kahveni inceliyor...",
      "Yapay Zekaya Fal Baktır": "Yapay Zekaya Fal Baktır",
      "Kahve fincanı, tabak veya telve fotoğraflarını yükle veya mesaj yaz. Yapay zekâ enerjini çözümleyecek!":
        "Kahve fincanı, tabak veya telve fotoğraflarını yükle veya mesaj yaz. Yapay zekâ enerjini çözümleyecek!",
      "Fotoğraf Yükle": "Fotoğraf Yükle",
      "Not: En fazla 3 fotoğraf yükleyebilirsin. Daha fazla yükleme için Premium üyelik yakında!":
        "Not: En fazla 3 fotoğraf yükleyebilirsin. Daha fazla yükleme için Premium üyelik yakında!",
      "Mesajını yaz...": "Mesajını yaz...",
      "Yapay Zeka Falına Bakıyor...": "Yapay Zeka Falına Bakıyor...",
      Gönder: "Gönder",
      "Falın burada görünecek...": "Falın burada görünecek...",
      "En fazla 3 fotoğraf yükleyebilirsin !":
        "En fazla 3 fotoğraf yükleyebilirsin !",
      "Lütfen en az bir fotoğraf yükleyin veya mesaj yazın!":
        "Lütfen en az bir fotoğraf yükleyin veya mesaj yazın!",
      "Fotoğraf(lar) gönderildi": "Fotoğraf(lar) gönderildi",
      "Fincanını inceledim, harika bir enerji var":
        "Fincanını inceledim, harika bir enerji var",
      "Kahvenin ortasında kalp şekli görünüyor":
        "Kahvenin ortasında kalp şekli görünüyor",
      "Yakında seni heyecanlandıracak güzel bir haber alabilirsin":
        "Yakında seni heyecanlandıracak güzel bir haber alabilirsin",
      "Bugün enerjin çok yüksek görünüyor":
        "Bugün enerjin çok yüksek görünüyor",
      "Falında bir yol gösterici işaret fark ettim":
        "Falında bir yol gösterici işaret fark ettim",
      Hakkımızda: "Hakkımızda",
      "Falsız Kalma, kahve falı geleneğini dijital dünyaya taşıyan, yenilikçi ve mistik bir deneyim platformudur.Amacımız, kullanıcılarımıza hem gerçek falcıların ruhsal sezgilerini hem de yapay zekânın objektif analiz gücünü bir arada sunmaktır.Teknolojiyi ruhla buluşturarak her kullanıcının kendi enerjisine, duygularına ve merakına özel bir deneyim yaşamasını istiyoruz.":
        "Falsız Kalma, kahve falı geleneğini dijital dünyaya taşıyan, yenilikçi ve mistik bir deneyim platformudur. Amacımız, kullanıcılarımıza hem gerçek falcıların ruhsal sezgilerini hem de yapay zekânın objektif analiz gücünü bir arada sunmaktır. Teknolojiyi ruhla buluşturarak her kullanıcının kendi enerjisine, duygularına ve merakına özel bir deneyim yaşamasını istiyoruz.",
      "Gerçek falcılarımız, uzun yıllardır bu alanda deneyim sahibi kişilerden oluşur.Yapay zekâ sistemimiz ise OpenAI destekli altyapıyla saniyeler içinde kişisel yorumlar üretir.Her fal, yalnızca bir tahmin değil bir farkındalık yolculuğudur":
        "Gerçek falcılarımız, uzun yıllardır bu alanda deneyim sahibi kişilerden oluşur. Yapay zekâ sistemimiz ise OpenAI destekli altyapıyla saniyeler içinde kişisel yorumlar üretir. Her fal, yalnızca bir tahmin değil bir farkındalık yolculuğudur",
      "(Yakında...)": "(Yakında...)",
    },
  },

  en: {
    translation: {
      "Ana Sayfa": "Home",
      Falcılar: "Fortune Tellers",
      "Fal Türleri": "Fortune Types",
      Hakkımızda: "About Us",
      İletişim: "Contact",
      "Giriş Yap": "Login",
      "Üye Ol": "Sign Up",
      "Öne Çıkan Özellikler": "Featured Features",
      "Gerçek Falcılar": "Real Fortune Tellers",
      "Alanında deneyimli yorumcular ile kişisel fallar.":
        "Personal fortunes with experienced commentators in the field.",
      "Anlık Bildirim": "Instant Notification",
      "Falın hazır olduğunda telefonuna bildirim gelir.":
        "You receive a notification on your phone when your fortune is ready.",
      "Geçmiş Fallar": "Past Fortunes",
      "Önceki fallarını tekrar oku, kaybetme.":
        "Read your previous fortunes again, don’t lose them.",
      "© 2025 Falsız Kalma. Tüm hakları saklıdır.":
        "© 2025 Falsız Kalma. All rights reserved.",
      "Uygulamayı Hemen İndir": "Download The App Now",
      "Kullanıcı Yorumları": "User Reviews",
      "Fal Türleri": "Fortune Types",
      "Kahve Falı": "Coffee Fortune",
      "Tarot Falı": "Tarot Reading",
      "El Falı": "Palm Reading",
      "Geleneksel kahve telvesinden geleceği yorumlama sanatı.":
        "The traditional art of interpreting the future from coffee grounds.",
      "Kartların sembolleri ile geleceğe dair ipuçları.":
        "Clues to the future with the symbols of the cards.",
      "Avuç içindeki çizgilerden yaşam yolunuzu okur.":
        "It reads your life path from the lines on your palm.",

      "İletişim Bilgilerimiz": "Our Contact Information",
      Adres: "Address",
      "Muğla, Türkiye": "Muğla, Turkey",
      Telefon: "Phone",
      "E-posta": "E-mail",
      "Kullanıcı Adı": "Username",
      Şifre: "Password",
      "Lütfen kullanıcı adı ve şifre girin":
        "Please enter username and password",
      "Lütfen tüm alanları doldurun.": "Please fill all fields.",
      "Üyelik başarılı! Giriş sayfasına yönlendiriliyorsunuz.":
        "Sign up successful! Redirecting to login page.",
      "Zaten üye misiniz? Giriş yapın": "Already a member? Log in",
      "Şifrenizi girin": "Enter your password",
      Dil: "Language",
      "Yapay Zeka": "Artificial Intelligence(AI)",
      "OpenAI destekli sistemle saniyeler içinde detaylı fal yorumları.":
        "Detailed fortune telling in seconds with the OpenAI-powered system.",
      "Yapay Zekaya Fal Baktır": "Get Fortune Reading from AI",
      "Gerçek Falcılara Fal Baktır":
        "Get Fortune Reading from Real Fortune Tellers",
      "Fala İnanma, Falsız Kalma 🔮":
        "Don't Believe in Fortune, Don't Miss Out 🔮",
      "Kahve fincanını yükle, dakikalar içinde falın cebinde. Gerçek falcılar ve yapay zekâ destekli yorumlar seni bekliyor.":
        "Upload your coffee cup, your fortune is in your pocket in minutes. Real fortune tellers and AI-powered comments are waiting for you.",
      "Seçtiğin falcıya fincanını gönder, senin için özel yorum yapsın ✨":
        "Send your cup to the fortune teller you choose, let them make a special comment for you ✨",
      "Kahvenin ortasında bir kalp var... Yakında aşk hayatında güzel gelişmeler olabilir ":
        "There is a heart in the middle of the coffee... Soon, beautiful developments may happen in your love life.",
      "Bir yol görünmüş! Uzaklardan beklediğin haber yakında gelebilir ":
        "A path has appeared! The news you are waiting for from afar may arrive soon.",
      "Kahve falında bir göz belirdi... Etrafında seni kıskanan biri olabilir ":
        "An eye appeared in your coffee reading... Someone around you may be jealous of you.",
      "Para sembolleri görünüyor, maddi bir kazanç seni bulacak ":
        "Money symbols are visible, a financial gain will find you.",
      "Bir kuş şekli var! Uzaktan gelen güzel bir haber kapıda ":
        "A bird shape appears! Good news from afar is on the way.",
      "Yıldızlar parlıyor, şanslı bir döneme giriyorsun ":
        "The stars are shining, you are entering a lucky period.",
      "Kahvenin dibinde bir gül açmış, kalbini ısıtacak bir haber var ":
        "A rose has bloomed at the bottom of your cup, heart-warming news is coming.",
      "Bir dalga şekli görünüyor... Duyguların çok yoğun bir dönemdesin ":
        "A wave shape appears... You are in a very emotional period.",
      "Kahve falında bir yüz beliriyor... Geçmişten biri seni hâlâ düşünüyor ":
        "A face appears in your coffee reading... Someone from your past is still thinking about you.",
      "Bir anahtar şekli var! Yeni bir fırsat kapısı açılmak üzere ":
        "There is a key shape! A new opportunity door is about to open.",

      "En fazla 3 fotoğraf yükleyebilirsin ☕":
        "You can upload up to 3 photos ☕",
      "Lütfen en az bir fotoğraf yükle!": "Please upload at least one photo!",
      Falcı: "Fortune Teller",
      "Fotoğraf Yükle": "Upload Photo",
      "Yüklenen 1": "Uploaded 1",
      "Yüklenen 2": "Uploaded 2",
      "Yüklenen 3": "Uploaded 3",
      "Not: En fazla 3 fotoğraf yükleyebilirsin. Daha fazla yükleme için Premium üyelik yakında!":
        "Note: You can upload up to 3 photos. More uploads will be available with Premium soon!",
      "Falcıya Gönderiliyor...": "Sending to Fortune Teller...",
      " Falcıya Gönder": " Send to Fortune Teller",
      "🔮 Falcı kahveni inceliyor...":
        "🔮 The fortune teller is reading your coffee...",
      "Yapay Zekaya Fal Baktır": "Get a Reading from AI",
      "Kahve fincanı, tabak veya telve fotoğraflarını yükle veya mesaj yaz. Yapay zekâ enerjini çözümleyecek!":
        "Upload photos of your coffee cup, plate, or coffee grounds, or type a message. AI will analyze your energy!",
      "Fotoğraf Yükle": "Upload Photo",
      "Not: En fazla 3 fotoğraf yükleyebilirsin. Daha fazla yükleme için Premium üyelik yakında!":
        "Note: You can upload up to 3 photos. More uploads will be available with Premium soon!",
      "Mesajını yaz...": "Write your message...",
      "Yapay Zeka Falına Bakıyor...": "AI is reading your coffee...",
      Gönder: "Send",
      "Falın burada görünecek...": "Your reading will appear here...",
      "En fazla 3 fotoğraf yükleyebilirsin !": "You can upload up to 3 photos!",
      "Lütfen en az bir fotoğraf yükleyin veya mesaj yazın!":
        "Please upload at least one photo or type a message!",
      "Fotoğraf(lar) gönderildi": "Photo(s) sent",
      "Fincanını inceledim, harika bir enerji var":
        "I checked your cup, there is a wonderful energy",
      "Kahvenin ortasında kalp şekli görünüyor":
        "A heart shape appears in the middle of your coffee",
      "Yakında seni heyecanlandıracak güzel bir haber alabilirsin":
        "Soon you may receive exciting news",
      "Bugün enerjin çok yüksek görünüyor": "Your energy looks very high today",
      "Falında bir yol gösterici işaret fark ettim":
        "I noticed a guiding sign in your reading",
      Hakkımızda: "About Us",
      "Falsız Kalma, kahve falı geleneğini dijital dünyaya taşıyan, yenilikçi ve mistik bir deneyim platformudur.Amacımız, kullanıcılarımıza hem gerçek falcıların ruhsal sezgilerini hem de yapay zekânın objektif analiz gücünü bir arada sunmaktır.Teknolojiyi ruhla buluşturarak her kullanıcının kendi enerjisine, duygularına ve merakına özel bir deneyim yaşamasını istiyoruz.":
        "Falsız Kalma is an innovative and mystical platform that brings the coffee fortune-telling tradition into the digital world. Our goal is to offer users both the spiritual intuition of real fortune-tellers and the objective analysis power of AI. By combining technology with the soul, we want each user to experience a personalized journey based on their energy, emotions, and curiosity.",
      "Gerçek falcılarımız, uzun yıllardır bu alanda deneyim sahibi kişilerden oluşur.Yapay zekâ sistemimiz ise OpenAI destekli altyapıyla saniyeler içinde kişisel yorumlar üretir.Her fal, yalnızca bir tahmin değil bir farkındalık yolculuğudur":
        "Our real fortune-tellers are experienced professionals who have been working in this field for years. Our AI system generates personalized readings within seconds using OpenAI-supported infrastructure. Each reading is not just a prediction but a journey of awareness.",
      "“Fala inanma ama falsız kalma” sözünden yola çıkarak, hem eğlenceli hem de derin anlamlar taşıyan bir fal deneyimi yaratıyoruz.":
        "Inspired by the saying “Don’t believe in the fortune, but don’t miss it,” we create a fortune experience that is both fun and meaningful.",
      "Çünkü bizce her fincan, bir hikâye anlatır. Ve her hikâye, biraz da senin enerjini taşır... 🔮":
        "We believe every cup tells a story, and every story carries a bit of your energy... 🔮",
      "(Yakında...)": "(Coming Soon...)",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "tr",
  fallbackLng: "tr",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
