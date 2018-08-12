class Score {
  constructor() {
    this._display = document.querySelector('.game-score');
  }

  calculateScore(order, points) {
    let score = 0;
    for (let i = 0; i < order.length; i++) {
      console.log(order);
      score += this._distance(points[order[i].one], points[order[i].two]);
    }
    return Math.round(score);
  }

  _distance(point, other) {
    console.log(point, other);
    let distance = 0;
    for (let i = 0; i < point.length; i++)
      distance += Math.abs(point[i] - other[i]);
    return Math.sqrt(distance);
  }

  displayScore(score) {
    this._display.textContent = score;
  }
}

export default Score;
