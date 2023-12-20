import {useDispatch, useSelector} from "react-redux";
import axios from "axios";

const Clear = () => {
    const dispatch = useDispatch();
    let points = useSelector(state => state.x.x_value);

    const clearFetch = async () => {
        const response = await axios
            .delete("http://localhost:8080/api/v1/points", {
                headers: {
                    'username': localStorage.getItem('username'),
                    'token': localStorage.getItem('token')
                }
            }).then(data => {
                dispatch({ type: 'CLEAR_POINTS'});
            })
            .catch((err) => {
                console.log("err from request all")
            })

    }

    // const handleClear = async (e) => {
    //     e.preventDefault();
    //
    //     dispatch({ type: 'CLEAR_POINTS'});
    //     // console.log(points)
    //
    // }

    return (
        <div>
            <button onClick={clearFetch} className="submit-button">Clear table </button>
        </div>
    )
};

export default Clear;