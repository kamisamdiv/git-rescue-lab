function calculateTotal(items, discountCode) {
  let subtotal = 0;
  let totalQty = 0;

  for (let i = 0; i < items.length; i++) {
    subtotal += items[i].price * items[i].qty;
    totalQty += items[i].qty;
  }


  let discount = 0;

  if (discountCode === 'SAVE10') {
    discount = 0.10;
  } else if (discountCode === 'BULK20' && totalQty >= 5) {
    discount = 0.20;
  } else if (discountCode === 'HOLIDAY30') {
    discount = 0.30;
  }

  return subtotal * (1 - discount);
}

module.exports = { calculateTotal };