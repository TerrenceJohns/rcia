const app = require("tns-core-modules/application");
const ActivityIndicator = require("tns-core-modules/ui/activity-indicator").ActivityIndicator;
const observableModule = require("tns-core-modules/data/observable");
const view = require("tns-core-modules/ui/core/view");
const frameModule = require("tns-core-modules/ui/frame");
const listViewModule = require("tns-core-modules/ui/list-view");
const repeaterModule = require("tns-core-modules/ui/repeater");

const BibleViewModel = require("./bible-view-model");
var colorModule = require("tns-core-modules/color");


var page;
var selectedBook = false;
var BookID = 0;  

function onNavigatingTo(args) {
    page = args.object;
    const indicator = page.getViewById("myIndicator");
    indicator.busy = true;
    
    if(!page.bindingContext){
        var bc  = new BibleViewModel();
        bc.scale = 1;
        bc.isLoading = false;
        page.bindingContext = bc;
        
    } 

}

function onDrawerButtonTap(args) {
    const sideDrawer = app.getRootView();
    sideDrawer.showDrawer();
}

function onItemTap(args) {
    var testamentID = args.view.bindingContext.TestamentID; 
    selectedBook = false;
    fl = false;
    var i = args.index;
    var books = testamentID==1 ? page.bindingContext.otbooks : page.bindingContext.ntbooks;
    console.log(books[i]);
    if (books[i].visible == "visible") {
        books[i].visible = "collapse";
    } else {
        //collapseAll();
        
        if(books[i].chapters.length == 0 ) {
            for (z = 1; z < books[i].ChapterCount + 1; z++) { 
                books[i].chapters.push(z);
            } 
        }
        console.log(books[i]);
        books[i].visible = "visible";
        selectedBook = books[i].Name;
        BookID = books[i].BookID;
        
    }
    var bookView = testamentID==1 ? view.getViewById("lstOTBooks"):view.getViewById("lstNTBooks");
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

function navigate(bookid, chapterid) {

    frameModule.topmost().navigate({
        moduleName: "reader/reader-page",
        context: { BookID:bookid, ChapterID:chapterid},
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
    navigate(BookID,index);

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