import { ViewTemplate } from '../../utils/viewTemplate';
import { View } from '../../utils/view';
import html from './searchTips.tpl.html';

const tips = ['чехол iphone 13 pro', 'коляски agex', 'яндекс станция 2'];

export class Tips {
  view: View;

  constructor() {
    this.view = new ViewTemplate(html).cloneView();
  }

  attach($root: HTMLElement) {
    $root.prepend(this.view.root);
  }

  render() {
    const linkedTips = tips.map((tip) => {
      return `<a>${tip}</a>`;
    });

    if (tips.length === 1) {
      this.view.root.innerHTML = `Например, ${linkedTips[0]}`;
    } else if (tips.length > 1) {
      const firstTwoTips = linkedTips.slice(0, -1).join(', ');
      const lastTip = linkedTips.slice(-1);

      this.view.root.innerHTML = `Например, ${firstTwoTips} или ${lastTip}`;
    }
  }
}
