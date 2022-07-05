import { state } from "../state";

export function initChatPage() {
	class ChatPage extends HTMLElement {
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
          <component-messages></component-messages>
          <component-form-chat></component-form-chat>
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

      component-messages{
        min-height: 80vh;
        max-height: 80vh;
        overflow-x: hidden;
        overflow-y: scroll; 
      }

      component-form-chat{
        position: fixed;
        bottom: 0;
        margin: 2rem auto;
      }
      `;

			shadow.appendChild(style);
			shadow.appendChild(div);
		}
	}
	customElements.define("chat-page", ChatPage);
}
