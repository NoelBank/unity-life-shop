const scoreboardBrowser = mp.browsers.new('package://nbank-clothes/index.html');

mp.events.add("shop:open", () => {
    scoreboardBrowser.execute("setupShop();");
    mp.gui.chat.push("open shop");
})



mp.events.add("shop:close", () => {
    scoreboardBrowser.execute("closeShop();");
    mp.gui.chat.push("close shop");
})