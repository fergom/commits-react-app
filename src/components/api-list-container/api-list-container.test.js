import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store'
import axios from 'axios';
import ApiListContainerComponent from './api-list-container';
import ApiListItemContainerComponent from '../api-list-item-container/api-list-item-container';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faComment } from '@fortawesome/free-solid-svg-icons'
import APP_CONSTANTS from "../../config/app-constants";

library.add(faComment);

const mountComponent = (store) => {
    return mount(<Provider store={store}><Router><ApiListContainerComponent /></Router></Provider>);
};

const mockCommits = () => {
    return [
        {
            sha: 0
        }
    ];
};

describe('ApiListContainerComponent', () => {

    jest.mock('axios');

    let component, getSpy, initialState, mockStore, store;

    beforeEach(() => {
        initialState = {
            commits: []
        };
        mockStore = configureStore();
        store = mockStore(initialState);
        getSpy = jest.spyOn(axios, 'get');
        component = mountComponent(store);
    });

    it('should load the commits when array is empty', async () => {
        axios.get.mockImplementation(() => Promise.resolve({data: mockCommits()}));
        const instance = component.instance();
        await instance.componentDidMount();
        expect(getSpy).toHaveBeenCalled();
    });

    it('should not load the commits when array is not empty and show the items', async () => {
        getSpy.mockReset();
        initialState.commits = mockCommits();
        store = mockStore(initialState);
        const dispatchSpy = jest.spyOn(store, 'dispatch');
        component = mountComponent(store);
        axios.get.mockImplementation(() => Promise.resolve({data: mockCommits()}));
        const instance = component.instance();
        await instance.componentDidMount();
        expect(getSpy).not.toHaveBeenCalled();
        expect(instance.state.storeState.commits.length).toBe(1);
        const items = component.find(ApiListItemContainerComponent);
        expect(items.length).toEqual(items.length);
        expect(dispatchSpy).not.toHaveBeenCalled();
    });

    it('should load the commits when array is empty and show the no commits message if back returns []', async () => {
        axios.get.mockImplementation(() => Promise.resolve({data: []}));
        const instance = component.instance();
        await instance.componentDidMount();
        expect(getSpy).toHaveBeenCalled();
        expect(instance.state.storeState.commits.length).toBe(0);
        const h1 = component.find('h1');
        expect(h1.text()).toEqual('There are no commits yet!');
    });

});
