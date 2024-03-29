import { Product } from "@/lib/data/products";

export function validateEmail(email: string) {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
}

export function displayProductPrice(product: Product) {
  if (product.secondPrice) {
    return `${product.price.toFixed(2)}€ / ${product.secondPrice.toFixed(2)}€`;
  } else if (product.price) {
    return `${product.price.toFixed(2)}€`;
  } else {
    return "";
  }
}

export function linkActive(path: string) {
  return !!global.window ? global.window.location.pathname === path : false;
}
