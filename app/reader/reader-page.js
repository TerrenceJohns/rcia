const app = require("tns-core-modules/application");
const observableModule = require("tns-core-modules/data/observable");
const view = require("tns-core-modules/ui/core/view");
const ReaderViewModel = require("./reader-view-model");
var colorModule = require("tns-core-modules/color");
const fs = require("file-system");
const socialShareModule = require("nativescript-social-share");
var gestures = require("tns-core-modules/ui/gestures");
const Sqlite = require( "nativescript-sqlite" );
const ActivityIndicator = require("tns-core-modules/ui/activity-indicator").ActivityIndicator;


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
    bookData.verses.forEach(verse =>{
        var vn = verse.VerseNumber;
        verse.crossreferences = bookData.crossreferences.filter(cr => cr.SourceVerseNumber == vn);
        console.dir(verse.crossreferences);
    });
   console.dir(bookData.verses);   
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
                    var a = 'saved';
                });
        }).catch((err) => {
            console.log("Your highlights were not saved");
        });
 }       
function onLongPress(args){
    var vs = args.view.bindingContext;
    if (vs.crossreferences.length == 0 ) {
    getRefs(vs.BookID, vs.ChapterID, vs.VerseNumber, 
        function(data){
            vs.crossreferences = data;
            view.getViewById(page,"rptVerses").refresh();
        }, 
        function(err){
            console.log(err);   
        });
    } else {
        vs.crossreferences = [];
        view.getViewById(page,"rptVerses").refresh();
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
    if (selectedHighlight != args.object.get("class")){
        selectedHighlight = args.object.get("class");
    } 
    
    
}


function getRefs(bookid, chapterid, versenumber, success, failure) {
    if(Sqlite.exists("bible.db")) {
        new Sqlite("bible.db", function(err,db){
            db.resultType(Sqlite.RESULTSASOBJECT); 
            var sql1 = "select a.SourceVerseNumber,a.Vote, " +
                "c.Name, a.TargetChapterID, a.TargetVerseNumber, " + 
                "b.VerseText , 1 as scale from CrossReference a, Verse b, Book c " +
            "where a.TargetBookID = b.BookID and " +
                "a.TargetChapterID = b.ChapterID and " +
                "a.TargetVerseNumber = b.VerseNumber and " +
                "a.TargetBookID = c.BookID and " + 
                 "a.SourceBookID = "+ bookid + " and " +
                "a.SourceChapterID = " + chapterid + " and " + "a.SourceVerseNumber = " + versenumber + " " + 
            "Order by a.Vote DESC limit 5";
            
            var result = [];
            db.resultType(Sqlite.RESULTSASOBJECT);     
            db.all(sql1,function(err1,row1){
                if(!err1) {
                    row1.forEach(fld=>{
                        result.push(fld);  
                    });
                    return success(result);
                } else {
                    console.log(err1)
                    return failure(err1) ;
                }    
            });      
        });
    } 
}
function verseSwiped(args) {
    var selectedVerses = page.bindingContext.verses.filter(elem=>{
        return elem.verseHighlight != '';
    }); 

    var shareString = bookName + ' ' + chapter + '\n'; 
    selectedVerses.forEach(vs=>{
        shareString = shareString + vs.number + '. ' + vs.text + '\n'; 
    });
     
    socialShareModule.shareText(shareString,"How would you like to share this passage?");
}
exports.verseSwiped = verseSwiped;
exports.onDoubleTap = onDoubleTap; 
exports.selectHighlight = selectHighlight;
exports.onPinch = onPinch;
exports.onLongPress = onLongPress;
exports.onNavigatingTo = onNavigatingTo;
exports.onDrawerButtonTap = onDrawerButtonTap;