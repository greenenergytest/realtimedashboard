import React from 'react';

type SelectedItemProps = {
  selectedItem: string | null;
};

const SelectedItem: React.FC<SelectedItemProps> = ({ selectedItem }) => {
  return (
    <div>
      <p>
        {selectedItem
          ? `You selected: ${selectedItem}`
          : 'Please select an item'}
      </p>
    </div>
  );
};

export default SelectedItem;
