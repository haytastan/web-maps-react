import { FeatureLike } from "ol/Feature";
import { Fill, Style, Stroke, Text } from "ol/style";

/**
 * @description
 * The following are the styling for the respective layers:
 * water;
 * landuse
 * building;
 * tunnel
 * road
 * bridge
 * poi_label
 * road_label;
 * housenum_label
 * barrier
 * waterway
 * waterway_label
 * place_label
 * landuse_overlay
 * water_label
 * country_label
 * marine_label
 * state_label
 * admin
 * aeroway
 */

const waterStyle = new Style({
  fill: new Fill({
    color: "#101015"
  }),
  stroke: new Stroke({
    color: "#101015",
    width: 8
  })
});
const landuseStyle = new Style({
  fill: new Fill({
    color: "#313138"
  }),
  stroke: new Stroke({
    color: "#313138",
    width: 8
  })
});
const buildingStyle = new Style({
  fill: new Fill({
    color: "#313138"
  }),
  stroke: new Stroke({
    color: "#313138",
    width: 0
  })
});
const tunnelStyle = new Style({
  fill: new Fill({
    color: "#292830"
  }),
  stroke: new Stroke({
    color: "#292830",
    width: 8
  })
});
const roadStyle = new Style({
  fill: new Fill({
    color: "#292830"
  }),
  stroke: new Stroke({
    color: "#292830",
    width: 8
  })
});
const bridgeStyle = new Style({
  fill: new Fill({
    color: "#292830"
  }),
  stroke: new Stroke({
    color: "#292830",
    width: 0
  })
});
const poiLabelStyle = new Style({
  text: new Text({
    font: 'bold 11px "Open Sans", "Arial Unicode MS", "sans-serif"',
    placement: "line",
    fill: new Fill({
      color: "#5f5f6b"
    }),
    stroke: new Stroke({
      color: "#101015",
      width: 2
    })
  })
});
const roadLabelStyle = new Style({
  text: new Text({
    font: 'bold 11px "Open Sans", "Arial Unicode MS", "sans-serif"',
    placement: "line",
    fill: new Fill({
      color: "#5f5f6b"
    }),
    stroke: new Stroke({
      color: "#101015",
      width: 2
    })
  })
});
const housenumLabelStyle = new Style({
  text: new Text({
    font: 'bold 11px "Open Sans", "Arial Unicode MS", "sans-serif"',
    placement: "line",
    fill: new Fill({
      color: "#5f5f6b"
    }),
    stroke: new Stroke({
      color: "#101015",
      width: 2
    })
  })
});
const barrierLineStyle = new Style({
  fill: new Fill({
    color: "#292830"
  }),
  stroke: new Stroke({
    color: "#292830",
    width: 0
  })
});
const waterwayStyle = new Style({
  fill: new Fill({
    color: "#292830"
  }),
  stroke: new Stroke({
    color: "#292830",
    width: 0
  })
});
const waterwayLabelStyle = new Style({
  text: new Text({
    font: 'bold 11px "Open Sans", "Arial Unicode MS", "sans-serif"',
    placement: "line",
    fill: new Fill({
      color: "#5f5f6b"
    }),
    stroke: new Stroke({
      color: "#101015",
      width: 2
    })
  })
});
const placeLabelStyle = new Style({
  text: new Text({
    font: 'bold 11px "Open Sans", "Arial Unicode MS", "sans-serif"',
    placement: "line",
    fill: new Fill({
      color: "#5f5f6b"
    }),
    stroke: new Stroke({
      color: "#101015",
      width: 2
    })
  })
});
const landuseOverlayStyle = new Style({
  fill: new Fill({
    color: "#292830"
  }),
  stroke: new Stroke({
    color: "#292830",
    width: 0
  })
});
const waterLabelStyle = new Style({
  text: new Text({
    font: 'bold 11px "Open Sans", "Arial Unicode MS", "sans-serif"',
    placement: "line",
    fill: new Fill({
      color: "#5f5f6b"
    }),
    stroke: new Stroke({
      color: "#101015",
      width: 2
    })
  })
});
const countryLabelStyle = new Style({
  text: new Text({
    font: 'bold 11px "Open Sans", "Arial Unicode MS", "sans-serif"',
    placement: "line",
    fill: new Fill({
      color: "#5f5f6b"
    }),
    stroke: new Stroke({
      color: "#101015",
      width: 2
    })
  })
});
const marineLabelStyle = new Style({
  text: new Text({
    font: 'bold 11px "Open Sans", "Arial Unicode MS", "sans-serif"',
    placement: "line",
    fill: new Fill({
      color: "#5f5f6b"
    }),
    stroke: new Stroke({
      color: "#101015",
      width: 2
    })
  })
});
const stateLabelStyle = new Style({
  text: new Text({
    font: 'bold 11px "Open Sans", "Arial Unicode MS", "sans-serif"',
    placement: "line",
    fill: new Fill({
      color: "#5f5f6b"
    }),
    stroke: new Stroke({
      color: "#101015",
      width: 2
    })
  })
});
const adminStyle = new Style({
  fill: new Fill({
    color: "#292830"
  }),
  stroke: new Stroke({
    color: "#292830",
    width: 0
  })
});
const aerowayStyle = new Style({
  fill: new Fill({
    color: "#292830"
  }),
  stroke: new Stroke({
    color: "#292830",
    width: 0
  })
});
// rest of the features
const defaultStyle = new Style({
  zIndex: -1
});

export function styleFunction(feature: FeatureLike): Style | Style[] {
  switch (feature.get("layer")) {
    case "water":
      return waterStyle;

    case "landuse":
      return landuseStyle;

    case "building":
      return buildingStyle;

    case "tunnel":
      return tunnelStyle;

    case "road":
      return roadStyle;

    case "bridge":
      return bridgeStyle;

    case "poi_label":
      return poiLabelStyle;

    case "road_label":
      roadLabelStyle.getText().setText(feature.get("name"));
      return roadLabelStyle;

    case "housenum_label":
      housenumLabelStyle.getText().setText(feature.get("name"));
      return housenumLabelStyle;

    case "barrier_line":
      return barrierLineStyle;

    case "waterway":
      return waterwayStyle;

    case "waterway_label":
      waterwayLabelStyle.getText().setText(feature.get("name"));
      return waterwayLabelStyle;

    case "place_label":
      placeLabelStyle.getText().setText(feature.get("name"));
      return placeLabelStyle;

    case "landuse_overlay":
      return landuseOverlayStyle;

    case "water_label":
      waterLabelStyle.getText().setText(feature.get("name"));
      return waterLabelStyle;

    case "country_label":
      countryLabelStyle.getText().setText(feature.get("name"));
      return countryLabelStyle;

    case "marine_label":
      marineLabelStyle.getText().setText(feature.get("name"));
      return marineLabelStyle;

    case "state_label":
      stateLabelStyle.getText().setText(feature.get("name"));
      return stateLabelStyle;

    case "admin":
      return adminStyle;

    case "aeroway":
      return aerowayStyle;

    default:
      //console.log(feature.get('layer'));
      return defaultStyle;
  }
}
