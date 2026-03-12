var simplemaps_usmap_mapdata = {
  // This is a way of editing maps from simplemaps.com
  // To add our airports as dots on the map we enter them as labels in the label section down below
  // Once we have all of this done we can then upload it to simple maps again and get  our svg
  main_settings: {
    //General settings
    width: "487", //'700' or 'responsive'
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
    location_description: "Add location markers using latitude and longitude!",
    location_color: "#d42020",
    location_opacity: 1,
    location_url: "",
    location_size: 15,
    location_image_source: "frog.png",
    location_border_color: "#FFFFFF",
    location_border: 2,
    all_locations_inactive: "no",
    all_locations_hidden: "no",
    location_type: "circle",

    //Label defaults
    label_color: "#d5ddec",
    label_size: 22,
    label_font: "Arial",
    hide_eastern_labels: "no",
    manual_zoom: "no",

    //Advanced settings
    div: "map",
    auto_load: "no",
    url_new_tab: "yes",
    images_directory: "/static/lib/simplemaps/map_images/",
    fade_time: 0.1,
    import_labels: "no",
    link_text: "View Website",
    state_image_url: "",
    state_image_position: "",
    location_image_url: "",
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
      name: "New Y3rk",
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
    "0": {
      name: "New York",
      lat: "40.71",
      lng: "-74.0059731"
    },
    "1": {
      name: "Chicago, IL",
      lat: "41.9288",
      lng: "-87.6315",
    },
    "3": {
      lat: 61.218,
      lng: -149.858,
      name: "Anchorage"
    }
  },
  regions: {},
  labels: {},
  legend: {
    entries: []
  }
};
