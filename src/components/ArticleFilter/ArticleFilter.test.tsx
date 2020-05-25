import { shallow } from 'enzyme';
import React from 'react';

const getNYTArticlesByTextMock = jest.fn(() => Promise.resolve());
const ArticleFeedServiceMock = {
    getNYTArticlesByText: getNYTArticlesByTextMock
};

jest.mock('../../services/article-feed-service', () => {
    return { ArticleFeedService: ArticleFeedServiceMock };
});

import { ArticleFilter } from './ArticleFilter';
import { Spinner } from 'react-bootstrap';

const toggleFilterMock = jest.fn();
const updateFilteredArticlesMock = jest.fn();
const handleErrorFetchingApi = jest.fn();

describe('<ArticleFilter />', () => {

    const props = {
        toggleFilter: toggleFilterMock,
        updateFilteredArticles: updateFilteredArticlesMock,
        handleErrorFetchingApi: handleErrorFetchingApi,
    };

    it('button click should call service', () => {
        const wrapper = shallow(<ArticleFilter {...props} />);
        const button = wrapper.find('#filterBtn');
        button.simulate('click');
        expect(ArticleFeedServiceMock.getNYTArticlesByText).toBeCalledTimes(0);
        expect(toggleFilterMock).toBeCalledTimes(1);
        wrapper.setState({ textFilter: 'a' });
        button.simulate('click');
        expect(ArticleFeedServiceMock.getNYTArticlesByText).toBeCalledTimes(1);
        expect(toggleFilterMock).toBeCalledTimes(1);
        
    });

    it('should update text state upon typing', () => {
        const wrapper = shallow(<ArticleFilter {...props} />);
        const text = wrapper.find('#filterTxt');
        text.simulate('change', {currentTarget: {value: 'abc'}})
        expect(wrapper.state().textFilter).toEqual('abc');
    });
    
    it('should display spinner inside the button', () => {
        const wrapper = shallow(<ArticleFilter {...props} />);
        expect(wrapper.find(Spinner).exists()).toBeFalsy();
        expect(wrapper.find('#filterBtn').text()).toContain('Search');
        wrapper.setState({loadingFilter: true});
        expect(wrapper.find(Spinner).exists()).toBeTruthy();
        expect(wrapper.find('#filterBtn').text()).toContain('Loading');

    });
});
