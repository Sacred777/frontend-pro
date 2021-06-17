// (() => {
  // console.log('continued');

// })();

// Отрисовываем Header
function createHeader() {
  const header = document.createElement('header');
  const logo = document.createElement('a');
  const logoImage = document.createElement('img');
  const form = document.createElement('form');
  const formInput =document.createElement('input');

  header.classList.add('header', 'container', 'header__container');
  logo.classList.add('logo');
  form.classList.add('search-form');
  formInput.classList.add('input', 'search-form__input');

  logoImage.setAttribute('src', './img/logo.svg');
  logoImage.setAttribute('alt', 'Логотип Эс Кей Би');
  form.setAttribute('action', '#');
  formInput.setAttribute('type', 'text');
  formInput.setAttribute('placeholder', 'Введите запрос');
  
  logo.append(logoImage);
  form.append(formInput);
  header.append(logo);
  header.append(form);

  document.body.append(header);
};

createHeader();

// Отрисовываем Main и таблицу
function createTable() {
  const main = document.createElement('main');
  const title = document.createElement('h1');
  const tableBox = document.createElement('div');
  const table = document.createElement('table');
  const thead = document.createElement('thead');
  const headTr = document.createElement('tr');
  const headThId = document.createElement('th');
  const headThIdTitle = document.createElement('span');
  const headThIdImg = document.createElement('span');
  const headThFullname = document.createElement('th');
  const headThFullnameTitle = document.createElement('span');
  const headThFullnameImg = document.createElement('span');
  const headThFullnameDescr = document.createElement('span');
  const headThCreatedate = document.createElement('th');
  const headThCreatedateTitle = document.createElement('span');
  const headThCreatedateImg = document.createElement('span');
  const headThUpdatedate = document.createElement('th');
  const headThUpdatedateTitle = document.createElement('span');
  const headThUpdatedateImg = document.createElement('span');
  const headThContacts = document.createElement('th');
  const headThActions = document.createElement('th');
  
  const iconUP = `<svg class="table-head__icon" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M2 6L2.705 6.705L5.5 3.915L5.5 10L6.5 10L6.5 3.915L9.29 6.71L10 6L6 2L2 6Z" /></svg>`;
  const iconDown = `<svg class="table-head__icon rotate_180" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M2 6L2.705 6.705L5.5 3.915L5.5 10L6.5 10L6.5 3.915L9.29 6.71L10 6L6 2L2 6Z" /></svg>`;

  main.classList.add('main__container', 'container');
  title.classList.add('main__title');
  tableBox.classList.add('table__box');
  table.classList.add('table');
  headTr.classList.add('table-head__row');
  headThId.classList.add('table-head__cells', 'table-head_id');
  headThIdTitle.classList.add('head-id__title');
  headThFullname.classList.add('table-head__cells', 'table-head_fullname');
  headThFullnameTitle.classList.add('head-fullname__title');
  headThFullnameDescr.classList.add('head-fullname__descr');
  headThCreatedate.classList.add('table-head__cells', 'table-head_createdate');
  headThCreatedateTitle.classList.add('head-createdate__title');
  headThUpdatedate.classList.add('table-head__cells', 'table-head_updatedate');
  headThUpdatedateTitle.classList.add('head-updatedate__title');
  headThContacts.classList.add('table-head__cells');
  headThActions.classList.add('table-head__cells', 'table-head_actions');

  title.innerText = 'Клиенты';
  headThId.setAttribute('id', 'id');
  headThIdTitle.innerText = 'ID';
  headThIdImg.innerHTML = iconUP;
  headThFullname.setAttribute('id', 'fullname');
  headThFullnameTitle.innerText = 'Фамилия Имя Отчество';
  headThFullnameImg.innerHTML = iconDown;
  headThFullnameDescr.innerText = 'А-Я';
  headThCreatedate.setAttribute('id', 'createdate');
  headThCreatedateTitle.innerText = 'Дата и время создания';
  headThCreatedateImg.innerHTML = iconDown;
  headThUpdatedate.setAttribute('id', 'updatedate');
  headThUpdatedateTitle.innerText = 'Последние изменения';
  headThUpdatedateImg.innerHTML = iconDown;
  headThContacts.setAttribute('id', 'contacts');
  headThContacts.innerText = 'Контакты';
  headThActions.setAttribute('id', 'actions');
  headThActions.innerText = 'Действия';

  headThId.append(headThIdTitle);
  headThId.append(headThIdImg);
  headThFullname.append(headThFullnameTitle);
  headThFullname.append(headThFullnameImg);
  headThFullname.append(headThFullnameDescr);
  headThCreatedate.append(headThCreatedateTitle);
  headThCreatedate.append(headThCreatedateImg);
  headThUpdatedate.append(headThUpdatedateTitle);
  headThUpdatedate.append(headThUpdatedateImg);

  headTr.append(headThId);
  headTr.append(headThFullname);
  headTr.append(headThCreatedate);
  headTr.append(headThCreatedate);
  headTr.append(headThUpdatedate);
  headTr.append(headThContacts);
  headTr.append(headThActions);

  thead.append(headTr);
  table.append(thead);
  tableBox.append(table);

  main.append(title);
  main.append(tableBox);

  document.body.append(main);

}

createTable();
