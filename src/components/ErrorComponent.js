const Error = ({message}) => {
    if (message!= null && message.trim !== ""){
        return (
            <div className="error">
                <p>{message}</p>
            </div>
        )
    }
}

export default Error;