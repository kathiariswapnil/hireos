# HireOS website

Enterprise marketing site for HireOS. Live at
[https://kathiariswapnil.github.io/hireos/](https://kathiariswapnil.github.io/hireos/).

## Local

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

GitHub Pages is published from the `gh-pages` branch. Local
dev does not use the `/hireos` base path; the Pages build sets `GITHUB_PAGES=true`.

Demo requests from `/demo` append a row to the private Google Sheet **HireOS Demo Requests** (tab: Demo requests).
