import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import XInput from './XInput';
import YInput from './YInput';
import RInput from './RInput';
import '../css/table.css'
import axios from "axios";
import Error from "./ErrorComponent";

const FormComponent = () => {
    const dispatch = useDispatch();
    const xValue = useSelector(state => state.x);
    const yValue = useSelector(state => state.y.y);
    const rValue = useSelector(state => state.r);
    const [error, setError] = useState(null);
    const counter = useSelector(state => state.points.count)

    const addPoint = async () => {
        // console.log("sending")
        console.log(localStorage.getItem('username'))
        console.log(localStorage.getItem('token'))
        const response = await axios
            .post("http://localhost:8080/api/v1/points", new URLSearchParams(
                    {
                        x: xValue.x_value,
                        y: yValue,
                        r: rValue.r_value
                    }
                )

                , {
                    headers: {
                        'username': localStorage.getItem('username'),
                        'token': localStorage.getItem('token')
                    }
                })
            .catch((err) => {
                console.log("err from request all")
            })
        setError(null)
        console.log(response.data)
        dispatch({type: 'ADD_POINT', payload: counter + 1})

        // window.location.reload();
    }

    const showError = () => {
        return (
            <div>
                {!rValue.r_valid && <p className="error">Radius must be more than 0</p>}
                {!xValue.x_valid && <p className="error">Choose X coordinate</p>}
            </div>
        )
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log("y: " + yValue)
        if (xValue.x_valid && rValue.r_valid && yValue !== null) {
            // console.log("try to send")
            addPoint();

            // Отправка данных на сервер, например, с использованием fetch
            // try {
            //     const response = await fetch('/api/updateData', {
            //         method: 'POST',
            //         headers: {
            //             'Content-Type': 'application/json',
            //         },
            //         body: JSON.stringify({ x: xValue, y: yValue, r: rValue }),
            //     });
            //     // Обработка ответа, если необходимо
            // } catch (error) {
            //     console.error('Error:', error);
            // }
            //
            // const point = {
            //     x: xValue.x_value, y: yValue, r: rValue.r_value
            // }

            // console.log(yValue)
            // console.log(point)

            // dispatch({type: 'ADD_POINT', payload: point});

        }else {
            if (!rValue.r_valid) {
                setError("Radius must be more than 0")
            }
                if (!xValue.x_valid) {
                    setError("Choose X coordinate")
                }


        }

    };

    return (
        <form onSubmit={handleSubmit}>
            <XInput/>
            <YInput/>
            <RInput/>
            <button type="submit" className="submit-button">Submit</button>
            <div>
                <Error message = {error} />
                {/*{!rValue.r_valid && <Error{error} /> }*/}
                {/*{!xValue.r_valid && <Error{"Choose X coordinate"} /> }*/}
                {/*{!rValue.r_valid && <p className="error">Radius must be more than 0</p>}*/}
                {/*{!xValue.x_valid && <p className="error">Choose X coordinate</p>}*/}
            </div>
        </form>

    );
};

export default FormComponent;