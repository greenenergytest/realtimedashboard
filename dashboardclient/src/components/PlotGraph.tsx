import React from 'react';
import Plot from 'react-plotly.js';

interface PlotGraphProps {
  xData: any[];
  yData: any[];
}

const PlotGraph: React.FC<PlotGraphProps> = ({ xData, yData }) => {
  if (!xData || !yData || yData.length === 0) {
    return <div>No data to display</div>;
  }

  console.log('PlotGraph xData:', xData);
  console.log('PlotGraph yData:', yData);

  const trace = {
    x: xData,
    y: yData,
    type: 'scatter',
    mode: 'lines+markers',
    name: 'Y Axis',
  };

  const layout: Partial<Plotly.Layout> = {
    title: 'Dynamic Y-Axes Plot',
    xaxis: {
      title: 'X Axis',
    },
    yaxis: {
      title: 'Y Axis',
      automargin: true,
    },
  };

  return <Plot data={[trace as any]} layout={layout} />;
};

export default PlotGraph;
