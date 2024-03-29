import React from "react";
// import { Chart } from "chart.js";

const Stats = ({
  canvasClass,
  title,
  number,
  percent,
  increase = true,
  index = 0,
}) => {
  // useEffect(() => {
  //   const boSmallStatsOptions = (max) => ({
  //     maintainAspectRatio: true,
  //     responsive: true,
  //     // Uncomment the following line in order to disable the animations.
  //     // animation: false,
  //     legend: {
  //       display: false,
  //     },
  //     tooltips: {
  //       enabled: false,
  //       custom: false,
  //     },
  //     elements: {
  //       point: {
  //         radius: 0,
  //       },
  //       line: {
  //         tension: 0.3,
  //       },
  //     },
  //     scales: {
  //       xAxes: [
  //         {
  //           gridLines: false,
  //           scaleLabel: false,
  //           ticks: {
  //             display: false,
  //           },
  //         },
  //       ],
  //       yAxes: [
  //         {
  //           gridLines: false,
  //           scaleLabel: false,
  //           ticks: {
  //             display: false,
  //             // Avoid getting the graph line cut of at the top of the canvas.
  //             // Chart.js bug link: https://github.com/chartjs/Chart.js/issues/4790
  //             suggestedMax: max,
  //           },
  //         },
  //       ],
  //     },
  //   });

  //   const boSmallStatsDatasets = [
  //     {
  //       backgroundColor: "rgba(0, 184, 216, 0.1)",
  //       borderColor: "rgb(0, 184, 216)",
  //       data: [1, 2, 1, 3, 5, 4, 7],
  //     },
  //     {
  //       backgroundColor: "rgba(23,198,113,0.1)",
  //       borderColor: "rgb(23,198,113)",
  //       data: [1, 2, 3, 3, 3, 4, 4],
  //     },
  //     {
  //       backgroundColor: "rgba(255,180,0,0.1)",
  //       borderColor: "rgb(255,180,0)",
  //       data: [2, 3, 3, 3, 4, 3, 3],
  //     },
  //     {
  //       backgroundColor: "rgba(255,65,105,0.1)",
  //       borderColor: "rgb(255,65,105)",
  //       data: [1, 7, 1, 3, 1, 4, 8],
  //     },
  //     {
  //       backgroundColor: "rgb(0,123,255,0.1)",
  //       borderColor: "rgb(0,123,255)",
  //       data: [3, 2, 3, 2, 4, 5, 4],
  //     },
  //   ];

  //   boSmallStatsDatasets.map(function (el, index) {
  //     var chartOptions = boSmallStatsOptions(Math.max.apply(Math, el.data) + 1);
  //     var ctx = document.getElementsByClassName(
  //       "blog-overview-stats-small-" + (index + 1)
  //     );
  //     new Chart(ctx, {
  //       type: "line",
  //       data: {
  //         labels: [
  //           "Label 1",
  //           "Label 2",
  //           "Label 3",
  //           "Label 4",
  //           "Label 5",
  //           "Label 6",
  //           "Label 7",
  //         ],
  //         datasets: [
  //           {
  //             label: "Today",
  //             fill: "start",
  //             data: el.data,
  //             backgroundColor: el.backgroundColor,
  //             borderColor: el.borderColor,
  //             borderWidth: 1.5,
  //           },
  //         ],
  //       },
  //       options: chartOptions,
  //     });
  //   });
  // }, []);

  return (
    <div className={"col-lg col-sm-12 mb-4 col-md-" + (index < 2 ? "6" : "4")}>
      <div className="stats-small stats-small--1 card card-small">
        <div className="card-body p-0 d-flex">
          <div className="d-flex flex-column m-auto">
            <div className="stats-small__data text-center">
              <span className="stats-small__label text-uppercase">{title}</span>
              <h6 className="stats-small__value count my-3">{number}</h6>
            </div>
            <div className="stats-small__data">
              <span
                className={
                  "stats-small__percentage stats-small__percentage--" +
                  (increase ? "increase" : "decrease")
                }
              >
                {percent}%
              </span>
            </div>
          </div>
          <canvas
            height="120"
            className={"blog-overview-stats-small-" + (index + 1)}
          ></canvas>
        </div>
      </div>
    </div>
  );
};

export default Stats;
