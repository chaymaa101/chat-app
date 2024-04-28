import React from 'react';

// GenderCheckbox component handles the selection of gender using checkboxes.
const GenderCheckbox = ({ onCheckboxChange, selectedGender }) => {
  // Function to handle checkbox change.
  const handleCheckboxChange = (gender) => {
    onCheckboxChange(gender);
  };

  return (
    <div className="flex">
      {/* Checkbox for Male */}
      <div className="form-control">
        <label
          className={`label gap-2 cursor-pointer ${
            selectedGender === "male" ? "selected" : ""
          } `}
        >
          <span className="label-text text-gray-600">Male</span>
          <input
            type="checkbox"
            className="checkbox border-slate-900"
            checked={selectedGender === "male"}
            onChange={() => handleCheckboxChange("male")}
          />
        </label>
      </div>
      {/* Checkbox for Female */}
      <div className="form-control">
        <label
          className={`label gap-2 cursor-pointer ${
            selectedGender === "female" ? "selected" : ""
          }`}
        >
          <span className="label-text text-gray-600">Female</span>
          <input
            type="checkbox"
            className="checkbox border-slate-900"
            checked={selectedGender === "female"}
            onChange={() => handleCheckboxChange("female")}
          />
        </label>
      </div>
    </div>
  );
};

export default GenderCheckbox;
