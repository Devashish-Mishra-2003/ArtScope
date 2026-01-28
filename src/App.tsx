import { useState } from 'react';
import ArtworkTable from './components/ArtworkTable';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    const themeLink = document.getElementById('theme-link') as HTMLLinkElement | null;
    if (!themeLink) return;

    themeLink.href = darkMode
      ? 'https://unpkg.com/primereact/resources/themes/lara-light-blue/theme.css'
      : 'https://unpkg.com/primereact/resources/themes/lara-dark-blue/theme.css';

    setDarkMode(!darkMode);
  };

  return (
    <div style={{ padding: '1rem' }}>
      <ArtworkTable
        onToggleTheme={toggleTheme}
        darkMode={darkMode}
      />
    </div>
  );
}

export default App;

