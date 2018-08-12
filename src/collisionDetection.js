class CollisionDetection {
  constructor(lines, points) {
    this._points = points;
    this._lines = lines;
    this._used = [];
    this._selected = false;
  }

  _notUsed(nr) {
    for (let i = 0; i < this._used.length; i++)
      if (this._used[i] === nr)
        return false;

    return true;
  }

  checkSelect(mouse, camera) {
    const points = this._points.getScreenPositions(camera);
    // console.log(mouse);
    // console.log(points);
    // debugger;
    for (let i = 0; i < points.length; i++) {
      if (mouse.x > points[i][0] - 0.01 && mouse.x < points[i][0] + 0.01) {
        if (mouse.y > points[i][1] - 0.01 && mouse.y < points[i][1] + 0.01) {
          this._points.setSelected(points[i][3]);
          if (this._selected && points[i][3] !== this._selected && this._notUsed(points[i][3])){
            const point = this._points.getPoints();
            this._lines.addToBuffer(point[this._selected], point[points[i][3]])
            this._used.push(this._selected);
            this._selected = points[i][3];
          }
          else {
            this._selected = points[i][3];
          }
        }
      }
    }
  }
}

export default CollisionDetection;
