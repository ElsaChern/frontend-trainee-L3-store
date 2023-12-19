import { ViewTemplate } from '../../utils/viewTemplate';
import { View } from '../../utils/view';
import html from './productList.tpl.html';
import { ProductData } from 'types';
import { Product } from '../product/product';
import { eventService } from '../../services/event.service';

export class ProductList {
  view: View;
  products: ProductData[];

  constructor() {
    this.products = [];
    this.view = new ViewTemplate(html).cloneView();
  }

  attach($root: HTMLElement) {
    $root.innerHTML = '';
    $root.appendChild(this.view.root);
  }

  update(products: ProductData[]) {
    this.products = products;
    this.render();
  }

  private _observerCallback = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const productId = Number((entry.target as HTMLElement).dataset.id);

        const product = this.products.filter(({ id }) => id === productId)[0];

        eventService.sendViewCardEvent(product);
        observer.unobserve(entry.target);
      }
    });
  };

  render() {
    this.view.root.innerHTML = '';

    this.products.forEach((product) => {
      const productComp = new Product(product);
      productComp.render();
      productComp.attach(this.view.root);
    });

    const observerOptions = {
      root: null, //  используется область видимости браузера
      rootMargin: '0px', // строка с отступами для области наблюдения
      threshold: 1.0 // порог пересечения, при котором будет срабатывать колбэк.
    };
    const productCards = this.view.root.querySelectorAll('.product');
    const observer = new IntersectionObserver(this._observerCallback, observerOptions);

    productCards.forEach((productCard) => observer.observe(productCard));
  }
}
