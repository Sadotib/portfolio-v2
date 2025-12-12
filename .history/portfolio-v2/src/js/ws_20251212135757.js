export function connectWebSocket() {

    const wsUrl = `ws://localhost:8080/ws/visitors`
    addLog("Connecting WebSocket → " + wsUrl)

    socket = new WebSocket(wsUrl)

    socket.onopen = () => {

        addLog("WebSocket CONNECTED")

        // showGameScreen(gameId, playerId);   // ⬅ open game screen here!
    }
    socket.onclose = () => addLog("WebSocket DISCONNECTED")
    socket.onerror = (err) => addLog("WebSocket ERROR: " + err)
    socket.onmessage = (event) => {

        console.log("WebSocket message event:", event);
        
    }
}