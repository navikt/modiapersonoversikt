import * as React from 'react';

import { shallow } from 'enzyme';
import { Table } from './table/Table';

test('lager tabell basert på input', () => {
    const header: Array<string> = ['kolonne 1', 'kolonne 2'];
    const body: Array<Array<string>> = [['rad1 kolonne 1', 'rad1 kolonne 2']];

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
