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


const MainPage = () => {
    console.log(localStorage.getItem('token'))
    if (!localStorage.getItem('token')) {
        return <RegistrationPage/>

    }
    return(
        <div className="mainPage" >
            <Header />
            <LogOutComponent />
            <div className="flex-container">
                <div className="flex-item-text-1 text">
                    Score
                    <Clear />
                    <PointsList />
                </div>

                <div className="flex-item-text-2 text">
                    Try your luck!
                    <div className="flex-container">
                        <div className="flex-item text">
                            <FormComponent />
                        </div>
                        <div className="flex-item text">
                            <CanvasGraph />
                        </div>
                    </div>


                </div>
            </div>
        </div>
    )
}

export default MainPage;