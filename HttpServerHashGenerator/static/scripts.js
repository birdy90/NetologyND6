const formSubmitter = (form) => {
    let firstname = form.querySelector('#firstname').value;
    let lastname = form.querySelector('#lastname').value;
    if (firstname !== '' && lastname !== '') {
        return true;
    } else {
        showError('Форма заполнена не полностью');
        return false;
    }
};

const showError = (text) => {
    let popup = document.querySelector('.error-popup');
    popup.innerHTML = text;
    popup.classList.add('active');
};