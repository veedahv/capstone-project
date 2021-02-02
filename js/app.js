const cartContainer = document.querySelector('.cart'),
 cartBox = document.querySelector('.cart-container'),
cartBtn = document.querySelector('.nav-btn');


const cartShow = () => {
    cartContainer.style.display = 'flex';
    // cartBox.classList.add('cart-container-show')
    console.log('working');
}

const cartClose = (e) => {
    let isInside = cartBox.contains(e.target);
    let isBtnInside = cartBtn.contains(e.target);
    if (!isInside && !isBtnInside) {        
        cartContainer.style.display = 'none';
        console.log('working--');
    }
    console.log('!!working');
    // cartBox.classList.add('cart-container-show')
}

// document.addEventListener('click', function (event) {
//     let isCardInside = paymentCardInside.contains(event.target);
//     let paymentCardInside = paymentForm.querySelector('.card');
//     let isCheckBtn = checkBtn.contains(event.target);
//     if (!isCardInside && !isCheckBtn) {
//         paymentForm.style.display = 'none'
//     }
// });

cartBtn.addEventListener('click', cartShow);

document.addEventListener('click', (e) => {
    let isInside = cartBox.contains(e.target);
    let isBtnInside = cartBtn.contains(e.target);
    if (!isInside && !isBtnInside) {        
        cartContainer.style.display = 'none';
        console.log('working--');
    }
    console.log('!!working');
});

// cartBtn.addEventListener('click', cartShow)

