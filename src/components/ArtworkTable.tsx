import { useEffect, useRef, useState } from 'react';
import { DataTable, type DataTablePageEvent } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { OverlayPanel } from 'primereact/overlaypanel';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';

import { useArtworks } from '../hooks/useArtworks';
import TableHeader from './TableHeader';
import TableToolbar from './TableToolbar';

export default function ArtworkTable({
  onToggleTheme,
  darkMode
}: {
  onToggleTheme: () => void;
  darkMode: boolean;
}) {
  const [pageNo, setPageNo] = useState(1);
  const [rowsCount, setRowsCount] = useState(12);

  const { data, total, loading } = useArtworks(pageNo, rowsCount);

  const [pickedIds, setPickedIds] = useState<Set<number>>(new Set());
  const [targetCount, setTargetCount] = useState<number | null>(null);

  const [popupText, setPopupText] = useState<string | null>(null);

  const panelRef = useRef<OverlayPanel>(null);
  const [inputVal, setInputVal] = useState<number | null>(null);

  const blockRefill = useRef(false);

  const onPageChange = (e: DataTablePageEvent) => {
    if (typeof e.page !== 'number' || typeof e.rows !== 'number') return;
    setPageNo(e.page + 1);
    setRowsCount(e.rows);
  };

  useEffect(() => {
    if (targetCount === null) return;
    if (!data.length) return;

    if (blockRefill.current) {
      blockRefill.current = false;
      return;
    }

    const need = targetCount - pickedIds.size;
    if (need <= 0) return;

    setPickedIds(prev => {
      const copy = new Set(prev);

      for (let i = 0; i < data.length && copy.size < targetCount; i++) {
        copy.add(data[i].id);
      }

      return copy;
    });
  }, [data, targetCount]);

  const onRowSelectChange = (e: any) => {
    const newIds = new Set<number>();

    if (Array.isArray(e.value)) {
      e.value.forEach((r: any) => newIds.add(r.id));
    }

    const beforeCount = data.filter(r => pickedIds.has(r.id)).length;
    const afterCount = newIds.size;
    const diff = beforeCount - afterCount;

    setPickedIds(prev => {
      const updated = new Set(prev);
      data.forEach(r => updated.delete(r.id));
      newIds.forEach(id => updated.add(id));
      return updated;
    });

    if (targetCount !== null && diff > 0) {
      setTargetCount(targetCount - diff);
      blockRefill.current = true;
    }
  };

  const getSelectedForPage = () => {
    return data.filter(r => pickedIds.has(r.id));
  };

  const shortText = (val?: string) => {
    if (val == null) return 'N/A';
    if (val.length < 80) return val;

    return (
      <span>
        {val.slice(0, 80)}...{' '}
        <span
          style={{ color: '#3b82f6', cursor: 'pointer', fontWeight: 500 }}
          onClick={() => setPopupText(val)}
        >
          View
        </span>
      </span>
    );
  };

  const doCustomPick = () => {
    if (!inputVal || inputVal <= 0) return;

    setTargetCount(inputVal);

    const copy = new Set<number>();
    const max = Math.min(inputVal, data.length);

    for (let i = 0; i < max; i++) {
      copy.add(data[i].id);
    }

    setPickedIds(copy);
    panelRef.current?.hide();
  };

  const clearAll = () => {
    setPickedIds(new Set());
    setTargetCount(null);
  };

  return (
    <>
      <TableToolbar
        rowsCount={rowsCount}
        shownSelected={targetCount ?? pickedIds.size}
        onCustomSelect={(e) => panelRef.current?.toggle(e)}
        onClear={clearAll}
        onToggleTheme={onToggleTheme}
        darkMode={darkMode}
      />

      <OverlayPanel ref={panelRef}>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <InputNumber
            value={inputVal}
            onValueChange={(e) => setInputVal(e.value ?? null)}
            placeholder="Enter number"
          />
          <Button label="Select" onClick={doCustomPick} />
        </div>
      </OverlayPanel>

      <DataTable
        value={data}
        paginator
        rows={rowsCount}
        totalRecords={total}
        lazy
        first={(pageNo - 1) * rowsCount}
        onPage={onPageChange}
        loading={loading}
        header={<TableHeader />}
        dataKey="id"
        selection={getSelectedForPage()}
        onSelectionChange={onRowSelectChange}
        selectionMode="checkbox"
        responsiveLayout="scroll"
        rowHover
        className="p-datatable-sm"
      >
        <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} />

        <Column
          field="title"
          header="Title"
          body={(r) => <span style={{ fontWeight: 600 }}>{r.title ?? 'N/A'}</span>}
          style={{ width: '30%' }}
        />

        <Column
          field="place_of_origin"
          header="Origin"
          body={(r) => r.place_of_origin ?? 'N/A'}
          style={{ width: '12%' }}
        />

        <Column
          field="artist_display"
          header="Artist"
          body={(r) => r.artist_display ?? 'N/A'}
          style={{ width: '15%' }}
        />

        <Column
          header="Inscriptions"
          body={(r) => shortText(r.inscriptions)}
          style={{ width: '20%' }}
        />

        <Column
          field="date_start"
          header="Start"
          body={(r) => r.date_start ?? 'N/A'}
          style={{ width: '10%' }}
        />

        <Column
          field="date_end"
          header="End"
          body={(r) => r.date_end ?? 'N/A'}
          style={{ width: '10%' }}
        />
      </DataTable>

      <Dialog
        header="Full Text"
        visible={!!popupText}
        style={{ width: '50vw' }}
        onHide={() => setPopupText(null)}
      >
        <p style={{ whiteSpace: 'pre-wrap' }}>{popupText}</p>
      </Dialog>
    </>
  );
}
