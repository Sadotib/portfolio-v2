
let socket = null;
export function connectWebSocket() {

    const wsUrl = `ws://localhost:8080/ws/visitors`
    console.log("Connecting WebSocket → " + wsUrl)

    socket = new WebSocket(wsUrl)

    socket.onopen = () => {

        // addLog("WebSocket CONNECTED")
        console.log("WebSocket CONNECTED");

        // showGameScreen(gameId, playerId);   // ⬅ open game screen here!
    }
    socket.onclose = () => console.log("WebSocket DISCONNECTED")
    socket.onerror = (err) => console.log("WebSocket ERROR: " + err)
    socket.onmessage = (event) => {

        console.log("WebSocket message event:", event);
        console.log("WebSocket message data:", event.data);


    }
}