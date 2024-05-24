import React from 'react';
import MenuItem from './menuItem'; // Import MenuItem component

// type MenuItemType = {
//   name: string;
//   price: string;
//   menuItems: any;
// };

type MenuProps = {
  menuItems: any;
  onItemClick: (name: string) => void;
};

const Menu: React.FC<MenuProps> = ({ menuItems, onItemClick }) => {
  return (
    <div>
      <div>
        {menuItems.map((item: any, index: any) => (
          <MenuItem
            key={index}
            name={item.name}
            price={item.price}
            onClick={onItemClick}
          />
        ))}
      </div>
    </div>
  );
};

export default Menu;
