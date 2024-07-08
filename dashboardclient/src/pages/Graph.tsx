import { useState } from 'react';
import PlotGraph from '../components/PlotGraph';
import { useDispatch, useSelector } from 'react-redux';
import Dropdown from 'react-bootstrap/Dropdown';
import './Graph.css';
import { Form, FormGroup, Modal } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import {
  fetchGraphDataFromBackend,
  setPrimaryYData,
  setSecondaryYData,
} from '../features/graphData/graphDataSlice';
import { getColumnNames } from '../features/columnNames/columnNamesSlice';

const Graph = () => {
  const xData = useSelector((state: any) => state.graphData.xData);
  const primaryYData = useSelector(
    (state: any) => state.graphData.primaryYData
  );
  const secondaryYData = useSelector(
    (state: any) => state.graphData.secondaryYData
  );

  const sheetNames = useSelector((state: any) => state.fileUpload.sheetNames);
  const columnNames = useSelector((state: any) => state.columnData.columnNames);
  const [sheetName, setSheetName] = useState('');
  const [showXModal, setShowXModal] = useState(false);
  const [showPrimaryYModal, setShowPrimaryYModal] = useState(false);
  const [showSecondaryYModal, setShowSecondaryYModal] = useState(false);
  const { fileName } = useSelector((state: any) => state.fileUpload);
  const [selectedXHeadings, setSelectedXHeadings]: any = useState([]);
  const [selectedPrimaryYHeadings, setSelectedPrimaryYHeadings] = useState<
    string[]
  >([]);
  const [selectedSecondaryYHeadings, setSelectedSecondaryYHeadings] = useState<
    string[]
  >([]);
  const dispatch = useDispatch();

  const handleItemClick = (sheetName: string) => {
    console.log(sheetName);
    setSheetName(sheetName);
    dispatch(setPrimaryYData([]));
    dispatch(setSecondaryYData([]));
    setSelectedXHeadings([]);
    setSelectedPrimaryYHeadings([]);
    setSelectedSecondaryYHeadings([]);

    dispatch(getColumnNames(fileName, sheetName) as any);
    setShowXModal(true);
  };

  const handleCloseXModal = () => {
    setShowXModal(false);
  };

  const handleClosePrimaryYModal = () => {
    // console.log(fileName);
    console.log(selectedPrimaryYHeadings);
    if (selectedPrimaryYHeadings && selectedPrimaryYHeadings.length > 0) {
      dispatch(
        fetchGraphDataFromBackend(
          selectedXHeadings,
          selectedPrimaryYHeadings,
          fileName,
          sheetName,
          selectedSecondaryYHeadings
        ) as any
      );
    }

    setShowPrimaryYModal(false);
    //onClose();
  };

  const handleSelectPrimaryYData = () => {
    // onSelectY(selectedYHeadings);
    // dispatch(
    //   fetchGraphDataFromBackend(
    //     selectedXHeadings,
    //     selectedYHeadings,
    //     fileName,
    //     sheetName
    //   ) as any
    // );
    setShowPrimaryYModal(false);
    setShowSecondaryYModal(true);
  };

  const handleCheckboxChange = (event: any) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedXHeadings([...selectedXHeadings, value]);
    } else {
      setSelectedXHeadings(
        selectedXHeadings.filter((heading: any) => heading !== value)
      );
    }
  };

  const handleSelectXData = () => {
    // Handle Select Data
    console.log('logging selected X headings');
    console.log(selectedXHeadings);
    //onSelectX(selectedXHeadings);
    setShowXModal(false);
    setShowPrimaryYModal(true);
  };

  const handleCloseSecondaryYModal = () => {
    dispatch(
      fetchGraphDataFromBackend(
        selectedXHeadings,
        selectedPrimaryYHeadings,
        fileName,
        sheetName,
        selectedSecondaryYHeadings
      ) as any
    );
    setShowSecondaryYModal(false);
  };

  const handleSelectSecondaryYData = () => {
    dispatch(
      fetchGraphDataFromBackend(
        selectedXHeadings,
        selectedPrimaryYHeadings,
        fileName,
        sheetName,
        selectedSecondaryYHeadings
      ) as any
    );

    handleCloseSecondaryYModal();
  };
  // Flatten yData
  //const flattenYData = primaryYData.map((item: any) => item[0]);
  return (
    <div className='graphDropDownContainer'>
      <div className='gDropDownContainer'>
        <Dropdown>
          <Dropdown.Toggle variant='success' id='dropdown-basic'>
            Wells
          </Dropdown.Toggle>

          <Dropdown.Menu className='graphDropDownMenu'>
            {sheetNames.map((item: string, index: Number) => (
              <Dropdown.Item
                key={String(index)}
                onClick={() => handleItemClick(item)}
              >
                {item}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>
      {columnNames && (
        <Modal show={showXModal} onHide={handleCloseXModal}>
          <Modal.Header closeButton>
            <Modal.Title>Select X-Axis Data</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Select variables for x axis</p>
            <FormGroup>
              {columnNames.map((heading: any, index: any) => (
                <Form.Check
                  key={index}
                  type='checkbox'
                  id={heading}
                  label={heading}
                  value={heading}
                  checked={selectedXHeadings.includes(heading)}
                  onChange={handleCheckboxChange}
                />
              ))}
            </FormGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant='secondary'
              onClick={handleSelectXData}
              disabled={selectedXHeadings.length === 0}
            >
              Select
            </Button>
            <Button variant='secondary' onClick={handleCloseXModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
      <Modal show={showPrimaryYModal} onHide={handleClosePrimaryYModal}>
        <Modal.Header closeButton>
          <Modal.Title>Select Primary Y-Axis Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormGroup>
            {columnNames.map((heading: any, index: any) => (
              <Form.Check
                key={index}
                type='checkbox'
                id={heading}
                label={heading}
                value={heading}
                checked={selectedPrimaryYHeadings.includes(heading)}
                onChange={(event) => {
                  const { value, checked } = event.target;
                  if (checked) {
                    setSelectedPrimaryYHeadings([
                      ...selectedPrimaryYHeadings,
                      value,
                    ]);
                  } else {
                    setSelectedPrimaryYHeadings(
                      selectedPrimaryYHeadings.filter(
                        (heading) => heading !== value
                      )
                    );
                  }
                }}
              />
            ))}
          </FormGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant='secondary'
            onClick={handleSelectPrimaryYData}
            disabled={selectedPrimaryYHeadings.length === 0}
          >
            Select
          </Button>
          <Button variant='secondary' onClick={handleClosePrimaryYModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showSecondaryYModal} onHide={handleCloseSecondaryYModal}>
        <Modal.Header closeButton>
          <Modal.Title>Select Secondary Y-Axis Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormGroup>
            {columnNames.map((heading: any, index: any) => (
              <Form.Check
                key={index}
                type='checkbox'
                id={heading}
                label={heading}
                value={heading}
                checked={selectedSecondaryYHeadings.includes(heading)}
                onChange={(event) => {
                  const { value, checked } = event.target;
                  if (checked) {
                    setSelectedSecondaryYHeadings([
                      ...selectedSecondaryYHeadings,
                      value,
                    ]);
                  } else {
                    setSelectedSecondaryYHeadings(
                      selectedSecondaryYHeadings.filter(
                        (heading) => heading !== value
                      )
                    );
                  }
                }}
              />
            ))}
          </FormGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant='secondary'
            onClick={handleSelectSecondaryYData}
            disabled={selectedSecondaryYHeadings.length === 0}
          >
            Select
          </Button>
          <Button variant='secondary' onClick={handleCloseSecondaryYModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <div className='graphContainer'>
        {/* {xData &&
          primaryYData &&
          xData.length > 0 &&
          primaryYData.length > 0 &&
          secondaryYData &&
          secondaryYData.length > 0 && (
            <PlotGraph
              xData={xData}
              yPrimaryData={primaryYData}
              ySecondaryData={secondaryYData}
            />
          )} */}
        {xData &&
          primaryYData &&
          xData.length > 0 &&
          primaryYData.length > 0 &&
          secondaryYData &&
          secondaryYData.length > 0 && (
            <PlotGraph
              xData={xData}
              yPrimaryData={primaryYData}
              ySecondaryData={secondaryYData}
            />
          )}
      </div>
      <div>
        {xData &&
          primaryYData &&
          xData.length > 0 &&
          primaryYData.length > 0 && (
            <PlotGraph xData={xData} yPrimaryData={primaryYData} />
          )}
      </div>
    </div>
  );
};
export default Graph;
