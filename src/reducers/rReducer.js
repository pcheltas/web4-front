const initState = {
    r: {
        r_value: null,
        r_valid: false
    }
}

const rReducer = (state = initState, action) => {
    switch (action.type) {
        case 'CHANGE_R':
            return action.payload
        default:
            return state
    }
}

export default rReducer;