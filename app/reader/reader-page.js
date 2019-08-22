const app = require("tns-core-modules/application");
const observableModule = require("tns-core-modules/data/observable");
const view = require("tns-core-modules/ui/core/view");
const ReaderViewModel = require("./reader-view-model");
const socialShareModule = require("nativescript-social-share");
var gestures = require("tns-core-modules/ui/gestures");
const Sqlite = require( "nativescript-sqlite" );



var showedHelp = false;
var page;
var bookName;
var chapter;
var highlights = [];
var selectedHighlight = "highlight1";


function onNavigatingTo(args) {
    page = args.object;
    console.log(page.navigationContext);
    BookID = page.navigationContext.BookID;
    ChapterID = page.navigationContext.ChapterID;
    var bibleBook = {title:"", verses:[] };
    var bookData = new ReaderViewModel(BookID,ChapterID);
    bookData.verses.forEach(verse =>{
        var vn = verse.VerseNumber;
        verse.crossreferences = bookData.crossreferences.filter(cr => cr.SourceVerseNumber == vn);
    });
         
    page.bindingContext = bookData;
    if (!showedHelp){
        const alertOptions = {
            title: "INFO",
            message: `'PRESS': View cross references.\n\n'TAP': Select or highlight verse.\n\n'SWIPE': Share\n`,
            okButtonText: "Got it",
            cancelable: false // [Android only] Gets or sets if the dialog can be canceled by taping outside of the dialog.
        };
        alert(alertOptions).then(() => {
            showedHelp = true;
        });
    
    }
        // var toast = Toast.makeText("TAP verse to highlight\n PRESS verse (2 sec) to view cross references", "long");
    // toast.show();
}

function navigatedTo(args) {
    
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

 
 function onItemTap(args){
    if(args.view.bindingContext.verseHighlight==''){
        args.view.bindingContext.verseHighlight = selectedHighlight;
    } else {
        args.view.bindingContext.verseHighlight='';
    }
    var repeater = view.getViewById(page,"rptVerses");
    repeater.refresh(); 
    
} 
function onLongPress(args){
    var vs = args.view.bindingContext;
    if (vs.crossreferences.length == 0 ) {
        getRefs(vs.BookID, vs.ChapterID, vs.VerseNumber, 
            function(data){
                vs.crossreferences = data;
                //view.getViewById(page,"rptVerses").refresh();
            }, 
            function(err){
                console.log(err);   
            });
    }
    args.view.bindingContext.showCrossRefs = !args.view.bindingContext.showCrossRefs;
    view.getViewById(page,"rptVerses").refresh(); 
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
            "Order by a.Vote DESC limit 3";
            
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
    if(selectedVerses.length != 0  ) {
        var shareString = page.bindingContext.title + '\n'  
        selectedVerses.forEach(vs=>{
            shareString = shareString + vs.VerseNumber + '. ' + vs.VerseText + '\n'; 
        });
     
        socialShareModule.shareText(shareString,"How would you like to share this passage?");
    } else {
        const alertOptions = {
            title: "Select verses to share",
            message: "Select verses to share by tapping each verse",
            okButtonText: "Got it",
            cancelable: false // [Android only] Gets or sets if the dialog can be canceled by taping outside of the dialog.
        };
        alert(alertOptions).then(() => {
            var i = 0;
        });

    }

    
}

function goBack(args) {
    page.frame.goBack();
}

exports.goBack = goBack;
exports.navigatedTo = navigatedTo;
exports.verseSwiped = verseSwiped;
exports.onItemTap = onItemTap; 
exports.selectHighlight = selectHighlight;
exports.onPinch = onPinch;
exports.onLongPress = onLongPress;
exports.onNavigatingTo = onNavigatingTo;
exports.onDrawerButtonTap = onDrawerButtonTap;