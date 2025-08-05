import { ToggleGroup } from '@navikt/ds-react';
import { SakKategori } from 'src/app/personside/infotabs/meldinger/traadvisning/verktoylinje/journalforing/JournalforingPanel';

interface SakVelgerRadioGroupProps {
    valgtSakKategori: SakKategori;
    setSakKategori: (sakKategori: SakKategori) => void;
}

const SakVelgerToggleGroup: React.FC<SakVelgerRadioGroupProps> = ({ valgtSakKategori, setSakKategori }) => {
    return (
        <ToggleGroup
            size="small"
            label="Saktype"
            value={valgtSakKategori}
            onChange={(value) => setSakKategori(value as SakKategori)}
        >
            {Object.values(SakKategori).map((sakKategori) => (
                <ToggleGroup.Item value={sakKategori} key={sakKategori} label={sakKategori} />
            ))}
        </ToggleGroup>
    );
};

export default SakVelgerToggleGroup;
