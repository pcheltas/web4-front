// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { addPoint } from './actions';



import {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import Error from "./ErrorComponent";
// import {getTry, homeSelector, sendTry} from "../store/slices/HomeSlice.jsx";
// import "../styles/Home.css"

const CanvasGraph = () => {
    const dispatch = useDispatch();
    const canvasRef = useRef(null);
    // const state = useSelector((state) => state);
    const points = useSelector((state) => state.points.points);
    const r = useSelector((state) => state.r)
    const [formData, setFormData] = useState({
        x: '',
        y: '',
        r: '',
        // token: localStorage.getItem('token')
    });
    const [error, setError] = useState(null);

    // console.log("AAAAAAAAAAAAAAA" + points)
    // console.log(state)


    useEffect(() => {
        console.log("useEffect in graph")
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
            drawG(r,ctx, canvas);
            for (let i = 0; i < points.length; i++) {
                const currentData = points[i];
                // console.log(currentData)
                const x = parseFloat(currentData.x);
                const y = parseFloat(currentData.y);
                const isHit = currentData.hit;
                // console.log(x, y, r, isHit)
                if (r.r_valid) {
                    drawPoint(x, y, r, ctx);
                }
                // else {
                //     drawPoint(x, y, {r_value: 4, r_valid: true}, ctx);
                // }
        }
    // }, [r, points, drawG]);
    });

    function drawPoint(xInp, yInp, r, ctx) {
        // console.log("drawing points")
        const scale = 300 / 2;
        // console.log("Input: " + xInp + yInp )
        const x = scale / r.r_value * xInp + scale + 50;
        const y = 300 - (scale / r.r_value * yInp + scale - 50);
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, 2 * Math.PI);
        // console.log(validate(x, y, parseFloat(r.r_value)))
        if (validate(xInp, yInp, parseFloat(r.r_value))) {
            ctx.fillStyle = '#58c721';
        }else{
            ctx.fillStyle = '#c72121';
        }
        ctx.fill();
    }

    const addPoint = async (formdata) => {
        const response = await axios
            .post("http://localhost:8080/api/v1/points", new URLSearchParams(
                    // {
                    //     x: xValue.x_value,
                    //     y: yValue,
                    //     r: rValue.r_value
                    // }
                    formdata
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
        console.log(response.data)
        dispatch({type: 'ADD_POINT'})
        // window.location.reload()
    }

    const handleCanvasClick = (event) => {
        const canvas = canvasRef.current;

        const xCanv = event.clientX - canvas.getBoundingClientRect().left;
        const yCanv = event.clientY - canvas.getBoundingClientRect().top;

        if (r.r_valid){
            // namePoints(r.value);
            // hideError();
            const usersX = (xCanv - 200) * r.r_value / 150;
            const usersY = (200 - yCanv) * r.r_value / 150;

            formData.x = usersX;
            formData.y = usersY;
            formData.r = r.r_value;
            // dispatch(sendTry(formData)).then(() => {
            //     dispatch(getTry())

            addPoint(formData);
            setError(null)

        }else{
            setError("Radius must be more than 0")
        }
    };

    const handleResize = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
            drawG(r,ctx, canvas);
            for (let i = 0; i < points.length; i++) {
                const currentData = points[i];
                const x = parseFloat(currentData.x.x_value); // Преобразование строки в число
                const y = parseFloat(currentData.y); // Преобразование строки в число
                drawPoint(x, y, currentData.hit, ctx)
                // if(r==r1){
                //     if(window.innerWidth<550){
                //         drawPoint(
                //             x * 14 + 110,
                //             (-y * 14 + 110),
                //             x,
                //             y, ctx, canvas
                //         );
                //     }else{
                //         drawPoint(
                //             x * 40 + 250,
                //             (-y * 40 + 250),
                //             x,
                //             y, ctx, canvas
                //         );
                //     }
                // }


        }

    };

    // window.addEventListener('resize', handleResize);


    function drawG(r, ctx, canvas){
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        canvas.width = 400;
        canvas.height = 400;
        // let radiusSpec = 200*r/5;
        let radius = 150;

        // if(window.innerWidth<550){
        //     canvas.width = 220;
        //     canvas.height = 220;
        //     radiusSpec = 80*r/5;
        //     radius = 70;
        // }

        const centerX = (canvas.width) / 2;
        const centerY = canvas.height / 2;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const pointRadius = 3;

        ctx.strokeStyle = "#ffffff"; // Цвет линии
        ctx.lineWidth = 2; // Толщина линии
        ctx.fillStyle = "#ffffff";
        ctx.font = "14px monospace";

        // x axis
        ctx.beginPath();
        ctx.moveTo(0, centerY);
        ctx.lineTo(canvas.width, centerY);
        ctx.stroke();


        // x arrow
        ctx.beginPath();
        ctx.moveTo(canvas.width - 8, centerY - 5);
        ctx.lineTo(canvas.width, centerY);
        ctx.lineTo(canvas.width - 8, centerY + 5);
        ctx.fill();

        // sign x axis
        ctx.fillText("X", canvas.width - 10, centerY + 20);


        // y axis
        ctx.beginPath();
        ctx.moveTo(centerX, 0);
        ctx.lineTo(centerX, canvas.height);
        ctx.stroke();

        // y arrow
        ctx.beginPath();
        ctx.moveTo(centerX - 5, 10);
        ctx.lineTo(centerX, 0);
        ctx.lineTo(centerX + 5, 10);
        ctx.fill();

        // sign y axis
        ctx.fillText("Y", centerX - 20, 20);

        ctx.fillStyle = 'pink';
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1;

        // circle
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, 0, Math.PI /2);
        ctx.fill();
        ctx.stroke();


        // triangle
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(centerX, centerY - radius / 2);
        ctx.lineTo(centerX + radius / 2, centerY);
        ctx.fill();
        ctx.stroke();

        // square
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(centerX, centerY + radius);
        ctx.lineTo(centerX - radius, centerY + radius);
        ctx.lineTo(centerX - radius, centerY);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();


        // divisions on axes
        ctx.beginPath();
        ctx.arc(centerX + radius, centerY, pointRadius, 0, 2 * Math.PI);
        ctx.arc(centerX + radius / 2, centerY, pointRadius, 0, 2 * Math.PI);
        ctx.arc(centerX - radius, centerY, pointRadius, 0, 2 * Math.PI);
        ctx.arc(centerX - radius / 2, centerY, pointRadius, 0, 2 * Math.PI);
        ctx.fillStyle = '#ffffff';
        ctx.fill();

        ctx.beginPath();
        ctx.arc(centerX, centerY + radius, pointRadius, 0, 2 * Math.PI);
        ctx.arc(centerX, centerY + radius / 2, pointRadius, 0, 2 * Math.PI);
        ctx.arc(centerX, centerY - radius, pointRadius, 0, 2 * Math.PI);
        ctx.arc(centerX, centerY - radius / 2, pointRadius, 0, 2 * Math.PI);
        ctx.fillStyle = '#ffffff';
        ctx.fill();

        if (r.r_valid) {
            namePoints(r, ctx, centerX, centerY, radius)
        }
        else{
            namePoints({r_value: 4, r_valid: true}, ctx, centerX, centerY, radius)
        }

    }

    function namePoints(r, ctx, centerX, centerY, radius) {
        ctx.fillStyle = "#ffffff";
        ctx.font = "14px monospace";
        let rad = r.r_value

        ctx.fillText(rad / 2, centerX + radius / 2, centerY + 20);
        ctx.fillText(-rad, centerX - radius + 5, centerY + 20);
        ctx.fillText(-rad / 2, centerX - radius / 2 - 5, centerY + 20);
        ctx.fillText(-rad, centerX + 10, centerY + radius);
        ctx.fillText(-rad / 2, centerX + 10, centerY / 2 + radius + 25);
        ctx.fillText(rad / 2, centerX + 10, centerY - radius / 2 - 5);
        ctx.fillText(rad / 1, centerX + radius, centerY + 20);
        ctx.fillText(rad / 1, centerX + 10, centerY - radius);
    }

    function validate(x, y, r){

        if(r===0){
            return false;
        }
        // return ((x >= 0 && y >= 0) && (y >= -x + r/2)) ||
        //     ((x <= 0 && y <= 0) && (x >= -r && y >= -r)) ||
        //     ((x >= 0 && y <= 0) && (x*x + y*y <= r*r));

        return ((x >= 0 && y <= 0 && x * x + y * y <= r * r) ||
            (x <= 0 && y <= 0 && x >= -r && y >= -r) ||
            (x >= 0 && y >= 0 && y <= -x + r / 2));

    }

    return (
        <canvas
            ref={canvasRef}
            width={400}
            height={400}
            onClick={handleCanvasClick}
        >
            <div>
                <Error message={error} />
            </div>
        </canvas>

    );
}

export default CanvasGraph;











