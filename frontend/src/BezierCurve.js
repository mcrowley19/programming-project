class Curve {
  Curve(x1, y1, x2, y2, curveNum) {
    this.curveNum = curveNum;
    var points = [];
    const dx = airport2X - airport1X;
    const dy = airport2Y - airport1Y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    const midX = (airport1X + airport2X) / 2;
    const midY = (airport1Y + airport2Y) / 2;

    const perpX = -dy / distance;
    const perpY = dx / distance;

    const controlX = midX + perpX * (distance * 0.35);
    const controlY = midY + perpY * (distance * 0.35);

    for (let t = 0; t <= 1; t += 0.01) {
      const x =
        Math.pow(1 - t, 2) * airport1X +
        2 * (1 - t) * t * controlX +
        Math.pow(t, 2) * airport2X;

      const y =
        Math.pow(1 - t, 2) * airport1Y +
        2 * (1 - t) * t * controlY +
        Math.pow(t, 2) * airport2Y;

      points.append((x, y));
    }
    this.points = points;
  }
  getPoints() {
    var pointsList = [];
    for (let i = 0; i < this.points.length; i++) {
      pointsList.append({
        lat: string(points[i][1]),
        lng: string(points[i][0]),
        color: "#FFFFFF",
        shape: "circle",
        size: 5,
      });
    }
    return pointsList;
  }
}
