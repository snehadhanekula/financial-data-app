import React, { useState, useEffect } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

function App() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [revenueRange, setRevenueRange] = useState({ min: "", max: "" });
  const [netIncomeRange, setNetIncomeRange] = useState({ min: "", max: "" });
  const [sortColumn, setSortColumn] = useState("date");
  const [sortOrder, setSortOrder] = useState("asc");

  // Fetch data from the API
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          "https://financialmodelingprep.com/api/v3/income-statement/AAPL?period=annual&apikey=8tarPzZ94mM0PnL0kjyEG6ZtsBY0EB8i"
        );
        setData(response.data);
        setFilteredData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  // Apply filters
  const applyFilters = () => {
    let filtered = data;

    if (dateRange.start && dateRange.end) {
      filtered = filtered.filter(
        (item) =>
          new Date(item.date) >= new Date(dateRange.start) &&
          new Date(item.date) <= new Date(dateRange.end)
      );
    }

    if (revenueRange.min !== "" && revenueRange.max !== "") {
      filtered = filtered.filter(
        (item) =>
          item.revenue / 1e9 >= parseFloat(revenueRange.min) &&
          item.revenue / 1e9 <= parseFloat(revenueRange.max)
      );
    }

    if (netIncomeRange.min !== "" && netIncomeRange.max !== "") {
      filtered = filtered.filter(
        (item) =>
          item.netIncome / 1e9 >= parseFloat(netIncomeRange.min) &&
          item.netIncome / 1e9 <= parseFloat(netIncomeRange.max)
      );
    }

    setFilteredData(filtered);
  };

  // Apply sorting
  const applySorting = () => {
    let sortedData = [...filteredData];
    sortedData.sort((a, b) => {
      const valueA = a[sortColumn];
      const valueB = b[sortColumn];
      if (sortOrder === "asc") {
        return valueA > valueB ? 1 : -1;
      } else {
        return valueA < valueB ? 1 : -1;
      }
    });
    setFilteredData(sortedData);
  };

  // Chart Data
  const chartData = {
    labels: filteredData.map((item) => item.date),
    datasets: [
      {
        label: "Revenue (in billions)",
        data: filteredData.map((item) => item.revenue / 1e9),
        borderColor: "#4CAF50",
        backgroundColor: "#4CAF50",
        fill: false,
      },
      {
        label: "Net Income (in billions)",
        data: filteredData.map((item) => item.netIncome / 1e9),
        borderColor: "#FF5733",
        backgroundColor: "#FF5733",
        fill: false,
      },
      {
        label: "Gross Profit (in billions)",
        data: filteredData.map((item) => item.grossProfit / 1e9),
        borderColor: "#2E86C1",
        backgroundColor: "#2E86C1",
        fill: false,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[#f7f3e9] p-6">
      <h1 className="text-4xl font-extrabold text-center mb-8 text-[#5a4535]">
        Financial Data Filtering App
      </h1>

      {/* Card container */}
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-5xl mx-auto mb-10">
        {/* Filter Inputs */}
        <div className="grid gap-6 grid-cols-1 md:grid-cols-3 mb-6">
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2">
              Date Range
            </label>
            <input
              type="date"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#a67c52]"
              onChange={(e) =>
                setDateRange({ ...dateRange, start: e.target.value })
              }
            />
            <input
              type="date"
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#a67c52]"
              onChange={(e) =>
                setDateRange({ ...dateRange, end: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2">
              Revenue Range (in billions)
            </label>
            <input
              type="number"
              placeholder="Min Revenue"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#a67c52]"
              onChange={(e) =>
                setRevenueRange({ ...revenueRange, min: e.target.value })
              }
            />
            <input
              type="number"
              placeholder="Max Revenue"
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#a67c52]"
              onChange={(e) =>
                setRevenueRange({ ...revenueRange, max: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2">
              Net Income Range (in billions)
            </label>
            <input
              type="number"
              placeholder="Min Net Income"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#a67c52]"
              onChange={(e) =>
                setNetIncomeRange({ ...netIncomeRange, min: e.target.value })
              }
            />
            <input
              type="number"
              placeholder="Max Net Income"
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#a67c52]"
              onChange={(e) =>
                setNetIncomeRange({ ...netIncomeRange, max: e.target.value })
              }
            />
          </div>
        </div>

        {/* Sorting Options */}
        <div className="grid gap-6 grid-cols-2 md:grid-cols-4 mb-6">
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2">
              Sort By
            </label>
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#a67c52]"
              value={sortColumn}
              onChange={(e) => setSortColumn(e.target.value)}
            >
              <option value="date">Date</option>
              <option value="revenue">Revenue</option>
              <option value="netIncome">Net Income</option>
              <option value="grossProfit">Gross Profit</option>
              <option value="eps">EPS</option>
              <option value="operatingIncome">Operating Income</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2">
              Sort Order
            </label>
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#a67c52]"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
        </div>

        <button
          onClick={applyFilters}
          className="w-full md:w-auto bg-[#a67c52] text-white px-6 py-3 rounded-lg shadow-md hover:bg-[#8b6b42] transition"
        >
          Apply Filters
        </button>

        <button
          onClick={applySorting}
          className="w-full md:w-auto bg-[#6b4f2a] text-white px-6 py-3 rounded-lg shadow-md hover:bg-[#533d1d] transition mt-4 md:mt-0 md:ml-4"
        >
          Sort Data
        </button>
      </div>

      {/* Data Table */}
      <div className="overflow-auto rounded-lg shadow-lg bg-white p-6 max-w-4xl mx-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-lightblue text-black">
              <th className="py-3 px-2">Date</th>
              <th className="py-3 px-2">Revenue</th>
              <th className="py-3 px-2">Net Income</th>
              <th className="py-3 px-2">Gross Profit</th>
              <th className="py-3 px-2">EPS</th>
              <th className="py-3 px-2">Operating Income</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr key={item.date} className="border-b hover:bg-[#f9f9f9]">
                <td className="py-3 px-2">{item.date}</td>
                <td className="py-3 px-2">{(item.revenue / 1e9).toFixed(1)}B</td>
                <td className="py-3 px-2">{(item.netIncome / 1e9).toFixed(1)}B</td>
                <td className="py-3 px-2">{(item.grossProfit / 1e9).toFixed(1)}B</td>
                <td className="py-3 px-2">{item.eps}</td>
                <td className="py-3 px-2">{(item.operatingIncome / 1e9).toFixed(1)}B</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


      {/* Chart Section */}
      <div className="max-w-4xl mx-auto my-10">
        <Line data={chartData} />
      </div>
    </div>
  );
}

export default App;

