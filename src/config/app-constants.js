const APP_CONSTANTS = {
    ACTIONS: {
        SET_COMMITS: 0,
        SET_COMMIT_DETAIL: 1,
        LOADING: 2
    },
    ENDPOINTS: {
        COMMITS: 'https://api.github.com/repositories/19438/commits'
    },
    FORMAT: {
        DATE: 'DD/MM/YYYY',
        DATE_TIME: 'DD/MM/YYYY HH:mm:ss'
    },
    ROUTES: {
        ROOT: '/',
        COMMITS: '/commits',
        COMMIT_DETAIL: '/commits/:sha'
    }
};

export default APP_CONSTANTS;
