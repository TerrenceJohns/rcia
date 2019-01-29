const app = require("tns-core-modules/application");
const view = require("tns-core-modules/ui/core/view");
const frameModule = require("tns-core-modules/ui/frame");
const ChaptersViewModel = require("./chapters-view-model.js");



var page;
var bookId;
function onNavigatingTo(args) {
    page = args.object;
    var navContext = page.navigationContext;
    bookId = navContext.bookId;
    page.bindingContext = new ChaptersViewModel(navContext.bookId, navContext.bookName,navContext.numberChapters);
}

function goBack(args) {
    page.frame.goBack();
}
function onChapterTap(args) {
    var chapter = args.object.bindingContext;
    console.log(chapter);
    frameModule.topmost().navigate({
        moduleName: "reader/reader-page",
        context: { BookID:bookId, ChapterID:chapter.chapter},
        transition: {
            name: "fade"
        }
    });
}

function showInfo(args) {
    if(args.object.bindingContext.show == 'collapsed') {
        page.bindingContext.set('show', 'visible') ;
    } else {
        page.bindingContext.set('show','collapsed') ;
    }
}

exports.onNavigatingTo = onNavigatingTo;
exports.goBack = goBack;
exports.onChapterTap = onChapterTap;
exports.showInfo = showInfo;
