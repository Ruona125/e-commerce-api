// utils/cartUtils.js

export const calculateMainTotal = (carts) => {
    let mainTotal = 0;
  
    if (carts && carts.cartDetails && carts.cartDetails.length > 0) {
      carts.cartDetails.forEach((cartDetails) => {
        if (cartDetails.products) {
          cartDetails.products.forEach((product) => {
            mainTotal += product.quantity * product.productDetails.price;
          });
        }
      });
    }
  
    return mainTotal;
  };
  