import { LitElement, html, css } from 'lit-element';

import './password-checker';

class NextApp extends LitElement {
  static get properties() {
    return {
      password: String,
    };
  }

  constructor() {
    super();

    this.password = null;
  }

  firstUpdated(changedProperties) {
    this.shadowRoot.querySelector('input').focus();
  }

  handleInput(e) {
    this.password = e.srcElement.value;
  }

  render() {
    return html`
      <div>
        <input 
          type="password" 
          @input=${this.handleInput}>
        </input>
      </div>

      <password-checker
        .password=${this.password}>
      </password-checker>

      <password-checker
        .password=${this.password}>
          <span slot="empty">TU CONTRASEÑA ESTÁ VACÍA</span>
          <span slot="weak">Poco segura.</span>
          <span slot="strong">Segura.</span>
      </password-checker>
    `;
  }
  
}

customElements.define('next-app', NextApp);

