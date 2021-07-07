(() => {

  const DELAY_TIME = 300; //300 мс установлено тех. заданием
  const VISIBLE_CSS = 'visible';
  const URI = 'http://localhost:3000/api/clients';

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
  const contactsTypes = ['Телефон', 'Facebook', 'VK', 'Email', 'Другое'];

  // Объект структуры модального окна  
  const modalWindowStructure = {
    type: 'new', // Может принимать значения delete, new, change

    headTitle: function () {
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
      return title;
    },

    buttonSubmit: function () {
      return (this.type === 'delete') ? 'Удалить' : 'Сохранить';
    },

    button: function () {
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
    const formInput = document.createElement('input');

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
    overlay.classList.add('table-body__overlay', 'blocked');
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
  function createAddClientButton() {
    const buttonWrapper = document.createElement('div');
    const button = document.createElement('button');
    const text = document.createElement('span');
    const icon = document.createElement('span');

    buttonWrapper.classList.add('add-client');
    button.classList.add('add-client__btn', 'btn');
    icon.classList.add('add-client__icon');
    text.innerText = 'Добавить клиента';

    button.append(icon);
    button.append(text);
    buttonWrapper.append(button);

    return {
      wrapper: buttonWrapper,
      button,
    };
  };

  // Вставляем данные в таблицу
  function insertClientsData(clientsObject) {
    const tbodyElement = document.querySelector('tbody');
    let clients = [];
    switch (clientsObject.columnOfSort) {
      case 'fullname':
        clients = sortClientsByFullname(clientsObject.clients, clientsObject.stateOfSort.fullname);
        break;
      case 'createdAt':
        clients = sortClientsByDate(clientsObject.clients, clientsObject.columnOfSort, clientsObject.stateOfSort.createdAt);
        break;
      case 'updatedAt':
        clients = sortClientsByDate(clientsObject.clients, clientsObject.columnOfSort, clientsObject.stateOfSort.updatedAt);
        break;
      default:
        clients = sortClientsById(clientsObject.clients, clientsObject.stateOfSort.id);
    };

    tbodyElement.innerHTML = '';
    
    markColumnOfSort(clientsObject.columnOfSort, clientsObject.stateOfSort);

    clients.forEach((client) => {
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
      const ulContacts = createContactList(client.contacts);
      const tdActions = document.createElement('td');
      const wrapActions = document.createElement('div');
      const buttonEdit = document.createElement('button');
      const buttonEditImg = document.createElement('span');
      const buttonEditText = document.createElement('span');
      const buttonDelete = document.createElement('button');
      const buttonDeleteImg = document.createElement('span');
      const buttonDeleteText = document.createElement('span');

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
      buttonEdit.classList.add('edit-btn', 'btn');
      buttonEditImg.classList.add('actions-btn__icon', 'edit-btn__icon');
      buttonEditText.classList.add('edit-btn__text');
      buttonDelete.classList.add('delete-btn', 'btn');
      buttonDeleteImg.classList.add('actions-btn__icon', 'delete-btn__icon');
      buttonDeleteText.classList.add('delete-btn__text');

      tr.setAttribute('id', client.id); // Для поиска клиентов в таблице и скролла к ним
      buttonEdit.setAttribute('data-id', client.id);
      buttonDelete.setAttribute('data-id', client.id);

      tdId.innerText = client.id.slice(-6);
      tdFullname.innerText = `${client.surname.trim()} ${client.name.trim()} ${client.lastName.trim()}`;
      createDate.innerText = formatDate(client.createdAt);
      createTime.innerText = formatTime(client.createdAt);
      updateDate.innerText = formatDate(client.updatedAt);
      updateTime.innerText = formatTime(client.updatedAt);
      buttonEditText.innerText = 'Изменить';
      buttonDeleteText.innerText = 'Удалить';

      wrapCreateDate.append(createDate);
      wrapCreateDate.append(createTime);
      tdCreateDate.append(wrapCreateDate);

      wrapUpdateDate.append(updateDate);
      wrapUpdateDate.append(updateTime);
      tdUpdateDate.append(wrapUpdateDate);
      tdContacts.append(ulContacts);
      buttonEdit.append(buttonEditImg);
      buttonEdit.append(buttonEditText);
      buttonDelete.append(buttonDeleteImg);
      buttonDelete.append(buttonDeleteText);
      wrapActions.append(buttonEdit);
      wrapActions.append(buttonDelete);
      tdActions.append(wrapActions);

      tr.append(tdId);
      tr.append(tdFullname);
      tr.append(tdCreateDate);
      tr.append(tdUpdateDate);
      tr.append(tdContacts);
      tr.append(tdActions);

      tbodyElement.append(tr);
    });

    // Разворот комбинированных контактов
    showAllContacts(tbodyElement);

    // Удаление клиента из таблицы
    const deleteClientButtons = tbodyElement.querySelectorAll('.delete-btn');
    deleteClientButtons.forEach((deleteClientbutton) => {
      deleteClientbutton.addEventListener('click', async function () {
        const clientId = this.dataset.id;
        // Установил тип окна для модалки 
        modalWindowStructure.type = 'delete';
        // получил данные из базы о клиенте с id
        const client = await fetchGetClientById(this.dataset.id);
        // Вызвал модалку
        createModalWindow(client, modalWindowStructure);
      });
    });

    // Изменить клиента из таблицы
    const changeClientButtons = tbodyElement.querySelectorAll('.edit-btn');
    changeClientButtons.forEach((changeClientButton) => {
      changeClientButton.addEventListener('click', async function () {
        const clientId = this.dataset.id;
        const iconElement = changeClientButton.querySelector('.edit-btn__icon');
        // Установил тип окна для модалки 
        modalWindowStructure.type = 'change';
        iconElement.classList.add('load__icon');
        // получил данные из базы о клиенте с id
        const client = await fetchGetClientById(clientId);
        iconElement.classList.remove('load__icon');
        // Вызвал модалку
        // TODO а здесь нужно проверять на ответ на запрос?
        // if (client.response.status === 200) {
        // debugger;
        createModalWindow(client, modalWindowStructure);
        document.location.hash = clientId
        // };
      });
    });

    console.log(tbodyElement);

    // return tbodyElement;
  };

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
      if (i === 5 && arreyLength > 5) {
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


    switch (contact.type) {
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
      e.addEventListener('click', function () {
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

  // Сортировка списка клиентов по полю Ф.И.О.
  function sortClientsByFullname(ClientsArray, ascending) {
    if (ascending) {
      return ClientsArray.sort((a, b) => a.surname.trim().toLowerCase() + a.name.trim().toLowerCase() + a.lastName.trim().toLowerCase() < b.surname.trim().toLowerCase() + b.name.trim().toLowerCase() + b.lastName.trim().toLowerCase() ? 1 : -1);
    }
    return ClientsArray.sort((a, b) => a.surname.trim().toLowerCase() + a.name.trim().toLowerCase() + a.lastName.trim().toLowerCase() > b.surname.trim().toLowerCase() + b.name.trim().toLowerCase() + b.lastName.trim().toLowerCase() ? 1 : -1);
  }

  // Сорировка списка клиентов по полю Дата и время создания
  function sortClientsByDate(ClientsArray, field, ascending) {
    if (ascending) {
      return ClientsArray.sort((a, b) => new Date(a[field]).getTime() > new Date(b[field]).getTime() ? 1 : -1);
    }
    return ClientsArray.sort((a, b) => new Date(a[field]).getTime() < new Date(b[field]).getTime() ? 1 : -1);
  }

  // Маркировка столбца сортировки
  function markColumnOfSort(column, sorting) {
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

  // Показываю тултипы [data-type] и [data-value]
  function showTooltips() {
    let tooltipElememt;
    let tooltipTypeElement;
    let tooltipValueElement;
    document.addEventListener('mouseover', (event) => {
      let target = event.target;
      let tooltipType = target.dataset.type;
      let tooltipValue = target.dataset.value;

      if (!tooltipType && !tooltipValue) return;

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
    });

    document.addEventListener('mouseout', (event) => {
      if (tooltipElememt) {
        tooltipElememt.remove();
        tooltipElememt = null;
      };
    });
  };

  // Показываю все контакты клинета по нажатию на Comb кнопку
  function showAllContacts(tbodyElement) {
    const combElement = tbodyElement.querySelectorAll('#comb');
    combElement.forEach((e) => {
      e.addEventListener('click', function () {
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



  // ========= Отрисовка модального окна
  // Собираю модалку
  function createModalWindow(client) {
    // Создал контейнер
    const modal = document.createElement('div');
    const wrapper = document.createElement('div');
    const buttonWindowClose = document.createElement('span');

    modal.classList.add('modal');
    wrapper.classList.add('modal__wrapper');
    buttonWindowClose.classList.add('modal__close');
    buttonWindowClose.setAttribute('data-btn', 'close');

    wrapper.append(buttonWindowClose);

    // Создал шапку модалки header элемент
    // ID передаём только в модалку по изменению данных клиента
    let idValue = null;
    if (modalWindowStructure.type === 'change') {
      idValue = client.id;
    };

    const headerElement = createHeadOfModal(modalWindowStructure.headTitle(), idValue);
    wrapper.append(headerElement.header); //вставил шапку

    // Создал контейнер формы
    const formElement = document.createElement('form');
    formElement.classList.add('modal__form');
    formElement.setAttribute('action', '#');

    // Создал Блок ошибок
    const blockError = createErrorForModal();

    // Создал части формы
    if (modalWindowStructure.type !== 'delete') {
      // Создал Блок с ФИО клиента
      const clietntNameElement = createClientNameOfModal(client.surname, client.name, client.lastName);
      formElement.append(clietntNameElement);

      // Создал Блок с контактами клиента
      const clientContactsElement = createClientContactsOfModal(client.contacts);
      formElement.append(clientContactsElement.fieldsetContacts);
      wrapper.append(formElement);

      // Добавил переключатель активна/неактивна кнопка "Добавить контакт" (по кол-ву контактов)
      disabledButtonAddContact(clientContactsElement.buttonAddContactElement, clientContactsElement.fieldsetContacts);

      // Добавление нового клиента при нажатии на кнопку
      addNewContact(clientContactsElement.buttonAddContactElement, clientContactsElement.wrapperContacts);

      // Удаление контакта клиента при нажатии на кнопку
      deleteContact(clientContactsElement.buttonAddContactElement, clientContactsElement.wrapperContacts);

      // Добавил переключатель активна/неактивна кнока "Удалить контакт" при условии наличия данных в инпуте 
      checkValueInInputs(clientContactsElement.wrapperContacts);

      // Добавил Блок Ошибок
      wrapper.append(blockError.wrapperError);

    } else {
      // Добавил Блок Ошибок
      wrapper.append(blockError.wrapperError);
      // Показал его
      blockError.wrapperError.classList.remove('blocked');
      // Записал значение ошибки/предупреждения
      blockError.spanError.textContent = 'Вы действительно хотите удалить данного клиента?';
      // Меняем цвет блока ошибок
      blockError.spanError.classList.add('modal-error__text-style');
      // Выравнивание заголовка шапки посредине
      headerElement.header.classList.add('align-center', 'modal-header-margin-bottom');
      headerElement.headerTitle.classList.add('modal-header__heading-padding-top');
    };

    // Создал блок кнопок
    const buttonsElement = createButtonsForModal(modalWindowStructure.buttonSubmit(), modalWindowStructure.button());
    wrapper.append(buttonsElement.wrapperButtons);

    modal.append(wrapper);
    document.body.append(modal);

    // Обработчики событий
    // Нажатие на Esc
    document.addEventListener('keydown', function (event) {
      if (event.code == "Escape") {
        onClose(modal, wrapper);
      };
    });

    // Клик на иконку закрытия окна
    buttonWindowClose.addEventListener('click', function (e) {
      onClose(modal);
    });

    // Клик на оверлей
    modal.addEventListener('click', function (e) {
      if (!e.target.classList.contains('modal')) {
        return;
      }
      onClose(modal);
    });

    // Клик на большую кнопку
    buttonsElement.buttonSubmit.addEventListener('click', async function (e) {
      // e.preventDefault(); TODO как сделать submit?
      if (modalWindowStructure.type == 'delete') {
        onDelete(client.id, modal); // Удаляем клиента из базы по ID
      } else {
        // Собираем данные из формы здесь же можно установить в disabled
        const objOfClient = getValuesFromModal(modal);

        // Есть ли ошибки при заполнении формы?
        if (!objOfClient.textError) {
          const iconButtonSubmit = buttonsElement.buttonSubmit.querySelector('.submit-btn__icon');
          // console.log(iconBtnSubmit);
          // Ставим лоадер на кнопку
          iconButtonSubmit.classList.add(VISIBLE_CSS);
          // Устанавливаем disabled на форму
          setDisabledOnElementsOfForm(modal, true);
          if (modalWindowStructure.type == 'new') {
            await onSave(objOfClient, modal);
          } else if (modalWindowStructure.type == 'change') {
            await onUpdate(objOfClient, idValue, modal);
          };
          //Убираем лоадер с кнопки
          iconButtonSubmit.classList.remove(VISIBLE_CSS);
          // Снимаем disabled
          setDisabledOnElementsOfForm(modal);
        } else {
          blockError.wrapperError.classList.remove('blocked');
          blockError.spanError.innerHTML = objOfClient.textError;
        }
      };
    });

    // Клик на маленькую кнопку
    buttonsElement.buttonSmall.addEventListener('click', function (e) {
      if (modalWindowStructure.type !== 'change') {
        onClose(modal);
      } else {
        onDelete(client.id, modal); // Удаляем клиента из базы по ID
        // onClose(modal); // Закрываем модалку
      };
    });

    // Добавил открытие дропдауна при нажатии на кнопку
    showDropDown(modal);

    const timeoutId = setTimeout(() => {
      modal.classList.add(VISIBLE_CSS);
      wrapper.classList.add(VISIBLE_CSS);
    }, 100);

    // modal.classList.add(VISIBLE_CSS);

    // document.location.hash = idValue;

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
  function createClientNameOfModal(surname, name, lastName) {
    const fieldsetClientName = document.createElement('fieldset');
    const wrapperClientName = document.createElement('div');
    const wrapperSurname = document.createElement('div');
    const inputSurname = document.createElement('input');
    const lableSurname = document.createElement('lable');
    const asterixSurname = document.createElement('span');
    const wrapperName = document.createElement('div');
    const inputName = document.createElement('input');
    const lableName = document.createElement('lable');
    const asterixName = document.createElement('span');
    const wrapperLastname = document.createElement('div');
    const inputLastname = document.createElement('input');
    const lableLastname = document.createElement('lable');

    fieldsetClientName.classList.add('fieldset_reset', 'modal-fullname');
    wrapperClientName.classList.add('modal__container', 'modal-contaiter_position_flex');

    wrapperSurname.classList.add('inputs__wrap');
    inputSurname.classList.add('input', 'modal__intup');
    lableSurname.classList.add('modal__lable');
    asterixSurname.classList.add('lable_asterix');
    wrapperName.classList.add('inputs__wrap');
    inputName.classList.add('input', 'modal__intup');
    lableName.classList.add('modal__lable');
    asterixName.classList.add('lable_asterix');
    wrapperLastname.classList.add('inputs__wrap');
    inputLastname.classList.add('input', 'modal__intup');
    lableLastname.classList.add('modal__lable');

    inputSurname.setAttribute('id', 'surname');
    inputSurname.setAttribute('data-input', 'surname');
    inputSurname.setAttribute('type', 'text');
    inputSurname.setAttribute('name', 'surname');
    lableSurname.setAttribute('for', 'surname');
    inputName.setAttribute('id', 'name');
    inputName.setAttribute('data-input', 'name');
    inputName.setAttribute('type', 'text');
    inputName.setAttribute('name', 'name');
    lableName.setAttribute('for', 'name');
    inputLastname.setAttribute('id', 'lastname');
    inputLastname.setAttribute('data-input', 'lastname');
    inputLastname.setAttribute('type', 'text');
    inputLastname.setAttribute('name', 'lastname');
    // inputLastname.setAttribute('autofocus', 'true');
    lableLastname.setAttribute('for', 'lastname');

    lableSurname.textContent = 'Фамилия';
    asterixSurname.textContent = '*';
    lableName.textContent = 'Имя';
    asterixName.textContent = '*';
    lableLastname.textContent = 'Отчество';

    if (surname) {
      lableSurname.classList.add('modal__lable_up');
      inputSurname.value = surname;
    };

    if (name) {
      lableName.classList.add('modal__lable_up');
      inputName.value = name;
    };

    if (lastName) {
      lableLastname.classList.add('modal__lable_up');
      inputLastname.value = lastName;
    };

    lableSurname.append(asterixSurname);
    lableName.append(asterixName);

    wrapperSurname.append(lableSurname);
    wrapperSurname.append(inputSurname);
    wrapperName.append(lableName);
    wrapperName.append(inputName);
    wrapperLastname.append(lableLastname);
    wrapperLastname.append(inputLastname);

    wrapperClientName.append(wrapperSurname);
    wrapperClientName.append(wrapperName);
    wrapperClientName.append(wrapperLastname);

    fieldsetClientName.append(wrapperClientName);

    // Навешиваю обработчики на inputs для сброса стилизации ошибок
    inputSurname.addEventListener('input', function (e) {
      inputSurname.parentNode.classList.remove('border-color_burnt-sienna');
    });

    inputName.addEventListener('input', function (e) {
      inputName.parentNode.classList.remove('border-color_burnt-sienna');
    });


    // TODO Подъем lables
    showInpunsUnderLables(wrapperClientName);

    return fieldsetClientName;
  }

  // Функция подъёма label если фокус на input
  function showInpunsUnderLables(wrapperClientName) {
    const inputsFullName = wrapperClientName.querySelectorAll('.inputs__wrap');
    inputsFullName.forEach((e) => {
      const inputElement = e.querySelector('.modal__intup');
      const lableElement = e.querySelector('.modal__lable');
      inputElement.onfocus = function () {
        lableElement.classList.add('modal__lable_up');
      };
      inputElement.onblur = function () {
        if (!inputElement.value) {
          lableElement.classList.remove('modal__lable_up');
        };
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
    const buttonAddContactElement = createButtonAddContactForModal();
    fieldsetContacts.append(wrapperContacts);
    fieldsetContacts.append(buttonAddContactElement);

    return {
      fieldsetContacts,
      buttonAddContactElement,
      wrapperContacts,
    };
  };

  // Создал элемент списка контактов с кнопкой "Удалить"
  function createContactForModal(contact) {
    const contactItem = document.createElement('li');
    const wrapContactType = document.createElement('div');
    const buttonContactType = document.createElement('button');
    const listContactTypeDropdown = document.createElement('ul');
    const inputContactValue = document.createElement('input');
    const buttonContactDelete = document.createElement('button');
    const buttonContactDeleteIcon = document.createElement('span');

    contactItem.classList.add('modal-contacts__item');
    wrapContactType.classList.add('contacts-type');
    buttonContactType.classList.add('contact-type__button', 'btn');
    listContactTypeDropdown.classList.add('contact-type__list');
    inputContactValue.classList.add('input', 'contact-value', 'contact-value_border-right');
    inputContactValue.setAttribute('type', 'text');
    inputContactValue.setAttribute('placeholder', 'Введите данные контакта');
    buttonContactDelete.classList.add('delete-contact__btn', 'btn', 'blocked');
    buttonContactDeleteIcon.classList.add('delete-contact__icon');

    buttonContactType.textContent = 'Тип контакта';

    contactsTypes.forEach((e) => {
      const item = document.createElement('li');
      item.classList.add('contact-type__item');
      item.textContent = e;
      listContactTypeDropdown.append(item);
    })

    if (contact) {
      buttonContactType.textContent = contact.type;
      inputContactValue.value = contact.value;
      buttonContactDelete.classList.remove('blocked');
    };

    buttonContactDelete.append(buttonContactDeleteIcon);

    wrapContactType.append(buttonContactType);
    wrapContactType.append(listContactTypeDropdown);

    contactItem.append(wrapContactType);
    contactItem.append(inputContactValue);
    contactItem.append(buttonContactDelete);

    // Вешаю на ipnut слушателя чтобы убрать стили сигнализации об ошибке
    inputContactValue.addEventListener('input', function () {
      inputContactValue.classList.remove('border-color_burnt-sienna');
    });

    return contactItem;
  };

  // Создал кнопку добавления контакта 
  function createButtonAddContactForModal() {
    const buttonAddContact = document.createElement('button');
    const buttonAddContactIcon = document.createElement('span');
    const buttonAddContactTitle = document.createElement('span');

    buttonAddContact.classList.add('modal-addcontact__btn', 'btn', VISIBLE_CSS);
    buttonAddContactIcon.classList.add('modal-addcontact__icon');
    buttonAddContactTitle.classList.add('modal-addcontact__title');

    buttonAddContact.setAttribute('data-btn', 'contact-add');
    buttonAddContactTitle.textContent = 'Добавить контакт';

    buttonAddContact.append(buttonAddContactIcon);
    buttonAddContact.append(buttonAddContactTitle);

    return buttonAddContact;
  }

  // Создал блок с выводом ошибок и др. инфорации
  function createErrorForModal() {
    const wrapperError = document.createElement('div');
    const spanError = document.createElement('span');

    wrapperError.classList.add('modal-error', 'blocked');
    spanError.classList.add('modal-error__text');

    wrapperError.classList.remove('blocked');

    wrapperError.append(spanError);

    return {
      wrapperError,
      spanError,
    };
  };

  // Создал блок кнопок модалки
  function createButtonsForModal(submitTitle, smallTitle) {
    const wrapperButtons = document.createElement('div');
    const buttonSubmit = document.createElement('button');
    const buttonSubmitIcon = document.createElement('span');
    const buttonSubmitTitle = document.createElement('span');
    const buttonSmall = document.createElement('button');

    wrapperButtons.classList.add('modal-btns');
    buttonSubmit.classList.add('submit-btn', 'btn');
    buttonSubmitIcon.classList.add('submit-btn__icon');
    buttonSubmitTitle.classList.add('submit-btn__title');

    buttonSmall.classList.add('modal-delete-btn', 'btn');

    buttonSubmit.setAttribute('data-btn', 'submit');
    buttonSmall.setAttribute('data-btn', 'small');


    buttonSubmitTitle.textContent = submitTitle;
    buttonSmall.textContent = smallTitle;

    buttonSubmit.append(buttonSubmitIcon);
    buttonSubmit.append(buttonSubmitTitle);
    wrapperButtons.append(buttonSubmit);
    wrapperButtons.append(buttonSmall);

    return {
      wrapperButtons,
      buttonSubmit,
      buttonSmall,
    };
  };

  // Считаю количество контактов если 10 деактивируем кнопку Добавить контакт
  function disabledButtonAddContact(buttonAddContact, wrapper) {
    const items = wrapper.querySelectorAll('.modal-contacts__item');
    if (items.length >= 10) {
      buttonAddContact.classList.remove(VISIBLE_CSS);
    } else {
      buttonAddContact.classList.add(VISIBLE_CSS);
    };
  };

  //Развернул дропдаун
  function showDropDown(modalElement) {
    const dropdowns = modalElement.querySelectorAll('.contacts-type');

    dropdowns.forEach((e) => {
      setEventsOnDropdown(e)
    });
  };

  // Добавление слушателей к элементам дропдауна
  function setEventsOnDropdown(element) {
    const buttonDropdown = element.querySelector('.contact-type__button');
    const listDropdown = element.querySelector('.contact-type__list');
    const itemDropdown = listDropdown.querySelectorAll('.contact-type__item');

    // Отслеживаем клик на кнопке (открыть/закрыть список)
    buttonDropdown.addEventListener('click', function (e) {
      e.preventDefault();
      // // Удаляю стили индикации об ошибке
      // btnDropdown.classList.remove('border-color_burnt-sienna');
      listDropdown.classList.toggle('contact-type__list_visible');
      buttonDropdown.classList.toggle('contact-type__button_rotate');
    });

    // Отслеживаем клик по элементам списка и присваивание значения кнопке
    itemDropdown.forEach((e) => {
      e.addEventListener('click', function (el) {
        el.stopPropagation();
        // Удаляю стили индикации об ошибке
        buttonDropdown.classList.remove('border-color_burnt-sienna');
        buttonDropdown.textContent = this.innerText;
        buttonDropdown.focus();
        hidenDropdown(listDropdown, buttonDropdown);
      });
    });

    // Клик снаружи дропдауна. Закрыть дропдаун
    document.addEventListener('click', function (e) {
      if (e.target !== buttonDropdown) {
        hidenDropdown(listDropdown, buttonDropdown);
      };
    });

    // Нажатие на Таб или Эскейп. Закрыть дропдаун
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Tab' || e.key === 'Escape') {
        hidenDropdown(listDropdown, buttonDropdown);
      };
    });
  };

  // В функции setEventsOnDropdown повторение кода - удаление свойст показа списка дропдауна
  function hidenDropdown(listDropdown, buttonDropdown) {
    listDropdown.classList.remove('contact-type__list_visible');
    buttonDropdown.classList.remove('contact-type__button_rotate');
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
    const buttonDeleteContact = element.querySelector('.delete-contact__btn');
    const inputContact = element.querySelector('.contact-value');

    element.addEventListener('input', function (e) {
      e.stopPropagation();
      if (inputContact.value) {
        buttonDeleteContact.classList.remove('blocked');
      } else {
        buttonDeleteContact.classList.add('blocked');
      };
    });
  };

  // Добавляем новый контакт клиенту
  function addNewContact(buttonAddContact, wrapperContacts) {
    const listContacts = wrapperContacts.querySelector('.modal-contacts__list');
    buttonAddContact.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();

      const contactItem = createContactForModal('');
      listContacts.append(contactItem);

      // Добавил новому элементу события для дропдауна
      setEventsOnDropdown(contactItem);

      // Добавил новому элементу событие на ввод данных
      setEventsOnInput(contactItem);

      // Добавил новому элементу событие на кнопку "Удалить контакт"
      setEventOnButtonDeleteContact(contactItem, buttonAddContact, wrapperContacts);

      disabledButtonAddContact(buttonAddContact, wrapperContacts);
    });
  };

  // Удаляем контакт по кнопке
  function deleteContact(buttonAddContact, wrapperContacts) {
    const buttonDelete = wrapperContacts.querySelectorAll('.modal-contacts__item');

    buttonDelete.forEach((e) => {
      setEventOnButtonDeleteContact(e, buttonAddContact, wrapperContacts);
    });
  };

  function setEventOnButtonDeleteContact(element, buttonAddContact, wrapperContacts) {
    const buttonDelete = element.querySelector('.delete-contact__btn');
    buttonDelete.addEventListener('click', function () {
      element.remove();
      disabledButtonAddContact(buttonAddContact, wrapperContacts);
    });
  };

  function getValuesFromModal(modal) {
    let textError = '';
    const surnameElement = modal.querySelector('#surname');
    const surname = surnameElement.value.trim();
    if (!surname) {
      surnameElement.parentNode.classList.add('border-color_burnt-sienna');
      textError = 'Введите фамилию клиента';
    };

    const nameElement = modal.querySelector('#name');
    const name = nameElement.value.trim();
    if (!name) {
      nameElement.parentNode.classList.add('border-color_burnt-sienna');
      if (textError) {
        textError = textError + '<br>';
      }
      textError = textError + 'Введите имя клиента';
    };

    const lastNameElement = modal.querySelector('#lastname');
    const lastName = lastNameElement.value.trim();

    const contacts = [];
    const itemContacts = modal.querySelectorAll('.modal-contacts__item');

    itemContacts.forEach((e) => {
      const typeElement = e.querySelector('.contact-type__button');
      const type = typeElement.innerText;
      if (type === 'Тип контакта') {
        typeElement.classList.add('border-color_burnt-sienna');
        if (textError) {
          textError = textError + '<br>';
        }
        textError = textError + 'Установите тип контакта';
      }

      const valueElement = e.querySelector('.contact-value');
      const value = valueElement.value.trim();
      if (!value) {
        valueElement.classList.add('border-color_burnt-sienna');
        if (textError) {
          textError = textError + '<br>';
        }
        textError = textError + 'Введите данные контакта';
      }

      const objContact = {
        type,
        value,
      };
      contacts.push(objContact);
    });

    console.log(textError);

    return {
      name,
      surname,
      lastName,
      contacts,
      textError,
    };
  };

  // Установка/снятие disabled с полей формы
  function setDisabledOnElementsOfForm(modal, disabledElements) {
    const inputModal = modal.querySelectorAll('.modal__intup');
    const itemContacts = modal.querySelectorAll('.modal-contacts__item');
    const buttonAddContact = modal.querySelector('.modal-addcontact__btn');
    const buttonSubmit = modal.querySelector('.submit-btn');
    const buttonSmall = modal.querySelector('.modal-delete-btn');

    if (disabledElements) {
      console.log('Установка dis');
      inputModal.forEach((e) => {
        e.disabled = true;
      });

      itemContacts.forEach((e) => {
        const typeElement = e.querySelector('.contact-type__button');
        const valueElement = e.querySelector('.contact-value');
        const buttonDeleteContact = e.querySelector('.delete-contact__btn');

        typeElement.disabled = true;
        valueElement.disabled = true;
        buttonDeleteContact.disabled = true;
      });

      buttonAddContact.disabled = true;
      buttonSubmit.disabled = true;
      buttonSmall.disabled = true;

    } else {
      console.log('Снятие dis');
      inputModal.forEach((e) => {
        e.disabled = false;
      });

      itemContacts.forEach((e) => {
        const typeElement = e.querySelector('.contact-type__button');
        const valueElement = e.querySelector('.contact-value');
        const buttonDeleteContact = e.querySelector('.delete-contact__btn');

        typeElement.disabled = false;
        valueElement.disabled = false;
        buttonDeleteContact.disabled = false;
      });

      buttonAddContact.disabled = false;
      buttonSubmit.disabled = false;
      buttonSmall.disabled = false;
    };
  };

  // TODO возможно удалить # из location Закрываю модалку  
  function onClose(modal) {
    const wrapper = modal.querySelector('.modal__wrapper');
    modal.classList.remove(VISIBLE_CSS);
    wrapper.classList.remove(VISIBLE_CSS);
    const timeoutId = setTimeout(() => {
      modal.remove();
    }, DELAY_TIME);
    document.location.hash = '';
  };

  // Удаляю клиента
  async function onDelete(clientId, modal) {
    // Удаляю из базы
    const response = await fetchDeleteClient(clientId);
    httpErrorHandler(response, modal);
  };

  // Добавляю нового клиента 
  async function onSave(objOfClient, modal) {
    const response = await fetchAddClient(objOfClient);
    httpErrorHandler(response, modal);
  };

  // Обновляю данные клиента
  async function onUpdate(objOfClient, clientId, modal) {
    const response = await fetchUpdateClient(objOfClient, clientId);
    httpErrorHandler(response, modal);
  };

  // Обработка HTTP ошибок 
  async function httpErrorHandler(response, modal) {
    let info;
    const wrapperError = modal.querySelector('.modal-error');
    const spanError = wrapperError.querySelector('.modal-error__text');

    if (response.status === 200 || response.status === 201) {
      await updateClientsInTable();
      onClose(modal);
    } else {
      if (modalWindowStructure.type !== 'delete') {
        if (response.status === 500) {
          info = `Данные не сохранены. Ответ сервера - ${response.status}. Ошибка работы сервера.`;
        } else {
          switch (response.status) {
            case 404:
              info = 'Данные не сохранены. Ответ сервера - 404. Не удалось найти запрашиваемую страницую.';
              break;
            case 422:
              const errors = await response.json();
              errors.errors.forEach((e) => {
                if (info) {
                  info = info + ' <br> ' + e.message;
                } else {
                  info = e.message;
                }
              });
              break;
            default:
              info = '"Что-то пошло не так..."';
              break;
          };
        };

        wrapperError.classList.remove('blocked');
        spanError.innerHTML = info;

        // TODO Вернуть данные в Блок ошибок
        // const errorElement = createErrorForModal(info);
        // const wrapper = document.querySelector('.modal-contacts');
        // wrapper.append(errorElement.wrapperError);
      };
    };
  };


  // ========== Серверная часть
  // TODO Это убрать. Только для тестов
  const delay = ms => {
    return new Promise(r => setTimeout(() => r(), ms));
  };

  // Читаем клиентов из базы
  async function fetchGetClients() {
    await delay(300); // TODO Для установления задержки
    const response = await fetch(URI);
    const data = await response.json();
    return data;
  };

  // Ищем клиентов
  async function fetchSearchClients(search) {
    await delay(300); // TODO Для установления задержки
    const url = `${URI}?search=${search}`;
    const pesponse = await fetch(url);
    const data = await pesponse.json();
    return data;
  };

  // Добавляем клиента в базу
  async function fetchAddClient(obj) {
    await delay(300); // TODO Для установления задержки
    const response = await fetch(URI, {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(obj),
    });

    return response;
  };

  // Получаем клиента по его ID
  async function fetchGetClientById(id) {
    await delay(300); // TODO Для установления задержки
    const response = await fetch(`${URI}/${id}`);
    // const r = response.json();
    // console.log(r);
    const data = await response.json();
    // console.log(data);
    // console.log(response.status);

    // console.log(data.errors);
    return data;

  };

  // Обновляем данные клиента по ID
  async function fetchUpdateClient(obj, id) {
    await delay(300); // TODO Для установления задержки
    const response = await fetch(`${URI}/${id}`, {
      method: "PATCH",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(obj),
    });

    // const aler = await response.json();
    // console.log(aler);

    return response;
  };

  // Удаляем клиента по ID. Ничего не возвращает в body
  async function fetchDeleteClient(id) {
    const response = await fetch(`${URI}/${id}`, {
      method: "DELETE",
    });
    return response;
  };

  // Добавление клиентов из базы данных в таблицу
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


  // Создание списка найденных клиентов
  function createListItems(clientsArray, list, tableBody) {

    clientsArray.forEach((e) => {
      const listItem = document.createElement('li');
      listItem.classList.add('search__items');
      listItem.setAttribute('data-id', e.id);
      listItem.textContent = e.name + ' ' + e.surname;
      list.append(listItem);

      // Клик по списку
      listItem.addEventListener('click', function () {
        showClientInTable(this.dataset.id, tableBody);
        clearListOfSearch(list);
      });
    });

    list.classList.remove('blocked');
    return list;
  };

  // Установка фокуса на элемент списка поиска клиентов
  function setFocusOnItem(focusedItem, itemElementArray) {
    if (focusedItem > itemElementArray.length - 1) {
      focusedItem = 0;
    };
    if (focusedItem < 0) {
      focusedItem = itemElementArray.length - 1
    };
    unfocusAllItems(itemElementArray);
    itemElementArray[focusedItem].classList.add('search__items_focused');
    return focusedItem;
  };

  // Снятие фокусировок с элементов списка поиска клиентов
  function unfocusAllItems(itemElementArray) {
    itemElementArray.forEach((e) => {
      e.classList.remove('search__items_focused');
    });
  };


  // Поиск клиента в таблице по id, подсвечивание и плавный скролл
  function showClientInTable(clientId) {
    // Подсветил клиента
    const trOfClient = document.getElementById(clientId);
    console.log(trOfClient);
    trOfClient.classList.add('outline_medium-slate-blue');
    console.log(trOfClient);
    // TODO плавный скрол до найденного элемента
    trOfClient.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  };

  // Очистка списка поиска 
  function clearListOfSearch(list) {
    list.classList.add('blocked');
    list.innerHTML = '';
  };



  // Основная функция
  document.addEventListener('DOMContentLoaded', () => {
    async function createApp() {
      const container = document.getElementById('crm-app');
      const header = createHeader(); //Создаю шапку сайта с лого и поиском
      const tableHead = createTableHead(); //Создаю шапку таблицы
      const tableBody = createTableBody(); //Создаю тело таблицы для вставки данных о клиентах
      const addButton = createAddClientButton(); //TODO кнопку встроить после получения данных о клиентах  Создаю кнопку "Добавить клиента"

      container.append(header.header); //Добавил шапку сайта в контейнер сайта
      container.append(tableHead.main); //Добавил шапку таблицы в контейнер сайта
      tableHead.tableBox.append(tableBody.tableBody); //Добавил в шапку таблицы тело таблицы
      tableHead.main.append(addButton.wrapper); //Добвил в секцию main кнопку "Довавить клиента"

      // Вставил данные из базы в таблицу
      await updateClientsInTable();

      // Показываю тултипы
      showTooltips();

      // Поиск по ФИО
      // TODO список можно создать даже вначале функции. Создаем список для вывода результатов поиска 
      const listSearchedValues = document.createElement('ul');
      listSearchedValues.classList.add('search__list', 'blocked');
      header.form.append(listSearchedValues);

      let timeoutId = null;
      let listItemsElements = null;
      let focusedItem = -1;

      header.input.addEventListener('input', () => {
        // TODO Очистить таблицу от подсвеченных клиентов если они были найдены и помечены. Возвращаем таблицу вверх экрана (был или не был скролл). Возможно скролл вначало если инпут очищен 
        const highlightedItems = tableBody.tableBody.querySelectorAll('.table__row');
        highlightedItems.forEach((e) => {
          e.classList.remove('outline_medium-slate-blue');
        });

        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => { findContacts() }, DELAY_TIME);
      });

      async function findContacts() { //TODO сюда бы передать header. Ищу клиентов по введенным данным в input
        const inputValue = header.input.value.trim();
        clearListOfSearch(listSearchedValues);

        if (inputValue) {
          const serchedClients = await fetchSearchClients(inputValue);
          if (serchedClients.length) {
            listItemsElements = createListItems(serchedClients, listSearchedValues, tableBody.tableBody).querySelectorAll('.search__items');
          } else {
            listItemsElements = null;
          }
        } else {
          listItemsElements = null;
        };
      };

      // Установливаем обработчик событий на keydown
      document.addEventListener('keydown', function (e) {
        if (listItemsElements) {
          switch (e.key) {
            case 'Enter':
              e.preventDefault();
              showClientInTable(listItemsElements[focusedItem].dataset.id);
              clearListOfSearch(listSearchedValues);
              break;
            case 'ArrowDown':
              // console.log('Down');
              focusedItem++;
              focusedItem = setFocusOnItem(focusedItem, listItemsElements);
              console.log(focusedItem);
              break;
            case 'ArrowUp':
              // console.log('Up');
              focusedItem--;
              focusedItem = setFocusOnItem(focusedItem, listItemsElements);
              console.log(focusedItem);
              break;
            case 'Escape':
              clearListOfSearch(listSearchedValues);
              break;
          };
        }
      })

      // Сортировка данных в таблице 
      sortDataInTable(clientsState, tableHead.tr);

      // Добавляем клиента
      addButton.button.addEventListener('click', function (e) {
        modalWindowStructure.type = 'new';
        createModalWindow('', modalWindowStructure);
        // console.log(modal);
        // timeoutId = setTimeout(() => {
        //   modal.classList.add(VISIBLE_CSS);
        // }, 0);
      });

      // Если location.hash ссылка, открываем модальное
      if (document.location.hash) {
        const clientId = document.location.hash.split('#')[1];
        console.log(clientId)
        modalWindowStructure.type = 'change';
        const client = await fetchGetClientById(clientId);
        createModalWindow(client, modalWindowStructure);
      };

    };

    createApp();

  });

})();

