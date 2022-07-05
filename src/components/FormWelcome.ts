import { Router } from "@vaadin/router";
import { state } from "../state";

export function initFormWelcome() {
	class FormWelcomeElement extends HTMLElement {
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
        <input type="text" name="name" placeholder="Tu Nombre" />
        <input type="email" name="email" placeholder="Tu Email" />
        <select name="room">
           <option value="new">Nueva Room</option>
           <option value="existing">Room Existente</option>
        </select>
        <input class="hidden" type="text" name="roomName" placeholder="Nombre de la room" />
        <input type="submit" value="Siguiente" />
      </form>
      `;

			/* STYLES */

			let styles = document.createElement("style");
			styles.innerHTML = `
      form{
        display: flex;
        flex-direction: column;
        gap: 0.3rem;
        width: 100%;
        justify-content: center;
        align-items:center;
      }

      form input{
        width: 100%;
        height: 1.5rem;
      }

      form select{
        width: 100%;
        height: 1.5rem;
        }

       .hidden{
        display: none;
        }
      `;

			/* FUNCTIONS */
			const $form = div.querySelector("form");

			const changeSelect = () => {
				const $select = $form.room;
				const $inputRoomName = $form.roomName;

				$select.addEventListener("change", (e) => {
					if (e.target.value === "existing") {
						$inputRoomName.classList.remove("hidden");
					} else if (e.target.value === "new") {
						$inputRoomName.classList.add("hidden");
					}
				});
			};

			const processForm = () => {
				$form.addEventListener("submit", (e) => {
					e.preventDefault();
					const name = e.target.name.value;
					const email = e.target.email.value;
					const roomSelect = e.target.room.value;
					const room = e.target.roomName.value;
					if (name === "" || email === "") return false;
					if (roomSelect === "existing" && room === "") return false;

					state.setData(name, email, room);

					e.target.reset();
					Router.go("/chat");
				});
			};

			changeSelect();
			processForm();

			shadow.appendChild(styles);
			shadow.appendChild(div);
		}
	}
	customElements.define("component-form-welcome", FormWelcomeElement);
}
