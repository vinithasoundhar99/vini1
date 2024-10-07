import React, { useEffect } from "react";
import Chart from 'react-apexcharts'; 

import { useDispatch,useSelector } from "react-redux";
import { getdashboard } from "../../Action/Admin";






const Admindashboard: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getdashboard() as any);
  }, [dispatch]);


  const dashboards = useSelector((state: any) => state.admin.dashboard);

  // console.log(dashboards, "dashboards");


  // Dummy data
  const dashboard = {
    movies: 100, // Number of movies
    ratings: 250, // Number of ratings
    users: 150, // Number of users
    orders: 200, // Number of orders
    orderdata: [
      { _id: 1, count: 20 },
      { _id: 2, count: 30 },
      { _id: 3, count: 25 },
      { _id: 4, count: 50 },
      { _id: 5, count: 45 },
      { _id: 6, count: 40 },
    ],
    offerdata: [
      { _id: 1, count: 10 },
      { _id: 2, count: 15 },
      { _id: 3, count: 5 },
      { _id: 4, count: 25 },
      { _id: 5, count: 20 },
      { _id: 6, count: 15 },
    ],
    userdata: [
      { _id: 1, count: 10 },
      { _id: 2, count: 20 },
      { _id: 3, count: 15 },
      { _id: 4, count: 30 },
      { _id: 5, count: 25 },
      { _id: 6, count: 20 },
    ],
  };

  const summaryData = [
    { title: 'No. of Movies', value: dashboards?.totalMovies},
    { title: 'No. of Ratings', value: dashboards?.totalRatings},
    { title: 'No. of Users', value: dashboards?.totalCustomers},
    // { title: 'Orders', value: dashboard.orders },
  ];

  const chartOptions1: any = {
    chart: {
      type: 'line', // Line chart for orders
      height: 350,
    },
    series: [{
      name: 'Order Data',
      data: dashboard.orderdata.map((item: any) => item.count) || []
    }],
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
    }
  };

  const chartOptions2: any = {
    chart: {
      type: 'bar', // Bar chart for revenue
      height: 350,
    },
    series: [{
      name: 'Offer Data',
      data: dashboard.offerdata.map((item: any) => item.count) || []
    }],
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
    }
  };

  const chartOptions3: any = {
    chart: {
      type: 'area', // Area chart for customers
      height: 350,
    },
    series: [{
      name: 'Customers',
      data: dashboard.userdata.map((item: any) => item.count) || []
    }],
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
    }
  };

  const chartOptions4: any = {
    chart: {
      type: 'pie', // Pie chart for service types
      height: 350,
    },
    series: [dashboards?.totalMovies, dashboards?.totalRatings, dashboards?.totalCustomers],
    labels: ['No. of Movies', 'No. of Ratings', 'No. of Users'],
  };

  return (
    <div className="dashboard p-4 overflow-auto">
      <div className="summary-row grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {summaryData.map((item, index) => (
          <div className="summary-box bg-white shadow-lg rounded-lg p-6 text-center" key={index}>
            <h3 className="text-lg font-semibold text-gray-700">{item.title}</h3>
            <p className="text-2xl font-bold text-gray-900">{item.value}</p>
          </div>
        ))}
      </div>
      <div className="card-column grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="card bg-white shadow-lg rounded-lg p-6">
          <Chart options={chartOptions1} series={chartOptions1.series} type={chartOptions1.chart.type} />
        </div>
        <div className="card bg-white shadow-lg rounded-lg p-6">
          <Chart options={chartOptions2} series={chartOptions2.series} type={chartOptions2.chart.type} />
        </div>
        <div className="card bg-white shadow-lg rounded-lg p-6">
          <Chart options={chartOptions3} series={chartOptions3.series} type={chartOptions3.chart.type} />
        </div>
        <div className="card bg-white shadow-lg rounded-lg p-6">
          <Chart options={chartOptions4} series={chartOptions4.series} type={chartOptions4.chart.type} />
        </div>
      </div>
    </div>
  );
};

export default Admindashboard;
