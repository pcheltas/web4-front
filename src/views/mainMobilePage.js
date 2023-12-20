import React, {useEffect} from "react";
import '../css/header.css';
import Header from "./header";
import PointsList from "../components/PointsList";
import FormComponent from "../components/Form";
import Clear from "../components/Clear"
import CanvasGraph from "../components/CanvasGraph";
import {redirect} from "react-router-dom";
import RegistrationPage from "./registration";
import LogOutComponent from "../components/LogOutComponent";

const MainTabletPage = () => {
    console.log(localStorage.getItem('token'))
    if (!localStorage.getItem('token')) {
        return <RegistrationPage/>
    }

    return(
        <div className="mainPage" >
            <Header />
            <LogOutComponent />
            <div className="flex-container">
                <div className="flex-item">
                    <CanvasGraph />
                </div>
            </div>
            <div className="text">
                Try your luck!
            </div>
            <div className="flex-item">
                <FormComponent />
            </div>
            <div className="text">
                Score
            </div>
            <div className="flex-item">
                <Clear />
            </div>
            <div style={{backgroundColor: "rgb(58,30,47)"}}>
                <PointsList />
            </div>

        </div>
    )
}

export default MainTabletPage;