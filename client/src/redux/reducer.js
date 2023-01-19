import {
    
    SEARCH_PLACE,
    GET_PLACE_DETAIL,
    GET_PLACES,
    GET_USER,
    GET_USER_BY_ID
   
} from "./actions"


const initialState = {
    places:[],
    allPlaces: [],
    placeDetail: {},
    profile: {},
    allUsers: [],
}

export default function reducer (state = initialState, action) {
    switch(action.type){
    
        case GET_PLACES:
            return{
                ...state,
                places: action.payload,
                allPlaces: action.payload,
            }
        case SEARCH_PLACE:
            return {
                ...state,
                places: action.payload
            }
        case GET_PLACE_DETAIL:
            return {
                ...state,
                placeDetail: action.payload
            }
        case GET_USER:
            return {
                ...state,
                allUsers: action.payload
            }
        
        case GET_USER_BY_ID:
            return {
                ...state,
                profile: action.payload
            }
        
        default:
            return state;
    }
}