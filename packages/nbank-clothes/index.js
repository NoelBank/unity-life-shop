
// Commands
mp.events.addCommand("open", (player) => {
    player.call("shop:open");
  });


  mp.events.addCommand("close", (player) => {
    player.call("shop:close");
  });