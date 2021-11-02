import React from "react";

import { Bar, Line } from "react-chartjs-2";
import { Typography } from "@mui/material";

const Grafica = ({titels,values}) => {
  return (
    <div className={"panel shadow mleft10"}>
      <div className="header">
        <Typography variant="h6" className={"title"}>
          Grafica ERMS 
        </Typography>
      </div>
      <div className="inside">
        <Line
          data={{
            labels: titels,
            datasets: [
              {
                label: "ERMS",
                data: values,
                backgroundColor: [
                  "rgba(255, 99, 132, 0.2)",
                  "rgba(54, 162, 235, 0.2)",
                  "rgba(255, 206, 86, 0.2)",
                  "rgba(75, 192, 192, 0.2)",
                  "rgba(153, 102, 255, 0.2)",
                  "rgba(255, 159, 64, 0.2)",
                ],
                borderColor: [
                  "rgba(255, 99, 132, 1)",
                  "rgba(54, 162, 235, 1)",
                  "rgba(255, 206, 86, 1)",
                  "rgba(75, 192, 192, 1)",
                  "rgba(153, 102, 255, 1)",
                  "rgba(255, 159, 64, 1)",
                ],
                borderWidth: 1,
              },
            ],
          }}
          height={200}
          width={400}
          options={{}}
        />
      </div>
    </div>
  );
};

export default Grafica;
