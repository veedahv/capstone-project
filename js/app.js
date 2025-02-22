const cartContainer = document.querySelector('.cart'),
    cartBox = document.querySelector('.cart-container'),
    cartQty = document.querySelector('.item-qty-no'),
    toTop = document.querySelector('.to-top'),
    successContainer = document.querySelector('.success'),
    successBox = document.querySelector('.success-container'),
    gridBox = document.querySelector('.grid'),
    tableBody = document.querySelector('.cart-tbody'),
    summaryTableBody = document.querySelector('.summary-tbody'),
    msgRef = document.querySelector('.msg-ref'),
    totalPrice = document.querySelector('.total-price'),
    cartShowBtn = document.querySelector('.nav-btn'),
    payBtn = document.querySelector('.pay-btn'),
    okBtn = document.querySelector('.ok-btn'),
    continueBtn = document.querySelector('.continue-btn'),
    customerName = document.querySelector('.customer-name'),
    checkboxInput = document.querySelector('#checkbox'),
    header = document.querySelector('#header'),
    name = document.querySelector('#name'),
    email = document.querySelector('#email'),
    phoneNumber = document.querySelector('#phone-number'),
    formInputs = document.querySelectorAll('.form-input'),
    cartBtns = document.querySelectorAll('.btn-cart');

let sN,
    t = 0,
    summaryItemArr = [];

// Check number of items in cart
const checkCartQty = () => {
    let itemQtyNo = tableBody.childElementCount;
    cartQty.textContent = itemQtyNo;
}
// Add items to cart
const addToCart = (btn) => {
    btn.classList.replace('btn-primary', 'btn-secondary');
    btn.textContent = 'REMOVE FROM CART';
}
// Remove items from cart
const removeToCart = (btn) => {
    btn.classList.replace('btn-secondary', 'btn-primary');
    btn.textContent = 'ADD TO CART';
}
const checkSn = () => {
    let i = 1;
    sNos = tableBody.querySelectorAll('.s-no');
    sNos.forEach(sNo => {
        let sNoIndex = parseInt(sNo.innerText);
        if (sNoIndex !== i) {
            sNo.innerText = sNoIndex - 1;
        }
        i++;
    });
}
const removeRow = (btn, productPrice) => {
    let itemRow = btn.closest('tr');
    let qtyOfItem = btn.closest('tr').querySelector('.qty-no');
    let qtyOfItemNo = qtyOfItem.textContent;
    let qtyOfItemPrice = parseInt(productPrice) * qtyOfItemNo;
    t -= qtyOfItemPrice;
    totalPrice.innerHTML = t;
    itemRow.remove();
    checkCartQty();
    checkSn();
}
const checkCartItem = (btn) => {
    let cartItemBody = tableBody.children;
    let shopProductName = btn.closest('.card').querySelector('.product-name').innerText;
    for (let x = 0; x < cartItemBody.length; x++) {
        let cartProductName = cartItemBody[x].querySelector('.cart-product-name').innerText;
        let cartProductPrice = cartItemBody[x].querySelector('.price').innerText;
        let cartProductBtn = cartItemBody[x].querySelector('.remove-btn');
        if (shopProductName === cartProductName) {
            removeRow(cartProductBtn, cartProductPrice);
            removeToCart(btn);
        }
    }
}
const checkShopItem = (btn) => {
    let shopItemBody = gridBox.children;
    let cartProductName = btn.closest('tr').querySelector('.cart-product-name').innerText;
    let cartProductPrice = btn.closest('tr').querySelector('.price').innerText;
    for (let x = 0; x < shopItemBody.length; x++) {
        let shopProductName = shopItemBody[x].querySelector('.product-name').innerText;
        let shopProductBtn = shopItemBody[x].querySelector('.btn-cart');
        if (shopProductName === cartProductName) {
            removeRow(btn, cartProductPrice);
            removeToCart(shopProductBtn);
        }
    }
}
// Increase / decrease quantity of items in cart
const getQty = (btn, op, minMaxValue) => {
    let qtyOfItem = btn.closest('tr').querySelector('.qty-no');
    let opSiblingBtn = btn.closest('tr').querySelector(`.${op}-btn`);
    let productPrice = btn.closest('tr').querySelector('.price').innerText;
    let qtyOfItemNo = qtyOfItem.textContent;
    let qtyOfItemPrice = parseInt(productPrice) * qtyOfItemNo;
    t -= qtyOfItemPrice;
    (op === 'sub') ? qtyOfItemNo++ : qtyOfItemNo--;
    qtyOfItemPrice = parseInt(productPrice) * qtyOfItemNo;
    t += qtyOfItemPrice;
    totalPrice.innerHTML = t;
    qtyOfItem.textContent = qtyOfItemNo;
    if (minMaxValue === 10) {
        (qtyOfItemNo >= minMaxValue) ? btn.disabled = true : btn.disabled = false;
        (qtyOfItemNo <= minMaxValue) ? opSiblingBtn.disabled = false : opSiblingBtn.disabled = true;
    } else {
        (qtyOfItemNo <= minMaxValue) ? btn.disabled = true : btn.disabled = false;
        (qtyOfItemNo >= minMaxValue) ? opSiblingBtn.disabled = false : opSiblingBtn.disabled = true;
    }
}
// Create new cart table row
const newItemRow = (productName, productPrice) => {
    sN = tableBody.childElementCount;
    sN++;
    let newRow = `
    <tr>
        <td class="s-no">${sN}</td>
        <td class="cart-product-name">${productName}</td>
        <td>&#8358;<span class="price">${productPrice}</span></td>
        <td class="cart-flex">
            <button class="btn-qty sub-btn btn-primary" disabled>-</button>
            <span class="qty-no">1</span>
            <button class="btn-qty add-btn btn-primary">+</button>
        </td>
        <td><button class="btn-secondary-light remove-btn btn">Remove</button></td>
    </tr>
    `;
    tableBody.innerHTML += newRow;
    let addBtns = tableBody.querySelectorAll('.add-btn'),
        subBtns = tableBody.querySelectorAll('.sub-btn'),
        removeBtns = tableBody.querySelectorAll('.remove-btn');
    addBtns.forEach(btn => {
        btn.addEventListener('click', () => {getQty(btn, 'sub', 10);});
    });
    subBtns.forEach(btn => {
        btn.addEventListener('click', () => {getQty(btn, 'add', 1);});
    });
    removeBtns.forEach(btn => {
        btn.addEventListener('click', () => {checkShopItem(btn);});
    });
    t += parseInt(productPrice);
    totalPrice.innerText = t;
    checkCartQty();
}
// Create new summary table row
const createItemRow = (summarySn, summaryName, summaryQty) => {
    let newRow = `
    <tr>
        <td>${summarySn}</td>
        <td>${summaryName}</td>
        <td>${summaryQty}</td>
    </tr>
    `;
    summaryTableBody.innerHTML += newRow;
}
const cartShow = () => {
    cartContainer.style.display = 'flex';
    setTimeout(() => {        
        checkboxInput.checked = true;
    }, 50);
}
const cartClose = () => {
    setTimeout(() => {        
        cartContainer.style.display = 'none';
    }, 200);
    checkboxInput.checked = false;
}
const cartBlurClose = (e) => {
    let isInside = cartBox.contains(e.target);
    let isBtnInside = cartShowBtn.contains(e.target);
    if (!isInside && !isBtnInside && e.target.innerText !== 'Remove') {
        cartClose();
    }
}
const tableClear = (table) => {
    while (table.firstChild) {
        table.removeChild(table.firstChild)
    }
    checkCartQty();
}
const summaryItem = () => {
    let tableRows = tableBody.querySelectorAll('tr');
    tableRows.forEach(tableRow => {
        let tableProductSn = tableRow.querySelector('.s-no').innerText,
            tableProductName = tableRow.querySelector('.cart-product-name').innerText,
            tableProductQty = tableRow.querySelector('.qty-no').innerText;
        let summaryItemObj = {
            objSn: tableProductSn,
            objName: tableProductName,
            objQty: tableProductQty,
        }
        summaryItemArr.push(summaryItemObj);
    });
    summaryItemArr.forEach(item => {
        let itemSn = item.objSn,
            itemName = item.objName,
            itemQty = item.objQty;
        createItemRow(itemSn, itemName, itemQty);
    });
}
const summaryShow = (message) => {
    summaryItem();
    msgRef.innerText = message;
    customerName.innerText = name.value;
    successContainer.style.display = 'flex';
    name.value = '';
    email.value = '';
    phoneNumber.value = '';
}
const summaryClose = () => {
    successContainer.style.display = 'none';
    summaryItemArr = [];
    tableClear(summaryTableBody);
    cartBtns.forEach(btn => {
        if (btn.classList.contains('btn-secondary')) {
            checkCartItem(btn);
        }
    });
}
// Show error message
const showError = (input, message) => {
    input.classList.add('error');
    const errorTxt = input.nextElementSibling;
    errorTxt.innerText = message;
};
const validateEmail = () => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let emailValidTest = re.test(String(email.value).toLowerCase());
    if (emailValidTest === true) {
        email.classList.remove('error');
    } else {
        showError(email, 'Email invalid');
    }
}
const validatePhoneNumber = () => {
    const re = /^[0]\d{10}$/;
    let phoneNumberValidTest = re.test(String(phoneNumber.value));
    if (phoneNumberValidTest === true) {
        phoneNumber.classList.remove('error');
    } else {
        showError(phoneNumber, 'Phone number invalid');
    }
}
const isInViewport = (element) => {
    const rect = element.getBoundingClientRect();
    (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    ) ? toTop.style.display = 'none' : toTop.style.display = 'flex';
}

// Event Listeners
cartBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        let productName = btn.closest('.card').querySelector('.product-name').textContent;
        let productPrice = btn.closest('.card').querySelector('.price-value').textContent;
        if (btn.classList.contains('btn-primary')) {
            addToCart(btn);
            newItemRow(productName, productPrice);
        } else {
            checkCartItem(btn);
        }
    });
});
cartShowBtn.addEventListener('click', cartShow);
okBtn.addEventListener('click', summaryClose);
continueBtn.addEventListener('click', cartClose);
payBtn.addEventListener('click', () => {
    if (tableBody.childElementCount === 0) {
        console.log('no item');
    } else {
        formInputs.forEach(formInput => {
            (formInput.value === '') ? showError(formInput, `${formInput.title} cannot be blank`) : formInput.classList.remove('error');
        });
        validatePhoneNumber();
        validateEmail();
        let checkName = !name.classList.contains('error');
        let checkEmail = !email.classList.contains('error');
        let checkNumber = !phoneNumber.classList.contains('error');
        if (checkName && checkEmail && checkNumber) {
            cartClose();
            payWithPaystack();
        }
    }
});
document.addEventListener('click', (e) => {cartBlurClose(e);});
document.addEventListener('scroll', () => {isInViewport(header);});

// On load
checkCartQty();
isInViewport(header);

function payWithPaystack() {
    let totalPriceNo = parseInt(totalPrice.innerText);
    let handler = PaystackPop.setup({
        key: 'pk_test_08d2d1a95f28e6534dd378bfb0daac9b0d98b78e', // Replace with your public key
        email: email.value,
        amount: totalPriceNo * 100,
        ref: '' + Math.floor((Math.random() * 1000000000) + 1), // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
        // label: "Optional string that replaces customer email"
        onClose: function () {
            alert('Window closed.');
        },
        callback: function (response) {
            let message = 'Payment complete! Reference: ' + response.reference;
            summaryShow(message);
        }
    });
    handler.openIframe();
}
