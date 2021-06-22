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
      header,
      form,
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
    
    main.classList.add('main__container', 'container');
    title.classList.add('main__title');
    tableBox.classList.add('table__box');
    table.classList.add('table');
    headTr.classList.add('table-head__row');
    headThId.classList.add('table-head__cells', 'table-head_id', 'table__column_sort');
    headThIdTitle.classList.add('head-id__title');
    headThIdImg.classList.add('table-head__icon');
    headThFullname.classList.add('table-head__cells', 'table-head_fullname', 'table__column_sort');
    headThFullnameTitle.classList.add('head-fullname__title');
    headThFullnameImg.classList.add('table-head__icon', 'rotate_180');
    headThFullnameDescr.classList.add('head-fullname__descr');
    headThCreatedate.classList.add('table-head__cells', 'table-head_createdate', 'table__column_sort');
    headThCreatedateTitle.classList.add('head-createdate__title');
    headThCreatedateImg.classList.add('table-head__icon', 'rotate_180');
    headThUpdatedate.classList.add('table-head__cells', 'table-head_updatedate', 'table__column_sort');
    headThUpdatedateTitle.classList.add('head-updatedate__title');
    headThUpdatedateImg.classList.add('table-head__icon', 'rotate_180');
    headThContacts.classList.add('table-head__cells');
    headThActions.classList.add('table-head__cells', 'table-head_actions');
  
    title.innerText = 'Клиенты';
    headThId.setAttribute('id', 'id');
    headThIdTitle.innerText = 'ID';
    // headThIdTitle.setAttribute('data-sort', 'true');
    headThFullname.setAttribute('id', 'fullname');
    headThFullnameTitle.innerText = 'Фамилия Имя Отчество';
    headThFullnameDescr.innerText = 'А-Я';
    headThCreatedate.setAttribute('id', 'createdAt');
    headThCreatedateTitle.innerText = 'Дата и время создания';
    headThUpdatedate.setAttribute('id', 'updatedAt');
    headThUpdatedateTitle.innerText = 'Последние изменения';
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
      main,
      tableBox,
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
    table.classList.add('table', 'data-table');
  
    overlay.append(overlayRing);
    table.append(tbody);
    tableBody.append(overlay);
    tableBody.append(table);
  
    return {
      tableBody,
      overlay,
    }
  }
  
  // Создаем кнопку добавления клинета
  function createAddClientBtn() {
    const btnWraper = document.createElement('div');
    const btn = document.createElement('button');
    const text = document.createElement('span');
    const icon = document.createElement('span');
  
    btnWraper.classList.add('add-client');
    btn.classList.add('add-client__btn', 'btn');
    icon.classList.add('add-client__icon');
    text.innerText = 'Добавить клиента';
  
    btn.append(icon);
    btn.append(text);
    btnWraper.append(btn);

    return {
      wraper: btnWraper, 
      btn, 
    };
  };

  // Вставляем данные в таблицу
  function insertClientsData(clientsObject) {
    let clientsArray = [];
    switch (clientsObject.columnOfSort) {
      case 'fullname':
        clientsArray = sortClientsByFullname(clientsObject.clients, clientsObject.stateOfSort.fullname);
      break;
      case 'createdAt':
        clientsArray = sortClientsByDate(clientsObject.clients, clientsObject.field, clientsObject.stateOfSort.createdAt);
      break;
      case 'updatedAt':
        clientsArray = sortClientsByDate(clientsObject.clients, clientsObject.field, clientsObject.stateOfSort.updatedAt);
      break;
      default:
        clientsArray = sortClientsById(clientsObject.clients, clientsObject.stateOfSort.id);
    };

    markColumnOfSort(clientsObject.columnOfSort, clientsObject.stateOfSort);

    const tbody = deleteTableRows();
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
      const ulContacts = createContactList(e.contacts);
      const tdActions = document.createElement('td');
      const wrapActions = document.createElement('div');
      const btnEdit = document.createElement('button');
      const btnEditImg = document.createElement('span');
      const btnEditText = document.createElement('span');
      const btnDelete = document.createElement('button');
      const btnDeleteImg = document.createElement('span');
      const btnDeleteText = document.createElement('span');

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
      tdActions.classList.add('row__cells');
      wrapActions.classList.add('actions__wraper');
      btnEdit.classList.add('edit-btn', 'btn');
      btnEditImg.classList.add('actions-btn__icon', 'edit-btn__icon');
      btnEditText.classList.add('edit-btn__text');
      btnDelete.classList.add('delete-btn', 'btn');
      btnDeleteImg.classList.add('actions-btn__icon', 'delete-btn__icon');
      btnDeleteText.classList.add('delete-btn__text');

      btnEdit.setAttribute('data-id', e.id);
      btnDelete.setAttribute('data-id', e.id);

      tdId.innerText = e.id.slice(-6);
      tdFullname.innerText = getFullname(e.lastName, e.name, e.surname);
      createDate.innerText = formatDate(e.createdAt);
      createTime.innerText = formatTime(e.createdAt);
      updateDate.innerText = formatDate(e.updatedAt);
      updateTime.innerText = formatTime(e.updatedAt);
      btnEditText.innerText = 'Изменить';
      btnDeleteText.innerText = 'Удалить';

      wrapCreateDate.append(createDate);
      wrapCreateDate.append(createTime);
      tdCreateDate.append(wrapCreateDate);

      wrapUpdateDate.append(updateDate);
      wrapUpdateDate.append(updateTime);
      tdUpdateDate.append(wrapUpdateDate);
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

    return tbody;
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

  // Создаем список контактов клиента
  function createContactList(contactsArray) {
    const ul = document.createElement('ul');
    ul.classList.add('contacts__list');
    const arreyLength = contactsArray.length;
    let visible = true;
    let i = 1;

    contactsArray.forEach(e => {
      if (i === 5 & arreyLength > 5) {
        const li = document.createElement('li');
        const span = document.createElement('span');
        li.classList.add('contacts__item');
        span.classList.add('contacts__icon_ring');
        span.setAttribute('data-value', 'Развернуть');
        span.innerText = '+' + (arreyLength - i);
        li.append(span);
        ul.append(li);
        visible = false;
      }

      ul.append(createContactElement(e, visible));
      ++i;
    });
    
    return ul;
  };

  // Функция создает li элемент для списка контактов
  function createContactElement(contact, visible) {
    const li = document.createElement('li');
    const img = document.createElement('img');

    li.classList.add('contacts__item');
    if (!visible) {
      li.classList.add('blocked');
    };
    img.classList.add('contacts__icon');
    
    if (contact.type === 'Другое') {
      img.setAttribute('data-type', '');
    } else {
      img.setAttribute('data-type', contact.type + ':');
    };
    img.setAttribute('data-value', contact.value);


    switch(contact.type) {
      case 'Телефон':
        img.setAttribute('src', './img/phone.svg');
        img.setAttribute('alt', 'Телефон'); 
        break;
      case 'Facebook':
        img.setAttribute('src', './img/fb.svg');
        img.setAttribute('alt', 'Фэйсбук');  
        break;
      case 'VK': 
        img.setAttribute('src', './img/vk.svg');
        img.setAttribute('alt', 'В контактах'); 
        break;
      case 'Email': 
        img.setAttribute('src', './img/mail.svg');
        img.setAttribute('alt', 'Имэйл'); 
        break;
      default: 
        img.setAttribute('src', './img/other.svg');
        img.setAttribute('alt', 'Другое'); 
    };
    
    li.append(img);

    return li;
  };

  // Сорировка списка клиентов по полю ID
  function sortClientsById(ClientsArray, ascending) {
    if (ascending) {
     return ClientsArray.sort((a, b) => a.id > b.id ? 1 : -1);
    }
    return ClientsArray.sort((a, b) => a.id < b.id ? 1 : -1);
  }

  // Сорировка списка клиентов по полю Ф.И.О.
  function sortClientsByFullname(ClientsArray, ascending) {
    if (ascending) {
      return ClientsArray.sort((a, b) => a.lastName.trim().toLowerCase() + a.name.trim().toLowerCase() + a.surname.trim().toLowerCase() > b.lastName.trim().toLowerCase() + b.name.trim().toLowerCase() + b.surname.trim().toLowerCase() ? 1 : -1);
     }
     return ClientsArray.sort((a, b) => a.lastName.trim().toLowerCase() + a.name.trim().toLowerCase() + a.surname.trim().toLowerCase() < b.lastName.trim().toLowerCase() + b.name.trim().toLowerCase() + b.surname.trim().toLowerCase() ? 1 : -1);
  }

  // Сорировка списка клиентов по полю Дата и время создания
  function sortClientsByDate(ClientsArray, fied, ascending) {
    if (ascending) {
      return ClientsArray.sort((a, b) => new Date(a[fied]).getTime() > new Date(b[fild]).getTime() ? 1 : -1);
    }
     return ClientsArray.sort((a, b) => new Date(a[fied]).getTime() > new Date(b[fild]).getTime() ? 1 : -1);
  }

  // Маркировка столбца сортировки
  function markColumnOfSort(column, sorting) {
    console.log(column, sorting);
    const columns = document.querySelectorAll('.table__column_sort');
    columns.forEach((e) => {
      if (e.id === column) {
        e.childNodes[0].classList.add('color_light-slate-blue');
      } else {
        e.childNodes[0].classList.remove('color_light-slate-blue')
      };
      if (sorting[e.id]) {
        e.childNodes[1].classList.remove('rotate_180');
        if (e.id === 'fullname') {
          e.childNodes[2].innerText = 'Я-А';
        };              
      } else {
        e.childNodes[1].classList.add('rotate_180');
        if (e.id === 'fullname') {
          e.childNodes[2].innerText = 'А-Я';
        };
      };
    });
  };

  // Удаление tbody таблицы чтобы её данные для отображения
  function deleteTableRows() {
    const tbody = document.querySelector('tbody');
    while(tbody.rows.length > 0) {
      tbody.deleteRow(0);
    }
    return tbody;
  };

  // Показываю тултипы [data-type] и [data-value]
  function showTooltips() {
    let tooltipElememt;
    let tooltipTypeElement;
    let tooltipValueElement;
    document.onmouseover = function(event) {
      let target = event.target;
      let tooltipType = target.dataset.type;
      let tooltipValue = target.dataset.value;
      // console.log(tooltipType);
      // console.log(tooltipValue);

      if (!tooltipType & !tooltipValue) return;

      tooltipElememt = document.createElement('div');
      tooltipValueElement = document.createElement('span');
      
      tooltipElememt.classList.add('tooltip');
      tooltipValueElement.classList.add('tooltip__value');

      if (tooltipType) {
        tooltipTypeElement = document.createElement('span');
        tooltipTypeElement.classList.add('tooltip__title');
        tooltipTypeElement.innerText = tooltipType;
        tooltipElememt.append(tooltipTypeElement);
        tooltipValueElement.classList.add('color_light-slate-blue');
      };  

      tooltipValueElement.innerText = tooltipValue;

      tooltipElememt.append(tooltipValueElement);
      document.body.append(tooltipElememt);

      let coords = target.getBoundingClientRect();

      let left = coords.left + (target.offsetWidth - tooltipElememt.offsetWidth) / 2;
      if (left < 0) left = 0;

      let top = coords.top - tooltipElememt.offsetHeight - 10;
      if (top < 0) { // если подсказка не помещается сверху, то отображать её снизу
      top = coords.top + target.offsetHeight + 10;
       }

      tooltipElememt.style.left = left + 'px';
      tooltipElememt.style.top = top + 'px';
      tooltipElememt.style.opacity = 1;
    };
    
    document.onmouseout = function(e) {
      if (tooltipElememt) {
        tooltipElememt.remove();
        tooltipElememt = null;
      };
    };
  };


  // ============================
  // Серверная часть
  const URI = 'http://localhost:3000/api/clients';

  // TODO Это убрать. Только для тестов
  const delay = ms => {
    return new Promise(r => setTimeout(() => r(), ms));
  };

  // Читаем клиентов из базы
  async function fetchGetClients() {
    // await delay(5000); // TODO Для установления задержки
    const response = await fetch(URI);
    const data = await response.json();
    return data;
  };
  
  // Ищем клиентов
  async function fetchSearchClients(search) {
    // await delay(5000); // TODO Для установления задержки
    const url = `${URI}?search=${search}`;
    // console.log(search, url);
    const pesponse = await fetch(url);
    const data = await pesponse.json();
    // console.log(data);
    return data;
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
    // console.log(data);
    return data;
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
    return data;
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
    async function createApp() {
      const container = document.getElementById('crm-app');
      const header = createHeader(); //Создаю шапку сайта с лого и поиском
      const tableHead = createTableHead(); //Создаю шапку таблицы
      const tableBody = createTableBody(); //Создаю тело таблицы для вставки данных о клиентах
      const addBtn = createAddClientBtn(); //TODO кнопку встроить после получения данных о клиентах  Создаю кнопку "Добавить клиента"
      // const ascending = true; // TODO этого не нужно будет Признак сортировки по возрастанию

      // Объект состояния клиентов (сортировка, массив объектов клиентов)
      const clientsState = {
        // field: 'id',
        columnOfSort: 'id',
        stateOfSort: {
          id: true,
          fullname: false,
          createdAt: false,
          updatedAt: false,
        },
        clients: [],
      };

      container.append(header.header); //Добавил шапку сайта в контейнер сайта
      container.append(tableHead.main); //Добавил шапку таблицы в контейнер сайта
      tableHead.tableBox.append(tableBody.tableBody); //Добавил в шапку таблицы тело таблицы
      tableHead.main.append(addBtn.wraper); //Добвил в секцию main кнопку "Довавить клиента"

      header.input.disabled = true; //Деактивировал инпут поиска клиентов
      tableBody.overlay.classList.remove('blocked'); //TODO анимация. Показываю оверлей
      clientsState.clients = await fetchGetClients(); //Записал массив объектов клиентов в объект состояния
      const insertClientsDataElement = insertClientsData(clientsState); //TODO не знаю нужна ли здесь переменная. Вставил клиентские данные в таблицу с учетом сортировки  

      tableBody.overlay.classList.add('blocked'); //TODO анимация скрыл оверлей
      header.input.disabled = false; //Снял блокировку с input поиска

      showTooltips(); // Показываю тултипы
      
      //вешаю событие на input c задержкой времени
      const DELAY_TIME = 300; //300 мс установлено тех. заданием
      let timeoutId = null;
      header.input.addEventListener('input', () => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {findContacts()}, DELAY_TIME); //TODO попробуй передать аргумент head и insertClientsDataElement
      });

      async function findContacts() { //TODO сюда бы передать header. Ищу клиентов по введенным данным в input
        const inputValue = header.input.value.trim();
        if (inputValue) {
          clientsState.clients = await fetchSearchClients(inputValue);
          if (clientsState.clients.length) {
            insertClientsData(clientsState);
          } else {
            deleteTableRows();
          };
        } else {
          clientsState.clients = await fetchGetClients();
          insertClientsData(clientsState);
        };
      };
  

    };
      
    createApp();

  });

})();

