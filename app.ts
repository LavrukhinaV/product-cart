class Product {
  constructor(
    public id: number,
    public title: string,
    public price: number,
   ) {}
}

class Delivery {
  constructor (
    public date: Date
  ) {}
}

class HomeDelivery extends Delivery {
  constructor (date: Date, public address: string) {
    super(date);
  }
}

class ShopDelivery extends Delivery {
  constructor (public shopId: number) {
    super(new Date());
  }
}

type DeliveryOptions = HomeDelivery | ShopDelivery


class Cart {
  private product: Product[] = [];
  private delivery: DeliveryOptions;

  public addProduct(product: Product): void {
    this.product.push(product)
  }

  public deleteProduct(productId: number): void {
    this.product = this.product.filter((p: Product) => p.id !== productId)
  }

  public getSum(): number {
    return this.product
      .map((p:Product) => p.price)
      .reduce((p1: number, p2:number) => p1 + p2)
  }

  public setDelivery(delivery: DeliveryOptions): void {
    this.delivery = delivery
  }

  public checkOut(): { success: true } {
    if (this.product.length == 0) {
      throw new Error('Не добавлены товары')
    }
    if (!this.delivery) {
      throw new Error('Не указан способ доставки')
    }

    return { success: true }
  }
}

const cart = new Cart();
cart.addProduct(new Product(1, 'Печенье', 10));
cart.addProduct(new Product(2, 'Чай', 20));
cart.addProduct(new Product(3, 'Торт', 50));
cart.deleteProduct(3)
cart.setDelivery(new HomeDelivery(new Date(), ''));
console.log(cart.getSum());
console.log(cart.checkOut())