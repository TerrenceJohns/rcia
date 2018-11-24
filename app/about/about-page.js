
const app = require("tns-core-modules/application");
const webViewModule = require("tns-core-modules/ui/web-view");

const SettingsViewModel = require("./about-view-model");

var page;
var webview;
function onNavigatingTo(args) {
    page = args.object;
    page.bindingContext = new SettingsViewModel();
    page.bindingContext.set("about","~/vatican/archive/About/about.html");
    page.bindingContext.set("isLoading",false);

}

function onDrawerButtonTap(args) {
    const sideDrawer = app.getRootView();
    sideDrawer.showDrawer();
}
function onWebViewLoaded(webargs){
    webview = webargs.object;
    webview.android.getSettings().setDisplayZoomControls(false);
    webview.android.getSettings().setBuiltInZoomControls(false);
}

exports.onWebViewLoaded = onWebViewLoaded; 
exports.onNavigatingTo = onNavigatingTo;
exports.onDrawerButtonTap = onDrawerButtonTap;
