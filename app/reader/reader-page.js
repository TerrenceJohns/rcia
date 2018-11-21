const app = require("tns-core-modules/application");
const observableModule = require("tns-core-modules/data/observable");
const view = require("tns-core-modules/ui/core/view");
const ReaderViewModel = require("./reader-view-model");
var colorModule = require("tns-core-modules/color");
const fs = require("file-system");
const socialShareModule = require("nativescript-social-share");


var page;
var bookName;
var chapter;
var highlights = [];
var selectedHighlight = "highlight1";


function onNavigatingTo(args) {
    page = args.object;
    BookID = page.navigationContext.BookID;
    ChapterID = page.navigationContext.ChapterID;
    var bibleBook = {title:"", verses:[] };

    var bookData = new ReaderViewModel(BookID,ChapterID);
    page.bindingContext = bookData;
    
    
}

function onDrawerButtonTap(args) {
    const sideDrawer = app.getRootView();
    sideDrawer.showDrawer();
}

function getIndexOfHighlight(hl){
    var i = -1;
    var x = 0;
    highlights.forEach(elem=>{
        if(elem.book == hl.book && elem.chapter == hl.chapter && elem.verse == hl.verse ) {
          i = x;      
        }
        x += 1;
    });
    return i;
}

function onDoubleTap(args) {
    var verse = args.view.bindingContext.VerseNumber;
    var obVerse = args.view.bindingContext;
    if(obVerse.verseHighlight != '') {
        obVerse.verseHighlight = '';
    }    else {
        obVerse.verseHighlight = selectedHighlight;
    }
    
    var repeater = view.getViewById(page,"rptVerses");
    repeater.refresh();
    
}

 function saveHighlights(filename){
    var documents = fs.knownFolders.currentApp();
    var file = documents.getFile('store/' + filename);
    var highlightString = JSON.stringify(highlights);
    file.writeText(highlightString)
        .then((result) => {
            file.readText()
                .then((res) => {
                    console.log("saved");
                });
        }).catch((err) => {
            console.log("Your highlights were not saved");
        });
 }       
function onLongPress(args){
    var selectedVerses = page.bindingContext.verses.filter(elem=>{
        return elem.verseHighlight != '';
    }); 
    console.log(selectedVerses);

    var shareString = bookName + ' ' + chapter + '\n'; 
    selectedVerses.forEach(vs=>{
        shareString = shareString + vs.number + '. ' + vs.text + '\n'; 
    });
     
    socialShareModule.shareText(shareString,"How would you like to share this passage?");
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
    if (selectedHighlight != args.object.get("class")){
        selectedHighlight = args.object.get("class");
    } 
    
    
}

exports.onDoubleTap = onDoubleTap; 
exports.selectHighlight = selectHighlight;
exports.onPinch = onPinch;
exports.onLongPress = onLongPress;
exports.onNavigatingTo = onNavigatingTo;
exports.onDrawerButtonTap = onDrawerButtonTap;