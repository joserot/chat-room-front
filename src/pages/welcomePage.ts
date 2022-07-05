import { Router } from "@vaadin/router";

export function initWelcomePage() {
	class WelcomePage extends HTMLElement {
		constructor() {
			super();
		}
		connectedCallback() {
			this.render();
		}
		render() {
			let shadow = this.attachShadow({ mode: "open" });

			let div: any = document.createElement("div");

			div.innerHTML = `
      <div class="container">
             <component-text>Bienvenido</component-text>
             <component-form-welcome></component-form-welcome>
      </div>
      `;

			/*********************STYLES *************************/

			const style = document.createElement("style");
			style.innerHTML = `
      .container{
        width: 100vw;
        height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
      `;

			shadow.appendChild(style);
			shadow.appendChild(div);
		}
	}
	customElements.define("welcome-page", WelcomePage);
}
