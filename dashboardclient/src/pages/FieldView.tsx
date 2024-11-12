// import FieldCard from '../components/FieldCard';
import { useEffect, useState, useCallback } from 'react';
// import debounce from 'lodash.debounce';
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
  // const FieldCardItems = ['Cumm', 'WC', 'GOR', 'Rate'];
  const dispatch = useDispatch();
  const { cummData, waterCutData, gorData, rateData } = useSelector(
    (state: any) => state.fieldData
  );
  // const [annotations, setAnnotations] = useState([]);
  const [spinnerVisible, showSpinnerVisibility] = useState(false);
  const { problemWells } = useSelector((state: any) => state.problemWellsData);
  const sheetNames = useSelector((state: any) => state.fileUpload.sheetNames);
  const [selectedItem, setSelectedItem] = useState<string>(sheetNames[0]);
  const [inSummary, setInSummary] = useState(true);
  // const [isHovering, setIsHovering] = useState(false);
  // const [hoverData, setHoverData] = useState<{
  //   index: number | null;
  //   explanation: string | null;
  // } | null>(null);
  const valueOfItems: string[] = [];
  const [hoverExplanation, setHoverExplanation] = useState('');
  cummData ? valueOfItems.push(cummData) : valueOfItems.push('-');
  waterCutData ? valueOfItems.push(waterCutData) : valueOfItems.push('-');
  gorData ? valueOfItems.push(gorData) : valueOfItems.push('-');
  rateData ? valueOfItems.push(rateData) : valueOfItems.push('-');

  const handleDropDownSelect = async (item: string) => {
    setSelectedItem(item);
    showSpinnerVisibility(true);
    let xColumns: any = ['Date'];
    let primaryYColumns: any = [];
    let secondaryYColumns: any = [];

    if (item == 'Summary') {
      primaryYColumns = ['Oil production (bbls)', 'GOR (SCF/bbls)'];
      secondaryYColumns = ['BS&W', 'API'];
      setInSummary(true);
    }

    if (item == '2S Daily') {
      primaryYColumns = ['Oil', 'GOR', 'FTHP'];
      secondaryYColumns = ['Water Cut', 'Choke'];
      setInSummary(false);
    }
    if (item == '2L Daily') {
      primaryYColumns = ['Oil', 'GOR', 'FTHP'];
      secondaryYColumns = ['Water Cut', 'Choke'];
      setInSummary(false);
    }

    if (item == '3S Daily') {
      primaryYColumns = ['Oil', 'GOR', 'FTHP'];
      secondaryYColumns = ['Water Cut', 'Choke'];
      setInSummary(false);
    }

    if (item == '3L Daily') {
      primaryYColumns = ['Oil', 'GOR', 'FTHP'];
      secondaryYColumns = ['Water Cut', 'Choke'];
      setInSummary(false);
    }

    if (item == '4S Daily') {
      primaryYColumns = ['Oil', 'GOR', 'FTHP'];
      secondaryYColumns = ['Water Cut', 'Choke'];
      setInSummary(false);
    }

    if (item == '4L Daily') {
      primaryYColumns = ['Oil', 'GOR', 'FTHP'];
      secondaryYColumns = ['Water Cut', 'Choke'];
      setInSummary(false);
    }

    if (item == '5S Daily') {
      primaryYColumns = ['Oil', 'GOR', 'FTHP'];
      secondaryYColumns = ['Water Cut', 'Choke'];
      setInSummary(false);
    }

    if (item == '5L Daily') {
      primaryYColumns = ['Oil', 'GOR', 'FTHP'];
      secondaryYColumns = ['Water Cut', 'Choke'];
      setInSummary(false);
    }
    dispatch(fetchFieldDetails(item, fileName) as any);

    const result = await dispatch(
      fetchWellDataFromBackend(
        xColumns,
        primaryYColumns,
        [fileName],
        [item],
        secondaryYColumns
      ) as any
    );
    if (result) {
      showSpinnerVisibility(false);
    }
  };
  const getTrendExplanation = useCallback(
    (index: number, axisType: 'primary' | 'secondary') => {
      if (index == 0) {
        return 'Starting point';
      }

      let enteredPrimaryLogic = false;

      console.log(primaryYData[index]);

      let explanation = '';

      if (axisType === 'primary') {
        console.log('in axis type primary');

        const primaryY = primaryYData[index][0];

        const prevPrimaryY = index > 0 ? primaryYData[index - 1][0] : null;
        const nextPrimaryY =
          index < primaryYData.length - 1 ? primaryYData[index + 1][0] : null;

        if (prevPrimaryY !== null && nextPrimaryY != null) {
          console.log('entered primary axis');
          enteredPrimaryLogic = true;
          if (primaryY > prevPrimaryY && primaryY > nextPrimaryY) {
            explanation +=
              'This point is a peak, showing an increase followed by a decrease';
          } else if (primaryY < prevPrimaryY && primaryY < nextPrimaryY) {
            explanation +=
              'This point is a trough, indicating a decrease followed by an increase.';
          } else if (primaryY > prevPrimaryY) {
            explanation +=
              'This point on the primary axis shows an increase from the previous point';
          } else if (primaryY < prevPrimaryY) {
            explanation +=
              'This point on the primary axis shows a decrease from the previous point.';
          }
        } else {
          explanation +=
            'No surrounding data for comparison on the primary axis';
        }
      } else if (axisType === 'secondary') {
        const secondaryY = secondaryYData[index][1];
        const prevSecondaryY = index > 0 ? secondaryYData[index - 1][1] : null;
        const nextSecondaryY =
          index < secondaryYData.length - 1
            ? secondaryYData[index + 1][1]
            : null;

        console.log('this method is called');
        console.log('previous secondary');
        console.log(prevSecondaryY);

        console.log('next secondary data');
        console.log(nextSecondaryY);

        console.log('current secondary y');
        console.log(secondaryY);
        if (!enteredPrimaryLogic) {
          if (prevSecondaryY !== null && nextSecondaryY != null) {
            if (secondaryY > prevSecondaryY && secondaryY > nextSecondaryY) {
              console.log('entered secondary axis');
              explanation +=
                'This point on the secondary axis is a peak, showing an increase followed by a decrease ';
            } else if (
              secondaryY < prevSecondaryY &&
              secondaryY < nextSecondaryY
            ) {
              explanation +=
                'This point on the secondary axis is a trough, indicating a decrease followed by an increase';
            } else if (secondaryY > prevSecondaryY) {
              explanation +=
                'Secondary Y shows an increase from the previous point.';
            } else {
              explanation +=
                'Secondary y shows a decrease from the previous point';
            }
          } else {
            explanation += 'No surrounding data for secondary y comparison';
          }
        }
      }
      console.log(explanation);
      return explanation;
    },
    [primaryYData, secondaryYData]
  );

  // const debouncedHandleHover = useCallback(
  //   debounce((index: number, axisType: 'primary' | 'secondary') => {
  //     if (index !== undefined) {
  //       console.log('setting hovering to true');
  //       setIsHovering(true);
  //       const explanation = getTrendExplanation(index, axisType);
  //       console.log('explanation');
  //       console.log(explanation);
  //       setHoverExplanation(explanation);
  //     }
  //   }, 100),
  //   [getTrendExplanation]
  // );

  const handleHover = (
    index: number,
    axisType: 'primary' | 'secondary'
    // datasetId: any
  ) => {
    // debouncedHandleHover(index, axisType);
    if (index !== undefined) {
      console.log('setting hovering to true');
      // setIsHovering(true);
      const explanation = getTrendExplanation(index, axisType);
      console.log('explanation');
      console.log(explanation);
      setHoverExplanation(explanation);
    }
  };

  const handleMouseLeave = () => {
    // setIsHovering(false);
  };

  useEffect(() => {
    // useEffect displays the first item which is the summary
    let xColumns = ['Date'];
    let primaryYColumns = ['Oil production (bbls)', 'GOR (SCF/bbls)'];
    let secondaryYColumns = ['BS&W', 'API'];
    let item = 'Summary';
    // let result: any = '';
    // const newAnnotations: any = [];

    const fetchData = async () => {
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

        // if (result.yPrimaryData) {
        //   for (let i = 1; i < result.yPrimaryData.length; i++) {
        //     if (result.yPrimaryData[i] < result.yPrimaryData[i - 1]) {
        //       newAnnotations.push({
        //         x: xData[i],
        //         y: result.yPrimaryData[i],
        //         xref: 'x',
        //         yref: 'y',
        //         text: 'Decline detected here',
        //         showarrow: true,
        //         arrowhead: 2,
        //         ax: -30,
        //         ay: -40,
        //       });
        //     }
        //   }

        //   setAnnotations(newAnnotations);
        // }

        dispatch(fetchFieldDetails('Summary', fileName) as any);
        dispatch(fetchProblemWellsData(fileName) as any);
      }
    };
    fetchData();
  }, [fileName, dispatch]);

  return (
    <div style={{ display: 'block' }}>
      <div className='fieldGraphContainer'>
        {!spinnerVisible ? (
          <>
            <PlotGraph
              xData={xData}
              yPrimaryData={primaryYData}
              ySecondaryData={secondaryYData}
              //getTrendExplanation={isHovering ? getTrendExplanation : null}
              onHover={handleHover}
              onMouseLeave={handleMouseLeave}
              hoverBoxExplanation={hoverExplanation}
            />
          </>
        ) : (
          <>
            {fileName && (
              <Spinner animation='border' role='status'>
                <span className='sr-only'></span>
              </Spinner>
            )}
          </>
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
          {inSummary && (
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
          )}
        </div>
      </div>
    </div>
  );
};
export default FieldView;
