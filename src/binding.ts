import { RedGin, propReflect, html, watch, event } from 'redgin';

export default class Binding extends RedGin {
  value = propReflect<string>('John Doe');

  static observedAttributes = ['value'];

  onUpdated(): void {
    // @ts-ignore
    if(this.shadowRoot.querySelector('input')) this.shadowRoot.querySelector('input').value = this.value;   
  }

  render() {
    return html`
      <input 
        type="text"
        ${event('input', (e: any) => this.value = e.target.value )} 
      >

      
      <button
        ${event('click', () => this.value = 'John Wick' )}
      >Change to John Wick</button>

      <h1>Hello ${watch(['value'], () => this.value )} !</h1>

    `;
  }

}


// document.querySelector('sample-binding').value = 'John Wick' will also trigger update
customElements.define('sample-binding', Binding);

declare global {
  interface HTMLElementTagNameMap {
    'sample-binding': Binding;
  }
}
