import * as React from 'react';
import * as renderer from 'react-test-renderer';
import TidligereMeldinger from './TidligereMeldinger';
import { statiskTraadMock } from '../../../../../mock/meldinger/statiskTraadMock';

test('viser fortsett dialog', () => {
    const dialogPanelBody = renderer.create(<TidligereMeldinger traad={statiskTraadMock} />);

    expect(dialogPanelBody.toJSON()).toMatchSnapshot();
});
