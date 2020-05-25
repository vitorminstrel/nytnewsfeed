import { shallow } from 'enzyme';
import React from 'react';
import { FilteredArticles } from './FilteredArticles';

describe('<FilteredArticles />', () => {

    const props = {
        articles: [
            {
                id: 'id',
                title: 'title',
                description: 'description',
                publishDate: 'publish date',
                url: 'url',
            },
            {
                id: '',
                title: '',
                description: '',
                publishDate: '',
                url: '',
            },
        ],
    };

    it('should render 2 items for 2 articles in list', () => {
        const wrapper = shallow(<FilteredArticles {...props} />);
        expect(wrapper.find('.article')).toHaveLength(2);
    });

    it('should render no results message for no articles', () => {
        const wrapper = shallow(<FilteredArticles {...{articles: []}} />);
        expect(wrapper.find('.article')).toHaveLength(0);
        expect(wrapper.find('.no-results').exists()).toBeTruthy();
    });

    it('should show the right content', () => {
        const wrapper = shallow(<FilteredArticles {...props} />);

        const firstArticle = wrapper.find('.article').at(0);
        
        const publishDate = firstArticle.find('.publish-date');
        expect(publishDate.exists()).toBeTruthy();
        expect(publishDate.text()).toContain('publish date');

        const headline = firstArticle.find('.header');
        expect(headline.exists()).toBeTruthy();
        expect(headline.text()).toContain('title');
        
        const description = firstArticle.find('.description');
        expect(description.exists()).toBeTruthy();
        expect(description.text()).toContain('description');
      
    });
});
