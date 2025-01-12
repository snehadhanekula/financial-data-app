# 📊 Financial Data Filtering App

A React-based web application that allows users to filter and visualize financial data using interactive charts and tables. The app fetches real-time financial data from the Financial Modeling Prep API and displays it using interactive filters and charts.

---

## 🚀 Features

✅ Fetches real-time financial data from the [Financial Modeling Prep API](https://financialmodelingprep.com/)  
✅ Interactive filtering by **date range**, **revenue range**, and **net income range**  
✅ Sorting options for **date**, **revenue**, **net income**, and more  
✅ Beautiful **line charts** using Chart.js to visualize revenue, net income, and gross profit  
✅ Styled with **TailwindCSS** for a clean, responsive UI  

---

## 📂 Project Structure

Here's a breakdown of the project files and folders:

```
financial-data-app/
├── public/
├── src/
│   ├── App.js
│   ├── App.css
│   ├── index.css
│   └── ...
├── package.json
└── README.md
```

---

## ⚙️ Technologies Used

- **React**: Frontend framework
- **Axios**: For making API requests
- **Chart.js**: For data visualization
- **TailwindCSS**: For styling the app

---

## 🖥️ How to Run the Project Locally

1. Clone this repository:

   ```bash
   git clone https://github.com/yourusername/financial-data-app.git
   ```

2. Navigate to the project folder:

   ```bash
   cd financial-data-app
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Run the app:

   ```bash
   npm start
   ```

---

## 📊 API Used

The app uses the **Financial Modeling Prep API** to fetch financial data, specifically the annual income statements for Apple Inc. (AAPL).  
👉 Get your free API key here: [https://financialmodelingprep.com/developer](https://financialmodelingprep.com/developer)

API Endpoint used:
```
https://financialmodelingprep.com/api/v3/income-statement/AAPL?period=annual&apikey=YOUR_API_KEY
```

---

## 📸 Screenshots

Add a screenshot of your app here for visual appeal!

---

## 👤 Author

- **Name:** Sneha Dhanekula  
- **GitHub:** [https://github.com/snehadhanekula](https://github.com/snehadhanekula)  
- **LinkedIn:** [https://www.linkedin.com/in/neha-dhanekula/](https://www.linkedin.com/in/neha-dhanekula/)

---

## 🌐 Live Demo

The app is live at:  
**[https://financial-data-app.vercel.app](https://financial-data-app.vercel.app)** (Replace with your Vercel link once deployed)

---

## 🔧 Future Improvements

- Add more sorting options (e.g., gross profit, EPS)  
- Add pagination for large datasets  
- Improve responsiveness for mobile devices  
- Include more financial metrics for comprehensive analysis  

---

## 📄 License

This project is licensed under the **MIT License**.


