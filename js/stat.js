'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 20;
var COLUMN_WIDTH = 60;
var COLUMN_Y = 265;
var MAX_COLUMN_HEIGHT = 150;
var SHADOW_GAP = 10;

var renderClouds = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(CLOUD_X, CLOUD_Y);
  ctx.lineTo(115 + x, 120 + y);
  ctx.lineTo(100 + x, 270 + y);
  ctx.quadraticCurveTo(320 + x, 290 + y, 520 + x, 270 + y);
  ctx.lineTo(505 + x, 150 + y);
  ctx.lineTo(520 + x, 10 + y);
  ctx.quadraticCurveTo(320 + x, 15 + y, CLOUD_X, CLOUD_Y);
  ctx.closePath();
  ctx.fill();
};

var getMaxScore = function (array) {
  var maxScore = 0;
  for (var i = 0; i < array.length; i++) {
    if (maxScore < array[i]) {
      maxScore = array[i];
    }
  }
  return maxScore;
};

function getColors(playersName) {
  var color;
  if (playersName === 'Вы') {
    color = 'rgba(255, 0, 0, 1)';
  } else {
    color = 'rgba(0, 0, 255, ' + (Math.random() + 0.1).toFixed(1) + ')';
  }
  return color;
}

window.renderStatistics = function (ctx, names, times) {
  renderClouds(ctx, SHADOW_GAP, SHADOW_GAP, 'rgba(0 ,0 ,0, 0.7)');
  renderClouds(ctx, 0, 0, '#ffffff');
  ctx.fillStyle = '#000';
  ctx.font = '16px PT mono';
  ctx.fillText('Ура вы победили!', 160, 30);
  ctx.fillText('Список результатов:', 160, 50);

  var maxTime = getMaxScore(times);
  for (var i = 0; i < names.length; i++) {
    ctx.fillText(names[i], 10 + ((CLOUD_WIDTH - GAP) / 4) + GAP + i * 100, COLUMN_Y);
    ctx.fillStyle = getColors(names[i]);
    ctx.fillRect(
        10 + ((CLOUD_WIDTH - GAP) / 4) + GAP + i * 100,
        COLUMN_Y - GAP,
        COLUMN_WIDTH,
        -(times[i] * MAX_COLUMN_HEIGHT) / maxTime
    );
    ctx.fillStyle = '#000000';
    ctx.fillText(
        times[i].toFixed(0),
        10 + ((CLOUD_WIDTH - GAP) / 4) + GAP + i * 100,
        230 - (times[i] * MAX_COLUMN_HEIGHT) / maxTime
    );
  }
};
