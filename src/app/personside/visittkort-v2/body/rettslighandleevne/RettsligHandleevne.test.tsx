import { act } from '@testing-library/react';
import RettsligHandleevne from 'src/app/personside/visittkort-v2/body/rettslighandleevne/RettsligHandleevne';
import { aremark } from 'src/mock/persondata/aremark';
import { renderWithProviders } from 'src/test/Testprovider';

test('viser rettslig handlevne', async () => {
    const visittkortbody = await act(() =>
        renderWithProviders(<RettsligHandleevne rettsligHandleevne={aremark.rettsligHandleevne} />)
    );

    expect(visittkortbody.asFragment()).toMatchSnapshot();
});
