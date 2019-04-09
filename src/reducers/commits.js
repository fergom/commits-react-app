import APP_CONSTANTS from '../config/app-constants';

const initialState = {
    commits: [],
    commitDetail: {},
    loading: false
};

const commitsReducer = (state = initialState, action) => {
    switch (action.type) {
        case APP_CONSTANTS.ACTIONS.SET_COMMITS:
            return Object.assign({}, state, {
                commits: action.commits
            });
        case APP_CONSTANTS.ACTIONS.SET_COMMIT_DETAIL:
            return Object.assign({}, state, {
                commitDetail: action.commitDetail
            });
        case APP_CONSTANTS.ACTIONS.LOADING:
            return Object.assign({}, state, {
                loading: action.loading
            });
        default:
            return state;
    }
};

export default commitsReducer;
