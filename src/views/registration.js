import React from "react";
import '../css/header.css';
import '../css/registration.css';
import RegistrationComponent from "../components/RegistrationComponent";

const RegistrationPage = () => {
    return(
        <div className="registration" >
            <RegistrationComponent />
        </div>
    )
}

export default RegistrationPage;