const app = require("tns-core-modules/application");
const view = require("tns-core-modules/ui/core/view");
const frameModule = require("tns-core-modules/ui/frame");
const HomeViewModel = require("./home-view-model");
const listViewModule = require("tns-core-modules/ui/list-view");
const repeaterModule = require("tns-core-modules/ui/repeater");
var colorModule = require("tns-core-modules/color");

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

function onItemTap(args) {
    var i = args.index;
    var list = page.bindingContext.contents;
    if(list[i].visible == "visible") {
        list[i].visible = "collapse";
    } else {
        collapseAll();
        list[i].visible = "visible";
        
    }
    var listView = view.getViewById("lstViewMain");
    if(listView){
        args.object.refresh();
    }
    if(list[i].chapters.length == 0) {
        navigate(list[i].anchor);
    }
}

function collapseAll(){
    var lst = page.bindingContext.contents;
    lst.forEach(el => {
        el.visible = "collapsed";
    });
}

function navigate(anc){
   
    frameModule.topmost().navigate({
        moduleName: "cccc/cccc-page",
        context:{anchor:anc},
        transition: {
            name: "fade"
        
        }
    });

}
function rptItemTap(args) {
    var item = args.view.bindingContext;
    args.view.animate({
        backgroundColor: new colorModule.Color("#7FB3D5"),
        opacity:20,
        duration:500
    });
    navigate(item.anchor);
    
}


exports.rptItemTap = rptItemTap;
exports.onItemTap = onItemTap;
exports.onNavigatingTo = onNavigatingTo;
exports.onDrawerButtonTap = onDrawerButtonTap;
