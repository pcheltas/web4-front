import {useRef, useState} from "react";
import React from "react";
import CryptoJS from 'crypto-js'
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"
import axios from "axios";
import {redirect} from "react-router-dom";

const RegistrationComponent = () => {

    const [isContainerActive, setIsContainerActive] = useState(false);
    const [password, setPassword] = useState('');
    const [login, setLogin] = useState('');

    const signUpButton = () => {
        setIsContainerActive(true);
    };
    const signInButton = () => {
        setIsContainerActive(false);
    };


    function showAlert(message) {
        Toastify({
            text: message,
            duration: 2000,
            style: {
                background: "red",
            },
            position: 'center',

        }).showToast();
    }

    const registerUser = () => {
        if (isValidArgs(login, password)) {
            let hashPassword = CryptoJS.SHA256(password).toString()
            console.log(hashPassword)
            register(hashPassword)
        } else {
            showAlert('Empty input')
        }
    }


    const logUser = () => {
        if (isValidArgs(login, password)) {
            let hashPassword = CryptoJS.SHA256(password).toString()
            console.log(hashPassword)
            log(hashPassword)
        } else {
            showAlert('Empty input')
        }
    }

    function isValidArgs(login, password) {
        return login !== "" && password !== ""
    }

    const register = async (hashPassword) => {
        const response = await axios
            .post("http://localhost:8080/api/v1/register", new URLSearchParams(
                {
                    username: login,
                    token: hashPassword
                }
            )).then(function (d) {
                localStorage.setItem('token', hashPassword)
                localStorage.setItem('username', login)
                console.log('reg', localStorage.getItem('token'))
                window.location.reload()
            })
            .catch((err) => {
                showAlert("Incorrect login or password")
                console.log("err from request all")
            })


    }

    const log = async (hashPassword) => {
        const response = await axios
            .post("http://localhost:8080/api/v1/login", new URLSearchParams(
                {
                    username: login,
                    token: hashPassword
                }
            )).then(function (d) {
                localStorage.setItem('token', hashPassword)
                localStorage.setItem('username', login)
                window.location.reload()
            })
            .catch((err) => {
                showAlert("Incorrect login or password")
                console.log("err from request all")
            })


    }

    // const containerRef = useRef(null)
    //
    // const addClass = () => {
    //     const container = containerRef.current;
    //     console.log("AAAAAAA")
    //     container.className.add("right-panel-active");
    // }
    //
    // const removeClass = () => {
    //     const container = containerRef.current;
    //     console.log("AAAAAAA")
    //     container.className.remove("right-panel-active");
    // }

    return (
        <div className="reg-container">
            <div className={`container${isContainerActive ? " right-panel-active" : ""}`} id="container">
                <div className="form-container sign-up-container">
                    <form className="reg" action="#">
                        <h1 className="reg">Create Account</h1>
                        <input type="text" className="reg" placeholder="Login"
                               value={login}
                               onChange={(event) => setLogin(event.target.value)}/>
                        <input type="password" className="reg" placeholder="Password"
                               value={password}
                               onChange={(event) => setPassword(event.target.value)}/>
                        <button onClick={registerUser} className="reg">Sign Up</button>
                    </form>
                </div>
                <div className="form-container sign-in-container">
                    <form className="reg" action="#">
                        <h1 className="reg">Sign in</h1>
                        {/*<span className="reg">or идите нахуй</span>*/}
                        <input className="reg" type="text" placeholder="Login"
                               value={login}
                               onChange={(event) => setLogin(event.target.value)}/>
                        <input className="reg" type="password" placeholder="Password"
                               value={password}
                               onChange={(event) => setPassword(event.target.value)}/>
                        <button className="reg" onClick={logUser}>Sign In</button>
                    </form>
                </div>
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1 className="reg">Welcome Back!</h1>
                            {/*<p>Login in with your existing account</p>*/}
                            <p>Сервис онлайн психотерапии Ясно</p>
                            <button className="ghost reg" id="signIn" onClick={signInButton}>Sign In</button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1 className="reg">Hello!</h1>
                            {/*<p>Try your luck with us, мамкин пидорас</p>*/}

                            {/*<p>Try your luck with us!</p>*/}
                            <p>Aviasales - поиск дешевых авиабилетов</p>
                            <button className="ghost reg" onClick={signUpButton} id="signUp">Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    )
}

export default RegistrationComponent;