import React from "react";
import { useNavigate, Link } from "react-router-dom";
import './styles/Filter.css';

function Filter({ name, listOfOptions, isSelected }) {
  const handleFilterClick = () => {
    //onSelect(name);
      if (isSelected) {
        
      } 
    return true;
    };

  return (
    <select
      id={`filter-${name}`}
      className={`filter-item ${isSelected ? 'filter-selected' : ''}`}
      onClick={handleFilterClick}
    >
        <option value="" disabled /*disabled*/ selected>{name}</option>
        {listOfOptions.map(filterOption => (
        <option>
          {filterOption}
        </option>
      ))}
    </select>
  );
}

export default Filter;