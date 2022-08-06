import BarChart from "containers/chart/Bar.js";
import LineChart from "containers/chart/Line.js";
import Pie from "containers/chart/Pie";
import React from "react";
import Stats from "./Stats.js";

const Home = () => {
  const statsItems = [
    {
      title: "Đơn vay",
      percent: 1,
      number: 1,
      increase: true,
    },
    {
      title: "Đã giải ngân",
      percent: 1,
      number: 1,
      increase: true,
    },
    {
      title: "Giải ngân chậm",
      percent: 1,
      number: 1,
      increase: true,
      canvasClass: "",
    },
    {
      title: "Từ chối",
      percent: 1,
      number: 1,
      increase: false,
      canvasClass: "",
    },
    {
      title: "Nhân viên",
      percent: 1,
      number: "2.300",
      increase: false,
      canvasClass: "",
    },
  ];

  return (
    // <div className="over-view">
    //   <div className="over-view-info">
    //     <div className="over-view-info-item">
    //       <div className="over-view-info-item-label">Thông tin A</div>
    //       <div className="over-view-info-item-number">124,123,45</div>
    //     </div>
    //     <div className="over-view-info-item">
    //       <div className="over-view-info-item-label">Thông tin B</div>
    //       <div className="over-view-info-item-number">146,112,445</div>
    //     </div>
    //     <div className="over-view-info-item">
    //       <div className="over-view-info-item-label">Thông tin C</div>
    //       <div className="over-view-info-item-number">30%</div>
    //     </div>
    //     <div className="over-view-info-item">
    //       <div className="over-view-info-item-label">Thông tin D</div>
    //       <div className="over-view-info-item-number">67/300</div>
    //     </div>
    //   </div>

    //   <div className="over-view-chart">
    //     <div className="over-view-chart-item">
    //       <BarChart />
    //     </div>
    //     <div className="over-view-chart-item">
    //       <Pie />
    //     </div>
    //     <div className="over-view-chart-item">
    //       <LineChart />
    //     </div>
    //   </div>
    // </div>
    <div className="main-content-container container-fluid px-4">
      <div className="page-header row no-gutters py-4">
        <div className="col-12 col-sm-4 text-center text-sm-left mb-0">
          <span className="text-uppercase page-subtitle">Tổng quan</span>
          <h3 className="page-title">Tài nguyên</h3>
        </div>
      </div>
      <div className="row">
        {statsItems.map((i, index) => (
          <Stats
            number={i.number}
            increase={i.increase}
            title={i.title}
            percent={i.percent}
            index={index}
          />
        ))}
      </div>
      <div className="row">
        <div className="mb-4 col-sm-12 col-md-12 col-lg-8">
          <div className="h-100 card card-small">
            <div className="border-bottom card-header">Chart demo</div>
            <div className="pt-0 card-body">
              <BarChart />
            </div>
          </div>
        </div>
        <div className="mb-4 col-sm-12 col-md-6 col-lg-4">
          <div className="h-100 card card-small">
            <div className="border-bottom card-header">Chart demo</div>
            <div className="pt-0 card-body">
              <Pie />
            </div>
          </div>
        </div>
        <div className="mb-4 col-sm-10 col-md-10 col-lg-10">
          <div className="h-100 card card-small">
            <div className="border-bottom card-header">Chart demo</div>
            <div className="pt-0 card-body">
              <LineChart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
