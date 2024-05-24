// import Greenenergyicon from '../assets/Greenenergyicon.png';
// import Greenicon from '../assets/Greenenergyicon.png';
// import icon from '../assets/Greenenergyicon.png';
import React from 'react';

type MenuItemProps = {
  name: string;
  price: string;
  onClick: (name: string) => void;
  // menuItems: any;
};

const MenuItem: React.FC<MenuItemProps> = ({
  // menuItems,
  name,
  price,
  onClick,
}) => {
  return (
    <div
      onClick={() => onClick(name)}
      style={{ cursor: 'pointer', marginBottom: '10px' }}
    >
      <span>{name}</span>
      <span style={{ marginLeft: '10px' }}>{price}</span>
    </div>
  );
};

export default MenuItem;
