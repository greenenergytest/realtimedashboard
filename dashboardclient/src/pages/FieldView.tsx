import FieldCard from '../components/FieldCard';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFieldDetails } from '../features/FieldData/FieldDataSlice';
import { fetchWellDataFromBackend } from '../features/wellGraph/wellGraphPlotSlice';
import { fetchProblemWellsData } from '../features/problemWells/problemWellsSlice';
import Dropdown from 'react-bootstrap/Dropdown';
import { Table } from 'react-bootstrap';
import './FieldView.css';
import PlotGraph from '../components/PlotGraph';
import { Spinner } from 'react-bootstrap';

const FieldView = () => {
  const { fileName } = useSelector((state: any) => state.fileUpload);
  const xData = useSelector((state: any) => state.wellGraphData.xData);
  const primaryYData = useSelector(
    (state: any) => state.wellGraphData.primaryYData
  );
  const secondaryYData = useSelector(
    (state: any) => state.wellGraphData.secondaryYData
  );
  const FieldCardItems = ['Cumm', 'WC', 'GOR', 'Rate'];
  const dispatch = useDispatch();
  const { cummData, waterCutData, gorData, rateData } = useSelector(
    (state: any) => state.fieldData
  );

  const { problemWells } = useSelector((state: any) => state.problemWellsData);
  const sheetNames = useSelector((state: any) => state.fileUpload.sheetNames);
  const [selectedItem, setSelectedItem] = useState<string>(sheetNames[0]);
  const valueOfItems: string[] = [];
  cummData ? valueOfItems.push(cummData) : valueOfItems.push('-');
  waterCutData ? valueOfItems.push(waterCutData) : valueOfItems.push('-');
  gorData ? valueOfItems.push(gorData) : valueOfItems.push('-');
  rateData ? valueOfItems.push(rateData) : valueOfItems.push('-');

  const handleDropDownSelect = (item: string) => {
    setSelectedItem(item);

    let xColumns: any = ['Date'];
    let primaryYColumns: any = [];
    let secondaryYColumns: any = [];

    if (item == 'Summary') {
      primaryYColumns = ['Oil production (bbls)', 'GOR (SCF/bbls)'];
      secondaryYColumns = ['BS&W', 'API'];
    }

    dispatch(fetchFieldDetails(item, fileName) as any);
    dispatch(
      fetchWellDataFromBackend(
        xColumns,
        primaryYColumns,
        [fileName],
        [item],
        secondaryYColumns
      ) as any
    );
  };

  useEffect(() => {
    // useEffect displays the first item which is the summary
    let xColumns = ['Date'];
    let primaryYColumns = ['Oil production (bbls)', 'GOR (SCF/bbls)'];
    let secondaryYColumns = ['BS&W', 'API'];
    let item = 'Summary';
    if (fileName) {
      dispatch(
        fetchWellDataFromBackend(
          xColumns,
          primaryYColumns,
          [fileName],
          [item],
          secondaryYColumns
        ) as any
      );

      dispatch(fetchFieldDetails('Summary', fileName) as any);
      dispatch(fetchProblemWellsData(fileName) as any);
    }
  }, []);

  return (
    <div style={{ display: 'block' }}>
      <div className='fieldGraphContainer'>
        {xData.length > 0 &&
        primaryYData.length > 0 &&
        secondaryYData.length > 0 ? (
          <PlotGraph
            xData={xData}
            yPrimaryData={primaryYData}
            ySecondaryData={secondaryYData}
          />
        ) : (
          <Spinner animation='border' role='status'>
            <span className='sr-only'></span>
          </Spinner>
        )}

        <div className='dropDownContainer'>
          <Dropdown title={selectedItem}>
            <Dropdown.Toggle variant='success' id='dropdown-basic'>
              {sheetNames.find((item: string) => item == selectedItem)}
            </Dropdown.Toggle>

            <Dropdown.Menu className='fieldDropDownMenu'>
              {sheetNames.map((item: string, index: Number) => (
                <Dropdown.Item
                  key={String(index)}
                  onClick={() => {
                    handleDropDownSelect(item);
                  }}
                  active={item == selectedItem}
                >
                  {item}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>

      <div className='detailTables'>
        <div style={{ width: '300px' }}>
          {cummData && waterCutData && gorData && rateData && (
            <Table striped bordered hover>
              <tbody>
                {valueOfItems.map((item, index) => (
                  <tr key={index}>
                    <td style={{ border: '1px solid black', padding: '8px' }}>
                      {index === 0 ? `Cumm (${item.split('-')[1]})` : ''}
                      {index === 1 ? `Water Cut (${item.split('-')[1]})` : ''}
                      {index === 2 ? `GOR (${item.split('-')[1]})` : ''}
                      {index === 3 ? `Oil Rate (${item.split('-')[1]})` : ''}
                    </td>
                    <td style={{ border: '1px solid black', padding: '8px' }}>
                      {item.split('-')[0]}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </div>
        <div className='problemsTableContainer'>
          <Table striped bordered hover>
            <tbody>
              {Object.keys(problemWells).map((key, index) => (
                <tr key={index}>
                  <td style={{ border: '1px solid black', padding: '8px' }}>
                    {key}
                  </td>
                  <td style={{ border: '1px solid black', padding: '8px' }}>
                    {problemWells[key]}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};
export default FieldView;
