const app = require("tns-core-modules/application");
const webViewModule = require("tns-core-modules/ui/web-view");
const FeaturedViewModel = require("./prayers-view-model");

var page;
var webview;
function onNavigatingTo(args) {
    page = args.object;
    page.bindingContext = new FeaturedViewModel();
    page.bindingContext.set("prayers","~/vatican/archive/Lists/prayers.html");
    page.bindingContext.set("isLoading",false);
}

function onDrawerButtonTap(args) {
    const sideDrawer = app.getRootView();
    sideDrawer.showDrawer();
}

function onWebViewLoaded(webargs){
    webview = webargs.object;
    console.log("onWebViewLoaded - completed");
        webview.android.getSettings().setDisplayZoomControls(false);
        webview.android.getSettings().setBuiltInZoomControls(false);
}

function onTopTap(){
    page.bindingContext.set("prayers","~/vatican/blank.html");
    page.bindingContext.set("isLoading",true);
    page.bindingContext.set("prayers","~/vatican/archive/Lists/prayers.html#top");
    page.bindingContext.set("isLoading",false);
}

exports.onTopTap = onTopTap; 
exports.onWebViewLoaded = onWebViewLoaded; 

exports.onNavigatingTo = onNavigatingTo;
exports.onDrawerButtonTap = onDrawerButtonTap;
