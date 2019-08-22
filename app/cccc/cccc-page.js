const app = require("tns-core-modules/application");
const webViewModule = require("tns-core-modules/ui/web-view");
const view = require("tns-core-modules/ui/core/view");
const ActivityIndicator = require("tns-core-modules/ui/activity-indicator").ActivityIndicator;

const BrowseViewModel = require("./cccc-view-model");

var webview;
var page;

function onNavigatingTo(args) {
    page = args.object;
    page.bindingContext = new BrowseViewModel();
    
    
    if(page.navigationContext){
        var anc = page.navigationContext.anchor; 
        if(anc){
            page.bindingContext.set("ccc","~/vatican/archive/compendium_ccc/documents/archive_2005_compendium-ccc_en.html#" + anc );
        } else {
            page.bindingContext.set("ccc","~/vatican/archive/compendium_ccc/documents/archive_2005_compendium-ccc_en.html");
        }
    } else {
        page.bindingContext.set("ccc","~/vatican/archive/compendium_ccc/documents/archive_2005_compendium-ccc_en.html");
    }
    
    page.bindingContext.set("isLoading",false); 
    
}

function onDrawerButtonTap(args) {
    const sideDrawer = app.getRootView();
    sideDrawer.showDrawer();
}
function onWebViewLoaded(webargs){
    webview = webargs.object;
    webview.android.getSettings().setUseWideViewPort(false);
    webview.android.setHorizontalScrollBarEnabled(false);
    webview.android.getSettings().setLoadWithOverviewMode(true);
    webview.android.getSettings().setDisplayZoomControls(false);
    webview.android.getSettings().setBuiltInZoomControls(true);
    
}

function onTopTap(){
    var cccc = page.bindingContext.get("ccc"); 
    page.bindingContext.set("ccc","~/vatican/blank.html");
    page.bindingContext.set("isLoading",true);
    page.bindingContext.set("ccc",cccc);
    page.bindingContext.set("isLoading",false);
    
}

exports.onTopTap = onTopTap; 
exports.onWebViewLoaded = onWebViewLoaded; 
exports.onWebViewLoaded = onWebViewLoaded;
exports.onNavigatingTo = onNavigatingTo;
exports.onDrawerButtonTap = onDrawerButtonTap;
