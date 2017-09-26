const templateScript = $('#cardTemplate').html();

let prevSet = null;

function updateUrl(arr) {
  if (history.pushState && location.protocol.match(/http/g)) {
    let path = '';
    $.each(arr, (i, item) => {
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
  cards.push({'type': type});
  $('.cards').append( template(cards[cards.length - 1]) );
  updateUrl(cards);
}

function removeCard(el, arr) {
  arr.pop();
  el.remove();
  updateUrl(arr);
}

const template = Handlebars.compile(templateScript);
$.each(cards, (i) => {
  $('.cards').append( template(cards[i]) );
});
updateUrl(cards);

$('body').on('click', function(e) {
  if ($('.cards__item').length === 0) {
    if (e.shiftKey && e.altKey) {
      addCard('wide');
    } else if (e.shiftKey) {
      addCard('narrow');
    }
  }
});

$(document).on('click', '.cards__item', function(e) {
  if (e.shiftKey && e.altKey) {
    addCard('wide');
  } else if (e.shiftKey) {
    addCard('narrow');
  } else {
    const lastEl = $(this).parent().children().last();
    removeCard(lastEl, cards);
  }
});

$(window).on('popstate', function() {
  $('.cards').html('');
  $.each(history.state, (i) => {
    $('.cards').append( template(history.state[i]) );
  });
});