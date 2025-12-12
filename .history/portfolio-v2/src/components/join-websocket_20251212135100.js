export function connectWebSocket() {
    const startBtn = document.getElementById("startBtn")
    startBtn.addEventListener("click", async () => {
        console.log("Starting game...");
        addLog("Starting game...");

        try {
            const response = await fetch("http://localhost:8080/game/create/", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const data = await response.json();
            console.log("Game created:", data);
            addLog("Game created with ID: " + data.gameId);

            const gameId = data.gameId;

            connectWebSocket("create", gameId, playerId);
            
            
            // alert(`Game created with ID: ${data.gameId}`);
        } catch (error) {
            console.error("Error creatin game:", error);
        }
    });

}