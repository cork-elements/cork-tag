import {PolymerElement, html} from "@polymer/polymer"
import "@ucd-lib/cork-style"

import template from "./cork-tag.html"

export class CorkTag extends PolymerElement {

  static get properties() {
    return {
      rightArrow: {
        type: Boolean,
        value: false
      }
    };
  }

  static get template() {
    return html([template]);
  }

  constructor() {
    super();
    this.resize = this.resize.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('resize', this.resize);
    this.resize();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('resize', this.resize);
  }

  // needs to be called if made visible
  resize() {
    this._setBorderWidth();
  }

  // update triangle size
  _setBorderWidth(norepeat) {
    var h = this.$.label.offsetHeight;

    var height = (h/2);
    var equHeight = ((Math.sqrt(3)/2) * h) - (h * 0.30);

    this.$.arrowLeftOuter.style.width = (h - (h * 0.30))+'px';
    this.$.arrowLeftOuter.style.height = h+'px';
    this.$.arrowLeft.style.borderWidth = `${height}px ${equHeight}px ${height}px 0`;

    this.$.arrowRightOuter.style.width = (h - (h * 0.30))+'px';
    this.$.arrowRightOuter.style.height = h+'px';
    this.$.arrowRight.style.borderWidth = `${height}px 0 ${height}px ${equHeight}px`;

    if( !norepeat ) {
      setTimeout(() => this._setBorderWidth(true), 50);
    }
  }
}

window.customElements.define('cork-tag', CorkTag);