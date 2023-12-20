import {redirect} from "react-router-dom";

const LogOutComponent = () => {

    const handleLogOut = () => {
        localStorage.removeItem('username')
        localStorage.removeItem('token')
        window.location.reload()
    }

    return (
        <div>
            <button onClick={handleLogOut} className="submit-button"> Log out </button>
        </div>
    )
}

export default LogOutComponent;