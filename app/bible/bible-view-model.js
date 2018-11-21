const observableModule = require("tns-core-modules/data/observable");
const SelectedPageService = require("../shared/selected-page-service");
const Sqlite = require( "nativescript-sqlite" );

function BibleViewModel() {
    SelectedPageService.getInstance().updateSelectedPage("Bible");

    const viewModel = observableModule.fromObject({
        title:"Douay-Rheims Bible",
        otbooks:[],
        ntbooks:[]
    });

    if(Sqlite.exists("bible.db")) {
        new Sqlite("bible.db", function(err, db){
            db.resultType(Sqlite.RESULTSASOBJECT); 
            var sql = "Select * from vwbook";
                db.all(sql,[],function(err,row){
                    if(!err){
                        row.forEach(res=>{
                            var bk = {
                                BookID:res.BookID,
                                TestamentID:res.TestamentID,
                                Name:res.Name,
                                Abbr:res.Abbr,
                                chapters:[],
                                scale:"1",
                                visible:"collapsed",
                                ChapterCount:res.ChapterCount
                            };
                            
                            
                            
                            if(bk.TestamentID==1){
                                viewModel.otbooks.push(bk);     
                            } else {
                                viewModel.ntbooks.push(bk);
                            }
                            
                        });    

                    } else {
                        console.log(err);
                    }
                });
            });    
    } 
    
    
    
      
      
    return viewModel;
}

module.exports = BibleViewModel;


