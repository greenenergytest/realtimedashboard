import './VerticalHeader.css';
//import { useState } from 'react';

const VerticalHeaders = () => {
  const menuItems = [
    { category: 'well', wellName: 'well1', link: 'well1' },
    { category: 'well', wellName: 'well2', link: 'well2' },
    { category: 'well', wellName: 'well3', link: 'well3' },
    { category: 'well', wellName: 'well4', link: 'well4' },
    { category: 'well', wellName: 'well5', link: 'well5' },
    { category: 'well', wellName: 'well6', link: 'well6' },
    { category: 'well', wellName: 'well7', link: 'well7' },
    { category: 'well', wellName: 'well8', link: 'well8' },
    { category: 'well', wellName: 'well9', link: 'well9' },
    { category: 'well', wellName: 'well10', link: 'well10' },
    { category: 'well', wellName: 'well1', link: 'well11' },
    { category: 'well', wellName: 'well2', link: 'well12' },
    { category: 'well', wellName: 'well13', link: 'well13' },
    { category: 'well', wellName: 'well4', link: 'well14' },
    { category: 'well', wellName: 'well15', link: 'well15' },
    { category: 'well', wellName: 'well16', link: 'well16' },
    { category: 'well', wellName: 'well17', link: 'well17' },
    { category: 'well', wellName: 'well18', link: 'well18' },
    { category: 'well', wellName: 'well19', link: 'well19' },
    { category: 'well', wellName: 'well20', link: 'well20' },
    { category: 'well', wellName: 'well21', link: 'well21' },
    { category: 'well', wellName: 'well22', link: 'well22' },
    { category: 'well', wellName: 'well23', link: 'well23' },
  ];

  const handleClick = (e: any) => {
    e.preventDefault();
  };

  return (
    <div className='verticalHeader'>
      {menuItems.map((menuItem, index) => (
        <div key={index} onClick={handleClick}>
          {/* <h2>{menuItem.category}</h2> */}
          <a href={menuItem.wellName} className=''>
            <span>{menuItem.link}</span>
          </a>
        </div>
      ))}
      <div>test</div>
    </div>
  );
};

export default VerticalHeaders;
