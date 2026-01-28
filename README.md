# ArtScope 

ArtScope is a React + TypeScript application built using Vite and PrimeReact DataTable.  
It displays artwork data from the Art Institute of Chicago API with **server-side pagination** and **persistent row selection**.

This project was developed as part of a React internship assignment.

---

## Live Demo
Deployed on Netlify:  
https://artscope.netlify.app

---

## Tech Stack
- React (Vite)
- TypeScript
- PrimeReact
- PrimeIcons

---

## API Used
Art Institute of Chicago API  
https://api.artic.edu/api/v1/artworks

---

## Features
- Server-side pagination (data fetched per page)
- PrimeReact DataTable
- Row selection with checkboxes
- Select/Deselect all rows on current page
- Custom row selection overlay (select N rows)
- Persistent selection across pages
- Dark / Light mode toggle
- Handles missing API fields gracefully (shows `N/A`)
- Truncated long text with popup dialog
- Responsive layout

---

## Setup & Run Locally

Clone the repository:

```bash
git clone https://github.com/Devashish-Mishra-2003/ArtScope.git
cd ArtScope
```

## Install dependencies:
```bash
npm install
```

## Start development server:
```bash
npm run dev
```
---
## Selection Logic (Important)

- Only the current page is fetched from the API
- Selected rows are tracked using their IDs
- No data is prefetched from other pages
- Selection persists when navigating between pages
- Custom selection uses a count-based strategy without storing other page rows
  
---

## Project Structure (Simplified)
```bash
src/
  api/
    artworksApi.ts
  components/
    ArtworkTable.tsx
    TableToolbar.tsx
    TableHeader.tsx
  hooks/
    useArtworks.ts
  types/
    artwork.ts
```

---

## Notes

Some fields from the API may be null, so the UI displays N/A where appropriate.
The application fetches only the current page of data and does not cache or prefetch future pages.

---

## Author

Devashish Mishra

## License

This project is for educational and assignment purposes.
