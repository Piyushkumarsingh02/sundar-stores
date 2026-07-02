import { useState } from "react";

export default function History() {
  const [sales, setSales] = useState(
    JSON.parse(localStorage.getItem("sales")) || []
  );

  const deleteEntry = (indexToDelete) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this entry?"
    );

    if (!confirmDelete) return;

    const updatedSales = sales.filter(
      (_, index) => index !== indexToDelete
    );

    localStorage.setItem(
      "sales",
      JSON.stringify(updatedSales)
    );

    setSales(updatedSales);
  };

  return (
    <div className="container">
      <h1>Sales History</h1>

      {sales.length === 0 ? (
        <p>No records found</p>
      ) : (
        sales
          .slice()
          .reverse()
          .map((item, index) => (
            <div className="card" key={index}>
              <p>{item.date}</p>

              <h3>₹{item.total}</h3>

              <p>Cash: ₹{item.cash}</p>

              <p>Online: ₹{item.online}</p>

              <button
                onClick={() =>
                  deleteEntry(
                    sales.length - 1 - index
                  )
                }
              >
                Delete
              </button>
            </div>
          ))
      )}
    </div>
  );
}