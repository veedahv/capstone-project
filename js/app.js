const cartContainer = document.querySelector('.cart'),
    cartQty = document.querySelector('.item-qty-no'),
    cartBox = document.querySelector('.cart-container'),
    gridBox = document.querySelector('.grid'),
    tableBody = document.querySelector('.cart-tbody'),
    totalPrice = document.querySelector('.total-price'),
    cartShowBtn = document.querySelector('.nav-btn'),
    payBtn = document.querySelector('.pay-btn'),
    continueBtn = document.querySelector('.continue-btn'),
    name = document.querySelector('#name'),
    email = document.querySelector('#email'),
    phoneNumber = document.querySelector('#phone-number'),
    formInputs = document.querySelectorAll('.form-input'),
    addBtnss = document.querySelectorAll('.add-btn'),
    subBtnss = document.querySelectorAll('.sub-btn'),
    removeBtnss = document.querySelectorAll('.remove-btn'),
    cartBtns = document.querySelectorAll('.btn-cart');

let sN,
 t = 0;

const checkCartQty = () => {
    let itemQtyNo = tableBody.childElementCount;
    // console.log(itemQtyNo);
    cartQty.textContent = itemQtyNo;
}

const addToCart = (btn) => {
    btn.classList.replace('btn-primary', 'btn-secondary');
    btn.textContent = 'REMOVE FROM CART';
    console.log('ayhh');
}
const removeToCart = (btn) => {
    btn.classList.replace('btn-secondary', 'btn-primary');
    btn.textContent = 'ADD TO CART';
    console.log('nnayhh');
}
const checkSn = () => {
    let i = 1;

    // sN = tableBody.childElementCount;
    // sN++;
    sNos = tableBody.querySelectorAll('.s-no');
    sNos.forEach(sNo => {
        console.log(sNo.innerText);
        console.log(i);
        let sNoIndex = parseInt(sNo.innerText);
        if (sNoIndex !== i) {
            console.log('nahh');
            sNo.innerText = sNoIndex - 1;
        }
        i++;
    });
    // let itemQtyNo = tableBody.childElementCount;
    // let itemQtyNo = tableBody.nextElementSIbling;
    // console.log(itemQtyNo);
    // cartQty.textContent = itemQtyNo;
}
const removeRow = (btn, productPrice) => {
    let itemRow = btn.closest('tr');
    let qtyOfItem = btn.closest('tr').querySelector('.qty-no');
    let qtyOfItemNo = qtyOfItem.textContent;
    let qtyOfItemPrice = parseInt(productPrice) * qtyOfItemNo;
    t -= qtyOfItemPrice;
    // qtyOfItemPrice = parseInt(productPrice) * qtyOfItemNo;
    // t += qtyOfItemPrice;
    totalPrice.innerHTML = t;
    itemRow.remove();
    checkCartQty();
    checkSn();
}
const checkCartItem = (btn) => {
    let cartItemBody = tableBody.children;
    let shopItemBody = gridBox.children;
    let shopProductName = btn.closest('.card').querySelector('.product-name').innerText;
    for (let x = 0; x < cartItemBody.length; x++) {
        let cartProductName = cartItemBody[x].querySelector('.cart-product-name').innerText;
        let cartProductPrice = cartItemBody[x].querySelector('.price').innerText;
        let cartProductBtn = cartItemBody[x].querySelector('.remove-btn');
        // console.log(cartItemBody[x]);
        // console.log(cartItemBody[x].querySelector('.cart-product-name'));
        console.log(cartProductName);
        console.log(shopProductName);
        if (shopProductName === cartProductName) {
            // cartItemBody[x].remove();
            removeRow(cartProductBtn, cartProductPrice);
            console.log('ayahh');
            removeToCart(btn);
        }
    }
}
const checkShopItem = (btn) => {
    let cartItemBody = tableBody.children;
    let shopItemBody = gridBox.children;
    let cartProductName = btn.closest('tr').querySelector('.cart-product-name').innerText;
    let cartProductPrice = btn.closest('tr').querySelector('.price').innerText;
    for (let x = 0; x < shopItemBody.length; x++) {
        let shopProductName = shopItemBody[x].querySelector('.product-name').innerText;
        let shopProductBtn = shopItemBody[x].querySelector('.btn-cart');
        console.log(shopProductName);
        console.log(cartProductName);
        if (shopProductName === cartProductName) {
            removeRow(btn, cartProductPrice);
            console.log('ahh');
            removeToCart(shopProductBtn);
        }
    }
}
const calcTotalPrice = (productPrice, qtyOfItemPrice) => {
    t -= totalPrice;
    t += qtyOfItemPrice;
    totalPrice.innerHTML = t;
}
const getQty = (btn, productPrice, op, minMaxValue) => {
    let qtyOfItem = btn.closest('tr').querySelector('.qty-no');
    let opSiblingBtn = btn.closest('tr').querySelector(`.${op}-btn`);
    let qtyOfItemNo = qtyOfItem.textContent;
    let qtyOfItemPrice = parseInt(productPrice) * qtyOfItemNo;
    t -= qtyOfItemPrice;
    // (op === 'sub') ? console.log(minMaxValue + 1) : console.log(minMaxValue - 1);
    (op === 'sub') ? qtyOfItemNo++ : qtyOfItemNo--;
    // qtyOfItemNo++;
    qtyOfItemPrice = parseInt(productPrice) * qtyOfItemNo;
    t += qtyOfItemPrice;
    totalPrice.innerHTML = t;
    // let op = +
    // calcTotalPrice(productPrice, qtyOfItemNo);
    // qtyOfItemPrice = parseInt(productPrice) * qtyOfItemNo;
    //         t += qtyOfItemPrice;
    //         sumItemPrice.innerHTML = t;
    qtyOfItem.textContent = qtyOfItemNo;
    console.log(qtyOfItemNo);
    console.log(opSiblingBtn);
    console.log('ohoii');
    if (minMaxValue === 10) {        
        (qtyOfItemNo >= minMaxValue) ? btn.disabled = true : btn.disabled = false;
        (qtyOfItemNo <= minMaxValue) ? opSiblingBtn.disabled = false : opSiblingBtn.disabled = true;
    } else {        
        (qtyOfItemNo <= minMaxValue) ? btn.disabled = true : btn.disabled = false;
        (qtyOfItemNo >= minMaxValue) ? opSiblingBtn.disabled = false : opSiblingBtn.disabled = true;
    }
    // (qtyOfItemNo <= 10) ? decreaseBtn.disabled = false : decreaseBtn.disabled = true;
}
// const increaseQty = (btn, productPrice) => {
//     getQty(btn, productPrice, 'sub', 10);
//     // let qtyOfItem = btn.closest('tr').querySelector('.qty-no');
//     // let decreaseBtn = btn.closest('tr').querySelector('.sub-btn');
//     // let qtyOfItemNo = qtyOfItem.textContent;
//     // let qtyOfItemPrice = parseInt(productPrice) * qtyOfItemNo;
//     // t -= qtyOfItemPrice;
//     // qtyOfItemNo++;
//     // qtyOfItemPrice = parseInt(productPrice) * qtyOfItemNo;
//     // t += qtyOfItemPrice;
//     // totalPrice.innerHTML = t;
//     // // let op = +
//     // // calcTotalPrice(productPrice, qtyOfItemNo);
//     // // qtyOfItemPrice = parseInt(productPrice) * qtyOfItemNo;
//     // //         t += qtyOfItemPrice;
//     // //         sumItemPrice.innerHTML = t;
//     // qtyOfItem.textContent = qtyOfItemNo;
//     // console.log(qtyOfItemNo);
//     // console.log('ohoii');
//     // (qtyOfItemNo >= 10) ? btn.disabled = true : btn.disabled = false;
//     // (qtyOfItemNo <= 10) ? decreaseBtn.disabled = false : decreaseBtn.disabled = true;
// }
// const decreaseQty = (btn, productPrice) => {
    // let qtyOfItem = btn.closest('tr').querySelector('.qty-no');
    // let increaseBtn = btn.closest('tr').querySelector('.add-btn');
    // let qtyOfItemNo = qtyOfItem.textContent;
    // let qtyOfItemPrice = parseInt(productPrice) * qtyOfItemNo;
    // t -= qtyOfItemPrice;
    // qtyOfItemNo--;
    // qtyOfItemPrice = parseInt(productPrice) * qtyOfItemNo;
    // t += qtyOfItemPrice;
    // totalPrice.innerHTML = t;
    // qtyOfItem.textContent = qtyOfItemNo;
    // console.log(qtyOfItemNo);
    // console.log('ohoii');
    // (qtyOfItemNo <= 1) ? btn.disabled = true : btn.disabled = false;
    // (qtyOfItemNo >= 1) ? increaseBtn.disabled = false : increaseBtn.disabled = true;

// }
// let totalPrice = parseInt(itemPrice) * itemSpan;
// t = t + totalPrice;
// sumItemPrice.innerHTML = t;
// const plusBtns = cartRowDiv.querySelectorAll('.plus-btn');
// const subtractBtns = cartRowDiv.querySelectorAll('.subtract-btn');
// plusBtns.forEach(function addQty(plusBtn) {
//     plusBtn.addEventListener('click', function (event) {
//         t = t - totalPrice;
//         itemSpan = itemSpan + 1;
//         totalPrice = parseInt(itemPrice) * itemSpan;
//         t = t + totalPrice;
//         sumItemPrice.innerHTML = t;
//         // sumTotalPrice.innerHTML = t + 2000;
//     })
// })
// subtractBtns.forEach(function addQty(subtractBtn) {
//     subtractBtn.addEventListener('click', function (event) {
//             t = t - totalPrice;
//             itemSpan = itemSpan - 1;
//             totalPrice = parseInt(itemPrice) * itemSpan;
//     })
// })
const newItemRow = (productName, productPrice) => {
    sN = tableBody.childElementCount;
    sN++;
    // checkSn();
    let newRow = `
    <tr>
        <td class="s-no">${sN}</td>
        <td class="cart-product-name">${productName}</td>
        <td>&#8358;<span class="price">${productPrice}</span></td>
        <td class="cart-flex">
            <button class="btn-qty sub-btn btn-primary">-</button>
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
        // let qtyOfItemPrice = parseInt(productPrice) * parseInt(qtyOfItem.textContent);
    // sNos = tableBody.querySelectorAll('.s-no');
    addBtns.forEach(btn => {
        // btn.addEventListener('click', addToCart(btn));
        btn.addEventListener('click', () => {
            // increaseQty(btn, productPrice);
            getQty(btn, productPrice, 'sub', 10);
            // increaseQty(btn, productPrice, qtyOfItemPrice);
        });
    });
    subBtns.forEach(btn => {
        // btn.addEventListener('click', addToCart(btn));
        btn.addEventListener('click', () => {
            // decreaseQty(btn, productPrice);
            getQty(btn, productPrice, 'add', 1);
        });
    });
    removeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // removeRow(btn);
            console.log('tipp');
            // sNos.forEach(sNo => {
            checkShopItem(btn);
            // });
        });
    });
            t += parseInt(productPrice);
            totalPrice.innerText = t;
    checkCartQty();
}
const cartShow = () => {
    cartContainer.style.display = 'flex';
    // cartBox.classList.add('cart-container-show')
    console.log('working');
}

const cartClose = () => {
        cartContainer.style.display = 'none';
        console.log('working--');
}
const cartBlurClose = (e) => {
    let isInside = cartBox.contains(e.target);
    let isBtnInside = cartShowBtn.contains(e.target);
    if (!isInside && !isBtnInside) {
        cartContainer.style.display = 'none';
        // console.log('working--');
    }
    // console.log('!!working');
    // cartBox.classList.add('cart-container-show')
    // cartBox.classList.replace('cart-container-show')
}

// Show error message
const showError = (input, message) => {
    // input.className = 'form-input error';
    input.classList.add('error');
    // const formGroup = input.parentElement.closest('.form-group');
    const errorTxt = input.nextElementSibling;
    errorTxt.innerText = message;
    // formGroup.querySelector('small').innerText = message;
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
// const validateEmail = (emailValid) => {
//     const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//     let emailValidTest = re.test(String(email.value).toLowerCase());
//     if (emailValidTest === true) {
//         email.className = 'form-control success';
//     } else {
//         showError(email, 'Email invalid');
//     }
// }

function requestMessage() {
    console.log('please work');
    let checkName = name.classList.contains('success');
    let checkEmail = email.classList.contains('success');
    let checkPw2 = password2.classList.contains('success');
    let checkPw1 = password1.classList.contains('success');

    if (checkName === checkEmail) {
        if (checkEmail === checkPw1) {
            if (checkPw1 === checkPw2) {
                if (checkName === true) {
                    name.value = ''
                    email.value = ''
                    password1.value = ''
                    password2.value = ''
                }
            }
        }
    }
}
// form.addEventListener('submit', function (event) {   
//     event.preventDefault();
//     if (name.value === '') {
//         showError(name, 'Name cannot be blank');
//     } else {
//         name.className = 'form-control success';
//     }
//     if (email.value === '') {
//         showError(email, 'Email cannot be blank');
//     } else {
//         validateEmail(email.value);
//     }
//     requestMessage();
// });

addBtnss.forEach(btn => {
    // btn.addEventListener('click', addToCart(btn));
    btn.addEventListener('click', () => {
        increaseQty(btn);
    });
});
subBtnss.forEach(btn => {
    // btn.addEventListener('click', addToCart(btn));
    btn.addEventListener('click', () => {
        decreaseQty(btn);
    });
});
removeBtnss.forEach(btn => {
    btn.addEventListener('click', () => {
        removeRow(btn);
        console.log('tipp');
    });
});
cartBtns.forEach(btn => {
    // btn.addEventListener('click', addToCart(btn));
    btn.addEventListener('click', () => {
        let productName = btn.closest('.card').querySelector('.product-name').textContent;
        let productPrice = btn.closest('.card').querySelector('.price-value').textContent;
        if (btn.classList.contains('btn-primary')) {
            btn.classList.replace('btn-primary', 'btn-secondary');
            btn.textContent = 'REMOVE FROM CART';
            // console.log('ayhh');
            newItemRow(productName, productPrice);
        } else {
            // btn.classList.replace('btn-secondary', 'btn-primary');
            // btn.textContent = 'ADD TO CART';
            checkCartItem(btn);
            // console.log('nnayhh');
        }
        // console.log(btn.closest('.card'));
        console.log(productName);
        console.log(productPrice);
    });
});

cartShowBtn.addEventListener('click', cartShow);

continueBtn.addEventListener('click', () => {
    cartContainer.style.display = 'none';
    console.log('working mor--');
});
payBtn.addEventListener('click', () => {
    // cartContainer.style.display = 'none';
    if (tableBody.childElementCount === 0) {
        console.log('no item');
    } else {        
        formInputs.forEach(formInput => {
            if (formInput.value === '') {
                showError(formInput, `${formInput.title} cannot be blank`);
            } else {
                formInput.classList.remove('error');
            }
        });
        validatePhoneNumber();
        validateEmail();
        // if 
    let checkName = !name.classList.contains('error');
    let checkEmail = !email.classList.contains('error');
    let checkNumber = !phoneNumber.classList.contains('error');
    console.log(checkName);
    console.log(checkEmail);
    if (checkName && checkEmail && checkNumber) {
        console.log('woohoo');
        // payWithPaystack();
    }
    // let checkEmail = email.classList.contains('success');
    // (name.value === '') {
        //     showError(name, 'Name cannot be blank');
        // } else {
        //     name.classList.remove('error');
        // }
        // if (email.value === '') {
        //     showError(email, 'Email cannot be blank');
        // } else {
        //     validateEmail(email.value);
        // }
        console.log(email.value);
        console.log(email.title);
        // console.log(email.nextElementSibling);
        // console.log(email.nextSibling);
    }
});
document.addEventListener('click', (e) => {
    cartBlurClose(e)
    // let isInside = cartBox.contains(e.target);
    // let isBtnInside = cartShowBtn.contains(e.target);
    // if (!isInside && !isBtnInside) {
    //     cartContainer.style.display = 'none';
    //     // console.log('working--');
    // }
    // // console.log('!!working');
});

// cartBtn.addEventListener('click', cartShow)



checkCartQty();


function payWithPaystack() {
    // e.preventDefault();
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
            alert(message);
        }
    });
    handler.openIframe();
}
