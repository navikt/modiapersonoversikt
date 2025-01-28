import { Temagruppe, temagruppeTekst } from 'src/models/temagrupper';

export function TemagruppeActionMenuItems() {
    const temagruppeActionMenuItems = Object.values(Temagruppe).map((temagruppe) => (
        <option key={temagruppe} value={temagruppe}>
            {temagruppeTekst(temagruppe)}
        </option>
    ));

    temagruppeActionMenuItems.unshift(
        <option key="default" value="" disabled selected>
            Velg temagruppe
        </option>
    );

    return temagruppeActionMenuItems;
}
