import * as renderer from 'react-test-renderer';
import { statiskTraadMock } from '../../../../../mock/meldinger/statiskTraadMock';
import TidligereMeldinger from './TidligereMeldinger';

test('viser fortsett dialog', () => {
    const dialogPanelBody = renderer.create(<TidligereMeldinger traad={statiskTraadMock} />);

    expect(dialogPanelBody.toJSON()).toMatchSnapshot();
    dialogPanelBody.unmount();
});
