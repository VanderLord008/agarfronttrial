//connect to the socket server
const socket = io.connect("http://localhost:9000");
const init = async () => {
  const initData = await socket.emitWithAck("init", {
    playerName: player.name,
  });

  setInterval(() => {
    socket.emit("tock", {
      xVector: player.xVector ? xVector : 0.1,
      yVector: player.yVector ? yVector : 0.1,
    });
  }, 16);

  console.log(initData.orbs);
  orbs = initData.orbs;
  player.indexInPlayers = initData.indexInPlayers;
  draw();
};

socket.on("tick", (playersArray) => {
  console.log(players);
  players = playersArray;
  if (players[player.indexInPlayers].playerData) {
    player.locX = players[player.indexInPlayers].playerData.locX;
    player.locY = players[player.indexInPlayers].playerData.locY;
  }
});

socket.on("orbSwitch", (orbData) => {
  //the server just emiited that an orb was absorbed so we have to update
  //the absorbed orb on the client side too
  //so rather than getting all the data we can just replace the data of
  //the absorbed orb
  orbs.splice(orbData.capturedOrbI, 1, orbData.newOrb);
});

socket.on("updateLeaderBoard", (leaderBoardArray) => {
  leaderBoardArray.sort((a, b) => {
    return b.score - a.score;
  });
  document.querySelector(".leader-board").innerHTML = "";
  leaderBoardArray.forEach((p) => {
    if (!p.name) {
      return;
    }
    document.querySelector(".leader-board").innerHTML += `
  <li class="leaderboard-Player">${p.name} - ${p.score}</li>
  `;
  });
});
socket.on("playerAbsorbed", (absorbData) => {
  document.querySelector(
    "#game-message"
  ).innerHTML = `${absorbData.absorbed} was absorbed by ${absorbData.absorbedBy}`;
  document.querySelector("#game-message").style.opacity = 1;
  window.setTimeout(() => {
    document.querySelector("#game-message").style.opacity = 0;
  }, 2000);
});
