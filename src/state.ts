import { db } from "./rtdb";
import { ref, onValue } from "firebase/database";

const API_BASE_URL = "http://localhost:3500";

export const state = {
	data: {
		email: "",
		name: "",
		messages: [],
		userId: "",
		roomId: "",
		rtdbRoomId: "",
	},
	listeners: [],
	getState() {
		return this.data;
	},
	setState(newState) {
		this.data = newState;
		for (const cb of this.listeners) {
			cb();
		}
		// localStorage.setItem("stateChat", JSON.stringify(newState));
	},
	async listenRoom() {
		const cs = await this.getState();
		const roomRef = await ref(db, "rooms/" + cs.rtdbRoomId);

		await onValue(roomRef, (snap) => {
			const data = snap.val();
			cs.messages = data.messages;
			this.setState(cs);
		});
	},
	async newMessages(newMessage) {
		const cs = await this.getState();

		if (cs.rtdbRoomId) {
			let res = await fetch(API_BASE_URL + "/message", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					message: newMessage,
					author: cs.name || cs.email,
					rtdbId: cs.rtdbRoomId,
				}),
			});
			let data = await res.json();

			await this.listenRoom();
		}
	},
	initState() {
		// const cs = this.getState();
		// const storageState: any = localStorage.getItem("stateChat");
		// let updateState = storageState;
		// cs.email = updateState.email || "";
		// cs.name = updateState.name || null;
		// cs.userId = updateState.userId || null;
		// cs.roomId = updateState.roomId || null;
		// cs.rtdbRoomId = updateState.rtdbRoomId || null;
		// this.setState(cs);
	},
	async setData(name, email, room) {
		const cs = this.getState();
		cs.email = email;
		cs.name = name;
		cs.roomId = room;
		this.setState(cs);

		let res = await fetch(API_BASE_URL + "/signup", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				email: cs.email,
				name: cs.name,
			}),
		});
		let data = await res.json();

		if (res.status === 400) {
			await this.auth();
		} else {
			cs.userId = await data.id;
			this.setState(cs);
			await this.initRoom();
		}
	},
	async auth() {
		const cs = this.getState();

		let res = await fetch(API_BASE_URL + "/auth", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				email: cs.email,
			}),
		});

		let data = await res.json();
		cs.userId = await data.id;
		this.setState(cs);

		if (cs.roomId !== "") {
			await this.connectRoom();
		} else {
			await this.initRoom();
		}
	},
	async initRoom() {
		const cs = this.getState();

		if (cs.roomId) {
			await this.connectRoom();
			return false;
		}

		let res = await fetch(API_BASE_URL + "/rooms", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				userId: cs.userId,
			}),
		});

		let data = await res.json();
		cs.roomId = await data.id;
		this.setState(cs);

		await this.connectRoom();
	},
	async connectRoom() {
		const cs = this.getState();

		let res = await fetch(
			API_BASE_URL + "/rooms/" + cs.roomId + "?userId=" + cs.userId,
		);

		let data = await res.json();
		cs.rtdbRoomId = await data.rtdbRoomId;
		this.setState(cs);

		await this.listenRoom();
	},
	subscribe(callback) {
		this.listeners.push(callback);
	},
};
