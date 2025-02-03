import React from "react";

interface CardProps {
  title: string;
  description: string;
  imageUrl: string;
  price: number;
  onClick: () => void;
}

const Card: React.FC<CardProps> = ({
  title,
  description,
  imageUrl,
  price,
  onClick,
}) => {
  return (
    <div className="card card-compact bg-base-100 shadow-xl">
      <figure>
        <img
          className="w-full h-48 object-cover rounded-t-xl"
          src={imageUrl}
          alt={title}
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-lg font-bold">{title}</h2>
        <p className="">{description}</p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-xl font-bold text-primary">${price}</span>
          <button className="btn btn-primary btn-sm" onClick={onClick}>
            Voir plus
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
