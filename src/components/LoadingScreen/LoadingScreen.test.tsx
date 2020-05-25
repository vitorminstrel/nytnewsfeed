import { shallow } from 'enzyme';
import React from 'react';
import { LoadingScreen } from './LoadingScreen';

describe('<LoadingScreen />', () => {

    it('should show the loading screen on isShow', () => {
        const wrapper = shallow(<LoadingScreen {...{isShow: true}} />);
        expect(wrapper.find('.loading-screen').exists()).toBeTruthy();
        wrapper.setProps({ isShow: false });
        expect(wrapper.find('.loading-screen').exists()).toBeFalsy();
    });
});
