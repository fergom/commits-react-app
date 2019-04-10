import React from 'react';
import ApiListItemContainerComponent from './api-list-item-container';
import { mount } from 'enzyme';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faComment } from '@fortawesome/free-solid-svg-icons'

library.add(faComment);


const setUp = (commitMock) => {
    return mount(<ApiListItemContainerComponent commit={commitMock} />);
};

const generateCommitMock = () => {
    return {
        author: {
            avatar_url: 'MockAvatarUrl',
            login: 'MockLogin'
        },
        commit: {
            author: {
                date: '2019-03-28T19:18:37Z'
            },
            comment_count: 0,
            message: 'MockMessage'
        }
    }
};

describe('ApiListItemComponent', () => {

    let component, mockCommit;

    beforeEach(() => {
        mockCommit = generateCommitMock();
        component = setUp(mockCommit);
    });

    it('should render', () => {
        const wrapper = component.find('.list-item');
        expect(wrapper.length).toBe(1);
    });

    it('should show the commit info', () => {
        const h4 = component.find('h4');
        const span = component.find('span');
        expect(h4.text()).toBe(mockCommit.commit.message);
        expect(span.text()).toBe(mockCommit.commit.comment_count.toString());
    });
});
