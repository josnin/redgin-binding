import { RedGin, propReflect, html, watch, event } from 'redgin';

export default class Binding extends RedGin {
  value1 = propReflect<string>('John Doe');

  static observedAttributes = ['value1'];

  render() {
    return html`
      <input 
        type="text"
        ${event('input', (e: any) => this.value1 = e.target.value)} 
      >

      Hello ${watch(['value1'], () => this.value1)}
      
    `;
  }
}

customElements.define('sample-binding', Binding);

declare global {
  interface HTMLElementTagNameMap {
    'sample-binding': Binding;
  }
}
