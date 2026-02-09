import { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFieldDetails } from '../features/FieldData/FieldDataSlice';
import { fetchWellDataFromBackend } from '../features/wellGraph/wellGraphPlotSlice';
import { fetchProblemWellsData } from '../features/problemWells/problemWellsSlice';
import Dropdown from 'react-bootstrap/Dropdown';
import { Table } from 'react-bootstrap';
import './FieldView.css';
import PlotGraph from '../components/PlotGraph';
import { Spinner } from 'react-bootstrap';

interface FileUploadState {
  fileName: string;
  fileSize: number;
  storedFileName: string;
}
interface wellGraphDataState {
  primaryYData: [];
  secondaryYData: [];
  xData: number[];
}
interface xDataState {
  xData: number[];
  yData: number[];
}
interface sheetNamesState {
  sheetNames: string[];
}

interface problemWellState {
  [key: string]: string;
}

interface fieldDataState {
  cummData: string;
  waterCutData: string;
  gorData: string;
  rateData: string;
}

interface sheetNamesRootState {
  fileUpload: sheetNamesState;
}
interface FileUploadRootState {
  fileUpload: FileUploadState;
}
interface wellGraphDataRootState {
  wellGraphData: wellGraphDataState;
}
interface xDataRootState {
  wellGraphData: xDataState;
}
interface fieldDataRootState {
  fieldData: fieldDataState;
}
interface problemWellsRootState {
  problemWellsData: problemWellState;
}

//const dispatch = useDispatch<AppDispatch>();

const FieldView = () => {
  const { storedFileName } = useSelector(
    (state: FileUploadRootState) => state.fileUpload,
  );

  const { fileName } = useSelector(
    (state: FileUploadRootState) => state.fileUpload,
  );
  const xData = useSelector(
    (state: xDataRootState) => state.wellGraphData.xData,
  );
  const primaryYData = useSelector(
    (state: wellGraphDataRootState) => state.wellGraphData.primaryYData,
  );

  const secondaryYData = useSelector(
    (state: wellGraphDataRootState) => state.wellGraphData.secondaryYData,
  );

  const dispatch = useDispatch();

  const { cummData, waterCutData, gorData, rateData } = useSelector(
    (state: fieldDataRootState) => state.fieldData,
  );
  const [spinnerVisible, showSpinnerVisibility] = useState(false);

  const { problemWells } = useSelector(
    (state: problemWellsRootState) => state.problemWellsData,
  );
  let sheetNames = useSelector(
    (state: sheetNamesRootState) => state.fileUpload.sheetNames,
  );

  const isProductionSummaryFile = (fileName: string) =>
    fileName.includes('Production_Summary');

  if (!fileName || !isProductionSummaryFile(fileName)) {
    return (
      <div style={{ padding: '20px', color: '#666' }}>
        Please upload a <strong>Production Summary</strong> file
      </div>
    );
  }
  // sheetNames = ['sheet1'];
  const [selectedItem, setSelectedItem] = useState<string>(sheetNames[0]);
  const [inSummary, setInSummary] = useState(true);

  const valueOfItems: string[] = [];

  const [hoverExplanation, setHoverExplanation] = useState('');
  cummData ? valueOfItems.push(cummData) : valueOfItems.push('-');
  waterCutData ? valueOfItems.push(waterCutData) : valueOfItems.push('-');
  gorData ? valueOfItems.push(gorData) : valueOfItems.push('-');
  rateData ? valueOfItems.push(rateData) : valueOfItems.push('-');

  const handleDropDownSelect = async (item: string) => {
    setSelectedItem(item);
    showSpinnerVisibility(true);
    let xColumns: string[] = ['Date'];
    let primaryYColumns: Array<String> = [];
    let secondaryYColumns: Array<String> = [];

    if (item == 'Summary') {
      primaryYColumns = ['Oil production (bbls)', 'GOR (SCF/bbls)'];
      secondaryYColumns = ['BS&W'];
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

    //TODO: uncomment this when fixing the drop down
    dispatch(fetchFieldDetails(item, fileName, storedFileName) as any);

    console.log('in drop down');
    console.log(storedFileName);
    const result = await dispatch(
      fetchWellDataFromBackend(
        xColumns,
        primaryYColumns,
        [fileName],
        [item],
        secondaryYColumns,
        storedFileName,
      ) as any,
    );
    if (result) {
      showSpinnerVisibility(false);
    }
  };
  const getTrendExplanation = useCallback(
    (index: number, axisType: 'primary' | 'secondary', traceIndex: number) => {
      if (index == 0) {
        return 'Starting point';
      }

      let enteredPrimaryLogic = false;

      let explanation = '';

      if (axisType === 'primary') {
        const primaryY = primaryYData[index][0];
        const prevPrimaryY = index > 0 ? primaryYData[index - 1][0] : null;
        const nextPrimaryY =
          index < primaryYData.length - 1 ? primaryYData[index + 1][0] : null;

        if (prevPrimaryY !== null && nextPrimaryY != null) {
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
        const secondaryY = secondaryYData[index][traceIndex];
        const prevSecondaryY =
          index > 0 ? secondaryYData[index - 1][traceIndex] : null;
        const nextSecondaryY =
          index < secondaryYData.length - 1
            ? secondaryYData[index + 1][traceIndex]
            : null;

        if (!enteredPrimaryLogic) {
          if (prevSecondaryY !== null && nextSecondaryY != null) {
            if (secondaryY > prevSecondaryY && secondaryY > nextSecondaryY) {
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
      return explanation;
    },
    [primaryYData, secondaryYData],
  );

  const handleHover = (
    index: number,
    axisType: 'primary' | 'secondary',
    traceIndex: number,
  ) => {
    if (index !== undefined) {
      const explanation = getTrendExplanation(index, axisType, traceIndex);
      setHoverExplanation(explanation);
    }
  };

  const handleMouseLeave = () => {};

  useEffect(() => {
    const searchString = 'AGEL';
    let xColumns = [];
    let primaryYColumns = [];
    let secondaryYColumns: Array<String> = [];
    let item = '';

    // useEffect displays the first item which is the summary'
    if (fileName.includes(searchString)) {
      xColumns = ['Date'];
      primaryYColumns = ['Oil production (bbls)'];
      secondaryYColumns = ['Water production (bbls)'];
      item = 'Summary';
    } else {
      xColumns = ['Date'];
      primaryYColumns = ['Oil production (bbls)', 'GOR (SCF/bbls)'];
      secondaryYColumns = ['BS&W'];
      item = 'Summary';
    }

    const fetchData = async () => {
      if (fileName) {
        //await dispatch(
        // fetchWellDataFromBackend(
        //   xColumns,
        //   primaryYColumns,
        //   [fileName],
        //   [item],
        //   secondaryYColumns
        // ) as any
        // );

        await dispatch(
          fetchWellDataFromBackend(
            xColumns,
            primaryYColumns,
            [fileName],
            [item],
            secondaryYColumns,
            storedFileName,
          ) as any,
        );

        dispatch(fetchFieldDetails('Summary', fileName, storedFileName) as any);
        dispatch(fetchProblemWellsData(fileName, storedFileName) as any);
      }
    };
    fetchData();
  }, []);

  function getFieldData(value: string) {
    let stringValue: string = value.toString();
    let newString = stringValue.split('.')[0];

    let stringToGetCharFrom = stringValue.split('.')[0];
    let afterTheDotString = stringValue.split('.')[1];

    if (stringToGetCharFrom.length == 8) {
      newString =
        stringToGetCharFrom.charAt(0) +
        stringToGetCharFrom.charAt(1) +
        ',' +
        stringToGetCharFrom.charAt(2) +
        stringToGetCharFrom.charAt(3) +
        stringToGetCharFrom.charAt(4) +
        ',' +
        stringToGetCharFrom.charAt(5) +
        stringToGetCharFrom.charAt(6) +
        stringToGetCharFrom.charAt(7);
    } else if (stringToGetCharFrom.length == 7) {
      newString =
        stringToGetCharFrom.charAt(0) +
        '' +
        ',' +
        stringToGetCharFrom.charAt(1) +
        '';
      stringToGetCharFrom.charAt(2) + '';
      stringToGetCharFrom.charAt(3) + '' + ',';
      stringToGetCharFrom.charAt(4) + '';
      stringToGetCharFrom.charAt(5) + '';
      stringToGetCharFrom.charAt(6);
    } else if (stringToGetCharFrom.length == 6) {
      newString =
        stringToGetCharFrom.charAt(0) +
        stringToGetCharFrom.charAt(1) +
        ',' +
        stringToGetCharFrom.charAt(2) +
        stringToGetCharFrom.charAt(3) +
        stringToGetCharFrom.charAt(4) +
        stringToGetCharFrom.charAt(5);
    } else if (stringToGetCharFrom.length == 5) {
      newString =
        stringToGetCharFrom.charAt(0) +
        stringToGetCharFrom.charAt(1) +
        ',' +
        stringToGetCharFrom.charAt(2) +
        stringToGetCharFrom.charAt(3) +
        stringToGetCharFrom.charAt(4);
    } else if (stringToGetCharFrom.length == 4) {
      newString =
        stringToGetCharFrom.charAt(0) +
        ',' +
        stringToGetCharFrom.charAt(1) +
        stringToGetCharFrom.charAt(2) +
        stringToGetCharFrom.charAt(3);
    }

    let finalString = '';
    afterTheDotString = afterTheDotString == undefined ? '' : afterTheDotString;
    finalString =
      afterTheDotString == '' ? newString : newString + '.' + afterTheDotString;

    return finalString;
  }

  return (
    <>
      <div style={{ display: 'block' }}>
        <div className='fieldGraphContainer'>
          {!spinnerVisible ? (
            <>
              <PlotGraph
                xData={xData}
                yPrimaryData={primaryYData}
                ySecondaryData={secondaryYData}
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
                        {/* {item.split('-')[0]} */}
                        {getFieldData(item.split('-')[0])}
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
                  {Object.keys(problemWells).map((key: any, index) => (
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
    </>
  );
};
export default FieldView;

// import { useEffect, useState, useCallback } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import Dropdown from 'react-bootstrap/Dropdown';
// import { Table, Spinner } from 'react-bootstrap';
// import PlotGraph from '../components/PlotGraph';
// import { fetchFieldDetails } from '../features/FieldData/FieldDataSlice';
// import { fetchWellDataFromBackend } from '../features/wellGraph/wellGraphPlotSlice';
// import { fetchProblemWellsData } from '../features/problemWells/problemWellsSlice';
// import './FieldView.css';

// /* ===================== HELPERS ===================== */
// const isProductionSummaryFile = (fileName: string) =>
//   fileName.includes('Production_Summary');

// const removeUUID = (fileName: string) =>
//   fileName.replace(/^[a-f0-9-]{36}-/i, '');

// /* ===================== TYPES ===================== */
// interface RootState {
//   fileUpload: {
//     fileName: string;
//     storedFileName: string;
//     sheetNames: string[];
//   };
//   wellGraphData: {
//     xData: number[];
//     primaryYData: number[][];
//     secondaryYData: number[][];
//   };
//   fieldData: {
//     cummData: string;
//     waterCutData: string;
//     gorData: string;
//     rateData: string;
//   };
//   problemWellsData: {
//     problemWells: Record<string, string>;
//   };
// }

// /* ===================== COMPONENT ===================== */
// const FieldView = () => {
//   const dispatch = useDispatch<any>();

//   const { fileName, storedFileName, sheetNames } = useSelector(
//     (state: RootState) => state.fileUpload,
//   );

//   /* 🚫 HARD BLOCK NON-PRODUCTION FILES */
//   if (!fileName || !isProductionSummaryFile(fileName)) {
//     return (
//       <div style={{ padding: '20px', color: '#666' }}>
//         Please upload a <strong>Production Summary</strong> file
//       </div>
//     );
//   }

//   const { xData, primaryYData, secondaryYData } = useSelector(
//     (state: RootState) => state.wellGraphData,
//   );

//   const { cummData, waterCutData, gorData, rateData } = useSelector(
//     (state: RootState) => state.fieldData,
//   );

//   const { problemWells } = useSelector(
//     (state: RootState) => state.problemWellsData,
//   );

//   const [selectedItem, setSelectedItem] = useState('Summary');
//   const [spinnerVisible, setSpinnerVisible] = useState(false);
//   const [hoverExplanation, setHoverExplanation] = useState('');
//   const [inSummary, setInSummary] = useState(true);

//   /* ===================== DROPDOWN ===================== */
//   const handleDropDownSelect = async (item: string) => {
//     setSelectedItem(item);
//     setSpinnerVisible(true);

//     const xColumns = ['Date'];
//     let primaryY: string[] = [];
//     let secondaryY: string[] = [];

//     if (item === 'Summary') {
//       primaryY = ['Oil production (bbls)', 'GOR (SCF/bbls)'];
//       secondaryY = ['BS&W'];
//       setInSummary(true);
//     } else {
//       primaryY = ['Oil', 'GOR', 'FTHP'];
//       secondaryY = ['Water Cut', 'Choke'];
//       setInSummary(false);
//     }

//     await dispatch(
//       fetchWellDataFromBackend(
//         xColumns,
//         primaryY,
//         [fileName],
//         [item],
//         secondaryY,
//         storedFileName,
//       ),
//     );

//     dispatch(fetchFieldDetails(item, fileName, storedFileName));
//     setSpinnerVisible(false);
//   };

//   /* ===================== GRAPH HOVER ===================== */
//   const getTrendExplanation = useCallback(
//     (i: number, axis: 'primary' | 'secondary', trace: number) => {
//       if (i === 0) return 'Starting point';

//       const current =
//         axis === 'primary' ? primaryYData[i]?.[0] : secondaryYData[i]?.[trace];

//       const previous =
//         axis === 'primary'
//           ? primaryYData[i - 1]?.[0]
//           : secondaryYData[i - 1]?.[trace];

//       if (current == null || previous == null) {
//         return 'No comparison data';
//       }

//       return current > previous ? 'Increasing trend' : 'Decreasing trend';
//     },
//     [primaryYData, secondaryYData],
//   );

//   /* ===================== INITIAL LOAD ===================== */
//   useEffect(() => {
//     dispatch(
//       fetchWellDataFromBackend(
//         ['Date'],
//         ['Oil production (bbls)', 'GOR (SCF/bbls)'],
//         [fileName],
//         ['Summary'],
//         ['BS&W'],
//         storedFileName,
//       ),
//     );

//     dispatch(fetchFieldDetails('Summary', fileName, storedFileName));
//     dispatch(fetchProblemWellsData(fileName, storedFileName));
//   }, [dispatch, fileName, storedFileName]);

//   /* ===================== RENDER ===================== */
//   return (
//     <div>
//       <h6 style={{ marginBottom: '10px' }}>{removeUUID(fileName)}</h6>

//       <div className='fieldGraphContainer'>
//         {spinnerVisible ? (
//           <Spinner animation='border' />
//         ) : (
//           <PlotGraph
//             xData={xData}
//             yPrimaryData={primaryYData}
//             ySecondaryData={secondaryYData}
//             onHover={(i: number, a: 'primary' | 'secondary', t: number) =>
//               setHoverExplanation(getTrendExplanation(i, a, t))
//             }
//             onMouseLeave={() => setHoverExplanation('')}
//             hoverBoxExplanation={hoverExplanation}
//           />
//         )}

//         <Dropdown>
//           <Dropdown.Toggle variant='success'>{selectedItem}</Dropdown.Toggle>

//           <Dropdown.Menu>
//             {sheetNames.map((item) => (
//               <Dropdown.Item
//                 key={item}
//                 active={item === selectedItem}
//                 onClick={() => handleDropDownSelect(item)}
//               >
//                 {item}
//               </Dropdown.Item>
//             ))}
//           </Dropdown.Menu>
//         </Dropdown>
//       </div>

//       <Table striped bordered>
//         <tbody>
//           {[cummData, waterCutData, gorData, rateData].map(
//             (item, index) =>
//               item && (
//                 <tr key={index}>
//                   <td>{item.split('-')[1]}</td>
//                   <td>{item.split('-')[0]}</td>
//                 </tr>
//               ),
//           )}
//         </tbody>
//       </Table>

//       {inSummary && (
//         <Table striped bordered>
//           <tbody>
//             {Object.entries(problemWells).map(([key, value]) => (
//               <tr key={key}>
//                 <td>{key}</td>
//                 <td>{value}</td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//       )}
//     </div>
//   );
// };

// export default FieldView;
