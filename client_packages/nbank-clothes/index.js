const browser = mp.browsers.new('package://nbank-clothes/index.html');

browser.execute("setupShop();");


mp.events.add("shop:open", () => {
    browser.execute("openShop();");
    mp.gui.chat.push("open shop");
})



mp.events.add("shop:close", () => {
    browser.execute("closeShop();");
    mp.gui.chat.push("close shop");
})