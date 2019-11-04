'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 20;
var TAB_GAP = 80;
var COLUMN_Y = 265;
var MAX_COLUMN_HEIGHT = 150;
var SHADOW_GAP = 10;

var renderClouds = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxScore = function (array) {
  for (var i = 0; i < array.length - 1; i++) {
    var maxScore = array[i];
    for (var j = i + 1; j < array.length; j++) {
      if (array[j] > maxScore) {
        maxScore = array[j];
        var swap = array[i];
        array[i] = maxScore;
        array[j] = swap;
      }
    }
  }
  return maxScore;
};

window.renderStatistics = function (ctx, names, times) {
  renderClouds(
      ctx,
      CLOUD_X + SHADOW_GAP,
      CLOUD_Y + SHADOW_GAP,
      'rgba(0 ,0 ,0, 0.7)'
  );
  renderClouds(ctx, CLOUD_X, CLOUD_Y, '#ffffff');
  ctx.fillStyle = '#000';
  ctx.font = '16px PT mono';
  ctx.fillText('Ура вы победили!', 160, 30);
  ctx.fillText('Список результатов:', 160, 50);

  var maxTime = getMaxScore(times);
  for (var i = 0; i < names.length; i++) {
    ctx.fillText(names[i], CLOUD_X + GAP + TAB_GAP * i, COLUMN_Y);
    ctx.fillRect(
        CLOUD_X + GAP + TAB_GAP * i,
        COLUMN_Y - 20,
        60,
        -(times[i] * MAX_COLUMN_HEIGHT) / maxTime
    );
    ctx.fillStyle = '#000000';
    ctx.fillText(
        Math.round(times[i]),
        CLOUD_X + GAP + TAB_GAP * i,
        210 - (times[i] * MAX_COLUMN_HEIGHT) / maxTime + 20
    );
  }
};
