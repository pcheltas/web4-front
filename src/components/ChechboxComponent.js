import React from 'react';

const CheckboxComponent = ({ label, checked, onChange }) => {
    const handleCheckboxChange = () => {
        onChange();
    };
    // const handleCheckboxChange = (e) => {
    //     onChange(e.target.checked, label);
    // };

    return (
        <>
            <label htmlFor={label}>{label}</label>

                <input
                    type="checkbox"
                    id={label}
                    checked={checked}
                    onChange={handleCheckboxChange}
                />

        </>
    );
};

export default CheckboxComponent;