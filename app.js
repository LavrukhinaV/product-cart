"use strict";
class Product {
    constructor(id, title, price) {
        this.id = id;
        this.title = title;
        this.price = price;
    }
}
class Delivery {
    constructor(date) {
        this.date = date;
    }
}
class HomeDelivery extends Delivery {
    constructor(date, address) {
        super(date);
        this.address = address;
    }
}
class ShopDelivery extends Delivery {
    constructor(shopId) {
        super(new Date());
        this.shopId = shopId;
    }
}
class Cart {
    constructor() {
        this.product = [];
    }
    addProduct(product) {
        this.product.push(product);
    }
    deleteProduct(productId) {
        this.product = this.product.filter((p) => p.id !== productId);
    }
    getSum() {
        return this.product
            .map((p) => p.price)
            .reduce((p1, p2) => p1 + p2);
    }
    setDelivery(delivery) {
        this.delivery = delivery;
    }
    checkOut() {
        if (this.product.length == 0) {
            throw new Error('Не добавлены товары');
        }
        if (!this.delivery) {
            throw new Error('Не указан способ доставки');
        }
        return { success: true };
    }
}
const cart = new Cart();
cart.addProduct(new Product(1, 'Печенье', 10));
cart.addProduct(new Product(2, 'Чай', 20));
cart.addProduct(new Product(3, 'Торт', 50));
cart.deleteProduct(3);
cart.setDelivery(new HomeDelivery(new Date(), ''));
console.log(cart.getSum());
console.log(cart.checkOut());
