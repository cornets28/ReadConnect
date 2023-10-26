import { reducerCases } from "./constants";

export const initialState = {
    showLoginModal: false,
    showRegisterModal: false,
    userInfo: undefined,
    isAuthor: false,
}

const reducer = (state: any, action: {
    userInfo: any;
    showRegisterModal: any;
    showLoginModal: any; type: any; 
}) => {
    switch (action.type) {
        case reducerCases.TOGGLE_LOGIN_MODAL:
            return {
                ...state,
                showLoginModal: action.showLoginModal,
            }
        case reducerCases.TOGGLE_REGISTER_MODAL:
            return {
                ...state,
                showRegisterModal: action.showRegisterModal,
            }
        case reducerCases.CLOSE_AUTH_MODAL:
            return {
                ...state,
                showLoginModal: false,
                showRegisterModal: false
            }
        case reducerCases.SET_USER:
            return {
                ...state,
                userInfo: action.userInfo,
            }
        default:
            return state;
    }
}

export default reducer;