const links = document.querySelector('.links'),
      items = document.querySelector('.list__items'),
      headerText = document.querySelector('.header__text'),
      headerButton = document.querySelector('.header__button'),
      inputProduct = document.querySelector('.header__product'),
      inputQuantity = document.querySelector('.header__quantity'),
      inputPrice = document.querySelector('.header__price'),
      shoppingList = document.querySelector('.list__shopping'),
      listDelete = document.querySelector('.list__delete'),
      listDone = document.querySelector('.list__done');
      
const addToProductLocal = function() {
    let productArr = [];
    const returnLocal = JSON.parse(localStorage.getItem('products'));
    if(returnLocal !== null) {
        for(i = 0; i < returnLocal.length; i++) {
            productArr.push(returnLocal[i]);
        }
    }
    const productObj = {
        item: inputProduct.value,
        quantity: inputQuantity.value,
        price: inputPrice.value
    };
    productArr.push(productObj);
    localStorage.setItem('products', JSON.stringify(productArr));
}

const addToDeleteLocal = function(index) {
    let deleteArr = [];
    const returnLocal = JSON.parse(localStorage.getItem('deleteProducts')),
          returnProductsLocal = JSON.parse(localStorage.getItem('products'));
    if(returnLocal !== null) {
        for(i = 0; i < returnLocal.length; i++) {
            deleteArr.push(returnLocal[i]);
        }
    }
    const deleteItemLocal = returnProductsLocal.splice(index, 1);
    localStorage.setItem('products', JSON.stringify(returnProductsLocal));
    deleteArr.push(deleteItemLocal[0]);
    localStorage.setItem('deleteProducts', JSON.stringify(deleteArr));
    showDeleteList();
}

const addToDoneLocal = function(index) {
    const doneArr = [],
          returnDoneLocal = JSON.parse(localStorage.getItem('doneProducts')),
          returnLocal = JSON.parse(localStorage.getItem('products'));
    if(returnDoneLocal !== null) {
        for(i = 0; i < returnDoneLocal.length; i++) {
            doneArr.push(returnDoneLocal[i]);
        }
    }
    const doneItem = returnLocal.splice(index, 1);
    localStorage.setItem('products', JSON.stringify(returnLocal));
    doneArr.push(doneItem[0]);
    localStorage.setItem('doneProducts', JSON.stringify(doneArr));
}

const showShoppingList = function() {
    const returnLocal = JSON.parse(localStorage.getItem('products'));
    if(returnLocal !== null) {
        shoppingList.innerHTML = '';
        let total = 0;
        for(let i = 0; i < returnLocal.length; i++) {
            let newShoppingItem = document.createElement('li');
            shoppingList.append(newShoppingItem);
            newShoppingItem.className = 'list__shoppingItem';
            newShoppingItem.innerHTML = `
            <span class="list__number">${i+1}</span>
            <span class="list__name">${returnLocal[i].item.slice(0, 18)}</span>
            <span class="list__quantity">${returnLocal[i].quantity.slice(0, 10)}</span>
            <span class="list__price">${returnLocal[i].price.slice(0, 10)}</span>
            <div class="list__button">
                <button class="list__doneButton"></button>
                <button class="list__editButton"></button>
                <button class="list__deleteButton"></button>
            </div>
            `;
            total += (+returnLocal[i].price)*(+returnLocal[i].quantity);
        }
        const footer = document.createElement('li');
        shoppingList.append(footer);
        footer.className = 'list__footer';
        footer.innerHTML = `
            <span class="list__total">Total:</span>
            <span class="list__totalPrice">${total}</span>
        `;
    }
}

const showDeleteList = function () {
    const returnLocal = JSON.parse(localStorage.getItem('deleteProducts'));
    if(returnLocal != null) {
        listDelete.innerHTML = '';
        let total = 0;
        for(let i = 0; i < returnLocal.length; i++) {
            let newDeleteItem = document.createElement('li');
            listDelete.append(newDeleteItem);
            newDeleteItem.className = 'list__deleteItem';
            newDeleteItem.innerHTML = `
            <span class="list__number">${i+1}</span>
            <span class="list__name">${returnLocal[i].item.slice(0, 18)}</span>
            <span class="list__quantity">${returnLocal[i].quantity.slice(0, 10)}</span>
            <span class="list__price">${returnLocal[i].price.slice(0, 10)}</span>
            <div class="list__button deleteRight">
                <button class="list__deleteButton"></button>
            </div>
            `;
            total += (+returnLocal[i].price)*(+returnLocal[i].quantity);
        }
        const footer = document.createElement('li');
        listDelete.append(footer);
        footer.className = 'list__footer';
        footer.innerHTML = `
            <span class="list__total">Total:</span>
            <span class="list__totalPrice">${total}</span>
        `;
    }
}

const showDoneList = function() {
    const returnLocal = JSON.parse(localStorage.getItem('doneProducts'));
    if(returnLocal != null) {
        listDone.innerHTML = '';
        let total = 0;
        for(let i = 0; i < returnLocal.length; i++) {
            const newDoneItem = document.createElement('li');
            listDone.append(newDoneItem);
            newDoneItem.className = 'list__doneItem';
            newDoneItem.innerHTML = `
            <span class="list__number">${i+1}</span>
            <span class="list__name">${returnLocal[i].item.slice(0, 18)}</span>
            <span class="list__quantity">${returnLocal[i].quantity.slice(0, 10)}</span>
            <span class="list__price">${returnLocal[i].price.slice(0, 10)}</span>
            <div class="list__button deleteRight">
                <button class="list__deleteButton"></button>
            </div>
            `;
            total += (+returnLocal[i].price)*(+returnLocal[i].quantity);
        }
        const footer = document.createElement('li');
        listDone.append(footer);
        footer.className = 'list__footer';
        footer.innerHTML = `
            <span class="list__total">Total:</span>
            <span class="list__totalPrice">${total}</span>
        `;
    }
}

const clearInput = function() {
    inputProduct.value = '';
    inputQuantity.value = '';
    inputPrice.value = '';
}

const editProduct = function(index) {
    const editObj = {
        item: inputProduct.value,
        quantity: inputQuantity.value,
        price: inputPrice.value
    }
    const editReturnLocal = JSON.parse(localStorage.getItem('products'));
    const blabla = editReturnLocal.splice(index - 1, 1, editObj);
    localStorage.setItem('products', JSON.stringify(editReturnLocal));
    shoppingList.classList.remove('edit');
    clearInput();
    showShoppingList();
}

const findEditClass = function() {
    const listShoppingItems = document.querySelectorAll('.list__shoppingItem');
    for(item of listShoppingItems) {
        if(item.classList.contains('edit')) {
            return true;
        }
    }
}

showShoppingList();
showDeleteList();
showDoneList();

shoppingList.addEventListener('click', (event) => {
    if(event.target.className == 'list__deleteButton') {
        const deleteTarget = event.target.closest('li'),
            deleteItem = deleteTarget.querySelector('.list__number'),
            indexItem = parseInt(deleteItem.innerHTML);
        addToDeleteLocal(indexItem - 1);
        showShoppingList();
    }
    if(event.target.className == 'list__doneButton') {
        const doneTarget = event.target.closest('li'),
              doneItem = doneTarget.querySelector('.list__number'),
              indexDone = parseInt(doneItem.innerHTML);
        addToDoneLocal(indexDone - 1, 1);
        showShoppingList();
        showDoneList();
    }
    if(event.target.className == 'list__editButton') {
        const listShoppingItem = event.target.closest('li'),
              listShoppingItems = document.querySelectorAll('.list__shoppingItem');
        if(!listShoppingItem.classList.contains('edit')) {
            for(item of listShoppingItems) {
                item.classList.remove('edit');
            }
            listShoppingItem.classList.add('edit');
        } else {
            listShoppingItem.classList.remove('edit');
        }
    }
});

links.addEventListener('click', (event) => {
    for(item of items.children) {
        if(item.getAttribute('data-name') == event.target.getAttribute('data-name')) {
            item.classList.add('dOn');
            headerText.innerHTML = event.target.innerHTML + " list";
        } else {
            item.classList.remove('dOn');
        }
    }
});

headerButton.addEventListener('click', (event) => {
    if(findEditClass()) {
        const listShoppingItems = document.querySelector('.edit'),
              index = parseInt(listShoppingItems.querySelector('.list__number').innerHTML);
        editProduct(index);
    } else {
        addToProductLocal();
        showShoppingList();
        showDeleteList();
        clearInput();
    }
});

listDelete.addEventListener('click', (event) => {
    if(event.target.className == 'list__deleteButton') {
        const returnLocal = JSON.parse(localStorage.getItem('deleteProducts'));
              index = event.target.closest('li').querySelector('.list__number').innerHTML;
        returnLocal.splice(index - 1, 1);
        localStorage.setItem('deleteProducts', JSON.stringify(returnLocal));
    }
    showDeleteList();
});

listDone.addEventListener('click', (event) => {
    if(event.target.className == 'list__deleteButton') {
        const returnLocal = JSON.parse(localStorage.getItem('doneProducts'));
              index = event.target.closest('li').querySelector('.list__number').innerHTML;
        returnLocal.splice(index - 1, 1);
        localStorage.setItem('doneProducts', JSON.stringify(returnLocal));
    }
    showDoneList();
});