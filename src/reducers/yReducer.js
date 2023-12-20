const initState = {
    y: null
}

const yReducer = (state = initState, action) => {
    switch (action.type) {
        case 'CHANGE_Y':
            return {
                ...state,
                y: action.payload
            }
        default:
            return state
    }
}

export default yReducer;