import { connectWebSocket } from "./ws";

export function joinWebSocket() {
    const startBtn = document.getElementById("startBtn")
    startBtn.addEventListener("click", async () => {
        console.log("Connecting to WebSocket...");
        

        try {
            const response = await fetch("http://localhost:8080/join", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const data = await response.json();
            console.log("data recieved:", data);
            

            const gameId = data.gameId;

            // connectWebSocket("create", gameId, playerId);
            connectWebSocket();
            
            
            // alert(`Game created with ID: ${data.gameId}`);
        } catch (error) {
            console.error("Error creatin game:", error);
        }
    });

}