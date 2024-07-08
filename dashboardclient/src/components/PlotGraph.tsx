import React, { useState } from 'react';
import Plot from 'react-plotly.js';
import { ResizableBox, ResizableBoxProps } from 'react-resizable';
import 'react-resizable/css/styles.css';

interface PlotGraphProps {
  xData: any[];
  yPrimaryData: any[];
  ySecondaryData?: any[];
}

// Define the shape of the resize data
interface ResizeData {
  size: {
    width: number;
    height: number;
  };
}

const PlotGraph: React.FC<PlotGraphProps> = ({
  xData,
  yPrimaryData,
  ySecondaryData,
}) => {
  const [dimensions, setDimensions] = useState({
    width: Number('100%'),
    height: 400,
  });
  if (
    !xData ||
    !yPrimaryData ||
    xData.length === 0 ||
    yPrimaryData.length === 0
  ) {
    return <div>No data to display</div>;
  }

  //Extract header labels for yPrimaryData and ySecondaryData

  const yPrimaryHeaders = yPrimaryData[0];
  const ySecondaryHeaders = ySecondaryData ? ySecondaryData[0] : [];

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
      const yValues = ySecondaryData?.slice(1).map((row) => row[headerIndex]);
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
      title: yPrimaryHeaders.join(' / '),
      automargin: true,
    },
    yaxis2: {
      title: ySecondaryHeaders.join(' / '),
      overlaying: 'y',
      side: 'right',
      automargin: true,
    },
    legend: {
      orientation: 'h',
      y: -0.3,
    },
  };

  const config = {
    responsive: true,
  };

  const handleResize: ResizableBoxProps['onResize'] = (
    event: React.SyntheticEvent<Element>,
    data: ResizeData
  ) => {
    console.log(event);
    setDimensions({
      width: data.size.width,
      height: data.size.height,
    });
  };

  return (
    <>
      {primaryTraces && ySecondaryData && ySecondaryData.length > 0 && (
        <ResizableBox
          width={dimensions.width}
          height={dimensions.height}
          minConstraints={[400, 300]}
          maxConstraints={[800, 600]}
          onResize={handleResize}
          resizeHandles={['se']}
          style={{ position: 'relative' }}
        >
          <Plot
            data={[...primaryTraces, ...secondaryTraces]}
            layout={layout}
            useResizeHandler={true}
            style={{ width: '100%', height: '100%' }}
            config={config}
          />
        </ResizableBox>
      )}

      {primaryTraces && !ySecondaryHeaders && ySecondaryHeaders.length == 0 && (
        <Plot
          data={[...primaryTraces]}
          layout={layout}
          useResizeHandler={true}
          style={{ width: '100%', height: '100%' }}
          config={config}
        />
      )}
    </>
  );
};
export default PlotGraph;
