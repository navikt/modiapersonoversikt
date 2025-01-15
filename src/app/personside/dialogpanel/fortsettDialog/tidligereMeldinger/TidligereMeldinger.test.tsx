import { render } from '@testing-library/react';
import { statiskTraadMock } from '../../../../../mock/meldinger/statiskTraadMock';
import TidligereMeldinger from './TidligereMeldinger';

test('viser fortsett dialog', () => {
    const dialogPanelBody = render(<TidligereMeldinger traad={statiskTraadMock} />);

    expect(dialogPanelBody.asFragment()).toMatchSnapshot();
    dialogPanelBody.unmount();
});
