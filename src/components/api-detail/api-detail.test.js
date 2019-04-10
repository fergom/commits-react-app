import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store'
import axios from 'axios';
import ApiDetailComponent from './api-detail';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faChevronLeft, faEnvelope, faEquals, faFileCode, faIdCardAlt, faMinusCircle, faPlusCircle, faUser } from '@fortawesome/free-solid-svg-icons'
import APP_CONSTANTS from "../../config/app-constants";

library.add(faChevronLeft, faEnvelope, faEquals, faFileCode, faIdCardAlt, faMinusCircle, faPlusCircle, faUser);

const mountComponent = (store, sha = 0) => {
    return mount(<Provider store={store}><Router><ApiDetailComponent match={{params: {sha: sha}}} /></Router></Provider>);
};

const mockCommitDetail = () => {
    return {
        html_url: 'MockHtmlUrl',
        sha: 'MockSha',
        author: {
            avatar_url: 'MockAvatarUrl',
            date: '2019-03-28T19:18:37Z',
            html_url: 'MockAuthorHtmlUrl',
            login: 'MockLogin'
        },
        commit: {
            author: {
                date: '2019-03-28T19:18:37Z',
                email: 'MockAuthorEmail',
                name: 'MockAuthorName'
            },
            comment_count: 0,
            message: 'MockMessage'
        },
        files: []
    };
};

describe('ApiDetailComponent', () => {

    jest.mock('axios');

    let component, getSpy, initialState, mockStore, store;

    beforeEach(() => {
        initialState = {
            commitDetail: {}
        };
        mockStore = configureStore();
        store = mockStore(initialState);
        getSpy = jest.spyOn(axios, 'get');
        axios.get.mockImplementation(() => Promise.resolve({data: mockCommitDetail()}));
        component = mountComponent(store);
    });

    it('should load the commitDetail when there is no commitDetail', async () => {
        const instance = component.instance();
        await instance.componentDidMount();
        expect(getSpy).toHaveBeenCalled();
    });

    it('should load the commitDetail when the loaded commitDetail sha does not match', async () => {
        initialState.commitDetail = { sha: 1 };
        store = mockStore(initialState);
        const dispatchSpy = jest.spyOn(store, 'dispatch');
        component = mountComponent(store);
        const instance = component.instance();
        await instance.componentDidMount();
        expect(getSpy).toHaveBeenCalled();
        expect(instance.state.storeState.commitDetail).toEqual({ sha: 1 });
        expect(dispatchSpy).toHaveBeenCalledWith({ type: APP_CONSTANTS.ACTIONS.LOADING, loading: true });
        expect(dispatchSpy).toHaveBeenCalledWith({ type: APP_CONSTANTS.ACTIONS.SET_COMMIT_DETAIL, commitDetail: mockCommitDetail() });
        expect(dispatchSpy).toHaveBeenCalledWith({ type: APP_CONSTANTS.ACTIONS.LOADING, loading: false });
    });

    it('should not load the commitDetail when the loaded commitDetail sha matches', async () => {
        getSpy.mockReset();
        axios.get.mockImplementation(() => Promise.resolve({data: mockCommitDetail()}));
        const commitDetail = mockCommitDetail();
        initialState.commitDetail = commitDetail;
        store = mockStore(initialState);
        const dispatchSpy = jest.spyOn(store, 'dispatch');
        component = mountComponent(store, commitDetail.sha);
        const instance = component.instance();
        await instance.componentDidMount();
        expect(getSpy).not.toHaveBeenCalled();
        expect(instance.state.storeState.commitDetail).toEqual(commitDetail);
        expect(dispatchSpy).not.toHaveBeenCalled();
    });

});
