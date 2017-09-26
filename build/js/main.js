'use strict';

var templateScript = $('#cardTemplate').html();

var prevSet = null;

function updateUrl(arr) {
  if (history.pushState && location.protocol.match(/http/g)) {
    var path = '';
    $.each(arr, function (i, item) {
      if (i !== 0) {
        path += '%2F' + item.type;
      } else {
        path += item.type;
      }
    });
    prevSet = history.state;
    window.history.pushState(cards, '', path);
  }
}

function addCard(type) {
  cards.push({ 'type': type });
  $('.cards').append(template(cards[cards.length - 1]));
  updateUrl(cards);
}

function removeCard(el, arr) {
  arr.pop();
  el.remove();
  updateUrl(arr);
}

var template = Handlebars.compile(templateScript);
$.each(cards, function (i) {
  $('.cards').append(template(cards[i]));
});
updateUrl(cards);

$('body').on('click', function (e) {
  if ($('.cards__item').length === 0) {
    if (e.shiftKey && e.altKey) {
      addCard('wide');
    } else if (e.shiftKey) {
      addCard('narrow');
    }
  }
});

$(document).on('click', '.cards__item', function (e) {
  if (e.shiftKey && e.altKey) {
    addCard('wide');
  } else if (e.shiftKey) {
    addCard('narrow');
  } else {
    var lastEl = $(this).parent().children().last();
    removeCard(lastEl, cards);
  }
});

$(window).on('popstate', function () {
  $('.cards').html('');
  $.each(history.state, function (i) {
    $('.cards').append(template(history.state[i]));
  });
});