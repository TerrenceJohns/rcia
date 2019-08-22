const app = require("tns-core-modules/application");
const view = require("tns-core-modules/ui/core/view");
const frameModule = require("tns-core-modules/ui/frame");
const listViewModule = require("tns-core-modules/ui/list-view");
const repeaterModule = require("tns-core-modules/ui/repeater");

const BibleViewModel = require("./bible-view-model");


var page;
var selectedBook = false;
var BookID = 0;  

function onNavigatingTo(args) {
    page = args.object;
        
    if(!page.bindingContext){
        var bc  = new BibleViewModel();
        bc.scale = 1;
        page.bindingContext = bc;
        
    } 

}

function onDrawerButtonTap(args) {
    const sideDrawer = app.getRootView();
    sideDrawer.showDrawer();
}

function showInfo(args) {
    console.log(args.object.bindingContext);
    if(args.object.bindingContext.show == 'collapsed') {
        args.object.bindingContext.show = 'visible';
    } else {
        args.object.bindingContext.show = 'collapsed';
    }
    
    var ov = view.getViewById(page,"otListView");
    ov.refresh(); 
    var nv = view.getViewById(page,"ntListView");
    nv.refresh(); 
}

function onTap(args) {
    var bk = args.object.bindingContext;
    frameModule.topmost().navigate({
        moduleName: "chapters/chapters-page",
        context: { bookId:bk.BookID, bookName:bk.Name, numberChapters:bk.ChapterCount},
        transition: {
            name: "fade"
        }
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
exports.onTap = onTap;
exports.onNavigatingTo = onNavigatingTo;
exports.onDrawerButtonTap = onDrawerButtonTap;
exports.showInfo = showInfo;