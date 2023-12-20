import React from 'react';
import { useDispatch, useSelector } from 'react-redux';


const YComponent = () => {
    const dispatch = useDispatch();
    const yValue = useSelector(state => state.y.value);

    const handleYInput = (e) => {
        let inputedY = parseFloat(e.target.value)
        if (!inputedY || e.target.value === null || e.target.value.trim === ""){
            e.preventDefault()
        }
        else{
            dispatch({ type: 'CHANGE_Y', payload: e.target.value });
        }
    };


    return (
            <div>
                <h2 className="text">Y</h2>
                <input type="number" min={-3} max={5} onChange={handleYInput} id="y" />
                {/*        <Input*/}
                {/*            type="number"*/}
                {/*            name="y"*/}
                {/*            value={yValue}*/}
                {/*            onChange={handleYInput}*/}
                {/*            inputProps={{ min: -5, max: 5 }}*/}
                {/*            required*/}
                {/*        />*/}

            </div>
    );
};

export default YComponent;