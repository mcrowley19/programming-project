class Curve {
  constructor(x1, y1, x2, y2, curveNum) {
    this.curveNum = curveNum;
    this.points = [];

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

export function createPoints(routes) {
  const locations = window.simplemaps_usmap_mapdata.locations;
  let nextNumber = 341; // hardcoded to not mess with hardcoded airport locations and stuff.

  for (const r of routes) {
    const curve = new Curve(r.x1, r.y1, r.x2, r.y2, nextNumber);
    for (const p of curve.getPoints()) {
      locations[nextNumber] = p;
      nextNumber++;
    }
  }
}
