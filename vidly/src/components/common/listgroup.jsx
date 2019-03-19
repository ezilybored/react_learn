import React from "react";

const ListGroup = props => {
  // Generic names are used to increase the reusability of this component
  // textProperty and valueProperty are defined at the end of this component with default properties
  const {
    items,
    currentItem,
    onItemChange,
    textProperty,
    valueProperty
  } = props;

  return (
    <ul className="list-group ">
      {items.map(item => (
        <a
          key={item[valueProperty]}
          className={
            item === currentItem ? "list-group-item active" : "list-group-item"
          }
          onClick={() => onItemChange(item)}
        >
          {item[textProperty]}
        </a>
      ))}
    </ul>
  );
};

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id"
};

export default ListGroup;
