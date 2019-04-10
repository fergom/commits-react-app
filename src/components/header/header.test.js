import React from 'react';
import HeaderComponent from './header';
import { shallow } from 'enzyme';
import { Link } from 'react-router-dom';
import APP_CONSTANTS from '../../config/app-constants';

const setUp = () => {
    return shallow(<HeaderComponent />);
};

describe('HeaderComponent', () => {

    let component;

    beforeEach(() => {
        component = setUp();
    });

    it('renders correctly', () => {
        const wrapper = component.find('div');
        expect(wrapper.length).toBe(1);
    });

    it('has an h1 with the link to root', () => {
        const anchor = component.find(Link);
        const h1 = anchor.find('h1');
        expect(anchor.length).toBe(1);
        expect(anchor.props().to).toBe(APP_CONSTANTS.ROUTES.ROOT);
        expect(h1.text()).toBe('COMMITS REACT APP');
    });

});
