export function initText() {
	class TextElement extends HTMLElement {
		constructor() {
			super();
		}
		connectedCallback() {
			this.render();
		}
		render() {
			const content = this.textContent;

			let shadow = this.attachShadow({ mode: "open" });

			let p: any = document.createElement("p");
			p.innerText = content;

			/* STYLES */

			let styles = document.createElement("style");
			styles.innerHTML = `
     p{
        font-size: 2.5rem;
        font-family:  sans-serif;
        color: #000;
      }
      `;

			shadow.appendChild(styles);
			shadow.appendChild(p);
		}
	}
	customElements.define("component-text", TextElement);
}
