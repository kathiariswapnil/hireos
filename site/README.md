# HireOS website

Enterprise marketing site for HireOS. Live at
[https://kathiariswapnil.github.io/hireos/](https://kathiariswapnil.github.io/hireos/).

## Local

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

GitHub Pages builds from `main` via `.github/workflows/deploy-pages.yml`. Local
dev does not use the `/hireos` base path; the Pages build sets `GITHUB_PAGES=true`.
