import { RedGin, propReflect, html, watch, event } from 'redgin';

export default class Binding extends RedGin {
  value = propReflect<string>('John Doe');

  static observedAttributes = ['value'];

  render() {
    return html`

    
        <input 
          type="text"
          ${event('input', (e: any) => this.value = e.target.value)} 
        >

       <h1>Hello ${watch(['value'], () => this.value )} !</h1>

     
      
    `;
  }
}

customElements.define('sample-binding', Binding);

declare global {
  interface HTMLElementTagNameMap {
    'sample-binding': Binding;
  }
}
