import React, { useEffect } from "react";
import ReactDOM from "react-dom";

import OpenMap from "ol/Map";
import View from "ol/View";
import { Point } from "ol/geom";
import { Vector } from "ol/source";
import Style from "ol/style/Style";
import { transform, fromLonLat, toLonLat } from "ol/proj";
import { Vector as VectorOL } from "ol/layer";
import Feature from "ol/Feature";
import { Icon } from "ol/style";
import MVT from "ol/format/MVT";
import VectorTileLayer from "ol/layer/VectorTile";
import VectorTileSource from "ol/source/VectorTile";
import { styleFunction } from "./styleFunction";

import "./styles.css";

function Map() {
  const [zoomLevel, setZoomLevel] = React.useState(0);
  const [clickPos, setClickPos] = React.useState([0, 0]);
  // const [minXY, setMinXY] = React.useState([0, 0]);
  // const [maxXY, setMaxXY] = React.useState([0, 0]);
  const [scaleFactor, setScaleFactor] = React.useState(0.1025);
  const [rotation, setRotation] = React.useState(-84);
  const [center, setCenter] = React.useState([103.818322, 1.264886]);
  const [imgURL, setImgURL] = React.useState(
    "https://sendeyo.com/up/d/4b1ef60dc9"
  );
  //const [isImageLoaded, setImageLoaded] = React.useState(false);

  const map = React.useRef(null);
  const mapRef = React.useRef(null);
  //const imageHTML = React.useRef(null);
  const floorPlanIconStyle = React.useRef(null);

  const updateZoom = React.useCallback(zoomDiff => {
    if (mapRef.current && map.current) {
      map.current.getView().animate({
        zoom: map.current.getView().getZoom() + zoomDiff
      });
    }
  }, []);

  const updateCenter = React.useCallback(pos => {
    if (map.current && floorPlanIconStyle.current) {
      // transform pos to center
      const posArray = pos.split(", ");
      setCenter([parseFloat(posArray[0], 10), parseFloat(posArray[1], 10)]);
    }
  }, []);

  const updatescaleFactor = React.useCallback(factor => {
    if (map.current && floorPlanIconStyle.current) {
      setScaleFactor(factor);
    }
  }, []);

  const updateRotation = React.useCallback(angle => {
    if (map.current && floorPlanIconStyle.current) {
      setRotation(angle);
    }
  }, []);

  const updateImgURL = React.useCallback(url => {
    if (map.current && floorPlanIconStyle.current) {
      setImgURL(url);
    }
  }, []);

  const reset = React.useCallback(() => {
    if (map.current && floorPlanIconStyle.current) {
      setImgURL("https://sendeyo.com/up/d/4b1ef60dc9");
      setCenter([103.818322, 1.264886]);
      setScaleFactor(0.1025);
      setRotation(-84);
    }
  }, []);

  useEffect(() => {
    if (mapRef.current) {
      map.current = new OpenMap({
        target: mapRef.current,
        layers: [
          new VectorTileLayer({
            source: new VectorTileSource({
              format: new MVT(),
              url: `https://{a-d}.tiles.mapbox.com/v4/mapbox.mapbox-streets-v6/{z}/{x}/{y}.vector.pbf?access_token=pk.eyJ1IjoiemhvbmdsaWFuZ3dhbmciLCJhIjoiY2p4Mm5pcG9sMDFzYTQwbThzOG9xYmR3OSJ9.qDWG70NyQtrhRNIsR5HENQ`
            }),
            style: styleFunction
          })
        ],
        view: new View({
          center: fromLonLat([103.8181957, 1.2649187]),
          zoom: 20,
          minZoom: 19,
          maxZoom: 23
        }),
        controls: []
      });
      map.current.setView(
        new View({
          center: map.current.getView().getCenter(),
          zoom: map.current.getView().getZoom(),
          minZoom: map.current.getView().getMinZoom(),
          maxZoom: map.current.getView().getMaxZoom(),
          extent: map.current.getView().calculateExtent(map.current.getSize())
        })
      );
      map.current.on("click", function(evt) {
        const pos = toLonLat(evt.coordinate);
        // if (document.getElementById("minXY").checked) {
        //   setMinXY(pos);
        // } else if (document.getElementById("maxXY").checked) {
        //   setMaxXY(pos);
        // } else if (document.getElementById("pos").checked) {
        //   setClickPos(pos);
        // }
        setClickPos([pos[0].toFixed(7), pos[1].toFixed(7)]);
      });
      map.current.on("moveend", function() {
        setZoomLevel(map.current.getView().getZoom());
      });
    }
    return () => {
      if (map.current) {
        map.current.dispose();
      }
    };
  }, []);

  // useEffect(() => {
  //   imageHTML.current = document.createElement("img");
  //   imageHTML.current.src = imgURL;
  //   setImageLoaded(false);
  //   imageHTML.current.onload = () => {
  //     setImageLoaded(true);
  //   };
  // }, [imgURL]);

  useEffect(() => {
    let vectorLayer;
    if (map.current) {
      floorPlanIconStyle.current = new Icon({
        // img: imageHTML.current,
        // imgSize: [imageHTML.current.width, imageHTML.current.height],
        src: imgURL,
        rotation: rotation * (Math.PI / 180), // TODO: depenciies is scale factor
        rotateWithView: true
      });
      const floorPlanStyle = new Style({
        image: floorPlanIconStyle.current
      });
      vectorLayer = new VectorOL({
        source: new Vector({
          features: [
            new Feature({
              geometry: new Point(transform(center, "EPSG:4326", "EPSG:3857")),
              style: floorPlanStyle
            })
          ]
        }),
        updateWhileAnimating: true,
        updateWhileInteracting: true,
        style: () => {
          if (map.current) {
            floorPlanIconStyle.current.setScale(
              scaleFactor /
                map.current
                  .getView()
                  .getResolutionForZoom(map.current.getView().getZoom())
            );
          }
          return floorPlanStyle;
        }
      });

      map.current.addLayer(vectorLayer);
    }
    return () => {
      if (map.current && vectorLayer) {
        map.current.removeLayer(vectorLayer);
        vectorLayer.dispose();
      }
    };
  }, [imgURL, rotation, center, scaleFactor]);

  return (
    <div ref={mapRef}>
      <div
        style={{
          zIndex: 99,
          position: "absolute",
          top: 30,
          right: 20,
          color: "white"
        }}
      >
        Zoom Level: {zoomLevel}
      </div>
      <button
        style={{
          zIndex: 99,
          position: "absolute",
          top: 60,
          right: 60
        }}
        onClick={() => updateZoom(0.5)}
      >
        +0.5
      </button>
      <button
        style={{ zIndex: 99, position: "absolute", top: 60, right: 20 }}
        onClick={() => updateZoom(-0.5)}
      >
        -0.5
      </button>
      <div
        style={{
          zIndex: 99,
          position: "absolute",
          top: 90,
          right: 20,
          color: "white"
        }}
      >
        <span>
          Position (in EPSG:4326): [{clickPos[0]}, {clickPos[1]}]
        </span>
      </div>
      <div
        style={{
          zIndex: 99,
          position: "absolute",
          top: 120,
          right: 20,
          color: "white"
        }}
      >
        Image URL{" "}
        <input
          type="text"
          name="url"
          id="url"
          placeholder={"https://sendeyo.com/up/d/4b1ef60dc9"}
        />
        <button
          type="submit"
          onClick={() => updateImgURL(document.getElementById("url").value)}
        >
          Enter
        </button>
      </div>
      <div
        style={{
          zIndex: 99,
          position: "absolute",
          top: 150,
          right: 20,
          color: "white"
        }}
      >
        Center (Image){" "}
        <input
          type="text"
          name="center"
          id="center"
          placeholder={"103.818322, 1.264886"}
        />
        <button
          type="submit"
          onClick={() => updateCenter(document.getElementById("center").value)}
        >
          Enter
        </button>
      </div>
      <div
        style={{
          zIndex: 99,
          position: "absolute",
          top: 180,
          right: 20,
          color: "white"
        }}
      >
        Scale Factor (Image){" "}
        <input
          type="text"
          name="scaleFactor"
          id="scaleFactor"
          placeholder={0.1025}
        />
        <button
          type="submit"
          onClick={() =>
            updatescaleFactor(document.getElementById("scaleFactor").value)
          }
        >
          Enter
        </button>
      </div>
      <div
        style={{
          zIndex: 99,
          position: "absolute",
          top: 210,
          right: 20,
          color: "white"
        }}
      >
        Rotation(Image){" "}
        <input type="text" name="rotation" id="rotation" placeholder={-84} />
        <button
          type="submit"
          onClick={() =>
            updateRotation(document.getElementById("rotation").value)
          }
        >
          Enter
        </button>
      </div>
      {/* <div
        style={{
          zIndex: 99,
          position: "absolute",
          top: 120,
          right: 20,
          color: "white"
        }}
      >
        <div style={{ paddingBottom: 10 }}>
          <span>[minX, minY] </span>
          <input id="minXY" type="radio" name="radio" />
          <span />
          <span>
            {" "}
            [{minXY[0]}, {minXY[1]}]
          </span>
        </div>
        <div style={{ paddingBottom: 10 }}>
          <span>[maxX, maxY] </span>
          <input id="maxXY" type="radio" name="radio" />
          <span />
          <span>
            {" "}
            [{maxXY[0]}, {maxXY[1]}]
          </span>
        </div>
        <button type="submit" onClick={() => null}>
          Rotate Map
        </button>
      </div> */}

      <button
        style={{ position: "absolute", top: 240, right: 20, zIndex: 99 }}
        onClick={() => reset()}
      >
        reset
      </button>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <Map />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
