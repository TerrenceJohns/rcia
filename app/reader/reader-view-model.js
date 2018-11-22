const observableModule = require("tns-core-modules/data/observable");
const SelectedPageService = require("../shared/selected-page-service");
const Sqlite = require( "nativescript-sqlite" );

var book;

function ReaderViewModel(bookid, chapterid) {
    SelectedPageService.getInstance().updateSelectedPage("Reader");
    const viewModel = observableModule.fromObject({
        title:"Douay-Rheims Bible",
        BookID:bookid,
        crossreferences:[],
        ChapterID:chapterid,
        ChapterNotes:[],
        verses:[],
        highlights:[]
        
        
    });

    if(Sqlite.exists("bible.db")) {
        new Sqlite("bible.db", function(err, db){
            db.resultType(Sqlite.RESULTSASOBJECT); 
            var sql = "select a.*,b.Name from verse a, book b where a.BookID = b.BookID and  a.bookid = ? and a.chapterid = ?  ";
            db.all(sql,[bookid, chapterid],function(err,row){
                if(!err){
                    row.forEach(ob=>{
                        viewModel.title = ob.Name + " " + chapterid;
                        var vrs = {
                            VerseID:ob.VerseID,
                            BookID:ob.BookID,
                            ChapterID:ob.ChapterID,
                            VerseNumber:ob.VerseNumber,
                            VerseText:ob.VerseText,
                            scale:1,
                            verseHighlight:'',
                            crossreferences:[],
                            loading:false
                        };

                        viewModel.verses.push(vrs);
                        
                        
                    }); 
                    
                    

                } else {
                    console.log(err);
                }
            });
                           
        });    
    }

    return viewModel; 


}



module.exports = ReaderViewModel;


