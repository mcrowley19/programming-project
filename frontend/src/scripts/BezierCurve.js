class Curve {
  constructor(x1, y1, x2, y2, curveNum, flight_name, description) {
    this.description = description;
    this.curveNum = curveNum;
    this.points = [];
    this.flight_name = flight_name;
    const dx = x2 - x1;
    const dy = y2 - y1;
    const distance = Math.sqrt(dx * dx + dy * dy);

    const midX = (x1 + x2) / 2;
    const midY = (y1 + y2) / 2;

    const perpX = -dy / distance;
    const perpY = dx / distance;

    const controlX = midX + perpX * (distance * 0.35);
    const controlY = midY + perpY * (distance * 0.35);

    for (let t = 0; t <= 1; t += 0.01) {
      const x =
        Math.pow(1 - t, 2) * x1 +
        2 * (1 - t) * t * controlX +
        Math.pow(t, 2) * x2;

      const y =
        Math.pow(1 - t, 2) * y1 +
        2 * (1 - t) * t * controlY +
        Math.pow(t, 2) * y2;

      this.points.push([x, y]);
    }
  }

  getPoints() {
    const pointsList = [];
    for (let i = 0; i < this.points.length; i++) {
      pointsList.push({
        name: this.flight_name,
        description: this.description,
        lat: String(this.points[i][1]),
        lng: String(this.points[i][0]),
        color: "#FFFFFF",
        shape: "circle",
        size: 2,
      });
    }
    return pointsList;
  }
}

export function createPoints(routes, airportLocations, airportData) {
  const locations = window.simplemaps_usmap_mapdata.locations;
  for (const k of Object.keys(locations)) {
    delete locations[k];
  }

  let nextNumber = 0;
  for (const a of airportLocations) {
    const data = airportData[a.name];
    a["description"] = data.name + "<br> Number of flights: " + data.count;
    locations[nextNumber] = a;
    nextNumber++;
  }
  for (const r of routes) {
    const flight_name = r.origin + " → " + r.dest;
    const first_digits = Math.floor(r.arrTime / 100);
    const second_digits = (r.arrTime % 100);
    var first_digits_string;
    var second_digits_string;

    if(first_digits < 10){
      first_digits_string = "0" + first_digits;
    };

    first_digits_string = first_digits < 10 ? first_digits_string = "0" + first_digits : first_digits;
    second_digits_string = second_digits < 10 ? second_digits_string = "0" + second_digits : second_digits;

    const description =
      "Arrives at: " +
      first_digits_string +
      ":" +
      second_digits_string +
      "<br>" +
      r.originCity +
      " to <br>" +
      r.destCity;
    const curve = new Curve(
      r.x1,
      r.y1,
      r.x2,
      r.y2,
      nextNumber,
      flight_name,
      description,
    );
    for (const p of curve.getPoints()) {
      locations[nextNumber] = p;
      nextNumber++;
    }
  }
}
