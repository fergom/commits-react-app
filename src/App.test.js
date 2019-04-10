import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import App from './App';
import HeaderComponent from "./components/header/header";
import SpinnerComponent from "./components/spinner/spinner";
import { BrowserRouter as Router } from 'react-router-dom';

const setUp = () => {
    return shallow(<App />);
};

describe('AppComponent', () => {

    let component;

    beforeEach(() => {
        component = setUp();
    });

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<App />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('contains the spinner, the header and the router', () => {
      expect(component.find(SpinnerComponent).length).toEqual(1);
      expect(component.find(HeaderComponent).length).toEqual(1);
      expect(component.find(Router).length).toEqual(1);
    });
});

