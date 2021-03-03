"use strict";
document.addEventListener("DOMContentLoaded", start);
let elementToPaint;

async function start() {
  let response = await fetch("shoe-01.svg");
  let mySvgData = await response.text();
  document.querySelector("section").innerHTML = mySvgData;
  startManipulatingSvg();
}

function startManipulatingSvg() {
  document.querySelectorAll("g").forEach((g) => {
    // console.log(g);
    g.addEventListener("click", colorElement);
    g.addEventListener("mouseover", selectArea);
    g.addEventListener("mouseout", deselectArea);
  });
}

function colorElement() {
  //this is what will be handled
  elementToPaint = this;
  // console.log(elementToPaint);
  this.style.fill = "";
}

function selectArea() {
  this.style.stroke = "white";
}

function deselectArea() {
  this.style.stroke = "none";
}

document.querySelectorAll(".color_btn").forEach((colorBtn) => {
  colorBtn.addEventListener("click", colorSelected);
});

function colorSelected() {
  //get this btns color to fill

  if (elementToPaint !== undefined) {
    elementToPaint.style.fill = this.getAttribute("fill");
  }
}

//COLOR PICKER
let colorPicker = new iro.ColorPicker("#picker", {
  // Set the size of the color picker
  width: 350,
  // Set the initial color to pure red
  color: "#f00",
});

let hex = colorPicker.color.hexString;
console.log(hex); // hex = "#ff0000"

// listen to a color picker's color:change event
// color:change callbacks receive the current color
colorPicker.on("color:change", function (color) {
  // log the current color as a HEX string
  console.log(elementToPaint);
  elementToPaint.style.fill = color.hexString;
});
