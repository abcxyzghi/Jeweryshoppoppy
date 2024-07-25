import Chart from "chart.js/auto";
import React, { useEffect, useRef, useState } from "react";
import api from "../../../config/axios";
import { useSelector } from "react-redux";

function StaffDashboards() {
  const [data, setData] = useState([]);
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  const user = useSelector((store) => store.user);

  const fetchData = async () => {
    const response = await api.get(
      user.role === "ADMIN" || user.role === "MANAGER"
        ? `dashboard/admin`
        : `dashboard/staff`
    );
    console.log(response.data);
    setData(response.data);
  };
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");

      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      chartInstance.current = new Chart(ctx, {
        type: "line",
        data: {
          labels: [4, 5, 6, 7, 8, 9, 10],
          datasets: data.map((item, index) => {
            return {
              label: item.label,
              data: item.data,

              borderWidth: 1,
              yAxisID: item.label,
            };
          }),
        },
        options: {
          scales: {
            Order: {
              title: {
                display: true,
                text: "Order",
              },
              type: "linear",
              position: "left",
              beginAtZero: true,
            },
            Money: {
              title: {
                display: true,
                text: "Money",
              },
              type: "linear",
              position: "right",
              beginAtZero: true,
            },
            x: {
              title: {
                display: true,
                text: "Month",
              },
            },
          },
        },
      });
    }
  }, [data]);

  return (
    <>
      <canvas ref={chartRef} id="myChart"></canvas>
    </>
  );
}

export default StaffDashboards;
