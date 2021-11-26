import { html, css, LitElement } from 'lit';

export class MyComponent extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        padding: 25px;
        color: var(--my-component-text-color, #000);
        padding: 1rem;
        background-color: red;
        color: white;
      }

      .container {
        background-color: blue;
        color: white;
      }

      .item {
        padding: 1rem;
        background-color: white;
        color: black;
      }
    `;
  }

  static get properties() {
    return {
      title: { type: String },
      name: { type: String },
      data: { type: Array },
    };
  }

  constructor() {
    super();
    this.title = '';
  }


  render() {
    return html`
      <div class="container">
        <h2>${this.title}! ${this.name}</h2>
        <input type="text" id="name">
        <button @click="${this._handleClick}" >Click</button>
        ${this._dataView()}
      </div>
    `;
  }

  _handleClick() {
    const value = this.shadowRoot.querySelector('input').value;
    this.name = value;
    this.request();
  }

  request() {
    fetch('https://rickandmortyapi.com/api/character/1,183')
      .then(response => response.json())
      .then(data => this.data = data);
  }

  _dataView() {
    return html`
      ${this.data
        ? html`
          ${this.data.map((item) => html`
            <div class="item">
              <div>${item.id}</div>
              <div>${item.name}</div>
              <div>${item.status}</div>
            </div>
          `)}
        `: html``
      }
    `;
  }
}
