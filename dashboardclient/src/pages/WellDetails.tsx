import Dropdown from 'react-bootstrap/Dropdown';
import { fetchCardDetails } from '../features/cardData/cardDataSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Card from '../components/Card';
import './WellDetails.css';

const WellDetails = () => {
  const dispatch = useDispatch();
  const sheetNames = useSelector((state: any) => state.fileUpload.sheetNames);
  const {
    chokeData,
    fthpData,
    condensateRateData,
    gasRateData,
    waterCutData,
    gasOilRatioData,
    condensateCummData,
    oilRateData,
  } = useSelector((state: any) => state.cardData);

  const handleItemClick = (sheetName: string) => {
    dispatch(fetchCardDetails(sheetName) as any);
  };

  useEffect(() => {
    console.log('logging sheet names');
    console.log(sheetNames);
  });

  return (
    <div className='detailsContainer'>
      <div className='detailsDropDownContainer'>
        <Dropdown>
          <Dropdown.Toggle variant='success' id='dropdown-basic'>
            Wells
          </Dropdown.Toggle>

          <Dropdown.Menu className='detailsDropDownMenu'>
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
      <div>
        <div className='cardContainer'>
          <div className='cardDiv'>
            <Card
              title='FTHP'
              // imageUrl={FlaringGas}
              description={fthpData ? String(fthpData) : '-'}
              toolTipDescription='This describes the averge tubing head pressure'
            />
          </div>
          <div>
            <Card
              title='Choke'
              description={chokeData ? String(chokeData) : '-'}
              toolTipDescription='This describes the current choke size'
            />
          </div>
        </div>
        <div className='cardContainer'>
          <div className='cardDiv'>
            <Card
              title='Condensate Rate'
              // imageUrl={FlaringGas}
              description={
                condensateRateData ? String(condensateRateData) : '-'
              }
              toolTipDescription='This describes the averge condensate rate'
            />
          </div>
          <div>
            <Card
              title='Gas Rate'
              description={gasRateData ? String(gasRateData) : '-'}
              toolTipDescription='This describes the average gas rate'
            />
          </div>
        </div>
        <div className='cardContainer'>
          <div className='cardDiv'>
            <Card
              title='Water Cut'
              // imageUrl={FlaringGas}
              description={waterCutData ? String(waterCutData) : '-'}
              toolTipDescription='This describes the averge water cut'
            />
          </div>
          <div>
            <Card
              title='GOR'
              description={gasOilRatioData ? String(gasOilRatioData) : '-'}
              toolTipDescription='This describes the average gas oil ratio'
            />
          </div>
        </div>
        <div className='cardContainer'>
          <div className='cardDiv'>
            <Card
              title='Condesate Cumm'
              // imageUrl={FlaringGas}
              description={
                condensateCummData ? String(condensateCummData) : '-'
              }
              toolTipDescription='This describes the current condensate cummulative'
            />
          </div>
          <div>
            <Card
              title='Oil rate'
              description={oilRateData ? String(oilRateData) : '-'}
              toolTipDescription='This describes the average oil rate'
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default WellDetails;
