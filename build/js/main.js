'use strict';

var templateScript = $('#cardTemplate').html();

var prevSet = null;

function UpdateUrl(arr) {
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

function AddCard(type) {
  cards.push({ 'type': type });
  $('.cards').append(template(cards[cards.length - 1]));
  UpdateUrl(cards);
}

function RemoveCard(el, arr) {
  arr.pop();
  el.remove();
  UpdateUrl(arr);
}

var template = Handlebars.compile(templateScript);
$.each(cards, function (i) {
  $('.cards').append(template(cards[i]));
});
UpdateUrl(cards);

$('body').on('click', function (e) {
  if ($('.cards__item').length === 0) {
    if (e.shiftKey && e.altKey) {
      AddCard('wide');
    } else if (e.shiftKey) {
      AddCard('narrow');
    }
  }
});

$(document).on('click', '.cards__item', function (e) {
  if (e.shiftKey && e.altKey) {
    AddCard('wide');
  } else if (e.shiftKey) {
    AddCard('narrow');
  } else {
    var lastEl = $(this).parent().children().last();
    RemoveCard(lastEl, cards);
  }
});

$(window).on('popstate', function () {
  $('.cards').html('');
  $.each(history.state, function (i) {
    $('.cards').append(template(history.state[i]));
  });
});