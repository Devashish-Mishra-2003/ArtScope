export default function TableHeader() {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <span>Artworks</span>
      <span style={{ fontSize: '0.9rem', opacity: 0.7 }}>
        Server-side pagination enabled
      </span>
    </div>
  );
}
