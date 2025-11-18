import React, { useState } from 'react';
import Plot from 'react-plotly.js';
// import { ResizableBoxProps } from 'react-resizable';
// import * as XLSX from 'xlsx';
import 'react-resizable/css/styles.css';
import './PlotGraph.css';
import { Modal, Button, Form } from 'react-bootstrap';
// import { Box, Typography, TextField } from '@mui/material';

interface PlotGraphProps {
  xData: any[];
  yPrimaryData: any[];
  ySecondaryData?: any[];
  annotations?: any;
  onHover?: any;
  getTrendExplanation?: any;
  onMouseLeave?: any;
  hoverBoxExplanation?: any;
}

// // Define the shape of the resize data
// interface ResizeData {
//   size: {
//     width: number;
//     height: number;
//   };
// }

const PlotGraph: React.FC<PlotGraphProps> = ({
  xData,
  yPrimaryData,
  ySecondaryData,
  // annotations,
  // getTrendExplanation,
  onHover,
  // onMouseLeave,
  hoverBoxExplanation,
}) => {
  const [xRange, setXRange] = useState([0, 6]);
  const [yRange, setYRange] = useState([5, 25]);
  const [show, setShow] = useState(false);
  const [xMin, setXMin] = useState(xRange[0]);
  const [xMax] = useState(xRange[1]);
  const [yMin, setYMin] = useState(yRange[0]);
  const [yMax, setYMax] = useState(yRange[1]);
  // const [, setDimensions] = useState({
  //   width: Number('100%'),
  //   height: 400,
  // });
  // const debouncedHover = debounce(onHover, 200);

  function addLineBreaks(text: string, maxLineLength: number) {
    const regex = new RegExp(`(.{1,${maxLineLength}})(\\s|$)`, 'g');
    if (text) {
      return text.match(regex)?.join('<br>') || text;
    }
  }

  // useEffect(() => {
  //   // Whenever hoverBoxExplanation changes, log the new value to check
  //   console.log('hoverBoxExplanation updated:', hoverBoxExplanation);
  // }, [hoverBoxExplanation]);
  // const getExplanation = (index: number) => {
  //   if (index == 0) {
  //     return 'Starting point';
  //   }

  //   const primaryY = yPrimaryData[index];
  //   const secondaryY = ySecondaryData ? ySecondaryData[index] : null;
  //   let enteredPrimaryLogic = false;

  //   const prevPrimaryY = index > 0 ? yPrimaryData[index - 1] : null;
  //   const nextPrimaryY =
  //     index < yPrimaryData.length - 1 ? yPrimaryData[index + 1] : null;
  //   const prevSecondaryY =
  //     ySecondaryData && index > 0 ? ySecondaryData[index - 1] : null;
  //   const nextSecondaryY =
  //     ySecondaryData && index < ySecondaryData.length - 1
  //       ? ySecondaryData[index + 1]
  //       : null;

  //   let explanation = '';

  //   console.log(yPrimaryData);

  //   console.log('this method is called');
  //   console.log('previous data');
  //   console.log(prevPrimaryY);

  //   console.log('next primary data ');
  //   console.log(nextPrimaryY);

  //   console.log('current primary data');
  //   console.log(primaryY);

  //   if (prevPrimaryY !== null && nextPrimaryY != null) {
  //     console.log('entered primary axis');
  //     enteredPrimaryLogic = true;
  //     if (primaryY > prevPrimaryY && primaryY > nextPrimaryY) {
  //       explanation +=
  //         'This point is a peak, showing an increase followed by a decrease';
  //     } else if (primaryY < prevPrimaryY && primaryY < nextPrimaryY) {
  //       explanation +=
  //         'This point is a trough, indicating a decrease followed by an increase.';
  //     } else if (primaryY > prevPrimaryY) {
  //       explanation +=
  //         'This point on the primary axis shows an increase from the previous point';
  //     } else if (primaryY < prevPrimaryY) {
  //       explanation +=
  //         'This point on the primary axis shows a decrease from the previous point.';
  //     }
  //   } else {
  //     explanation += 'No surrounding data for comparison on the primary axis';
  //   }

  //   if (!enteredPrimaryLogic) {
  //     if (prevSecondaryY !== null && nextSecondaryY != null) {
  //       if (secondaryY > prevSecondaryY && secondaryY > nextSecondaryY) {
  //         console.log('entered secondary axis');
  //         explanation +=
  //           'This point is a peak, showing an increase followed by a decrease ';
  //       } else if (secondaryY < prevSecondaryY && secondaryY < nextSecondaryY) {
  //         explanation +=
  //           'This point is a trough, indicating a decrease followed by an increase';
  //       } else if (secondaryY > prevSecondaryY) {
  //         explanation +=
  //           'Secondary Y shows an increase from the previous point.';
  //       } else {
  //         explanation += 'Secondary y shows a decrease from the previous point';
  //       }
  //     } else {
  //       explanation += 'No surrounding data for secondary y comparison';
  //     }
  //   }

  //   return explanation;
  // };

  // const primaryDataExplanations = yPrimaryData.map((_, index) => {
  //   if (typeof getTrendExplanation === 'function' && index !== undefined) {
  //     return getTrendExplanation(index)?.replace(/\n/g, '<br>');
  //   }
  // });
  // const secondaryDataExplanations = ySecondaryData?.map((_, index) => {
  //   if (typeof getTrendExplanation === 'function' && index !== undefined) {
  //     return getTrendExplanation(index)?.replace(/\n/g, '<br>');
  //   }
  // });

  const validDates: any = xData.filter((date) => {
    const parsedDate = new Date(date);
    return !isNaN(parsedDate.getTime());
  });

  const minimumDate: any =
    validDates.length > 0
      ? new Date(Math.min(...validDates.map((date: any) => new Date(date))))
      : null;

  const maximumDate =
    validDates.length > 0
      ? new Date(Math.max(...validDates.map((date: any) => new Date(date))))
      : null;

  let minimumDateFormatted =
    minimumDate instanceof Date && !isNaN(minimumDate.getTime())
      ? minimumDate.toISOString().split('T')[0]
      : 'No valid dates';

  minimumDateFormatted = '2016-02-20';
  const maximumDateFormatted =
    maximumDate instanceof Date && !isNaN(maximumDate.getTime())
      ? maximumDate.toISOString().split('T')[0]
      : 'No Valid Dates';

  if (
    !xData ||
    !yPrimaryData ||
    xData.length === 0 ||
    yPrimaryData.length === 0
  ) {
    return <div>No data to display</div>;
  }

  // Extract header labels for yPrimaryData and ySecondaryData
  const yPrimaryHeaders = yPrimaryData[0];
  const ySecondaryHeaders = ySecondaryData ? ySecondaryData[0] : [];

  const primaryHeaderUnits = yPrimaryData[1];
  const secondaryHeaderUnits = ySecondaryData ? ySecondaryData[1] : [];

  const getHeadersUnit = (unit: any) => {
    const yPrimaryHeadersUnits =
      unit != null && typeof unit != 'number' ? ` (${unit})` : '';
    return yPrimaryHeadersUnits;
  };

  function customJoinWithUnits(array: any, units: any, separator: string) {
    if (separator === undefined) {
      separator = '/';
    }

    if (array.length === 0 || units.length !== array.length) {
      return '';
    }

    let firstUnit = getHeadersUnit(units[0]);
    let result = `${array[0]}${firstUnit}`;

    for (let i = 1; i < array.length; i++) {
      let unit = getHeadersUnit(units[i]);
      result += `${separator} ${array[i]}${unit}`;
    }

    return result;
  }
  const colorMap: { [key: string]: string } = {
    'Oil production (bbls)': 'red',
    'GOR (SCF/bbls)': 'Green',
    'BS&W': 'deepskyblue',
    Oil: 'red',
    GOR: 'Green',
    'Water Cut': 'deepskyblue',
    Choke: 'purple',
    FTHP: 'black',
  };

  // Prepare traces for primary y-axis
  const primaryTraces = yPrimaryHeaders.map((header: any, headerIndex: any) => {
    const yValues = yPrimaryData.slice(1).map((row) => row[headerIndex]);
    let headerNameUnit =
      header + getHeadersUnit(primaryHeaderUnits[headerIndex]);

    // const wrappedExplanations = primaryDataExplanations.map(
    //   (explanation: any) => addLineBreaks(explanation, 30) // Adjust character limit per line
    // );
    //const wrappedExplanations = addLineBreaks(hoverBoxExplanation, 30);
    const wrappedExplanations = xData.map(() =>
      addLineBreaks(hoverBoxExplanation, 30)
    );

    return {
      x: xData,
      y: yValues,
      type: 'scatter',
      mode: 'lines',
      name: `${headerNameUnit} `,
      line: { color: colorMap[header] || 'gray' },
      hovertemplate: `%{x}<br>Primary Value: %{y}<br>%{text}`,
      text: wrappedExplanations,
      hoverlabel: {
        bgcolor: 'rgba(255,255,255,0.5)',
        font: { color: 'black', size: 12 },
        align: 'left',
        bordercolor: 'rgba(255, 255, 255, 0.5)',
        borderwidth: 1,
        text: {
          wrap: true,
        },
        width: 10,
      },
      yaxis: 'y1',
    };
  });

  // Prepare traces for secondary y-axis
  const secondaryTraces = ySecondaryHeaders.map(
    (header: any, headerIndex: any) => {
      const yValues = ySecondaryData?.slice(1).map((row) => row[headerIndex]);
      let headerNameUnit =
        header + getHeadersUnit(secondaryHeaderUnits[headerIndex]);
      // const wrappedExplanations = secondaryDataExplanations?.map(
      //   (explanation: any) => addLineBreaks(explanation, 30) // Adjust character limit per line
      // );
      //const wrappedExplanations = addLineBreaks(hoverBoxExplanation, 30);
      const wrappedExplanations = xData.map(() =>
        addLineBreaks(hoverBoxExplanation, 30)
      );

      return {
        x: xData,
        y: yValues,
        type: 'scatter',
        mode: 'lines',
        name: `${headerNameUnit}`,
        line: { color: colorMap[header] || 'gray' },
        hovertemplate: `%{x}<br>Secondary Value: %{y}<br>%{text}`,
        // hovertemplate: `${wrappedExplanations}`,
        text: wrappedExplanations,
        hoverlabel: {
          bgcolor: 'rgba(255,255,255,0.5)',
          font: { color: 'black', size: 12 },
          align: 'left',
          bordercolor: 'rgba(255, 255, 255, 0.5)',
          borderwidth: 1,
          text: {
            wrap: true,
          },
          width: 10,
        },
        yaxis: 'y2',
      };
    }
  );

  const layout: Partial<Plotly.Layout> = {
    title: 'Production Data Plot',
    // annotations: annotations,
    hovermode: 'closest',
    xaxis: {
      title: 'Date',
      tickformat: '%b %Y',
      range: [minimumDateFormatted, maximumDateFormatted],
    },
    yaxis: {
      title: customJoinWithUnits(yPrimaryHeaders, primaryHeaderUnits, ','),
      // title: yPrimaryHeaders.join(' / '),
      automargin: true,
    },
    yaxis2: {
      title: customJoinWithUnits(ySecondaryHeaders, secondaryHeaderUnits, ','),
      overlaying: 'y',
      side: 'right',
      automargin: true,
    },
    legend: {
      orientation: 'h',
      y: -0.3,
    },
  };

  const config: any = {
    responsive: true,
    displayModeBar: true,
    modeBarButtonsToRemove: ['toImage', 'zoomOut2d'], // Remove "Download as PNG" and "Zoom Out" icons
    displaylogo: false, // Optionally hide the Plotly logo
  };

  // const handleResize: ResizableBoxProps['onResize'] = (
  //   event: React.SyntheticEvent<Element>,
  //   data: ResizeData
  // ) => {
  //   setDimensions({
  //     width: data.size.width,
  //     height: data.size.height,
  //   });
  // };

  // const downloadExcel = () => {
  //   // Prepare the data for Excel
  //   const excelData = [];

  //   // Add headers
  //   const headers = ['Date', ...yPrimaryHeaders, ...ySecondaryHeaders];
  //   excelData.push(headers);

  //   // Combine xData, yPrimaryData, and ySecondaryData
  //   for (let i = 0; i < xData.length; i++) {
  //     const row = [xData[i]];
  //     for (let j = 0; j < yPrimaryHeaders.length; j++) {
  //       if (yPrimaryData[i + 1]) {
  //         row.push(yPrimaryData[i + 1][j]);
  //       } else {
  //         row.push(null); // or some default value
  //       }
  //     }
  //     for (let k = 0; k < ySecondaryHeaders.length; k++) {
  //       if (ySecondaryData && ySecondaryData[i + 1]) {
  //         row.push(ySecondaryData[i + 1][k]);
  //       } else {
  //         row.push(null); // or some default value
  //       }
  //     }
  //     excelData.push(row);
  //   }

  //   // Create worksheet and workbook
  //   const worksheet = XLSX.utils.aoa_to_sheet(excelData);
  //   const workbook = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');

  //   // Save the Excel file
  //   XLSX.writeFile(workbook, 'plotly_data.xlsx');
  // };

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleSave = () => {
    setXRange([xMin, xMax]);
    setYRange([yMin, yMax]);
    handleClose();
  };
  // const handleHover = (index: number) => {
  //   //getExplanation(index);
  //   // setHoverData({
  //   //   index,
  //   //   explanation: trendExplanation,
  //   // });
  // };

  const handlePlotClick = (event: any, totalPrimaryTraces: number) => {
    if (event.points.length > 0) {
      const point = event.points[0];
      const index = event.points[0].pointIndex;
      const traceIndex = event.points[0].curveNumber;
      const secondaryIndex = traceIndex - totalPrimaryTraces;

      // const datasetId = point.curveNumber;
      let axisType = point.yaxis._id === 'y' ? 'primary' : 'secondary';

      // console.log('y axis title');
      // console.log(point.yaxis.title);
      // if (
      //   point.yaxis &&
      //   point.yaxis.title &&
      //   point.yaxis.title.text === 'Primary Y Axis Label'
      // ) {
      //   axisType = 'primary';
      // } else if (
      //   point.yaxis &&
      //   point.yaxis.title &&
      //   point.yaxis.title.text === 'Secondary Y Axis Label'
      // ) {
      //   axisType = 'secondary';
      // } else {
      //   console.warn('Could not determine axis type from plotly event.');
      //   return;
      // }
      // debouncedHover(index);
      onHover(index, axisType, secondaryIndex);
      //handleHover(index);
    }
    // (event) => {
    //   if (event.points.length > 0) {
    //     const index = event.points[0].pointIndex;
    //     onHover(index);
    //   }
    // }
  };

  // const handleUnhover = () => {
  //   onMouseLeave();
  // };

  return (
    <>
      {primaryTraces && ySecondaryData && ySecondaryData.length > 0 && (
        <>
          {/* <Button variant='outlined' onClick={handleShow}>
            Customise Scales
          </Button> */}
          {/* <ResizableBox
            width={dimensions.width}
            height={dimensions.height}
            minConstraints={[400, 300]}
            maxConstraints={[800, 600]}
            onResize={handleResize}
            resizeHandles={['se']}
            style={{ position: 'relative' }}
          > */}
          <Plot
            data={[...primaryTraces, ...secondaryTraces]}
            layout={layout}
            useResizeHandler={true}
            style={{ width: '50%', height: '100%' }}
            config={config}
            onHover={(event) => handlePlotClick(event, primaryTraces.length)}
            //onUnhover={handleUnhover}
          />
          {/* </ResizableBox> */}
          {/* <button onClick={downloadExcel}></button> */}
        </>
      )}

      {primaryTraces && !ySecondaryHeaders && ySecondaryHeaders.length == 0 && (
        <>
          <Button variant='outlined' onClick={handleShow}>
            Customise Scales
          </Button>
          <div>
            <Plot
              data={[...primaryTraces]}
              layout={layout}
              useResizeHandler={true}
              style={{ width: '100%', height: '100%' }}
              config={config}
            />
          </div>
          {/* <button onClick={downloadExcel}>Download Excel</button> */}
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Customise Scales</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId='formXMIn'>
                  <Form.Label>X Min</Form.Label>
                  <Form.Control
                    type='number'
                    value={xMin}
                    onChange={(e) => setXMin(Number(e.target.value))}
                  />
                </Form.Group>
                <Form.Group controlId='formXMax'>
                  <Form.Label>X Max</Form.Label>
                  <Form.Control
                    type='number'
                    value={yMin}
                    onChange={(e) => setYMin(Number(e.target.value))}
                  />
                </Form.Group>
                <Form.Group controlId='formYMIn'>
                  <Form.Label>Y Min</Form.Label>
                  <Form.Control
                    type='number'
                    value={yMin}
                    onChange={(e) => setYMin(Number(e.target.value))}
                  />
                </Form.Group>
                <Form.Group controlId='formYMax'>
                  <Form.Label>Y Max</Form.Label>
                  <Form.Control
                    type='number'
                    value={yMax}
                    onChange={(e) => setYMax(Number(e.target.value))}
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant='secondary' onClick={handleClose}>
                Close
              </Button>
              <Button variant='primary' onClick={handleSave}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )}
    </>
  );
};

export default PlotGraph;
