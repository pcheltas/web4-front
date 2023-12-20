const initState = {
    points:[{
        id: 1,
        x: 1,
        y: 1,
        r: 1,
        nowTime: "12:23",
        executionTime: "0.273664",
        hit: "hit"
    },
    {
        id: 2,
        x: 1,
        y: 1,
        r: 1,
        nowTime: "12:23",
        executionTime: "0.273664",
        hit: "hit"
    }],
    count: 0
}

const pointsReducer = (state = initState, action) => {
    switch (action.type) {
        case 'ADD_POINT':
            return {...state,
            count: action.payload}
        case 'CLEAR_POINTS':
            return {
                points: []
            }
        case 'GET_ALL':
            return {
                points: action.payload,
                count: action.payload.length
            }
        default:
            return state
    }
}

export default pointsReducer;