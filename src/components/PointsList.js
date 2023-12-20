import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import '../css/table.css';
import axios from "axios";


const PointsListingComponent = () => {
    const points = useSelector((state) => state.points.points);
    const counter = useSelector((state) => state.points.count)
    const dispatch = useDispatch();
    // const dispatch = useDispatch();

    const fetchPoints = async () => {
        const response = await axios
            .get("http://localhost:8080/api/v1/points", {
                headers: {
                    'username': localStorage.getItem('username'),
                    'token': localStorage.getItem('token')
                }
            }).then(data => {
                dispatch({ type: 'GET_ALL', payload: data.data })
            })
            .catch((err) => {
                console.log("err from request all")
            })
        // console.log(response.data)
        // dispatch({ type: 'GET_ALL', payload: response.data })
    }

    useEffect(() => {
        fetchPoints();
        console.log("sliivnjgaefnb")
        }, [counter])

    // useEffect(() => {
    //     // fetchPoints();
    //     // console.log("sliivnjgaefnb")
    //     dispatch({ type: 'GET_ALL'})
    //     }, )

    // console.log("sdv")
    // console.log(points)
    // console.log(Array.isArray(points).toString())
    // console.log(JSON.parse(points).toString())
    // console.log("kwuvnol")

    return (
        <div>
            <table className="table resultTable">
                <thead>
                <tr>
                    <th>x</th>
                    <th>y</th>
                    <th>r</th>
                    <th>Current Time</th>
                    <th>Execution</th>
                    <th>Hit</th>
                </tr>
                </thead>


                <tbody>
                {
                    points.map((point) =>
                        <tr key = {point.id}>
                            <td> {point.x}</td>
                            <td> {point.y}</td>
                            <td> {point.r}</td>
                            <td> {point.nowTime}</td>
                            <td> {point.executionTime}</td>
                            <td> {point.hit ? "hit" : "miss"}</td>
                        </tr>

                    )
                }
                </tbody>

            </table>
        </div>
    )
};


export default PointsListingComponent;