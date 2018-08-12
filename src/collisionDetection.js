import Score from './score';

class CollisionDetection {
  constructor(lines, points) {
    this._points = points;
    this._lines = lines;
    this._used = [];
    this._score = new Score();
    this._s = 0;
    this._selected = 0;
  }

  getOrder() {
    return this._used;
  }

  _notUsed(nr, nr2) {
    for (let i = 0; i < this._used.length; i++)
      if ((this._used[i].one === nr && this._used[i].two == nr2) || (this._used[i].two === nr && this._used[i].one == nr2))
        return false;

    return true;
  }

  checkSelect(mouse, camera) {
    const points = this._points.getScreenPositions(camera);
    for (let i = 0; i < points.length; i++) {
      if (mouse.x > points[i][0] - 0.015 && mouse.x < points[i][0] + 0.015) {
        if (mouse.y > points[i][1] - 0.015 && mouse.y < points[i][1] + 0.015) {
          if (points[i][3] !== this._selected && this._notUsed(points[i][3], this._selected)){
            this._points.setSelected(points[i][3]);
            const point = this._points.getPoints();
            this._lines.addToBuffer(point[this._selected], point[points[i][3]])
            const orderObject = {one: this._selected, two: points[i][3]};
            this._used.push(orderObject);
            this._s += this._score.calculateScore([orderObject], point);
            this._score.displayScore('points: ' + this._s);
            this._selected = points[i][3];
          }
        }
      }
    }
  }
}

export default CollisionDetection;
