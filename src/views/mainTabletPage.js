import React from "react";
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
            <CanvasGraph />

            <div className="flex-container">
                <div className="flex-item text">
                    Score
                    <Clear />
                    <PointsList />
                </div>

                <div className="flex-item text">
                    Try your luck!
                    <FormComponent />

                </div>
            </div>
        </div>
    )
}

export default MainTabletPage;