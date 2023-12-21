import { ProductData } from 'types';

class EventService {
  // Отправка событий
  private _sendEvent(type: string, payload: Object) {
    const timestamp = Date.now();
    try {
      fetch('/api/sendEvent', {
        method: 'POST',
        body: JSON.stringify({ type, payload, timestamp })
      })
        .then((response) => response.json())
        .then(() => console.log(`Event ${type} sent successfully`));
    } catch (error) {
      console.log(error);
    }
  }
  // 1.	Переход по страницам
  public sendRouteEvent(url: string) {
    this._sendEvent('route', url);
  }
  // 2.	Просмотр товара в списке товаров
  async sendViewCardEvent(product: ProductData) {
    // поле log представляет собой {}
    const type = Object.keys(product.log).length === 0 ? 'viewCard' : 'viewCardPromo';
    let secretKey;
    // Получение secretKey
    await fetch(`/api/getProductSecretKey?id=${product.id}`)
      .then((res) => res.json())
      .then((key) => {
        secretKey = key;
      });
    const payload = { ...product, secretKey };
    this._sendEvent(type, payload);
  }

  // 3.	Добавление товара в корзину
  public sendAddToCartEvent(product: ProductData) {
    this._sendEvent('addToCart', product);
  }

  // 4.	Оформление заказа
  public sendPurchaseEvent(orderId: string, totalPrice: number, productIds: number[]) {
    this._sendEvent('purchase', { orderId, totalPrice, productIds });
  }
}

export const eventService = new EventService();
