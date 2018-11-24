const observableModule = require("tns-core-modules/data/observable");
const Sqlite = require( "nativescript-sqlite" );
const SelectedPageService = require("../shared/selected-page-service");

function HomeViewModel() {
    SelectedPageService.getInstance().updateSelectedPage("Home");
    if(!Sqlite.exists("bible.db")) {
        Sqlite.copyDatabase("bible.db");
        new Sqlite("bible.db",function(err, db){
            var sql = `CREATE INDEX indx_CrossReference ON CrossReference (
                SourceBookID,
                SourceChapterID,
                SourceVerseNumber
            );`
            db.execSQL(sql);
        });
    } 
    

    const viewModel = observableModule.fromObject({
        source:'~/vatican/archive/About/home.html',
        isLoading : false
    });

   

    return viewModel;
}

module.exports = HomeViewModel;
