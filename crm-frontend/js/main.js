(() => {

   // Создаем Header
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
  
    return {
      header: header,
      form: form,
      input: formInput,
    };
  };
  
  // Создаём Main и шапку таблицы
  function createTableHead() {
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
  
    return {
      main: main,
      tableBox: tableBox,
      tr: headTr,
    };
  };
  

  // Создаем контейнер тела таблицы и оверлей
  function createTableBody() {
    const tableBody = document.createElement('div');
    const overlay = document.createElement('div');
    const overlayRing = document.createElement('div');
    const table = document.createElement('table');
    const tbody = document.createElement('tbody');
  
    tableBody.classList.add('table-body');
    overlay.classList.add('table-body__overlay','blocked');
    overlayRing.classList.add('table-body__ring');
    table.classList.add('table');
  
    overlay.append(overlayRing);
    table.append(tbody);
    tableBody.append(overlay);
    tableBody.append(table);
  
    return {
      tableBody: tableBody,
      overlay: overlay,
    }
  }
  
  function createAddClientBtn() {
    const btnWraper = document.createElement('div');
    const btn = document.createElement('button');
    const text = document.createElement('span');
    const icon = `<svg class= "add-client__icon" viewBox="0 0 23 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14.5 8C16.71 8 18.5 6.21 18.5 4C18.5 1.79 16.71 0 14.5 0C12.29 0 10.5 1.79 10.5 4C10.5 6.21 12.29 8 14.5 8ZM5.5 6V3H3.5V6H0.5V8H3.5V11H5.5V8H8.5V6H5.5ZM14.5 10C11.83 10 6.5 11.34 6.5 14V16H22.5V14C22.5 11.34 17.17 10 14.5 10Z"/>
    </svg>`
  
    btnWraper.classList.add('add-client');
    btn.classList.add('add-client__btn', 'btn');
    btn.innerHTML = icon;
    text.innerText = 'Добавить клиента';
  
    btn.append(text);
    btnWraper.append(btn);

    return {
      wraper: btnWraper, 
      btn: btn, 
    };
  };

  function insertClientsData(clientsArray) {
    const tbody = document.querySelector('tbody');
    clientsArray.forEach( (e) => {
      const tr = document.createElement('tr');
      const tdId = document.createElement('td');
      const tdFullname = document.createElement('td');
      const tdCreateDate = document.createElement('td');
      const wrapCreateDate = document.createElement('div');
      const createDate = document.createElement('span');
      const createTime = document.createElement('span');
      const tdUpdateDate = document.createElement('td');
      const wrapUpdateDate = document.createElement('div');
      const updateDate = document.createElement('span');
      const updateTime = document.createElement('span');
      const tdContacts = document.createElement('td');
      const ulContacts = document.createElement('ul');
      
    // TODO нужна функция формирования списка контактов

      const tdActions = document.createElement('td');
      const wrapActions = document.createElement('div');
      const btnEdit = document.createElement('button');
      const btnEditImg = document.createElement('span');
      const btnEditText = document.createElement('span');
      const btnDelete = document.createElement('button');
      const btnDeleteImg = document.createElement('span');
      const btnDeleteText = document.createElement('span');

      const iconEdit = `<svg class="actions-btn__icon edit-btn__icon" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g opacity="0.7">
      <path d="M2 11.5002V14.0002H4.5L11.8733 6.62687L9.37333 4.12687L2 11.5002ZM13.8067 4.69354C14.0667 4.43354 14.0667 4.01354 13.8067 3.75354L12.2467 2.19354C11.9867 1.93354 11.5667 1.93354 11.3067 2.19354L10.0867 3.41354L12.5867 5.91354L13.8067 4.69354Z"/>
      </g>
      </svg>`;
      const iconOverlay = `<svg class="load__icon edit-load__icon" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3.00008 8.04008C3.00008 10.8236 5.2566 13.0801 8.04008 13.0801C10.8236 13.0801 13.0801 10.8236 13.0801 8.04008C13.0801 5.2566 10.8236 3.00008 8.04008 3.00008C7.38922 3.00008 6.7672 3.12342 6.196 3.34812" stroke="#9873FF" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round"/>
      </svg>`;
      const iconDelete = `<svg class="actions-btn__icon delete-btn__icon" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g opacity="0.7">
      <path d="M8 2C4.682 2 2 4.682 2 8C2 11.318 4.682 14 8 14C11.318 14 14 11.318 14 8C14 4.682 11.318 2 8 2ZM8 12.8C5.354 12.8 3.2 10.646 3.2 8C3.2 5.354 5.354 3.2 8 3.2C10.646 3.2 12.8 5.354 12.8 8C12.8 10.646 10.646 12.8 8 12.8ZM10.154 5L8 7.154L5.846 5L5 5.846L7.154 8L5 10.154L5.846 11L8 8.846L10.154 11L11 10.154L8.846 8L11 5.846L10.154 5Z"/>
      </g>
      </svg>`

      tr.classList.add('table__row');
      tdId.classList.add('row__cells', 'body-cells_id');
      tdFullname.classList.add('row__cells', 'body-cells_fullname');
      tdCreateDate.classList.add('row__cells');
      wrapCreateDate.classList.add('cell-create__wraper');
      createDate.classList.add('cell-create__date');
      createTime.classList.add('cell-create__time');
      tdUpdateDate.classList.add('row__cells');
      wrapUpdateDate.classList.add('cell-update__wraper');
      updateDate.classList.add('cell-update__date');
      updateTime.classList.add('cell-update__time');
      tdContacts.classList.add('row__cells');
      ulContacts.classList.add('contacts__list');
      tdActions.classList.add('row__cells');
      wrapActions.classList.add('actions__wraper');
      btnEdit.classList.add('edit-btn', 'btn');
      btnEditText.classList.add('edit-btn__text');
      btnDelete.classList.add('delete-btn', 'btn');
      btnDeleteText.classList.add('delete-btn__text');

      tdId.innerText = e.id.slice(-6);
      tdFullname.innerText = getFullname(e.lastName, e.name, e.surname);
      createDate.innerText = formatDate(e.createdAt);
      createTime.innerText = formatTime(e.createdAt);
      updateDate.innerText = formatDate(e.updatedAt);
      updateTime.innerText = formatTime(e.updatedAt);
      btnEditImg.innerHTML = iconEdit;
      btnEditText.innerText = 'Изменить';
      btnDeleteImg.innerHTML = iconDelete;
      btnDeleteText.innerText = 'Удалить';

      wrapCreateDate.append(createDate);
      wrapCreateDate.append(createTime);
      tdCreateDate.append(wrapCreateDate);

      wrapUpdateDate.append(updateDate);
      wrapUpdateDate.append(updateTime);
      tdUpdateDate.append(wrapUpdateDate);

      // TODO append li из функции в ul 

      tdContacts.append(ulContacts);

      btnEdit.append(btnEditImg);
      btnEdit.append(btnEditText);
      btnDelete.append(btnDeleteImg);
      btnDelete.append(btnDeleteText);
      wrapActions.append(btnEdit);
      wrapActions.append(btnDelete);
      tdActions.append(wrapActions);

      tr.append(tdId);
      tr.append(tdFullname);
      tr.append(tdCreateDate);
      tr.append(tdUpdateDate);
      tr.append(tdContacts);
      tr.append(tdActions);

      tbody.append(tr);
    });
  };
  
  // Получаем полное имя в одну строку
  function getFullname(lastName, name, surname) {
    const nameArray = [];
    if (lastName) {
      nameArray.push(lastName.trim());
    }
    if (name) {
      nameArray.push(name.trim());
    }
    if (surname) {
      nameArray.push(surname.trim());
    }
    return nameArray.join(' ');
  }

  // Получаем дату из json
  function formatDate(str) {
    return str.slice(8, 10) + '.' + str.slice(5, 7) + '.' + str.slice(0, 4);
  }

  // Получаем время из json
  function formatTime(str) {
    return str.slice(11, 16);
  }

  // Серверная часть
  const URI = 'http://localhost:3000/api/clients';

  // Читаем клиентов из базы
  async function fetchGetClients() {
    const response = await fetch(URI);
    const data = await response.json();
    // console.log(data);
    // return await pesponse.json();
    // return data;
    insertClientsData(data);
  };
  
  // Ищем клиентов
  async function fetchSearchClients(search) {
    const url = `${URI}?search=${search}`;
    // console.log(url);
    const pesponse = await fetch(url);
    const data = await pesponse.json();
    // console.log(data);
  };
  // fetchSearchClients('Льев');

  // Добавляем клиента в базу
  async function fetchAddClient(obj) {
    fetch(URI, {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        // ID клиента, заполняется сервером автоматически, после создания нельзя изменить
        // id: '1234567890',
        // дата и время создания клиента, заполняется сервером автоматически, после создания нельзя изменить
        // createdAt: '2021-04-03T13:07:29.554Z',
        // дата и время изменения клиента, заполняется сервером автоматически при изменении клиента
        // updatedAt: '2021-04-03T13:07:29.554Z',
        // * обязательное поле, имя клиента
        name: 'Олег',
        // * обязательное поле, фамилия клиента
        surname: 'Корнеев',
        // необязательное поле, отчество клиента
        lastName: 'Викторович',
        // контакты - необязательное поле, массив контактов
        // каждый объект в массиве (если он передан) должен содержать непустые свойства type и value
        contacts: [
          {
            type: 'Телефон',
            value: '+71234567892'
          },
          {
            type: 'Email',
            value: 'abcr@xyz.com'
          },
          {
            type: 'Facebook',
            value: 'https://facebook.com/oleg-korneev'
          },
          {
            type: 'VK',
            value: 'https://vk.ru/oleg-korneev'
          },
        ],
      }),
    });
  };
  // fetchAddClient();

  // Получаем клиента по его ID
  async function fetchGetClientById(id) {
    const pesponse = await fetch(`${URI}/${id}`);
    const data = await pesponse.json();
    console.log(data);
  };
  // fetchGetClientById('1619590335813');

  // Обновляем данные клиента по ID
  async function fetchUpdateClient(id) {
    const response = await fetch(`${URI}/${id}`, {
      method: "PATCH",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contacts: [
          {
            type: 'Телефон',
            value: '+71234567892'
          },
        ]
      })
    });
    const data = await response.json();
    console.log(data);
  };
  // fetchUpdateClient('1619595050787');

  // Удаляем клиента по ID. Ничего не возвращает в body
  async function fetchDeleteClient(id) {
    const response = await fetch(`${URI}/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    // console.log(data);
  };
  // fetchDeleteClient('1619595050787');



  // Основная функция
  document.addEventListener('DOMContentLoaded', () => {
    function createApp() {
      const container = document.getElementById('crm-app');
      const header = createHeader();
      const tableHead = createTableHead();
      const tableBody = createTableBody();
      const addBtn = createAddClientBtn();
      // const main = tableHead.main;
      // const tableBox = tableHead.tableBox;

      container.append(header.header);
      container.append(tableHead.main);
      tableHead.tableBox.append(tableBody.tableBody);
      tableHead.main.append(addBtn.wraper);

      tableBody.overlay.classList.remove('blocked');
      const getClients = fetchGetClients();
      // insertClientsData(getClients);
      tableBody.overlay.classList.add('blocked');      

    };
    
    createApp();

  });

})();

