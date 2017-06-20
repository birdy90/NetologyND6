$('.js-add-form').on('submit', (e) => {
  e.preventDefault();
  if (!formValidated(e.target)) {
    alert('Заполните все поля');
    return;
  }
  $.ajax({
    method: 'post',
    url: '/api/users',
    data: $(e.target).serialize(),
    dataType: 'json'
  }).done((data) => {
    if (data.error === undefined) {
      window.location.href = window.location.href; // перезагрузка страницы
    } else {
      error(data.error);
    }
  });
});

$('.js-edit-form').on('submit', (e) => {
  e.preventDefault();
  if (!formValidated(e.target)) {
    alert('Заполните все поля');
    return;
  }
  $.ajax({
    method: 'put',
    url: '/api/users/' + $(e.target).parents('.item').data('id'),
    data: $(e.target).serialize(),
    dataType: 'json'
  }).done((data) => {
    if (data.error === undefined) {
      window.location.href = window.location.href; // перезагрузка страницы
    } else {
      error(data.error);
    }
  });
});

$('.js-delete-form').on('click', (e) => {
  if (!confirm('Удалить?')) return;
  $.ajax({
    method: 'delete',
    url: '/api/users/' + $(e.target).parents('.item').data('id'),
    dataType: 'json'
  }).done((data) => {
    if (data.error === undefined) {
      window.location.href = window.location.href; // перезагрузка страницы
    } else {
      error(data.error);
    }
  });
});

$('.js-update-button').on('click', (e) => {
  const line = $(e.target).parents('.item');
  $('.item .editor').remove();
  const editor = $('.editor').clone(true);
  editor.find('input[name=first_name]').val(line.find('.first_name b').html());
  editor.find('input[name=last_name]').val(line.find('.last_name b').html());
  editor.find('input[name=phone]').val(line.find('.phone').html());
  line.append(editor);
});

const formValidated = (target) => {
  let empty = false;
  $(target).find('input[type=text]').each((undex, item) => {
    console.log(item.value);
    const thisEmpty = item.value === undefined || item.value === '';
    if (thisEmpty) {
      $(item).addClass('error');
    }
    empty = empty || thisEmpty;
  });
  return !empty;
};

const error = (message) => {
  console.log(message);
};