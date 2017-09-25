const templateScript = $('#cardTemplate').html();

function addCard(type) {
  $($('.cards__item')[cards.length - 1]).addClass('_inDeck');
  cards.push({'type': type, 'id': cards.length + 1});
  $('.cards').append(template(cards[cards.length - 1]));
  window.history.pushState('', '', cards[cards.length-1].id)
}

cards = cards.map((item, i) => {
  item.id = i + 1;
  return item;
});

const template = Handlebars.compile(templateScript);
$.each(cards, (i) => {
  $('.cards').append(template(cards[i]));
});

let cardsArr = $('.cards__item');

$.each(cardsArr, (i, item) => {
  if (i < cardsArr.length - 1) {
    $(item).addClass('_inDeck');
  }
});

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
    $(this).prev().removeClass('_inDeck');
    $(this).remove();
    cards.pop();
  }
});