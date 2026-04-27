export type ExternalPanel = {
  id: string;
  title: string;
  description: string;
  url: string;
  displayMode?: "iframe" | "link";
  logoUrl?: string;
  linkNote?: string;
  cellGroup?: string;
};

export type UwGuideItem = {
  title: string;
  description?: string;
  rows?: {
    label: string;
    value: string;
  }[];
};

export type UwPressureLevel = {
  elevationFt: number;
  pressureHpa: number;
};

export type UwTimeHeightConfig = {
  stationName: string;
  pageLabel: string;
  imageName: string;
  pageUrl: string;
  imagePathTemplate: string;
  logoUrl: string;
  explanationUrl: string;
  guideItems: UwGuideItem[];
  windCheatSheetUrl: string;
  pressureAxisLabel: string;
  pressureLevels: UwPressureLevel[];
};

export type WeatherLocation = {
  id: string;
  name: string;
  shortName: string;
  region: string;
  nearbyPeaks: string[];
  lat: number;
  lon: number;
  elevationFt: number;
  elevationM: number;
  notes: string[];
  caltopoUrl: string;
  caltopoLogoUrl: string;
  mountainProjectUrl: string;
  mountainProjectLogoUrl: string;
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
    nearbyPeaks: [
      "Goat Rocks peaks to the north (Old Snowy, Ives, Gilbert)",
    ],
    lat: 46.1833,
    lon: -121.4844,
    elevationFt: 12281,
    elevationM: 3741,
    notes: [],
    caltopoUrl: "https://caltopo.com/map.html#ll=46.19843,-121.49282&z=13&b=mbt",
    caltopoLogoUrl:
      "https://play-lh.googleusercontent.com/zpPJZMGgZjSFycF0-FoLh2Vffk7bd7M9MWs8FuMn3i8K41DDlUbpQ_8O0gRt7jgdgtY=w240-h480",
    mountainProjectUrl:
      "https://www.mountainproject.com/area/105877037/mount-adams",
    mountainProjectLogoUrl:
      "https://play-lh.googleusercontent.com/KN-RI2QvMFqa27aYoTj120lm7iC4g3MS3WjxIWOSzGHaX2-4vS5ZxQYo6B5964zaTw=w240-h480",
    noaaPointUrl:
      "https://forecast.weather.gov/MapClick.php?lat=46.18327717744471&lon=-121.48441314697266",
    noaaGraphicalUrl:
      "https://forecast.weather.gov/MapClick.php?lat=46.1833&lon=-121.4844&unit=0&lg=english&FcstType=graphical",
    noaaApiPoint: "https://api.weather.gov/points/46.1833,-121.4844",
    panels: [
      {
        id: "noaa-graphical-page",
        title: "NOAA Graphical Forecast",
        description:
          "Hourly-style graphical guidance from the same NOAA forecast point.",
        url: "https://forecast.weather.gov/MapClick.php?lat=46.1833&lon=-121.4844&unit=0&lg=english&FcstType=graphical",
        displayMode: "iframe",
      },
      {
        id: "mountain-forecast",
        title: "Mountain Forecast",
        description:
          "Summit-oriented long-range forecast page for Mount Adams.",
        url: "https://www.mountain-forecast.com/peaks/Mount-Adams/forecasts/3741",
        displayMode: "link",
        cellGroup: "summit-sources",
        logoUrl:
          "https://play-lh.googleusercontent.com/7vKznYB-helSz_H_EkXTMdL5H2hnMPbgOa5XhJZbh3pQtGD636-okLYNfII7qJL_3g=w240-h480-rw",
        linkNote:
          "Mountain Forecast blocks framing in the browser, so this dashboard opens the forecast page directly instead.",
      },
      {
        id: "nwac-east-slopes-south",
        title: "NWAC Avalanche Forecast",
        description:
          "Northwest Avalanche Center forecast for East Slopes South.",
        url: "https://nwac.us/avalanche-forecast/#/east-slopes-south",
        displayMode: "link",
        cellGroup: "summit-sources",
        logoUrl:
          "https://files.nwac.us/wp-content/uploads/2022/10/04100643/Board-Members-Photos-9.png",
        linkNote:
          "NWAC is shown as a direct link here since its forecast experience is more reliable outside an iframe.",
      },
    ],
    uwTimeHeight: {
      stationName: "Kosmos, WA",
      pageLabel: "4 km Kosmos, WA 46.53N,122.2W",
      imageName: "kosmo.th.gif",
      pageUrl:
        "https://a.atmos.washington.edu/mm5rt/rt/load.cgi?latest+YYYYMMDDHH/images_d3/kosmo.th.gif+text+4%20km%20Kosmos,WA%2046.53N,122.2W",
      imagePathTemplate:
        "https://a.atmos.washington.edu/wrfrt/data/RUN_TAG/images_d3/kosmo.th.gif",
      logoUrl:
        "https://uw-s3-cdn.s3.us-west-2.amazonaws.com/wp-content/uploads/sites/230/2023/11/02134810/W-Logo_Purple_RGB.png",
      explanationUrl:
        "https://cascadeclimbers.com/forum/topic/103812-better-pnw-weather-forecasting/",
      guideItems: [
        {
          title: "Legend",
          rows: [
            {
              label: "x-axis",
              value: "UTC time, read right to left",
            },
            {
              label: "y-axis",
              value: "Barometric pressure (see cheat sheet for conversion to elevation)",
            },
            {
              label: "green blobs",
              value: "Precipitation that can be rain, snow, or sleet depending on temperature",
            },
            {
              label: "red lines",
              value: "Temperature in Celsius",
            },
            {
              label: "green lines",
              value: "Relative humidity",
            },
          ],
        },
        {
          title: "Wind",
          description:
            "Arrows show wind. Use the cheat sheet in this card to decode direction and speed quickly.",
        },
      ],
      windCheatSheetUrl:
        "https://firefightertoolbox.com/wp-content/uploads/2014/02/WindspeedandDirectionFronts.png",
      pressureAxisLabel:
        "The y-axis uses barometric pressure in hectopascal (hPa).",
      pressureLevels: [
        { elevationFt: 0, pressureHpa: 1000 },
        { elevationFt: 3200, pressureHpa: 900 },
        { elevationFt: 6400, pressureHpa: 800 },
        { elevationFt: 10000, pressureHpa: 700 },
        { elevationFt: 13800, pressureHpa: 600 },
      ],
    },
  },
  {
    id: "mount-hood",
    name: "Mount Hood",
    shortName: "Mt. Hood",
    region: "North Oregon Cascades",
    nearbyPeaks: [],
    lat: 45.372,
    lon: -121.692,
    elevationFt: 11249,
    elevationM: 3429,
    notes: [],
    caltopoUrl: "https://caltopo.com/map.html#ll=45.35393,-121.67544",
    caltopoLogoUrl:
      "https://play-lh.googleusercontent.com/zpPJZMGgZjSFycF0-FoLh2Vffk7bd7M9MWs8FuMn3i8K41DDlUbpQ_8O0gRt7jgdgtY=w240-h480",
    mountainProjectUrl:
      "https://www.mountainproject.com/area/105789896/mt-hood",
    mountainProjectLogoUrl:
      "https://play-lh.googleusercontent.com/KN-RI2QvMFqa27aYoTj120lm7iC4g3MS3WjxIWOSzGHaX2-4vS5ZxQYo6B5964zaTw=w240-h480",
    noaaPointUrl:
      "https://forecast.weather.gov/MapClick.php?lon=-121.692&lat=45.372",
    noaaGraphicalUrl:
      "https://forecast.weather.gov/MapClick.php?lat=45.372&lon=-121.692&unit=0&lg=english&FcstType=graphical",
    noaaApiPoint: "https://api.weather.gov/points/45.372,-121.692",
    panels: [
      {
        id: "hood-noaa-graphical-page",
        title: "NOAA Graphical Forecast",
        description:
          "Hourly-style graphical guidance from the same NOAA forecast point.",
        url: "https://forecast.weather.gov/MapClick.php?lat=45.372&lon=-121.692&unit=0&lg=english&FcstType=graphical",
        displayMode: "iframe",
      },
      {
        id: "hood-mountain-forecast",
        title: "Mountain Forecast",
        description: "Summit-oriented long-range forecast page for Mount Hood.",
        url: "https://www.mountain-forecast.com/peaks/Mount-Hood/forecasts/3426",
        displayMode: "link",
        cellGroup: "summit-sources",
        logoUrl:
          "https://play-lh.googleusercontent.com/7vKznYB-helSz_H_EkXTMdL5H2hnMPbgOa5XhJZbh3pQtGD636-okLYNfII7qJL_3g=w240-h480-rw",
        linkNote:
          "Mountain Forecast blocks framing in the browser, so this dashboard opens the forecast page directly instead.",
      },
      {
        id: "hood-nwac",
        title: "NWAC Avalanche Forecast",
        description: "Northwest Avalanche Center forecast for Mount Hood.",
        url: "https://nwac.us/avalanche-forecast/#/mt-hood",
        displayMode: "link",
        cellGroup: "summit-sources",
        logoUrl:
          "https://files.nwac.us/wp-content/uploads/2022/10/04100643/Board-Members-Photos-9.png",
        linkNote:
          "NWAC is shown as a direct link here since its forecast experience is more reliable outside an iframe.",
      },
    ],
    uwTimeHeight: {
      stationName: "Cascade Locks, OR",
      pageLabel: "4 km Cascade Locks, OR 45.67N,121.88W",
      imageName: "kczk.th.gif",
      pageUrl:
        "https://a.atmos.washington.edu/mm5rt/rt/load.cgi?latest+YYYYMMDDHH/images_d3/kczk.th.gif+text+4%20km%20Cascade%20Locks,OR%2045.67N,121.88W",
      imagePathTemplate:
        "https://a.atmos.washington.edu/wrfrt/data/RUN_TAG/images_d3/kczk.th.gif",
      logoUrl:
        "https://uw-s3-cdn.s3.us-west-2.amazonaws.com/wp-content/uploads/sites/230/2023/11/02134810/W-Logo_Purple_RGB.png",
      explanationUrl:
        "https://cascadeclimbers.com/forum/topic/103812-better-pnw-weather-forecasting/",
      guideItems: [
        {
          title: "Legend",
          rows: [
            {
              label: "x-axis",
              value: "UTC time, read right to left",
            },
            {
              label: "y-axis",
              value: "Barometric pressure (see cheat sheet for conversion to elevation)",
            },
            {
              label: "green blobs",
              value: "Precipitation that can be rain, snow, or sleet depending on temperature",
            },
            {
              label: "red lines",
              value: "Temperature in Celsius",
            },
            {
              label: "green lines",
              value: "Relative humidity",
            },
          ],
        },
        {
          title: "Wind",
          description:
            "Arrows show wind. Use the cheat sheet in this card to decode direction and speed quickly.",
        },
      ],
      windCheatSheetUrl:
        "https://firefightertoolbox.com/wp-content/uploads/2014/02/WindspeedandDirectionFronts.png",
      pressureAxisLabel:
        "The y-axis uses barometric pressure in hectopascal (hPa).",
      pressureLevels: [
        { elevationFt: 0, pressureHpa: 1000 },
        { elevationFt: 3200, pressureHpa: 900 },
        { elevationFt: 6400, pressureHpa: 800 },
        { elevationFt: 10000, pressureHpa: 700 },
        { elevationFt: 13800, pressureHpa: 600 },
      ],
    },
  },
];
