// Router
import "./router";
// State
import { state } from "./state";
// Pages
import { initWelcomePage } from "./pages/welcomePage";
import { initChatPage } from "./pages/chatPage";
// Components
import { initFormWelcome } from "./components/FormWelcome";
import { initText } from "./components/Text";
import { initFormChat } from "./components/FormChat";
import { initMessages } from "./components/Messages";

const initApp = (params: Element | null) => {
	state.initState();
	initWelcomePage();
	initChatPage();
	initFormWelcome();
	initFormChat();
	initText();
	initMessages();
};

(function () {
	const root = document.getElementById("root");
	initApp(root);
})();
