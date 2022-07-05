import { state } from "../state";

export function initFormChat() {
	class FormChatElement extends HTMLElement {
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
      <form>
        <input type="text" name="message" />
        <input type="submit" value="Enviar" />
      </form>
      `;

			/* STYLES */

			let styles = document.createElement("style");
			styles.innerHTML = `
      form{
        display: flex;
        gap: 0.3rem;
        width: 100%;
        justify-content: center;
        align-items:center;
      }

      form input{
        width: 100%;
        height: 1.5rem;
      }
      `;

			/* FUNCTIONS */
			let form = div.querySelector("form");

			const processForm = () => {
				form.addEventListener("submit", (e) => {
					e.preventDefault();
					let message = e.target.message.value;
					if (message === "") return false;

					state.newMessages(e.target.message.value);
					e.target.reset();
				});
			};

			processForm();

			shadow.appendChild(styles);
			shadow.appendChild(div);
		}
	}
	customElements.define("component-form-chat", FormChatElement);
}
