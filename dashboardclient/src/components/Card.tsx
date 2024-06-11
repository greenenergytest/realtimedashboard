import React from 'react';
import './Card.css';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

type CardProps = {
  title?: string;
  // imageUrl?: string;
  description?: string;
  children?: React.ReactNode;
  toolTipDescription?: string;
};
const Card: React.FC<CardProps> = ({
  title,
  description,
  toolTipDescription,
}) => {
  return (
    <div className='card'>
      <div>
        {/* <span>
          <img src={imageUrl} className='card-img-top' alt='Card' />
        </span> */}
        <span>{title}</span>
        <span>
          <OverlayTrigger
            placement='top'
            overlay={<Tooltip id='tooltip-top'>{toolTipDescription}</Tooltip>}
          >
            <span className='tooltip-icon'>ℹ️</span>
          </OverlayTrigger>
        </span>

        <p className='card-text'>{description}</p>
      </div>
    </div>
  );
};

export default Card;
