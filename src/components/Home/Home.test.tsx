import { shallow, mount } from 'enzyme';
import React from 'react';
import { ArticleSummaryModel } from '../../types/ArticleModels';

const getNYTMostViewedArticlesMock = jest.fn(() => Promise.resolve());
const ArticleFeedServiceMock = {
    getNYTMostViewedArticles: getNYTMostViewedArticlesMock
};

jest.mock('../../services/article-feed-service', () => {
    return { ArticleFeedService: ArticleFeedServiceMock };
});

import { Home } from './Home';
import { FilteredArticles } from '../FilteredArticles/FilteredArticles';
import { HotArticles } from '../HotArticles/HotArticles';


describe('<Home />', () => {

    it('should call service endpoint for hot articles once, upon landing', async () => {
        const wrapper = mount(<Home />);
        expect(ArticleFeedServiceMock.getNYTMostViewedArticles).toBeCalledTimes(1);
    });

    it('should display/hide components according to state', () => {
        const wrapper = mount(<Home />);
        wrapper.setState({ errorFetchingApi: 'ERROR' });
        const apiError = wrapper.find('.api-error');
        expect(apiError.exists()).toBeTruthy();
        expect(apiError.text()).toEqual('ERROR');
        wrapper.setState({ errorFetchingApi: '' });
        expect(wrapper.find('.api-error').exists()).toBeFalsy();

        wrapper.setState({ isFilter: true });
        expect(wrapper.find(FilteredArticles).exists()).toBeTruthy();
        expect(wrapper.find(HotArticles).exists()).toBeFalsy();

        wrapper.setState({ isFilter: false }); 
        expect(wrapper.find(FilteredArticles).exists()).toBeFalsy();
        expect(wrapper.find(HotArticles).exists()).toBeTruthy();
    });

});
