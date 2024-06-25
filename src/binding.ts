import { RedGin, propReflect, html, watch, event } from 'redgin';

export default class Binding extends RedGin {
  value = propReflect<string>('John Doe');

  // Define observed attributes
  static observedAttributes = ['value'];

  // Lifecycle hook for when component updates
  onUpdated(): void {
    const inputElement = this.shadowRoot?.querySelector<HTMLInputElement>('input');
    if (inputElement) inputElement.value = this.value;
  }

  // Render method using html template literals
  render() {
    return html`
      <input 
        type="text"
        ${event('input', (e: Event) => this.value = (e.target as HTMLInputElement).value )}
      >

      <button
        ${event('click', () => this.value = 'John Wick' )}
      >Change to John Wick</button>

      <h1>Hello ${watch(['value'], () => this.value )} !</h1>
    `;
  }

}

// Register custom element with the browser
customElements.define('sample-binding', Binding);

// Extend HTMLElementTagNameMap to include 'sample-binding'
declare global {
  interface HTMLElementTagNameMap {
    'sample-binding': Binding;
  }
}


// Uncommented to clarify external update behavior
// document.querySelector('sample-binding').value = 'John Wick';