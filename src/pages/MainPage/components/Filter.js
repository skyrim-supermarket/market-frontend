import React from "react";
import { useNavigate, Link } from "react-router-dom";
import '../styles/Filter.css';

function Filter({ name, listOfOptions, isSelected }) {
  const handleFilterClick = () => {
    //onSelect(name);
    return true;
    };

  return (
    <select
      id={`filter-${name}`}
      className={`filter-item ${isSelected ? 'filter-selected' : ''}`}
      onClick={handleFilterClick}
    >
        {listOfOptions.map(filterOption => (
        <option>
          {filterOption}
        </option>
      ))}
    </select>
  );
}

export default Filter;