import React from 'react';
import { Provider } from 'react-redux';
import SpinnerComponent from './spinner';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store'

const mountComponent = (store) => {
    return mount(<Provider store={store}><SpinnerComponent /></Provider>);
};

describe('SpinnerComponent', () => {

    let component, initialState, mockStore, store;

    beforeEach(() => {
        initialState = {
            loading: false
        };
        mockStore = configureStore();
        store = mockStore(initialState);
        component = mountComponent(store);
    });

    it('does not show loading when it is false', async () => {
        const instance = component.instance();
        await instance.componentDidMount();
        const spinnerLoadingContainer = component.find('.spinner-container');
        const noneContainer = component.find('.no-display');
        expect(spinnerLoadingContainer.length).toBe(0);
        expect(noneContainer.length).toBe(1);
    });

    it('shows loading when it is true', async () => {
        initialState.loading = true;
        store = mockStore(initialState);
        component = mountComponent(store);
        const instance = component.instance();
        await instance.componentDidMount();
        const spinnerLoadingContainer = component.find('.spinner-container');
        const noneContainer = component.find('.no-display');
        expect(spinnerLoadingContainer.length).toBe(1);
        expect(noneContainer.length).toBe(0);
    });
});
