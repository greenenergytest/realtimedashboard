import PlotGraph from '../components/PlotGraph';
import { useSelector } from 'react-redux';
import Dropdown from 'react-bootstrap/Dropdown';
import './Graph.css';

const Graph = () => {
  const xData = useSelector((state: any) => state.graphData.xData);
  const yData = useSelector((state: any) => state.graphData.yData);
  const sheetNames = useSelector((state: any) => state.graphData.sheetNames);
  // Flatten yData
  const flattenYData = yData.map((item: any) => item[0]);
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
                //   onClick={() => handleItemClick(item)}
              >
                {item}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div>
        {xData &&
          flattenYData &&
          xData.length > 0 &&
          flattenYData.length > 0 && (
            <PlotGraph xData={xData} yData={flattenYData} />
          )}
      </div>
    </div>
  );
};
export default Graph;
