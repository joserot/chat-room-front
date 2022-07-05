import { Router } from "@vaadin/router";

const router = new Router(document.getElementById("root"));
router.setRoutes([
	{ path: "/", component: "welcome-page" },
	{ path: "/chat", component: "chat-page" },
]);
