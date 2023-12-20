const initState = {
    x: {
        x_value: null,
        x_valid: false
    }
    // x: null
}

const xReducer = (state = initState, action) => {
    switch (action.type) {
        case 'CHANGE_X':
            // return action.payload
        return action.payload
            // return {
            //     ...state,
            //     x: {
            //         x_value: action.payload,
            //         x_valid: (action.payload !== null && action.payload.trim() !== '')
            //     }
            // }
            // if ((action.payload !== null && action.payload.trim() !== '')) {
            //     // state.x.x_valid === true;
            //     return action.payload;
            // }
            // return null

        default:
            return state
    }
}

export default xReducer;