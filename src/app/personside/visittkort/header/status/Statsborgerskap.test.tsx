import * as React from 'react';
import { shallow } from 'enzyme';
import Statsborgerskap from './Statsborgerskap';

test('Formaterer statsborgerskap', () => {
    const statsborgerskap = shallow(<Statsborgerskap statsborgerskap={'NORGE'}/>);
    expect(statsborgerskap.text()).toEqual('Norge');
});

test('Formaterer statsborgerskap med flere ord i seg', () => {
    const statsborgerskap = shallow(<Statsborgerskap statsborgerskap={'NEW ZEALAND'}/>);
    expect(statsborgerskap.text()).toEqual('New Zealand');
});

test('Formaterer statsborgerskap med bindestrek', () => {
    const statsborgerskap = shallow(<Statsborgerskap statsborgerskap={'SAUDI-ARABIA'}/>);
    expect(statsborgerskap.text()).toEqual('Saudi-Arabia');
});

test('Formater statsborgerskap med bindrestrek og mellomrom', () => {
    const statsborgerskap = shallow(<Statsborgerskap statsborgerskap={'PAPUA NY-GUINEA'}/>);
    expect(statsborgerskap.text()).toEqual('Papua Ny-Guinea');
});