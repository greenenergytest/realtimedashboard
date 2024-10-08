import React, { useState } from 'react';
import Plot from 'react-plotly.js';
import { ResizableBox, ResizableBoxProps } from 'react-resizable';
import * as XLSX from 'xlsx';
import 'react-resizable/css/styles.css';
import './PlotGraph.css';
import { Modal, Button, Form } from 'react-bootstrap';
// import { Box, Typography, TextField } from '@mui/material';

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
  const [xRange, setXRange] = useState([0, 6]);
  const [yRange, setYRange] = useState([5, 25]);
  const [show, setShow] = useState(false);
  const [xMin, setXMin] = useState(xRange[0]);
  const [xMax, setXMax] = useState(xRange[1]);
  const [yMin, setYMin] = useState(yRange[0]);
  const [yMax, setYMax] = useState(yRange[1]);

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

  // Extract header labels for yPrimaryData and ySecondaryData
  const yPrimaryHeaders = yPrimaryData[0];
  const ySecondaryHeaders = ySecondaryData ? ySecondaryData[0] : [];

  // Prepare traces for primary y-axis
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

  // Prepare traces for secondary y-axis
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
    setDimensions({
      width: data.size.width,
      height: data.size.height,
    });
  };

  const downloadExcel = () => {
    // Prepare the data for Excel
    const excelData = [];

    // Add headers
    const headers = ['Date', ...yPrimaryHeaders, ...ySecondaryHeaders];
    excelData.push(headers);

    // Combine xData, yPrimaryData, and ySecondaryData
    for (let i = 0; i < xData.length; i++) {
      const row = [xData[i]];
      for (let j = 0; j < yPrimaryHeaders.length; j++) {
        if (yPrimaryData[i + 1]) {
          row.push(yPrimaryData[i + 1][j]);
        } else {
          row.push(null); // or some default value
        }
      }
      for (let k = 0; k < ySecondaryHeaders.length; k++) {
        if (ySecondaryData && ySecondaryData[i + 1]) {
          row.push(ySecondaryData[i + 1][k]);
        } else {
          row.push(null); // or some default value
        }
      }
      excelData.push(row);
    }

    // Create worksheet and workbook
    const worksheet = XLSX.utils.aoa_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');

    // Save the Excel file
    XLSX.writeFile(workbook, 'plotly_data.xlsx');
  };

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleSave = () => {
    setXRange([xMin, xMax]);
    setYRange([yMin, yMax]);
    handleClose();
  };

  return (
    <>
      {primaryTraces && ySecondaryData && ySecondaryData.length > 0 && (
        <>
          <Button variant='outlined' onClick={handleShow}>
            Customise Scales
          </Button>
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
          <button onClick={downloadExcel}>Download Excel</button>
        </>
      )}

      {primaryTraces && !ySecondaryHeaders && ySecondaryHeaders.length == 0 && (
        <>
          <Button variant='outlined' onClick={handleShow}>
            Customise Scales
          </Button>

          <Plot
            data={[...primaryTraces]}
            layout={layout}
            useResizeHandler={true}
            style={{ width: '100%', height: '100%' }}
            config={config}
          />
          <button onClick={downloadExcel}>Download Excel</button>
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
