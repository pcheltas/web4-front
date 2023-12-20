import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CheckboxComponent from './ChechboxComponent';  // Подставьте ваш путь к компоненту CheckboxComponent

const XComponent = () => {
    const dispatch = useDispatch();
    const x = useSelector(state => state.x.x_value);  // Подставьте ваш путь к значению r в состоянии
    // const x = useSelector(state => state.x);
    const handleXCheckboxChange = (key) => {
        dispatch({ type: 'CHANGE_X', payload: key });
    };
    const renderXCheckboxes = () => {
        const checkboxes = ['-4', '-3', '-2', '-1', '0', '1', '2', '3', '4'];

        return checkboxes.map((key) => (
            <CheckboxComponent
                key={key}
                label={key}
                checked={x === key}
                // onChange={e => dispatch({type: 'CHANGE_R', payload: e.target.value})}
                onChange={() => handleXCheckboxChange({x_value: key, x_valid: (key !== null && key.trim() !== '')})}
                // onChange={() => handleXCheckboxChange(key)}
            />

        ));
    };

    return (
        <div>
            <h2 className="text">X</h2>
            {renderXCheckboxes()}
        </div>
    );
};

export default XComponent;