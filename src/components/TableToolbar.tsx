import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';

type Props = {
  rowsCount: number;
  shownSelected: number;
  onCustomSelect: (e: React.MouseEvent) => void;
  onClear: () => void;
  onToggleTheme: () => void;
  darkMode: boolean;
};

export default function TableToolbar({
  rowsCount,
  shownSelected,
  onCustomSelect,
  onClear,
  onToggleTheme,
  darkMode
}: Props) {
  const leftPart = (
    <div style={{ display: 'flex', gap: '0.5rem' }}>
      <Button
        label="Custom Select"
        icon="pi pi-check-square"
        className="p-button-sm"
        onClick={onCustomSelect}
      />

      <Button
        label="Clear"
        icon="pi pi-times"
        className="p-button-sm p-button-secondary"
        onClick={onClear}
      />
    </div>
  );

  const rightPart = (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <span style={{ fontWeight: 500 }}>
        Rows: {rowsCount} | Selected: {shownSelected}
      </span>

      <Button
        icon={darkMode ? 'pi pi-sun' : 'pi pi-moon'}
        className="p-button-rounded p-button-text"
        onClick={onToggleTheme}
      />
    </div>
  );

  return <Toolbar left={leftPart} right={rightPart} className="table-toolbar" />;
}
