(() => {

  const DELAY_TIME = 300; //300 мс установлено тех. заданием
  const VISIBLE_CSS = 'visible';

  // Объект состояния клиентов (сортировка, массив объектов клиентов)
  const clientsState = {
    columnOfSort: 'id', // По умолчанию по тех.заданию
    stateOfSort: {
      id: true,
      fullname: false,
      createdAt: false,
      updatedAt: false,
    },
    clients: [],
  };

  // Массив типов контактов
  const contactsType = ['Телефон','Facebook','VK','Email','Другое'];

  // Объект структуры модального окна  
  const structure = {
    type: 'new', // Может принимать значения delete, new, change

    headTitle: function() {
      let title = null;
      switch (this.type) {
        case 'delete':
          title = 'Удалить клиента';
          break;
        case 'new':
          title = 'Новый клиент';
          break;
        case 'change': 
          title = 'Изменить данные';
          break;
      }
      // return (this.type === 'change') ? 'Изменить данные' : (this.type === 'new') ? 'Новый клиент' : 'Удалить клиента'
      return title;
    },

    btnSubmit: function() {
      return (this.type === 'delete') ? 'Удалить' : 'Сохранить';
    },

    btn: function() {
      return (this.type === 'change') ? 'Удалить клиента' : 'Отмена';
    },
  };

  // ======== Отрисовка таблицы
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
    const btnWrapper = document.createElement('div');
    const btn = document.createElement('button');
    const text = document.createElement('span');
    const icon = document.createElement('span');
  
    btnWrapper.classList.add('add-client');
    btn.classList.add('add-client__btn', 'btn');
    icon.classList.add('add-client__icon');
    text.innerText = 'Добавить клиента';
  
    btn.append(icon);
    btn.append(text);
    btnWrapper.append(btn);

    return {
      wrapper: btnWrapper, 
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
        clientsArray = sortClientsByDate(clientsObject.clients, clientsObject.columnOfSort, clientsObject.stateOfSort.createdAt);
      break;
      case 'updatedAt':
        clientsArray = sortClientsByDate(clientsObject.clients, clientsObject.columnOfSort, clientsObject.stateOfSort.updatedAt);
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
      wrapCreateDate.classList.add('cell-create__wrapper');
      createDate.classList.add('cell-create__date');
      createTime.classList.add('cell-create__time');
      tdUpdateDate.classList.add('row__cells');
      wrapUpdateDate.classList.add('cell-update__wrapper');
      updateDate.classList.add('cell-update__date');
      updateTime.classList.add('cell-update__time');
      tdContacts.classList.add('row__cells');
      tdActions.classList.add('row__cells');
      wrapActions.classList.add('actions__wrapper');
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

    // Разворот комбинированных контактов
    showAllContacts(tbody);

    // Удаление клиента из таблицы
    const deleteClientBtns = tbody.querySelectorAll('.delete-btn');
    deleteClientBtns.forEach((e) => {
      e.addEventListener('click', async function(el) {
        const clientId = this.dataset.id;
        // Установил тип окна для модалки 
        structure.type = 'delete';
        // получил данные из базы о клиенте с id
        const client = await fetchGetClientById(this.dataset.id);
        // Вызвал модалку
        createModalWindow(client, structure);
      });
    });
    
    // Изменить клиента из таблицы
    const changeClientBtns = tbody.querySelectorAll('.edit-btn');
    changeClientBtns.forEach((e) => {
      e.addEventListener('click', async function(el) {
        const clientId = this.dataset.id;
        // Установил тип окна для модалки 
        structure.type = 'change';
        // получил данные из базы о клиенте с id
        const client = await fetchGetClientById(this.dataset.id);
        // Вызвал модалку
        // TODO а здесь нужно проверять на ответ на запрос?
        createModalWindow(client, structure);
      });
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
        li.setAttribute('id', 'comb');
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

  // Функция создает li элемент для иконок списка контактов
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

  // ======= Функции активностей в таблице
  // Сортировка данных в таблице в первом аргументе объект, во втоом tableHead.tr
  function sortDataInTable(clientsState, tableHeadElement) {
    const thElements = tableHeadElement.querySelectorAll('.table__column_sort');
    thElements.forEach((e) => {
      e.addEventListener('click', function() {
        clientsState.columnOfSort = e.id;
          if (clientsState.stateOfSort[e.id]) {
            clientsState.stateOfSort[e.id] = false;
          } else {
            clientsState.stateOfSort[e.id] = true;
          };
          insertClientsData(clientsState);
      })
    })  
  }

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
      return ClientsArray.sort((a, b) => a.lastName.trim().toLowerCase() + a.name.trim().toLowerCase() + a.surname.trim().toLowerCase() < b.lastName.trim().toLowerCase() + b.name.trim().toLowerCase() + b.surname.trim().toLowerCase() ? 1 : -1);
     }
     return ClientsArray.sort((a, b) => a.lastName.trim().toLowerCase() + a.name.trim().toLowerCase() + a.surname.trim().toLowerCase() > b.lastName.trim().toLowerCase() + b.name.trim().toLowerCase() + b.surname.trim().toLowerCase() ? 1 : -1);
  }

  // Сорировка списка клиентов по полю Дата и время создания
  function sortClientsByDate(ClientsArray, field, ascending) {
    // console.log(ClientsArray);
    // console.log(field);
    // console.log(ascending);
    if (ascending) {
      return ClientsArray.sort((a, b) => new Date(a[field]).getTime() > new Date(b[field]).getTime() ? 1 : -1);
    }
     return ClientsArray.sort((a, b) => new Date(a[field]).getTime() < new Date(b[field]).getTime() ? 1 : -1);
  }

  // Маркировка столбца сортировки
  function markColumnOfSort(column, sorting) {
    // console.log(column, sorting);
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

  // Удаление tbody таблицы и её данные для отображения
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

  // Показываю все контакты клинета по нажатию на Comb кнопку
  function showAllContacts(tbodyElement) {
    const combElement = tbodyElement.querySelectorAll('#comb');
    combElement.forEach((e) => {
      e.addEventListener('click', function() {
        console.log('Клик на ', e);
        const contactsElement = e.parentNode.querySelectorAll('.contacts__item');
        contactsElement.forEach((el) => {
         if (el.id) {
            el.classList.add('blocked');  
         } else {
            el.classList.remove('blocked');
          };
        });
      });
    });
  }

  // TODO animation Закрываю модалку
  function onClose(element) {
    // debugger;
    element.remove();
  };

  // Удаляю клиента
  async function onDelete(clientId) {
    // Удаляю из базы
    const response = await fetchDeleteClient(clientId);
    if (response.ok) {
      // Получаю данные из базы и обновляю таблицу
      // console.log('Получили ок для удаления клиента');
      await updateClientsInTable();
    } else {
      console.log('Удаление клиента. Ошибка HTTP: ' + response.status);
    };
  };

  // Сохраняю данные клиента
  function onSave() {

  };

  // ========= Отрисовка модального окна
  // Собираю модалку
  function createModalWindow(client, structure) {
    // Создал контейнер
    const modal = document.createElement('div');
    const wrapper = document.createElement('div');
    const btnWindowClose = document.createElement('span');
  
    modal.classList.add('modal');
    wrapper.classList.add('modal__wrapper');
    btnWindowClose.classList.add('modal__close');
    btnWindowClose.setAttribute('data-btn', 'close');
  
    wrapper.append(btnWindowClose);
    
    // Создал шапку модалки header элемент
    // ID передаём только в модалку по изменению данных клиента
    let idValue = null;
    if (structure.type === 'change') {
      idValue = client.id; 
    };

    const headerElement = createHeadOfModal(structure.headTitle(), idValue);
    wrapper.append(headerElement.header); //вставил шапку
    
    // Создал контейнер формы
    const formElement = document.createElement('form');
    formElement.classList.add('modal__form');
    formElement.setAttribute('action', '#');

    // Создал части формы
    if (structure.type !== 'delete') {
      // Блок с ФИО клиента
      const clietntNameElement = createClientNameOfModal(client.lastName, client.name, client.surname);
      formElement.append(clietntNameElement);
      // Блок с контактами клиента
      const clientContactsElement = createClientContactsOfModal(client.contacts);
      formElement.append(clientContactsElement.fieldsetContacts);
      wrapper.append(formElement);

      // Установка активности / неактивности кнопки "Добавить контакт"
      disabledBtnAddContact(clientContactsElement.btnAddContactElement, clientContactsElement.fieldsetContacts);

      // Удаляем контакт клиента из формы
      // const btnsDeleteOfContact = clientContactsElement.fieldsetContacts.querySelectorAll('delete-contact__btn');
      // btnsDeleteOfContact.forEach((e) => {
      //   e.addEventListener('click', function(el) {
      //     el.remove();
      //     console.log('Удаление контакта', el);
      //     console.log(document.querySelectorAll('.modal-contacts__item'));

      //   });
      // });

      const btnsTypeOfContactsList = clientContactsElement.fieldsetContacts.querySelectorAll('.contact-type__button btn');
      btnsTypeOfContactsList.forEach((e) => {
        e.addEventListener('click', function(el) {
          console.log(el.currentTarget);
          console.log(el.this);
        });
      });

      // Добавляем контакт клиента
      addNewContact(clientContactsElement.btnAddContactElement, clientContactsElement.wrapperContacts);

      // Удаляем контакт клиента
      deleteContact(clientContactsElement.btnAddContactElement, clientContactsElement.wrapperContacts);

      // Ловим ввод данных в инпут
      checkValueInInputs(clientContactsElement.wrapperContacts);

    } else {
      // Модалка на удаление клиента. Создал Блок предупреждений / ошибок
      const errorElement = createErrorForModal ('Вы действительно хотите удалить данного клиента?');
      // Меняем цвет блока ошибок
      errorElement.spanError.classList.add('modal-error__text-style');
      wrapper.append(errorElement.wrapperError);
      // Выравнивание заголовка шапки посредине
      headerElement.header.classList.add('align-center', 'modal-header-margin-bottom');
      headerElement.headerTitle.classList.add('modal-header__heading-padding-top');
    };

    // Создал блок кнопок
    const btnsElement = createBtnsForModal(structure.btnSubmit(), structure.btn());
    wrapper.append(btnsElement.wrapperBtns);
    
    modal.append(wrapper);
    document.body.append(modal);

    // Обработчики событий
    // Нажатие на Esc
    document.addEventListener('keydown', function(event) {
      console.log(event);
      if (event.code == "Escape") {
        onClose(modal);
      };
    });


    // Клик на иконку закрытия окна
    btnWindowClose.addEventListener('click', function(e) {
      // console.log(e);
      onClose(modal);
    });

    // Клик на оверлей
    modal.addEventListener('click', function(e) {
      if (!e.target.classList.contains('modal')) {
        return;
      }
      onClose(modal);
    });

    // Клик на большую кнопку
    btnsElement.btnSubmit.addEventListener('click', function(e) {
      if (structure.type == 'delete') {

        onDelete(client.id); // Удаляем клиента из базы по ID
        onClose(modal); // Закрываем модалку
        // Прорисовываем таблицу заново 
      } else {
        onSave(clientObjForSaving);
        onClose(modal); // Закрываем модалку
        // Прорисовываем таблицу заново 
      };
      
    });

    // Клик на маленькую кнопку
    btnsElement.btnSmall.addEventListener('click', function(e) {
      if (structure.type !== 'change') {
        onClose(modal);
      } else {
        onDelete(client.id); // Удаляем клиента из базы по ID
        onClose(modal); // Закрываем модалку
        // Прорисовываем таблицу заново 
      };
    });

    // Открытие дропдауна
    showDropDown(modal);

    // Для нового клиента раскрыть инпуты
    // Валидация инпутов ФИО

    // Клик на кнопку добавить контакт.Деактивировать кнопку если десять контактов в функции createClientContactsOfModal
    // console.log(clientContactsElement.btnAddContactElement);
    // addNewContact(clientContactsElement.btnAddContactElement);


    // Форматирование и валидация инпутов контактов
    // Клик на кнопку удалить контакт
    // Селект для контактов


    return modal;
  };

  // Шапка модалки
  function createHeadOfModal(title, idValue) {
    const header = document.createElement('div');
    const headerTitle = document.createElement('h2');
    
    header.classList.add('modal__header', 'modal__container');
    headerTitle.classList.add('modal-header__heading');
    
    headerTitle.textContent = title;

    header.append(headerTitle);

    if (idValue) {
      const headerInfo = document.createElement('span');
      headerInfo.classList.add('modal-header__id');
      headerInfo.innerText = `ID: ${idValue.slice(-6)}`;
      header.append(headerInfo);
    }

    return {
      header,
      headerTitle,
    };
  };

  // Создал часть формы с ФИО клиента
  function createClientNameOfModal(lastName, name, surname) {
    const fieldsetClientName = document.createElement('fieldset');
    const wrapperClientName = document.createElement('div');
    const wrapperLastname = document.createElement('div');
    const inputLastname = document.createElement('input');
    const lableLastname = document.createElement('lable');
    const asterixLastname = document.createElement('span');
    const wrapperName = document.createElement('div');
    const inputName = document.createElement('input');
    const lableName = document.createElement('lable');
    const asterixName = document.createElement('span');
    const wrapperSurname = document.createElement('div');
    const lableSurname = document.createElement('lable');
    const inputSurname = document.createElement('input');

    fieldsetClientName.classList.add('fieldset_reset', 'modal-fullname');
    wrapperClientName.classList.add('modal__container', 'modal-contaiter_position_flex');
    wrapperLastname.classList.add('inputs__wrap');
    inputLastname.classList.add('input', 'modal__intup');
    lableLastname.classList.add('modal__lable');
    asterixLastname.classList.add('lable_asterix');
    wrapperName.classList.add('inputs__wrap');
    inputName.classList.add('input', 'modal__intup');    
    lableName.classList.add('modal__lable');
    asterixName.classList.add('lable_asterix');
    wrapperSurname.classList.add('inputs__wrap');
    inputSurname.classList.add('input', 'modal__intup');    
    lableSurname.classList.add('modal__lable');
    
    inputLastname.setAttribute('id', 'lastname');
    inputLastname.setAttribute('data-input', 'lastname');
    inputLastname.setAttribute('type', 'text');
    inputLastname.setAttribute('name', 'lastname');
    inputLastname.setAttribute('autofocus', 'true');
    lableLastname.setAttribute('for', 'lastname');
    inputName.setAttribute('id', 'name');
    inputName.setAttribute('data-input', 'name');
    inputName.setAttribute('type', 'text');
    inputName.setAttribute('name', 'name');
    lableName.setAttribute('for', 'name');
    inputSurname.setAttribute('id', 'surname');
    inputSurname.setAttribute('data-input', 'surname');
    inputSurname.setAttribute('type', 'text');
    inputSurname.setAttribute('name', 'surname');
    lableSurname.setAttribute('for', 'surname');
    
    lableLastname.textContent = 'Фамилия';
    asterixLastname.textContent = '*';
    lableName.textContent = 'Имя';
    asterixName.textContent = '*';     
    lableSurname.textContent = 'Отчество';

    if (lastName) {
      lableLastname.classList.add('modal__lable_up');
      inputLastname.value = lastName;
    }

    if (name) {
      lableName.classList.add('modal__lable_up');
      inputName.value = name;
    }

    if (surname) {
      lableSurname.classList.add('modal__lable_up');
      inputSurname.value = surname;
    };

    lableLastname.append(asterixLastname);
    lableName.append(asterixName);

    wrapperLastname.append(lableLastname);
    wrapperLastname.append(inputLastname);
    wrapperName.append(lableName);
    wrapperName.append(inputName);
    wrapperSurname.append(lableSurname);
    wrapperSurname.append(inputSurname);

    wrapperClientName.append(wrapperLastname);
    wrapperClientName.append(wrapperName);
    wrapperClientName.append(wrapperSurname);
    
    fieldsetClientName.append(wrapperClientName);

    // TODO Подъем lables
    showInpunsUnderLables(wrapperClientName);

    return fieldsetClientName;
  }

  // Функция подъёма label если фокус на input
  function showInpunsUnderLables (wrapperClientName) {
    const inputsFullName = wrapperClientName.querySelectorAll('.inputs__wrap');
    inputsFullName.forEach((e) => {
      const inputElement = e.querySelector('.modal__intup');
      const lableElement = e.querySelector('.modal__lable');
      inputElement.onfocus = function() {
        lableElement.classList.add('modal__lable_up');
        // inputElement.classList.add('modal__intup_height');

    };
      inputElement.onblur =function() {
        if(!inputElement.value) {
          lableElement.classList.remove('modal__lable_up');
          // inputElement.classList.remove('modal__intup_height');
        }
      };
    }); 
  };

  // Создал часть формы с контактами клиента
  function createClientContactsOfModal(contacts) {
    const fieldsetContacts = document.createElement('fieldset');
    const wrapperContacts = document.createElement('div');
    const listOfContacts = document.createElement('ul');

    fieldsetContacts.classList.add('modal-contacts', 'fieldset_reset');
    wrapperContacts.classList.add('modal__container');
    listOfContacts.classList.add('modal-contacts__list');

    wrapperContacts.append(listOfContacts);
        
    if (contacts) {
      contacts.forEach((el) => {
        const contactItem = createContactForModal(el);
        listOfContacts.append(contactItem);
      });
    };

    // Кнопка добавить клиента    
    const btnAddContactElement = createBtnAddContactForModal();
    fieldsetContacts.append(wrapperContacts);
    fieldsetContacts.append(btnAddContactElement);

    return {
      fieldsetContacts,
      btnAddContactElement,
      wrapperContacts,
    };    
  };

  // Создал элемент списка контактов с кнопкой "Удалить"
  function createContactForModal(contact) {
    const contactItem = document.createElement('li');
    const wrapContactType = document.createElement('div');
    const btnContactType = document.createElement('button');
    const listContactTypeDropdown = document.createElement('ul');
    const inputContactValue = document.createElement('input');
    const btnContactDelete = document.createElement('button');
    const btnContactDeleteIcon = document.createElement('span');

    contactItem.classList.add('modal-contacts__item');
    wrapContactType.classList.add('contacts-type');
    btnContactType.classList.add('contact-type__button', 'btn');
    listContactTypeDropdown.classList.add('contact-type__list');
    inputContactValue.classList.add('input', 'contact-value', 'contact-value_border-right');
    inputContactValue.setAttribute('type', 'text');
    inputContactValue.setAttribute('placeholder', 'Введите данные контакта');
    btnContactDelete.classList.add('delete-contact__btn', 'btn', 'blocked');
    btnContactDeleteIcon.classList.add('delete-contact__icon');

    btnContactType.textContent = 'Тип контакта';

    contactsType.forEach((e) => {
      const item = document.createElement('li');
      item.classList.add('contact-type__item');
      item.textContent = e;
      listContactTypeDropdown.append(item);
    })

    if (contact) {
      btnContactType.textContent = contact.type;
      inputContactValue.value = contact.value;
      btnContactDelete.classList.remove('blocked');
    };
    
    btnContactDelete.append(btnContactDeleteIcon);

    wrapContactType.append(btnContactType);
    wrapContactType.append(listContactTypeDropdown);
    // wrapContactType.append(btnContactDelete);


    contactItem.append(wrapContactType);
    contactItem.append(inputContactValue);
    contactItem.append(btnContactDelete);
    

    return contactItem;
  };

  // Создал кнопку добавления контакта 
  function createBtnAddContactForModal() {
    const btnAddContact = document.createElement('button');
    const btnAddContactIcon = document.createElement('span');
    const btnAddContactTitle = document.createElement('span');

    btnAddContact.classList.add('modal-addcontact__btn', 'btn', VISIBLE_CSS);
    btnAddContactIcon.classList.add('modal-addcontact__icon');
    btnAddContactTitle.classList.add('modal-addcontact__title');

    btnAddContact.setAttribute('data-btn','contact-add');
    btnAddContactTitle.textContent = 'Добавить контакт';

    btnAddContact.append(btnAddContactIcon);
    btnAddContact.append(btnAddContactTitle);

    return btnAddContact;
  }

  // Создал блок с выводом ошибок и др. инфорации
  function createErrorForModal(info) {
    const wrapperError = document.createElement('div');
    const spanError = document.createElement('span');
    
    wrapperError.classList.add('modal-error');
    spanError.classList.add('modal-error__text');
    
    wrapperError.classList.remove('blocked');
    spanError.textContent = info;

    wrapperError.append(spanError);
    
    return {
      wrapperError,
      spanError,
    };
  };

  // Создал блок кнопок модалки
  function createBtnsForModal(submitTitle, smallTitle) {
    const wrapperBtns = document.createElement('div');
    const btnSubmit = document.createElement('button');
    const btnSubmitIcon = document.createElement('span');
    const btnSubmitTitle = document.createElement('span');
    const btnSmall = document.createElement('button');

    wrapperBtns.classList.add('modal-btns');
    btnSubmit.classList.add('submit-btn', 'btn');
    btnSubmitIcon.classList.add('submit-btn__icon');
    btnSubmitTitle.classList.add('submit-btn__title');

    btnSmall.classList.add('modal-delete-btn', 'btn');

    btnSubmit.setAttribute('data-btn', 'submit');
    btnSmall.setAttribute('data-btn', 'small');


    btnSubmitTitle.textContent = submitTitle;
    btnSmall.textContent = smallTitle;    

    btnSubmit.append(btnSubmitIcon);
    btnSubmit.append(btnSubmitTitle);
    wrapperBtns.append(btnSubmit);
    wrapperBtns.append(btnSmall);

    return {
      wrapperBtns,
      btnSubmit,
      btnSmall,
    };
  };

  // Считаю количество контактов если 10 деактивируем кнопку Добавить контакт
  function disabledBtnAddContact(btnAddContact, wrapper) {
    // console.log(wrapper);
    const items = wrapper.querySelectorAll('.modal-contacts__item');
    // console.log(items.length);
    if (items.length >= 10) {
      // console.log('Превышает норму');
      btnAddContact.classList.remove(VISIBLE_CSS);
    } else {
      // console.log('Не превышает норму');
      btnAddContact.classList.add(VISIBLE_CSS);
    };
  };

  //Развернул дропдаун
  function showDropDown(modalElement) {
    const dropdowns = modalElement.querySelectorAll('.contacts-type');
    // console.log(dropdowns);
    // console.log(dropdowns.length);

    dropdowns.forEach((e) => {
      setEventsOnDropdown(e)
    });
  };

  // Добавление слушателей к элементам дропдауна
  function setEventsOnDropdown(element) {
    const btnDropdown = element.querySelector('.contact-type__button');
    const listDropdown = element.querySelector('.contact-type__list');
    const itemDropdown = listDropdown.querySelectorAll('.contact-type__item');
    // const inputDropdown = e.querySelector('.dropdown__input');
  
  // Отслеживаем клик на кнопке (открыть/закрыть список)
    btnDropdown.addEventListener('click', function(e){
      e.preventDefault();
      listDropdown.classList.toggle('contact-type__list_visible');
      btnDropdown.classList.toggle('contact-type__button_rotate');
      // btnDropdown.classList.add('dropdown__button_active');
    });
  
  // Отслеживаем клик по элементам списка и присваивание значения кнопке
    itemDropdown.forEach((e) => {
      e.addEventListener('click', function(el) {
        el.stopPropagation();
        btnDropdown.textContent = this.innerText;
        btnDropdown.focus();
        // inputDropdown.value = this.dataset.value;
        hidenDropdown(listDropdown, btnDropdown);
      }); 
    });
  
  // Клик снаружи дропдауна. Закрыть дропдаун
    document.addEventListener('click', function(e) {
      if (e.target !== btnDropdown) {
        // btnDropdown.classList.remove('dropdown__button_active');
        hidenDropdown(listDropdown, btnDropdown);
      };  
    });
  
  // Нажатие на Таб или Эскейп. Закрыть дропдаун
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Tab' || e.key === 'Escape') {
        // btnDropdown.classList.remove('dropdown__button_active');
        hidenDropdown(listDropdown, btnDropdown);
      };
    });
  };

  // В функции setEventsOnDropdown повторение кода - удаление свойст показа списка дропдауна
  function hidenDropdown(listDropdown, btnDropdown) {
    listDropdown.classList.remove('contact-type__list_visible');
    btnDropdown.classList.remove('contact-type__button_rotate');
  };

  // Добавление события ввода данных в инпуты контактов
  function checkValueInInputs(modalElement) {
    const contacts = modalElement.querySelectorAll('.modal-contacts__item');
    contacts.forEach((e) => {
      setEventsOnInput(e);
    });    
  };

  // В функции checkValueInInputs повторение кода - установка видимости кнопки "Удалить контакт"
  function setEventsOnInput(element) {
    const btnDeleteContact = element.querySelector('.delete-contact__btn');
    const inputContact = element.querySelector('.contact-value');

    // console.log(btnDeleteContact);
    element.addEventListener('input', function(e) {
      e.stopPropagation();
      // console.log('Начал вводить');
      if (inputContact.value) {
        btnDeleteContact.classList.remove('blocked');
      } else {
        btnDeleteContact.classList.add('blocked');
      };
      // console.log(element.nextElementSibling);
    });
  };

  // Добавляем новый контакт клиенту
  function addNewContact(btnAddContact, wrapperContacts) {
    console.log(wrapperContacts);
    const listContacts = wrapperContacts.querySelector('.modal-contacts__list');
    btnAddContact.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();

      const contactItem = createContactForModal('');
      
      listContacts.append(contactItem);

      // Добавил новому элементу события для дропдауна
      setEventsOnDropdown(contactItem);
      
      // Добавил новому элементу событие на ввод данных
      setEventsOnInput(contactItem);

      // Добавил новому элементу событие на кнопку "Удалить контакт"
      setEventOnBtnDeleteContact(contactItem,  btnAddContact, wrapperContacts);
      
      disabledBtnAddContact(btnAddContact, wrapperContacts);
    });
  };

  // Удаляем контакт по кнопке
  function deleteContact(btnAddContact, wrapperContacts) {
    const btnDelete = wrapperContacts.querySelectorAll('.modal-contacts__item');

    btnDelete.forEach((e) => {
      setEventOnBtnDeleteContact(e, btnAddContact, wrapperContacts);
      // e.addEventListener('click', function() {
      //   this.parentNode.remove();
        // disabledBtnAddContact(btnAddContact, wrapperContacts);
      // });
    });
  };

  function setEventOnBtnDeleteContact(element,  btnAddContact, wrapperContacts) {
    console.log(element);
    const btnDelete = element.querySelector('.delete-contact__btn');
    btnDelete.addEventListener('click', function() {
      // if (this.classList.contains !== 'delete-contact__btn') {
        // return;
      // }
      // console.log(e);
      // console.log(this);
      element.remove();
      disabledBtnAddContact(btnAddContact, wrapperContacts);
    });
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

  // Получаем клиента по его ID
  async function fetchGetClientById(id) {
    const pesponse = await fetch(`${URI}/${id}`);
    const data = await pesponse.json();
    return data;
  };

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
    return data;
  };

  // Удаляем клиента по ID. Ничего не возвращает в body
  async function fetchDeleteClient(id) {
    const response = await fetch(`${URI}/${id}`, {
      method: "DELETE",
    });
    return response;
  };

  async function updateClientsInTable() {
    // Заблокировал инпут поиска клиентов 
    const serchInput = document.querySelector('.search-form__input');
    serchInput.disabled = true; 

    // Показал оверлей
    const tableBodyOverley = document.querySelector('.table-body__overlay');
    tableBodyOverley.classList.remove('blocked'); //TODO animation

    // Записал данные о клинетах из базы в массив объекта
    clientsState.clients = await fetchGetClients();

    // Вставил данные в таблицу
    insertClientsData(clientsState);
    
    // Скрыл оверлей
    tableBodyOverley.classList.add('blocked'); //TODO animation

    // Разблокировал инпут поиска клиентов
    serchInput.disabled = false; 
  };

  // Основная функция
  document.addEventListener('DOMContentLoaded', () => {
    async function createApp() {
      const container = document.getElementById('crm-app');
      const header = createHeader(); //Создаю шапку сайта с лого и поиском
      const tableHead = createTableHead(); //Создаю шапку таблицы
      const tableBody = createTableBody(); //Создаю тело таблицы для вставки данных о клиентах
      const addBtn = createAddClientBtn(); //TODO кнопку встроить после получения данных о клиентах  Создаю кнопку "Добавить клиента"
      
      container.append(header.header); //Добавил шапку сайта в контейнер сайта
      container.append(tableHead.main); //Добавил шапку таблицы в контейнер сайта
      tableHead.tableBox.append(tableBody.tableBody); //Добавил в шапку таблицы тело таблицы
      tableHead.main.append(addBtn.wrapper); //Добвил в секцию main кнопку "Довавить клиента"

      // Вставил данные из базы в таблицу
      await updateClientsInTable();

      // Показываю тултипы
      showTooltips(); 
      
      // Поиск по ФИО
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

      // Сортировка данных в таблице 
      sortDataInTable(clientsState, tableHead.tr);
      
      // Добавляем клиента
      addBtn.btn.addEventListener('click', function(e) {
        structure.type = 'new';
        createModalWindow('', structure);
      });

    };
    
    createApp();

  });

})();

