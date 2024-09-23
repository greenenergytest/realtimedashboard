import Dropdown from 'react-bootstrap/Dropdown';
import { fetchCardDetails } from '../features/cardData/cardDataSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Card from '../components/Card';
import './WellDetails.css';
import InformationTicker from '../components/InformationTicker';

interface CardData {
  chokeData: any;
  fthpData: any;
  condensateRateData: any;
  gasRateData: any;
  waterCutData: any;
  gasOilRatioData: any;
  condensateCummData: any;
  oilRateData: any;
}

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

  const [cardDetailsArray, setCardDetailsArray] = useState<any[]>([]);

  const getUnits = (key: any) => {
    if (key == 'currentOilRate') {
      return 'bopd';
    }
    if (key == 'currentFTHP') {
      return 'psig';
    }
    if (key == 'currentChoke') {
      return '1/64';
    }
    if (key == 'currentGasRate') {
      return 'mmscf/d';
    }
    if (key == 'currentWaterCut') {
      return '%';
    }
    if (key == 'currentGasOilRatio') {
      return 'scf/bbl';
    }
  };
  const handleItemClick = async (sheetName: string) => {
    const result = await dispatch(fetchCardDetails(sheetName) as any);
    console.log(result);

    if (result) {
      const fetchedDetails: string[] = [];
      Object.keys(result).forEach((key) => {
        const units = getUnits(key);
        fetchedDetails.push(`${key}: ${result[key]} ${units}`);
      });

      console.log('logging fetched details');
      console.log(fetchedDetails);
      setCardDetailsArray(fetchedDetails);
    }
  };

  useEffect(() => {
    console.log('logging sheet names');
    console.log(sheetNames);

    // const fetchData = async () => {
    //   try {
    //     const fetchedDetails: CardData[] = [];

    //     for (const sheetName of sheetNames) {
    //        //const result = await dispatch(fetchCardDetails(sheetName) as any);
    //       //fetchedDetails.push(result);
    //     }

    //     setCardDetailsArray(fetchedDetails);
    //   } catch (error) {
    //     console.error('Error fetching card details:', error);
    //   }
    // };
    // fetchData();
  });

  return (
    <div className='detailsContainer'>
      <div className='detailsDropDownMainContainer'>
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
                toolTipDescription='This describes the current tubing head pressure'
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
                toolTipDescription='This describes the current condensate rate'
              />
            </div>
            <div>
              <Card
                title='Gas Rate'
                description={gasRateData ? String(gasRateData) : '-'}
                toolTipDescription='This describes the current gas rate'
              />
            </div>
          </div>
          <div className='cardContainer'>
            <div className='cardDiv'>
              <Card
                title='Water Cut'
                // imageUrl={FlaringGas}
                description={waterCutData ? String(waterCutData) : '-'}
                toolTipDescription='This describes the current water cut'
              />
            </div>
            <div>
              <Card
                title='GOR'
                description={gasOilRatioData ? String(gasOilRatioData) : '-'}
                toolTipDescription='This describes the current gas oil ratio'
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
                toolTipDescription='This describes the current oil rate'
              />
            </div>
          </div>
        </div>
      </div>
      <div className='informationTickerContainer'>
        <InformationTicker informationItems={cardDetailsArray} />
      </div>
    </div>
  );
};
export default WellDetails;
