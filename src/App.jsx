import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import History from "./pages/History";

function Home() {
  const [cash, setCash] = useState("");
  const [online, setOnline] = useState("");
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    const savedLang = localStorage.getItem("language");

    if (savedLang) {
      setLanguage(savedLang);
    }
  }, []);

  const changeLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  const total = (Number(cash) || 0) + (Number(online) || 0);

  const sales = JSON.parse(localStorage.getItem("sales")) || [];

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const monthlyTotal = sales.reduce((sum, item) => {
    const date = new Date(item.date);

    if (
      date.getMonth() === currentMonth &&
      date.getFullYear() === currentYear
    ) {
      return sum + item.total;
    }

    return sum;
  }, 0);

  const saveData = () => {
    const sales = JSON.parse(localStorage.getItem("sales")) || [];

    const today = new Date().toISOString().split("T")[0];

    const existingIndex = sales.findIndex(
      (item) => item.date === today
    );

    const newEntry = {
      date: today,
      cash: Number(cash),
      online: Number(online),
      total,
    };

    if (existingIndex !== -1) {
      const confirmUpdate = window.confirm(
        language === "en"
          ? "Today's entry already exists. Update it?"
          : "आज की एंट्री पहले से मौजूद है। क्या इसे अपडेट करें?"
      );

      if (!confirmUpdate) return;

      sales[existingIndex] = newEntry;
    } else {
      sales.push(newEntry);
    }

    localStorage.setItem("sales", JSON.stringify(sales));

    alert(
      language === "en"
        ? "Saved Successfully"
        : "सफलतापूर्वक सहेजा गया"
    );

    setCash("");
    setOnline("");
  };

  const text = {
    en: {
      title: "Sundar Stores",
      cash: "Cash Received",
      online: "Online Received",
      total: "Total Today",
      save: "Save",
      history: "History",
      monthly: "This Month",
      records: "Total Records",
    },
    hi: {
      title: "सुंदर स्टोर्स",
      cash: "नकद प्राप्ति",
      online: "ऑनलाइन प्राप्ति",
      total: "आज की कुल बिक्री",
      save: "सहेजें",
      history: "इतिहास",
      monthly: "इस महीने की बिक्री",
      records: "कुल रिकॉर्ड",
    },
  };

  const t = text[language];

  return (
    <div className="container">
      <div className="lang-buttons">
        <button onClick={() => changeLanguage("en")}>
          English
        </button>

        <button onClick={() => changeLanguage("hi")}>
          हिन्दी
        </button>
      </div>

      <h1>{t.title}</h1>

      <div className="card">
        <h3>{t.monthly}</h3>
        <h2>₹{monthlyTotal}</h2>
      </div>

      <div className="card">
        <h3>{t.records}</h3>
        <h2>{sales.length}</h2>
      </div>

      <label>{t.cash}</label>
      <input
        type="number"
        value={cash}
        onChange={(e) => setCash(e.target.value)}
        placeholder="₹ 0"
      />

      <label>{t.online}</label>
      <input
        type="number"
        value={online}
        onChange={(e) => setOnline(e.target.value)}
        placeholder="₹ 0"
      />

      <h2>
        {t.total}: ₹{total}
      </h2>

      <button
        className="save-btn"
        onClick={saveData}
      >
        {t.save}
      </button>

      <Link to="/history">
        <button
          style={{
            width: "100%",
            marginTop: "15px",
          }}
        >
          {t.history}
        </button>
      </Link>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </BrowserRouter>
  );
}