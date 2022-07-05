import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
	apiKey: "AIzaSyBbUPwbRGPmsekt3bu_YTQDuLj_18Vqq2Q",
	authDomain: "chat-apx.firebaseapp.com",
	databaseURL: "https://chat-apx-default-rtdb.firebaseio.com",
	projectId: "chat-apx",
	storageBucket: "chat-apx.appspot.com",
	messagingSenderId: "924144369985",
	appId: "1:924144369985:web:ba70a9ef9d1023a7d4e1c0",
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
