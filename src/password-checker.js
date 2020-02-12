import { LitElement, html, css } from 'lit-element';

const PATTERN = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,}/;
const LOWER_CASE_PATTERN = /^[a-z0-9_\-]+$/;

// slot empty
// slot strong
// slot weak

class PasswordChecker extends LitElement {
  static get is() {
    return 'password-checker';
  }

  static get properties() {
    return {
      password: {
        type: String,
        reflect: true,
        //attribute: false
      },
      pattern: String,
    }
  }

  static get styles() {
    return css`
      :host {
        display: block;
        border: 1px dotted black;
        margin: 2px;
        padding: 5px 5px;
      }

      slot[name='empty']  { text-decoration: underline; }
      slot[name='strong'] { color: green; }
      slot[name='weak']   { color: red; }
    `;
  }

  constructor() {
    super();

    this.pattern = PATTERN;
    this.password = null;
  }

  updated(changedProperties) {
    changedProperties.forEach((oldValue, propName) => {
      if (propName === 'password' && this.isValid(this.password)) {
        this.dispatchEvent(new Event('password-valid'));
      }
    });
  }

  isValid(passwd) {
    return this.pattern.test(passwd);
  }

  get emptyPassword() {
    return this.password == null || this.password === '';
  }

  render() {
    if (this.emptyPassword) {
      return html`
        <slot name="empty">
          No password 🕵️️
        </slot>
      `;
    }

    return html`
      ${this.isValid(this.password) ? 
      html`      
        <slot name="strong">
          <span>Your password is <strong>valid 👍</strong></span>
        </slot>

        <div>
          Strength: <progress value=${this.password.length-3} max="5"</progress>
        </div>
      ` :
      html`
        <slot name="weak">
          <span>Your password is <strong>INVALID 👎</strong></span>
        </slot>
      `}
    `;
  }
}

customElements.define(PasswordChecker.is, PasswordChecker);