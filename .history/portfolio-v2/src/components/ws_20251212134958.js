export function connectWebSocket(action, gameId, playerId) {

    const wsUrl = `ws://localhost:8080/ws/${action}/${gameId}/${playerId}`
    addLog("Connecting WebSocket → " + wsUrl)

    socket = new WebSocket(wsUrl)

    socket.onopen = () => {

        addLog("WebSocket CONNECTED")

        showGameScreen(gameId, playerId);   // ⬅ open game screen here!
    }
    socket.onclose = () => addLog("WebSocket DISCONNECTED")
    socket.onerror = (err) => addLog("WebSocket ERROR: " + err)
    socket.onmessage = (event) => {

        console.log("WebSocket message event:", event);
        console.log("WebSocket message data (raw):", event.data);
        const data = JSON.parse(event.data);
        console.log("WebSocket message data:", data);
        
        if (data.type === "room_status") {
            updateRoomStatusUI(data);
            return;
        }
        addLog("Received → " + event.data)
    }
    // // STEP 3: Send a WebSocket message
    // sendBtn.addEventListener("click", () => {
    //     if (!socket || socket.readyState !== WebSocket.OPEN) {
    //         addLog("Cannot send message: WebSocket not open")
    //         return
    //     }

    //     const text = document.getElementById("msgInput").value
    //     const msg = JSON.stringify({
    //         type: "chat",
    //         from: playerId,
    //         text: text
    //     })

    //     socket.send(msg)
    //     addLog("Sent → " + text)
    // })  
}