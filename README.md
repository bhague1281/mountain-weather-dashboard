# Mountain Weather Dashboard

A static React dashboard for comparing mountain weather sources on GitHub Pages.

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deploy to GitHub Pages

```bash
npm run deploy
```

The Vite `base` is configured to use relative asset paths during build, which keeps this app friendly to GitHub Pages project sites.

## Add more mountains

Edit [`src/data/locations.ts`](./src/data/locations.ts) and add another `WeatherLocation` object with:

- the location metadata and notes
- the NOAA point page and graphical page URLs
- the `api.weather.gov/points/{lat},{lon}` URL
- any source panels you want embedded
- an optional UW time-height configuration when you have a matching station image
