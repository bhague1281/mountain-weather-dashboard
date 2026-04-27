export type ExternalPanel = {
  id: string;
  title: string;
  description: string;
  url: string;
  kind: "iframe";
};

export type UwTimeHeightConfig = {
  stationName: string;
  pageLabel: string;
  imageName: string;
  pagePathTemplate: string;
  imagePathTemplate: string;
  guideLines: string[];
};

export type WeatherLocation = {
  id: string;
  name: string;
  shortName: string;
  region: string;
  description: string;
  lat: number;
  lon: number;
  elevationFt: number;
  elevationM: number;
  notes: string[];
  noaaPointUrl: string;
  noaaGraphicalUrl: string;
  noaaApiPoint: string;
  panels: ExternalPanel[];
  uwTimeHeight?: UwTimeHeightConfig;
};

export const locations: WeatherLocation[] = [
  {
    id: "mount-adams",
    name: "Mount Adams",
    shortName: "Mt. Adams",
    region: "South Washington Cascades",
    description:
      "A starting dashboard for tracking summit weather, nearby point forecasts, and the UW time-height view for the Mt. Adams area.",
    lat: 46.1833,
    lon: -121.4844,
    elevationFt: 12281,
    elevationM: 3741,
    notes: [
      "NOAA point forecasts are grid-box based, so treat them as terrain-aware guidance rather than a perfect summit forecast.",
      "The UW time-height image is a nearby model cross-section reference, not a direct summit observation.",
      "Mountain Forecast is useful for summit-focused wind and freezing-level context when the embed loads cleanly.",
    ],
    noaaPointUrl:
      "https://forecast.weather.gov/MapClick.php?lat=46.18327717744471&lon=-121.48441314697266",
    noaaGraphicalUrl:
      "https://forecast.weather.gov/MapClick.php?lat=46.1833&lon=-121.4844&unit=0&lg=english&FcstType=graphical",
    noaaApiPoint: "https://api.weather.gov/points/46.1833,-121.4844",
    panels: [
      {
        id: "mountain-forecast",
        title: "Mountain Forecast",
        description:
          "Summit-oriented long-range forecast page for Mount Adams.",
        url: "https://www.mountain-forecast.com/peaks/Mount-Adams/forecasts/3741",
        kind: "iframe",
      },
      {
        id: "noaa-point-page",
        title: "NOAA Point Forecast Page",
        description:
          "The standard NOAA point click page with text forecast and nearby conditions.",
        url: "https://forecast.weather.gov/MapClick.php?lat=46.18327717744471&lon=-121.48441314697266",
        kind: "iframe",
      },
      {
        id: "noaa-graphical-page",
        title: "NOAA Graphical Forecast",
        description:
          "Hourly-style graphical guidance from the same NOAA forecast point.",
        url: "https://forecast.weather.gov/MapClick.php?lat=46.1833&lon=-121.4844&unit=0&lg=english&FcstType=graphical",
        kind: "iframe",
      },
    ],
    uwTimeHeight: {
      stationName: "Kosmos, WA",
      pageLabel: "4 km Kosmos, WA 46.53N,122.2W",
      imageName: "kosmo.th.gif",
      pagePathTemplate:
        "https://a.atmos.washington.edu/mm5rt/rt/load.cgi?latest+RUN_TAG/images_d3/kosmo.th.gif+text+4%20km%20Kosmos,WA%2046.53N,122.2W",
      imagePathTemplate:
        "https://a.atmos.washington.edu/wrfrt/data/RUN_TAG/images_d3/kosmo.th.gif",
      guideLines: [
        "Read left to right for time evolution and top to bottom for height through the atmosphere.",
        "Use the strongest colored wind bands and tighter contour changes to spot the windiest windows.",
        "Watch the freezing-level cues and temperature structure before trusting a snow, ice, or rain call.",
        "Cross-check timing with NOAA and Mountain Forecast before committing to travel or climbing plans.",
      ],
    },
  },
];
