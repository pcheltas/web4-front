import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CheckboxComponent from './ChechboxComponent';
import '../css/header.css'

const RComponent = () => {
    const dispatch = useDispatch();
    const rValue = useSelector(state => state.r);

    const handleRCheckboxChange = (key) => {
        dispatch({ type: 'CHANGE_R', payload: key });
    };
    const renderRCheckboxes = () => {
        const checkboxes = ['-4', '-3', '-2', '-1', '0', '1', '2', '3', '4'];

        return checkboxes.map((key) => (

                <CheckboxComponent
                    key={key}
                    label={key}
                    checked={rValue.r_value === key}
                    // onChange={e => dispatch({type: 'CHANGE_R', payload: e.target.value})}
                    onChange={() => handleRCheckboxChange({r_value: key, r_valid: (key !== null && key.trim() !== '' && key > 0)})}
                />


        ));
    };

    return (
        <div>
            <h2 className="text">R</h2>
            {renderRCheckboxes()}
        </div>
    );
};

// const RComponent = () => {
//     const dispatch = useDispatch();
//     const rValue = useSelector((state) => state.r);
//
//     const handleRCheckboxChange = (key) => {
//         dispatch({ type: 'CHANGE_R', payload: key });
//
//     };
//
//     useEffect(() => {
//         return () => {
//             const savedRValue = localStorage.getItem('selectedRValue');
//             if (savedRValue) {
//                 handleRCheckboxChange({
//                     r_value: savedRValue,
//                     r_valid: savedRValue.trim() !== '' && savedRValue > 0,
//                 });
//             }
//         }// Восстановление предыдущего выбранного значения из Local Storage при монтировании
//
//     }, []); // Пустой массив зависимостей гарантирует выполнение эффекта только при монтировании
//
//     useEffect(() => {
//         // Сохранение выбранного значения в Local Storage при изменении rValue
//         localStorage.setItem('selectedRValue', rValue.r_value);
//     }, [rValue]);
//
//     const renderRCheckboxes = () => {
//         const checkboxes = ['-4', '-3', '-2', '-1', '0', '1', '2', '3', '4'];
//
//         return checkboxes.map((key) => (
//             <CheckboxComponent
//                 key={key}
//                 label={key}
//                 checked={rValue.r_value === key}
//                 onChange={() =>
//                     handleRCheckboxChange({
//                         r_value: key,
//                         r_valid: key !== null && key.trim() !== '' && key > 0,
//                     })
//                 }
//             />
//         ));
//     };
//
//     return (
//         <div>
//             <h2 className="text">R</h2>
//             {renderRCheckboxes()}
//         </div>
//     );
// };

export default RComponent;