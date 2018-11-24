const app = require("tns-core-modules/application");
const view = require("tns-core-modules/ui/core/view");
const webViewModule = require("tns-core-modules/ui/web-view");
const HomeViewModel = require("./home-view-model");


var webview;
var page;

function onNavigatingTo(args) {
    page = args.object;
    page.bindingContext = new HomeViewModel();
}

function onDrawerButtonTap(args) {
    const sideDrawer = app.getRootView();
    sideDrawer.showDrawer();
}


function onWebViewLoaded(webargs){
    webview = webargs.object;
    webview.android.getSettings().setDisplayZoomControls(false);
    webview.android.getSettings().setBuiltInZoomControls(false);
    webview.android.getSettings().setUseWideViewPort(false);
    webview.android.setHorizontalScrollBarEnabled(false);
    webview.android.getSettings().setLoadWithOverviewMode(true);
    
    
}




exports.onNavigatingTo = onNavigatingTo;
exports.onDrawerButtonTap = onDrawerButtonTap;
