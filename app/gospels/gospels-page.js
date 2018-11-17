const app = require("tns-core-modules/application");
const view = require("tns-core-modules/ui/core/view");
const frameModule = require("tns-core-modules/ui/frame");
const listViewModule = require("tns-core-modules/ui/list-view");
const repeaterModule = require("tns-core-modules/ui/repeater");


const GospelsViewModel = require("./gospels-view-model");
var colorModule = require("tns-core-modules/color");


var page;
var selectedBook = false;

function onNavigatingTo(args) {
    page = args.object;
    var bc  = new GospelsViewModel();
    bc.scale = 1;
    page.bindingContext = bc;

}

function onDrawerButtonTap(args) {
    const sideDrawer = app.getRootView();
    sideDrawer.showDrawer();
}

function onItemTap(args) {
    selectedBook = false;
    var i = args.index;
    var books = page.bindingContext.books;
    if (books[i].visible == "visible") {
        books[i].visible = "collapse";
    } else {
        collapseAll();
        books[i].visible = "visible";
        selectedBook = books[i].name;

    }
    var bookView = view.getViewById("lstViewMain");
    if (bookView) {
        args.object.refresh();
    }

}

function collapseAll() {
    var lst = page.bindingContext.books;
    lst.forEach(el => {
        el.visible = "collapsed";
    });
}

function navigate(bookName, chapter) {

    frameModule.topmost().navigate({
        moduleName: "reader/reader-page",
        context: { bookName: bookName, chapter:chapter },
        transition: {
            name: "fade"

        }
    });

}
function onChapterTap(args) {
    var index = args.view.bindingContext;
    args.view.animate({
        backgroundColor: new colorModule.Color("#7FB3D5"),
        opacity: 20,
        duration: 500
    });
    navigate(selectedBook, index);

}
function onPinch(args) {
    var viewModel = page.bindingContext;
    var scale = args.scale;
    if(args.state==3){
        if (scale < 1){
            scale = Math.max(scale,1);
        } else {
            scale = Math.min(scale,2);
        }
        viewModel.books.forEach(elem=>{
            elem.scale = scale;
        }); 
        args.object.refresh(); 
    }
    
}
exports.onPinch = onPinch;
exports.onChapterTap = onChapterTap;
exports.onItemTap = onItemTap;
exports.onNavigatingTo = onNavigatingTo;
exports.onDrawerButtonTap = onDrawerButtonTap;