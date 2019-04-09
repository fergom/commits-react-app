import APP_CONSTANTS from '../config/app-constants';
import commitsReducer from './commits';

const loadMocks = () => {
    return {
        setCommitsAction: {
            type: APP_CONSTANTS.ACTIONS.SET_COMMITS,
            commits: [
                {
                    sha: 'MockSha'
                }
            ]
        },
        setCommitDetailAction: {
            type: APP_CONSTANTS.ACTIONS.SET_COMMIT_DETAIL,
            commitDetail: {
                sha: 'MockSha'
            }
        },
        loadingAction: {
            type: APP_CONSTANTS.ACTIONS.LOADING,
            loading: true
        },
        fakeAction: {
            type: 'MockType'
        }
    }
};

const mocks = loadMocks();

describe('Commits reducer', () => {
    it('should update the commits array when the action is SET_COMMITS', () => {
        const state = commitsReducer(undefined, mocks.setCommitsAction);
        expect(state.commits).toEqual(mocks.setCommitsAction.commits);
    });

    it('should update the commitDetail when the action is SET_COMMIT_DETAIl', () => {
        const state = commitsReducer(undefined, mocks.setCommitDetailAction);
        expect(state.commitDetail).toEqual(mocks.setCommitDetailAction.commitDetail);
    });

    it('should update the loading value when the action is LOADING', () => {
        const state = commitsReducer(undefined, mocks.loadingAction);
        expect(state.loading).toEqual(mocks.loadingAction.loading);
    });

    it('should return the default state when the action is not known', () => {
        const state = commitsReducer(undefined, mocks.fakeAction);
        expect(state.commits).toEqual([]);
        expect(state.commitDetail).toEqual({});
        expect(state.loading).toEqual(false);
    });
});
