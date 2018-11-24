const app = require("tns-core-modules/application");
const webViewModule = require("tns-core-modules/ui/web-view");

const SearchViewModel = require("./lists-view-model");

var webview;
var page;

function onNavigatingTo(args) {
    page = args.object;
    page.bindingContext = new SearchViewModel();
    page.bindingContext.set("lists","~/vatican/archive/Lists/lists.html");
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

function onTopTap(){
    page.bindingContext.set("lists","~/vatican/blank.html");
    page.bindingContext.set("isLoading",true);
    page.bindingContext.set("lists","~/vatican/archive/Lists/lists.html#top");
    page.bindingContext.set("isLoading",false);
}

exports.onTopTap = onTopTap; 
exports.onWebViewLoaded = onWebViewLoaded; 
exports.onNavigatingTo = onNavigatingTo;
exports.onDrawerButtonTap = onDrawerButtonTap;

