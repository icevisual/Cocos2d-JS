var res = {
    HelloWorld_png : "res/HelloWorld.png",
    item_2 : "res/choose_btn_nor.png",
    item_3 : "res/choose_btn_light.png",
    // CloseNormal_png : "res/public_ui_blue_btn.png",
    // CloseSelected_png : "res/public_ui_green_btn.png",

    CloseNormal_png : "res/HD/CloseNormal.png",
    CloseSelected_png : "res/HD/CloseSelected.png",
    sound_bg : "res/sounds/sound.bg.mp3",
    sound_click_bubble : "res/sounds/sound.click.bubble.mp3",
};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}
