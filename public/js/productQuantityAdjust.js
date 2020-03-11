const plus = document.getElementById('plus');
const minus = document.getElementById('minus');
const priceValID = document.getElementById('priceValue');
const priceHidID = document.getElementById('priceHidden');
const quantityID = document.getElementById('quantity');
const total = document.getElementById('total');
let priceValue = parseFloat(priceValID.value);
let quantity = parseFloat(quantityID.value);
let priceHidden = parseFloat(priceHidID.value);

if (plus) {
    plus.addEventListener('click', (event) => {
        event.preventDefault();

        priceValue += priceHidden;
        quantity += 1;
        quantityID.value = quantity;
        priceValID.value = priceValue.toFixed(2);
        total.innerHTML = quantity;
    });
};

if (minus) {
    minus.addEventListener('click', (event) => {
        event.preventDefault();

        if (quantity === 1) {
            quantity = 1;
            priceValue = priceHidden;
            return;
        } else {
            priceValue -= priceHidden;
            quantity -= 1;
            quantityID.value = quantity;
            priceValID.value = priceValue.toFixed(2);
            total.innerHTML = quantity;
        };
    });
};