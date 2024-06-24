import React from 'react';
import Plot from 'react-plotly.js';

interface PlotGraphProps {
  xData: any[];
  yPrimaryData: any[];
  ySecondaryData: any[];
}

const PlotGraph: React.FC<PlotGraphProps> = ({
  xData,
  yPrimaryData,
  ySecondaryData,
}) => {
  if (
    !xData ||
    !yPrimaryData ||
    !ySecondaryData ||
    xData.length === 0 ||
    yPrimaryData.length === 0 ||
    ySecondaryData.length === 0
  ) {
    return <div>No data to display</div>;
  }

  //Extract header labels for yPrimaryData and ySecondaryData

  const yPrimaryHeaders = yPrimaryData[0];
  const ySecondaryHeaders = ySecondaryData[0];

  //Prepare traces for primary y-axis
  const primaryTraces = yPrimaryHeaders.map((header: any, headerIndex: any) => {
    const yValues = yPrimaryData.slice(1).map((row) => row[headerIndex]);
    return {
      x: xData,
      y: yValues,
      type: 'scatter',
      mode: 'lines+markers',
      name: header,
      yaxis: 'y1',
    };
  });

  //prepare traces for secondary y-axis
  const secondaryTraces = ySecondaryHeaders.map(
    (header: any, headerIndex: any) => {
      const yValues = ySecondaryData.slice(1).map((row) => row[headerIndex]);
      return {
        x: xData,
        y: yValues,
        type: 'scatter',
        mode: 'lines+markers',
        name: header,
        yaxis: 'y2',
      };
    }
  );
  const layout: Partial<Plotly.Layout> = {
    title: 'Production Data Plot',
    xaxis: {
      title: 'Date',
    },
    yaxis: {
      title: 'Primary Y axis',
      automargin: true,
    },
    yaxis2: {
      title: 'Secondary Y axis',
      overlaying: 'y',
      side: 'right',
      automargin: true,
    },
  };

  return <Plot data={[...primaryTraces, ...secondaryTraces]} layout={layout} />;
};
export default PlotGraph;
