const observableModule = require("tns-core-modules/data/observable");
const SelectedPageService = require("../shared/selected-page-service");
const Sqlite = require( "nativescript-sqlite" );

function BibleViewModel() {
    SelectedPageService.getInstance().updateSelectedPage("Bible");

    const viewModel = observableModule.fromObject({
        title:"Douay-Rheims Bible",
        otcategories:[],
        ntcategories:[],
        allbooks:[],
        notes:[]
    });

    if(Sqlite.exists("bible.db")) {
        new Sqlite("bible.db", function(err, database){
            database.resultType(Sqlite.RESULTSASOBJECT); 
            var sql2 = "Select CategoryID, Name from Section";    
            database.all(sql2,[],function(err,drow){
                console.log(drow);
                if(!err){
                    drow.forEach(rw=>{
                        console.log(rw);
                        var category = {
                            categoryId:rw.CategoryID,
                            name: rw.Name,
                            note:'',
                            books:[],
                            show:'collapsed'
                        };
                        if(category.categoryId <= 5) {
                           viewModel.otcategories.push(category);     
                        } else {
                            viewModel.ntcategories.push(category);     
                        }
                    });
                    if(Sqlite.exists("bible.db")) {
                        new Sqlite("bible.db", function(err, db1){
                            db1.resultType(Sqlite.RESULTSASOBJECT); 
                            var sql1 = "Select * from Note where CTBV = ?";    
                            db1.all(sql1,[1],function(err,drow){
                                console.log(drow);
                                if(!err){
                                    drow.forEach(rw=>{
                                        console.log(rw);
                                        var note = {
                                            CTBV:rw.CTBV,
                                            CTBVID: rw.CTBVID,
                                            Note:rw.Note.trim()
                                        };
                                        viewModel.notes.push(note);     
                                    });
                                    console.log(viewModel.notes);
                                     
                                } else {
                                    console.log(err);
                                }
                            });
                            viewModel.otcategories.forEach(function(x){
                                var a = viewModel.notes.filter(function(nt){
                                    return nt.CTBVID == x.categoryId;
                                });
                                x.note = a[0].Note;
                            });
                            viewModel.ntcategories.forEach(function(x){
                                var c = viewModel.notes.filter(function(nt){
                                    return nt.CTBVID == x.categoryId;
                                });
                                x.note = c[0].Note;
                            }); 
                                           
                        });
                    } 
                    
                   
                     
                } else {
                    console.log(err);
                }
            });
                           
            });
         
    } 

    
    

    if(Sqlite.exists("bible.db")) {
        new Sqlite("bible.db", function(err, db){
            db.resultType(Sqlite.RESULTSASOBJECT); 
            var sql = `select a.BookID, a.SortOrderID,a.CategoryID, a.TestamentID, a.Name, a.Abbr, 
                            max(b.ChapterID) as ChapterCount 
                         from book a, verse b 
                         where b.BookID = a.BookID 
                         Group by a.BookID, a.TestamentID,a.Name,a.Abbr, a.SortOrderID , a.CategoryID 
                         Order by a.SortOrderID`;
               
            
            
            db.all(sql,[],function(err,row){
                    if(!err){
                        row.forEach(res=>{
                            var bk = {
                                BookID:res.BookID,
                                categoryId: res.CategoryID,
                                TestamentID:res.TestamentID,
                                Name:res.Name,
                                Abbr:res.Abbr,
                                chapters:[],
                                scale:"1",
                                visible:"collapsed",
                                ChapterCount:res.ChapterCount
                            };
                            
                            viewModel.allbooks.push(bk); 
                            
                            
                            
                        });    
                        viewModel.otcategories.forEach(function(x){
                            x.books = viewModel.allbooks.filter(function(b){
                                return b.categoryId == x.categoryId;
                            });
                        });
                        viewModel.ntcategories.forEach(function(x){
                            x.books = viewModel.allbooks.filter(function(b){
                                return b.categoryId == x.categoryId;
                            });
                        });    

                        console.log(viewModel.otcategories);
                    } else {
                        console.log(err);
                    }

                });

               
            });
         
    } 
    
    
    
      
      
    return viewModel;
}

module.exports = BibleViewModel;


