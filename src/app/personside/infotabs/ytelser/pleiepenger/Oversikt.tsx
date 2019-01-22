import * as React from 'react';
import { Pleiepengerettighet } from '../../../../../models/ytelse/pleiepenger';
import { OversiktStyling } from '../felles-styling/CommonStylingYtelser';
import YtelserBullet from '../felles-styling/YtelserBullet';
import DescriptionList from '../felles-styling/DescriptionList';
import { getAlleArbiedsforholdSortert, getSisteVedtakForPleiepengerettighet } from './pleiepengerUtils';
import { formaterDato } from '../../../../../utils/dateUtils';
import { utledKjønnFraFødselsnummer } from '../../../../../utils/fnr-utils';
import { Kjønn } from '../../../../../models/person/person';
import ArbeidsForhold from './Arbeidsforhold';
import styled from 'styled-components';
import theme from '../../../../../styles/personOversiktTheme';
import { AppState } from '../../../../../redux/reducers';
import { AsyncDispatch } from '../../../../../redux/ThunkTypes';
import { toggleVisAlleArbeidsforholdActionCreator } from '../../../../../redux/ytelser/pleiepengerReducer';
import { connect } from 'react-redux';
import DetaljerCollapse from '../../../../../components/DetaljerCollapse';

interface OwnProps {
    pleiepenger: Pleiepengerettighet;
}

interface StateProps {
    visAlleArbeidsforhold: boolean;
}

interface DispatchProps {
    toggleVisAlleArbeidsforhold: () => void;
}

type Props = DispatchProps & OwnProps & StateProps;

const ArbeidsForholdListeStyle = styled.ol`
  list-style: none;
  > *:not(:first-child) {
    border-top: ${theme.border.skilleSvak};
  }
  > *:not(:last-child) {
    margin-bottom: 2rem;
  }
`;

function getKjønnString(fnr: string): string {
    switch (utledKjønnFraFødselsnummer(fnr)) {
        case Kjønn.Mann:
            return 'gutt';
        case Kjønn.Kvinne:
            return 'jente';
        case Kjønn.Diskresjonskode:
            return 'diskresjonskode';
        default:
            return '';
    }
}

function Oversikt({pleiepenger, visAlleArbeidsforhold, toggleVisAlleArbeidsforhold}: Props) {

    const gjeldeneVedtak = getSisteVedtakForPleiepengerettighet(pleiepenger);
    const kjønn = getKjønnString(pleiepenger.barnet);
    const [gjeldendeArbeidsforhold, ...tidligereArbeidsforhold] = getAlleArbiedsforholdSortert(pleiepenger);

    const omPleiepengerettenEntries = {
        'Fra og med': formaterDato(gjeldeneVedtak.periode.fom),
        'Til og med': formaterDato(gjeldeneVedtak.periode.tom),
        Pleiepengegrad: gjeldeneVedtak.pleiepengegrad + '%',
        ['Barnet (' + kjønn + ')']: pleiepenger.barnet,
        'Annen forelder': pleiepenger.andreOmsorgsperson
    };

    return (
        <OversiktStyling>
            <YtelserBullet tittel="Om pleiepengeretten">
                <DescriptionList entries={omPleiepengerettenEntries}/>
            </YtelserBullet>
            <YtelserBullet tittel="Arbeidssituasjon">
                <ArbeidsForhold arbeidsforhold={gjeldendeArbeidsforhold}/>
                <DetaljerCollapse
                    open={visAlleArbeidsforhold}
                    toggle={toggleVisAlleArbeidsforhold}
                    tittel="alle arbeidsforhold"
                >
                    <ArbeidsForholdListeStyle aria-label="Andre arbeidsforhold">
                        {tidligereArbeidsforhold.map((arbForhold, index) =>
                            <li key={index}><ArbeidsForhold arbeidsforhold={arbForhold}/></li>)}
                    </ArbeidsForholdListeStyle>
                </DetaljerCollapse>
            </YtelserBullet>
        </OversiktStyling>);
}

function mapStateToProps(state: AppState): StateProps {
    return {
        visAlleArbeidsforhold: state.pleiepenger.visAlleArbeidsforhold
    };
}

function mapDispatchToProps(dispatch: AsyncDispatch): DispatchProps {
    return {
        toggleVisAlleArbeidsforhold: () => dispatch(toggleVisAlleArbeidsforholdActionCreator())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Oversikt);
