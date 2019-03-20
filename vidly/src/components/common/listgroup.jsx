import React from "react";

const ListGroup = ({
  items,
  currentItem,
  onItemChange,
  textProperty,
  valueProperty
}) => {
  // Generic names are used to increase the reusability of this component
  // textProperty and valueProperty are defined at the end of this component with default properties

  return (
    <ul className="list-group text-center">
      {items.map(item => (
        <button
          key={item[valueProperty]}
          className={
            item === currentItem ? "list-group-item active" : "list-group-item"
          }
          onClick={() => onItemChange(item)}
        >
          {item[textProperty]}
        </button>
      ))}
    </ul>
  );
};

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id"
};

export default ListGroup;
