const observableModule = require("tns-core-modules/data/observable");
const Sqlite = require( "nativescript-sqlite" );

function ChaptersViewModel(bookId, bookName,numberChapters) {
    console.log(bookName);
    const viewModel = observableModule.fromObject({
       title:bookName,
       show:'collapsed',
       note:'',
       chapters:[]
    });

    if(Sqlite.exists("bible.db")) {
        new Sqlite("bible.db", function(err, db){
            db.resultType(Sqlite.RESULTSASOBJECT); 
            var sql = "Select * from Note where CTBV = ? and CTBVID = ?";    
            db.all(sql,[2, bookId],function(err,row){
                if(!err){
                    row.forEach(rw=>{
                        viewModel.note = rw.Note;                            
                    });
                    console.log(viewModel.note);                     
                } else {
                    console.log(err);
                }
            });
                                       
        });
    }


    for (let index = 0; index < numberChapters; index++) {
        viewModel.chapters.push({chapter:index + 1});
    }

    return viewModel;
}

module.exports = ChaptersViewModel;
