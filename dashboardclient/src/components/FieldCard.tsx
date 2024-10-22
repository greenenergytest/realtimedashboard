import './FieldCard.css';

interface FieldCardProps {
  items: string[];
  valueOfItems?: string[];
}

const FieldCard: React.FC<FieldCardProps> = ({ items, valueOfItems }) => {
  return (
    <div className='field-card-container'>
      {items.map((item: string, index: number) => (
        <div key={index}>
          <span className='field-card-text'>{item}</span>
          <span className='value-text'>
            {valueOfItems && valueOfItems[index] !== undefined
              ? valueOfItems[index]
              : 'N/A'}
          </span>
        </div>
      ))}
    </div>
  );
};
export default FieldCard;
