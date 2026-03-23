import "BezierCurve.js";

var simplemaps_usmap_mapdata = {
  // This is a way of editing maps from simplemaps.com
  // To add our airports as dots on the map we enter them as labels in the label section down below
  // Once we have all of this done we can then upload it to simple maps again and get  our svg
  main_settings: {
    //General settings
    width: "responsive",
    background_color: "#FFFFFF",
    background_transparent: "yes",
    border_color: "#ffffff",

    //State defaults
    state_description: "State Description",
    state_color: "#292f3e",
    state_url: "",
    border_size: 1.5,
    all_states_inactive: "yes",
    all_states_zoomable: "no",

    //Location defaults
    // location_description: "Airport",
    location_color: "#ED2B2B",
    location_opacity: 1,
    location_url: "",
    location_size: 10,
    // location_image_source: "frog.png",
    location_border_color: "#FFFFFF",
    location_border: 0.5,
    all_locations_inactive: "no",
    all_locations_hidden: "no",
    location_type: "circle",
  },
  state_specific: {
    HI: {
      name: "Hawaii",
      hide: "yes",
    },
    AK: {
      name: "Alaska",
      hide: "yes",
    },
    FL: {
      name: "Florida",
    },
    NH: {
      name: "New Hampshire",
    },
    VT: {
      name: "Vermont",
    },
    ME: {
      name: "Maine",
    },
    RI: {
      name: "Rhode Island",
    },
    NY: {
      name: "New York",
    },
    PA: {
      name: "Pennsylvania",
    },
    NJ: {
      name: "New Jersey",
    },
    DE: {
      name: "Delaware",
    },
    MD: {
      name: "Maryland",
    },
    VA: {
      name: "Virginia",
    },
    WV: {
      name: "West Virginia",
    },
    OH: {
      name: "Ohio",
    },
    IN: {
      name: "Indiana",
    },
    IL: {
      name: "Illinois",
    },
    CT: {
      name: "Connecticut",
    },
    WI: {
      name: "Wisconsin",
    },
    NC: {
      name: "North Carolina",
    },
    DC: {
      name: "District of Columbia",
    },
    MA: {
      name: "Massachusetts",
    },
    TN: {
      name: "Tennessee",
    },
    AR: {
      name: "Arkansas",
    },
    MO: {
      name: "Missouri",
    },
    GA: {
      name: "Georgia",
    },
    SC: {
      name: "South Carolina",
    },
    KY: {
      name: "Kentucky",
    },
    AL: {
      name: "Alabama",
    },
    LA: {
      name: "Louisiana",
    },
    MS: {
      name: "Mississippi",
    },
    IA: {
      name: "Iowa",
    },
    MN: {
      name: "Minnesota",
    },
    OK: {
      name: "Oklahoma",
    },
    TX: {
      name: "Texas",
    },
    NM: {
      name: "New Mexico",
    },
    KS: {
      name: "Kansas",
    },
    NE: {
      name: "Nebraska",
    },
    SD: {
      name: "South Dakota",
    },
    ND: {
      name: "North Dakota",
    },
    WY: {
      name: "Wyoming",
    },
    MT: {
      name: "Montana",
    },
    CO: {
      name: "Colorado",
    },
    UT: {
      name: "Utah",
    },
    AZ: {
      name: "Arizona",
    },
    NV: {
      name: "Nevada",
    },
    OR: {
      name: "Oregon",
    },
    WA: {
      name: "Washington",
    },
    CA: {
      name: "California",
    },
    MI: {
      name: "Michigan",
    },
    ID: {
      name: "Idaho",
    },
    GU: {
      name: "Guam",
      hide: "yes",
    },
    VI: {
      name: "Virgin Islands",
      hide: "yes",
    },
    PR: {
      name: "Puerto Rico",
      hide: "yes",
    },
    MP: {
      name: "Northern Mariana Islands",
      hide: "yes",
    },
    AS: {
      name: "American Samoa",
      hide: "yes",
    },
  },
  locations: {
    0:  { lat: "35.04", lng: "-106.61", name: "ABQ" },
    2:  { lat: "33.64", lng: "-84.43",  name: "ATL" },

    3:  { lat: "34.97", lng: "-105.55", color: "#FFFFFF", shape: "circle", size: 5 },
    4:  { lat: "34.91", lng: "-104.50", color: "#FFFFFF", shape: "circle", size: 5 },
    5:  { lat: "34.84", lng: "-103.44", color: "#FFFFFF", shape: "circle", size: 5 },
    6:  { lat: "34.77", lng: "-102.38", color: "#FFFFFF", shape: "circle", size: 5 },
    7:  { lat: "34.71", lng: "-101.33", color: "#FFFFFF", shape: "circle", size: 5 },
    8:  { lat: "34.64", lng: "-100.27", color: "#FFFFFF", shape: "circle", size: 5 },
    9:  { lat: "34.57", lng: "-99.21",  color: "#FFFFFF", shape: "circle", size: 5 },
    10: { lat: "34.51", lng: "-98.16",  color: "#FFFFFF", shape: "circle", size: 5 },
    11: { lat: "34.44", lng: "-97.10",  color: "#FFFFFF", shape: "circle", size: 5 },
    12: { lat: "34.37", lng: "-96.04",  color: "#FFFFFF", shape: "circle", size: 5 },
    13: { lat: "34.31", lng: "-94.99",  color: "#FFFFFF", shape: "circle", size: 5 },
    14: { lat: "34.24", lng: "-93.93",  color: "#FFFFFF", shape: "circle", size: 5 },
    15: { lat: "34.17", lng: "-92.87",  color: "#FFFFFF", shape: "circle", size: 5 },
    16: { lat: "34.11", lng: "-91.82",  color: "#FFFFFF", shape: "circle", size: 5 },
    17: { lat: "34.04", lng: "-90.76",  color: "#FFFFFF", shape: "circle", size: 5 },
    18: { lat: "33.97", lng: "-89.70",  color: "#FFFFFF", shape: "circle", size: 5 },
    19: { lat: "33.91", lng: "-88.65",  color: "#FFFFFF", shape: "circle", size: 5 },
    20: { lat: "33.84", lng: "-87.59",  color: "#FFFFFF", shape: "circle", size: 5 },
    21: { lat: "33.77", lng: "-86.53",  color: "#FFFFFF", shape: "circle", size: 5 },
    22: { lat: "33.71", lng: "-85.48",  color: "#FFFFFF", shape: "circle", size: 5 },
  },
}

const routes = [
  { x1: -106.61, y1: 35.04, x2: -84.43, y2: 33.64 },
];

nextNumber = 0;

for (const r of routes) {
  const curve = new Curve(r.x1, r.y1, r.x2, r.y2);
  for (const p of curve.getPoints()) {
    simplemaps_usmap_mapdata.locations[nextNumber] = p;
    nextNumber++;
  }
}
