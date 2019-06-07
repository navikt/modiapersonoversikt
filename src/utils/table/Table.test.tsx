import * as React from 'react';

import { mount, shallow } from 'enzyme';
import { Table, TableRows, TitleRow } from './Table';

test('lager tabell basert på input', () => {
    const header: TitleRow = ['kolonne 1', 'kolonne 2'];
    const body: TableRows = [['rad1 kolonne 1', 'rad1 kolonne 2']];

    const result = shallow(<Table tittelRekke={header} rows={body} />);
    const expectedResult = (
        <table>
            <thead>
                <tr>
                    <th>kolonne 1</th>
                    <th>kolonne 2</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>rad1 kolonne 1</td>
                    <td>rad1 kolonne 2</td>
                </tr>
            </tbody>
        </table>
    );

    expect(result).toMatchElement(expectedResult);
});

test('setter på riktige click-handlere på riktige kolonner', () => {
    const header: TitleRow = ['kolonne 1', 'kolonne 2'];
    const body: TableRows = [['rad1 kolonne 1', 'rad1 kolonne 2'], ['rad2 kolonne 1', 'rad2 kolonne 2']];
    const callbackFørsteRekke = jest.fn();
    const callbackAndreRekke = jest.fn();
    const onClickHandlere = [callbackFørsteRekke, callbackAndreRekke];
    const result = mount(<Table tittelRekke={header} rows={body} rowsOnClickHandlers={onClickHandlere} />);

    result
        .find('tbody')
        .find('tr')
        .first()
        .simulate('click')
        .simulate('click');
    result
        .find('tbody')
        .find('tr')
        .last()
        .simulate('click');

    expect(callbackFørsteRekke.mock.calls.length).toBe(2);
    expect(callbackAndreRekke.mock.calls.length).toBe(1);
});
