import styled from 'styled-components';
import NavFrontendSpinner from 'nav-frontend-spinner';
import { CheckmarkCircleIcon, ExclamationmarkTriangleIcon } from '@navikt/aksel-icons';
import { DraftState } from './use-draft';
import { formatterDatoTid } from '../../../utils/date-utils';

const DraftStatusWrapper = styled.div`
    display: flex;
    align-items: center;
    font-style: italic;
`;

const CheckmarkCircleIconGreen = styled(CheckmarkCircleIcon)`
    color: var(--a-icon-success);
`;

const ErrorText = styled.span`
    color: var(--a-text-danger);
`;

const ExclamationmarkTriangleIconRed = styled(ExclamationmarkTriangleIcon)`
    color var(--a-text-danger);
`;

const DraftStatus = ({ state }: { state: DraftState }) => {
    return (
        <DraftStatusWrapper className="typo-etikett-liten">
            {state.loading ? (
                <>
                    <NavFrontendSpinner type="XXS" /> Lagrer utkast...
                </>
            ) : state.ok ? (
                <>
                    <CheckmarkCircleIconGreen />
                    Utkast lagret {state.saveTime ? formatterDatoTid(state.saveTime.toDate()) : ''}
                </>
            ) : (
                <>
                    <ExclamationmarkTriangleIconRed /> <ErrorText>Utkast ikke lagret!</ErrorText>
                </>
            )}
        </DraftStatusWrapper>
    );
};

export default DraftStatus;
