# Linklet URL shortener

## Run locally

1. Start MongoDB locally.
2. In `backend`, run `npm install` once, then `npm run dev`. The API listens on
   `http://localhost:8001`.
3. In `frontend`, run `npm install` once, then `npm run dev`. Open the local URL
   printed by Vite.

The Vite development server proxies `/url` requests to the Render backend. For
redirects, it removes the `/url` prefix because the deployed backend serves
short links at `/:shortId`. Set `VITE_SHORT_URL_BASE` to change the host used
when displaying generated short links.

The deployed service accepts link creation at `/url` and redirects at
`/:shortId`. Its saved-link list endpoint is not available in this deployment.
