const app = require("tns-core-modules/application");
const observableModule = require("tns-core-modules/data/observable");
const view = require("tns-core-modules/ui/core/view");
const frameModule = require("tns-core-modules/ui/frame");
const listViewModule = require("tns-core-modules/ui/list-view");
const ReaderViewModel = require("./reader-view-model");
var colorModule = require("tns-core-modules/color");


var page;

function onNavigatingTo(args) {
    page = args.object;
    console.log(page.navigationContext);
    var bookName = page.navigationContext.bookName;
    var chapter = page.navigationContext.chapter;
    var bibleBook = {title:"", verses:[] };

    var bookData = new ReaderViewModel(
        bookName, 
        function(data){
            bibleBook.verses = []; 
            var verses = data.chapters[chapter - 1];
            var i = 0; 
            verses.forEach(element=>{
                bibleBook.verses.push({number:i+1, text:element.replace('&#x27;','\''), scale:1}); 
                i +=1;   
            });
            bibleBook.title = bookName + ' :' + chapter;
            
            page.bindingContext = new observableModule.fromObject(bibleBook);
        }, function(err){
            console.log(err.message);    
        });
    
    
}

function onDrawerButtonTap(args) {
    const sideDrawer = app.getRootView();
    sideDrawer.showDrawer();
}

function onItemTap(args){
    var i = args.index;
    var books = page.bindingContext.books;
    if(books[i].visible == "visible") {
        books[i].visible = "collapse";
    } else {
        collapseAll();
        books[i].visible = "visible";
        
    }
    var bookView = view.getViewById("lstViewMain");
    if(bookView){
        args.object.refresh();
    }
    
}
function sizeUp(args){
    var viewModel = page.bindingContext;
    viewModel.verses.forEach(elem=>{
        elem.increase +=2;
    }); 
    var repeater = view.getViewById(page,"rptVerses");
    repeater.refresh(); 
    console.log(viewModel.increase);
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
        viewModel.verses.forEach(elem=>{
            elem.scale = scale;
        }); 
        var repeater = view.getViewById(page,"rptVerses");
        repeater.refresh(); 
    }
    
}
exports.onPinch = onPinch;
exports.sizeUp = sizeUp;
exports.onNavigatingTo = onNavigatingTo;
exports.onDrawerButtonTap = onDrawerButtonTap;