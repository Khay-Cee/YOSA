# YOSA Frontend

React 18 app (Create React App) for the Youth Space Afrika platform.

## Setup

```bash
npm install
npm start       # dev server at http://localhost:3000
npm run build   # production build
npm test        # run tests
```

Requires the Django backend running at `http://localhost:8000` — see the [root README](../README.md) for backend setup.

## Structure

```
src/
├── api/
│   ├── axios.js          # Axios instance (base URL: http://localhost:8000/api)
│   └── ApiService.js     # One function per API resource
├── Assets/               # Images and static assets
├── Components/           # Reusable widgets (Navbar, Footer, Donate, Volunteer, etc.)
├── Pages/                # Full route pages (Home, About, ContactUs, FAQ, ThankYou, etc.)
└── Styles/               # CSS files (plain CSS, CSS Modules, Tailwind)
```

## Key Dependencies

| Package | Purpose |
|---|---|
| `react-router-dom` v6 | Client-side routing |
| `axios` | HTTP requests to Django API |
| `react-paystack` v5 | Paystack payment popup |
| `react-markdown` | Renders News post bodies (Markdown) |
| `react-icons` | Icon set (Feather icons via `fi` prefix) |
| `@mui/material` | MUI component library |

## Notes

- The Paystack public key is hardcoded in `src/Components/Donate.jsx` — replace with a live key before production.
- `react-paystack` v5 uses an object callback API: `initializePayment({ onSuccess, onClose })`.
- Tailwind styles live in `src/Styles/tailwind.css` (imported per-component, not global).
