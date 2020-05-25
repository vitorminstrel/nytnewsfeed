import { shallow } from 'enzyme';
import React from 'react';
import { HotArticles } from './HotArticles';
import { CarouselItem } from 'react-bootstrap';

describe('<HotArticles />', () => {
    const props = {
        articles: [
            {
                id: 'id',
                title: 'title',
                description: 'description',
                publishDate: 'publish date',
                url: 'url',
                section: 'section',
                imageUrl: 'image url',
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

    it('should render 2 carousel items for 2 articles in list', () => {
        const wrapper = shallow(<HotArticles {...props} />);
        expect(wrapper.find(CarouselItem)).toHaveLength(2);
    });

    
    it('should show the right content', () => {
        const wrapper = shallow(<HotArticles {...props} />);

        const firstArticle = wrapper.find(CarouselItem).at(0);

        const section = firstArticle.find('.section');
        expect(section.exists()).toBeTruthy();
        expect(section.text()).toContain('section');
        
        const publishDate = firstArticle.find('.publish-date');
        expect(publishDate.exists()).toBeTruthy();
        expect(publishDate.text()).toContain('publish date');

        const headline = firstArticle.find('.headline');
        expect(headline.exists()).toBeTruthy();
        expect(headline.text()).toContain('title');
        
        const description = firstArticle.find('.description');
        expect(description.exists()).toBeTruthy();
        expect(description.text()).toContain('description');

        const image = firstArticle.find('#imageImg');
        expect(image.exists()).toBeTruthy();
        expect(image.prop('src')).toEqual('image url');
      
    });

});
