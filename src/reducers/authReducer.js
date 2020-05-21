export const firebaseAuth = (state, action) => {
    switch (action.type) {
        case "SGNIN":
            return { ...state, user: action.payload }

        case "LOGIN":
            return { ...state, user: action.payload }

        case "LOGOUT":
            return { ...state, user: action.payload }

        default:
            return state;
    }
}