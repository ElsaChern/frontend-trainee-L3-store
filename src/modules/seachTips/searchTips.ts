import { ViewTemplate } from '../../utils/viewTemplate';
import { View } from '../../utils/view';
import html from './searchTips.tpl.html';

const tips = ['чехол iphone 13 pro', 'коляски agex', 'яндекс станция 2'];

export class Tips {
  view: View;

  constructor() {
    this.view = new ViewTemplate(html).cloneView();
  }

  public attach($root: HTMLElement) {
    $root.prepend(this.view.root);
  }

  public render() {
    const linkedTips = tips.map((tip) => {
      return `<a>${tip}</a>`;
    });

    const firstTips = linkedTips.slice(0, -1).join(', ');
    const lastTip = linkedTips.slice(-1);

    this.view.root.innerHTML = `Например, ${firstTips} или ${lastTip}`;
  }
}
