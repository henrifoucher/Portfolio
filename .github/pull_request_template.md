## Summary

Describe your changes briefly.

## Deployment notes

- This repository deploys to GitHub Pages via the `main` branch using the workflow at `.github/workflows/deploy.yml`.
- If you add or rename routes or change the repository name, ensure `vite.config.js` `base` is updated (currently `/Portfolio/`).
- After merging, the workflow will build and publish the site automatically.

## Checklist
- [ ] Tests added/updated (if applicable)
- [ ] Build locally with `npm ci && npm run build` and confirm `build/client` is created
- [ ] Update `README.md` or docs when public URLs change
