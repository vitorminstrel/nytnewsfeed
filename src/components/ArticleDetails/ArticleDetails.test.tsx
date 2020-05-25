import { shallow, mount } from 'enzyme';
import React from 'react';
import { ArticleDetails } from './ArticleDetails';

const getNYTArticleByIdMock = jest.fn(() => Promise.resolve());
const ArticleFeedServiceMock = {
    getNYTArticleById: getNYTArticleByIdMock
};

jest.mock('../../services/article-feed-service', () => {
    return { ArticleFeedService: ArticleFeedServiceMock };
});

describe('<ArticleDetails />', () => {

    it('should display/hide components according to state', () => {
        const wrapper = shallow(<ArticleDetails {...{id:'abc'}} />);
        wrapper.setState({ errorFromApi: 'ERROR' });
        const apiError = wrapper.find('.api-error');
        expect(apiError.exists()).toBeTruthy();
        expect(apiError.text()).toEqual('ERROR');
        wrapper.setState({ errorFromApi: '' });
        expect(wrapper.find('.api-error').exists()).toBeFalsy();

        expect(wrapper.find('.content').exists()).toBeFalsy();
    });

    it('should show the right content', () => {
        const wrapper = shallow(<ArticleDetails {...{id:'abc'}} />);

        wrapper.setState({ 
            article: {
                url: 'url',
                abstract: 'abstract',
                leadParagraph: 'lead paragraph',
                imageUrl: 'image url',
                publishDate: 'publish date',
                writer: 'writer',
                mainHeadline: 'main headline',
                printHeadline: 'print headline',
            }
        });

        expect(wrapper.find('.content').exists()).toBeTruthy();

        const mainHeadlineA = wrapper.find('.main-headline');
        expect(mainHeadlineA.exists()).toBeTruthy();
        expect(mainHeadlineA.text()).toContain('main headline');
        expect(mainHeadlineA.prop('href')).toEqual('url');

        const printHeadline = wrapper.find('.print-headline');
        expect(printHeadline.exists()).toBeTruthy();
        expect(printHeadline.text()).toContain('print headline');

        const writer = wrapper.find('.writer');
        expect(writer.exists()).toBeTruthy();
        expect(writer.text()).toContain('writer');
        expect(writer.text()).toContain('publish date');
        expect(writer.text()).toEqual('writer (publish date)');

        const abstract = wrapper.find('#abstract');
        expect(abstract.exists()).toBeTruthy();
        expect(abstract.text()).toContain('abstract');

        const leadParagraph = wrapper.find('#leadParagraph');
        expect(leadParagraph.exists()).toBeTruthy();
        expect(leadParagraph.text()).toContain('lead paragraph');
        
        const image = wrapper.find('#image');
        expect(image.exists()).toBeTruthy();
        expect(image.prop('src')).toEqual('image url');
      
    });
});
