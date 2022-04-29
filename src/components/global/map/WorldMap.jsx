import React, { useRef, useEffect, useState } from "react";
import worldData from "../../../util/custom.json";
import PropTypes from "prop-types";
import ResizeObserver from "./UseResizeObserver";
import * as d3 from "d3";

function WorldMap({}) {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [width, setWidth] = useState(null);
  const [height, setHeight] = useState(null);
  const [value, setValue] = React.useState(0);
  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = ResizeObserver(wrapperRef);

  const rotConfig = {
    speed: 0.01,
    verticalTilted: -10,
    horizontalTilted: 0,
  };

  useEffect(() => {
    let last = (d3.selection.prototype.last = function () {
      return d3.select(this.nodes()[this.size() - 1]);
    });
    const svg = d3.select(svgRef.current);

    let { width, height } =
      dimensions || wrapperRef.current.getBoundingClientRect();

    width -= 100;
    height -= 100;

    setWidth(width);
    setHeight(height);

    const projection = d3
      .geoMercator()
      .fitSize([width, height], selectedCountry || worldData)
      .precision(150);

    const pathGenerator = d3.geoPath().projection(projection);

    var tooltip = d3.select("body").append("div").attr("class", "tooltip");

    svg
      .selectAll(".country")
      .data(worldData.features)
      .join("path")
      .on("mouseover", (d) => {
        return tooltip.style("visibility", "visible").text("radius = " + d);
      })
      .attr("class", "country")
      .transition()
      .duration(1000)
      //   .attr("fill", (d) => colorScale(getCountryValue(d.properties.iso_a3)))

      .attr("stroke", "black")
      .attr("d", (d) => pathGenerator(d));
  }, [dimensions]);

  return (
    <div
      id="world"
      style={{
        marginBottom: "1rem",
        height: "100%",
      }}
      ref={wrapperRef}
    >
      <svg
        style={{
          width: width,
          height: height,
        }}
        ref={svgRef}
      ></svg>
    </div>
  );
}

export default WorldMap;
