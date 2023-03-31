import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import * as topojson from "topojson-client";
import Globe from "globe.gl";

const Globe2 = () => {
  const globeRef = useRef(null);

  useEffect(() => {
    const world = Globe()(globeRef.current)
      .backgroundColor("#3E114E")
      .showGlobe(false)
      .showAtmosphere(false);

    fetch("//unpkg.com/world-atlas/land-110m.json")
      .then((res) => res.json())
      .then((landTopo) => {
        world
          .polygonsData(
            topojson.feature(landTopo, landTopo.objects.land).features
          )
          .polygonCapMaterial(
            new THREE.MeshLambertMaterial({
              color: "#A02ACA",
              side: THREE.DoubleSide,
            })
          )
          .polygonSideColor(() => "rgba(0,0,0,0)");
      });
  }, []);

  return <div ref={globeRef} style={{ height: "100vh" }} />;
};

export default Globe2;
