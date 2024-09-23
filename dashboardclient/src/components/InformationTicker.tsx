import React from 'react';
import './InformationTicker.css';

interface InformationTickerProps {
  informationItems: string[];
}

const InformationTicker: React.FC<InformationTickerProps> = ({
  informationItems,
}) => {
  return (
    <div className='information-ticker-container'>
      <div className='information-ticker'>
        {informationItems.map((item: any, index: any) => (
          <span key={index} className='information-item'>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};
export default InformationTicker;
