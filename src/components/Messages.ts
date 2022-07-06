import { state } from "../state";

export function initMessages() {
	class MessagesElement extends HTMLElement {
		messages;
		room;
		shadow: ShadowRoot;
		fragment: DocumentFragment;
		constructor() {
			super();
			this.shadow = this.attachShadow({ mode: "open" });
			this.fragment = document.createDocumentFragment();

			state.subscribe(() => {
				this.messages = state.getState().messages;
				this.room = state.getState().roomId;

				if (this.messages !== undefined) {
					Object.values(this.messages).forEach((m: any) => {
						let div = document.createElement("div");
						div.innerHTML = `
          <p class="author">${m.author}</p>
          <p class="message">${m.message}</p>
          `;
						this.fragment.appendChild(div);
					});
				}

				this.render();
			});
		}
		connectedCallback() {
			this.render();
		}

		render() {
			this.shadow.innerHTML = `
      <h2>Room: ${this.room}</h2>
      `;

			/* STYLES */

			let styles = document.createElement("style");
			styles.innerHTML = `

      h2{
        position: fixed;
        top: 0;
        text-align: center;
      }

      shadow{
        display: flex;
        flex-direction: column;
        width: 100%;
      }

      .message{
        background-color: #7a7a7a;
        border-radius: 5px;
        padding: 1rem;
        color: #fff;
        width: clamp(15rem , 80vw , 30rem);
        margin: 0 auto;
   
      }

      .author{
       color: #000;
       margin: 0 auto;
      margin-top: 1rem;
      }
      `;

			this.shadow.appendChild(this.fragment);
			this.shadow.appendChild(styles);
		}
	}
	customElements.define("component-messages", MessagesElement);
}
