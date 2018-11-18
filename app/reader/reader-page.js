const app = require("tns-core-modules/application");
const observableModule = require("tns-core-modules/data/observable");
const view = require("tns-core-modules/ui/core/view");
const frameModule = require("tns-core-modules/ui/frame");
const listViewModule = require("tns-core-modules/ui/list-view");
const ReaderViewModel = require("./reader-view-model");
var colorModule = require("tns-core-modules/color");
var selectedHighlight = "highlight1";

var page;

function onNavigatingTo(args) {
    page = args.object;
    var bookName = page.navigationContext.bookName;
    var filename = page.navigationContext.filename;
    var chapter = page.navigationContext.chapter;
    var bibleBook = {title:"", verses:[] };

    var bookData = new ReaderViewModel(
        filename, 
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

function onLongPress(args) {
    if(args.view.get("class").indexOf('highlight') != -1){
        args.view.set("class",args.view.get("class").replace('highlight1','').
            replace('highlight2','').replace('highlight3','').replace('highlight4',''));
    } else {
        args.view.set("class",args.view.get("class") + ' ' + selectedHighlight);
    }
        
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
function selectHighlight(args) {
    selectedHighlight = args.object.get("class");
}
exports.selectHighlight = selectHighlight;
exports.onPinch = onPinch;
exports.onLongPress = onLongPress;
exports.onNavigatingTo = onNavigatingTo;
exports.onDrawerButtonTap = onDrawerButtonTap;