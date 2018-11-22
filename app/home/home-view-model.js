const observableModule = require("tns-core-modules/data/observable");
const Sqlite = require( "nativescript-sqlite" );
const SelectedPageService = require("../shared/selected-page-service");

function HomeViewModel() {
    SelectedPageService.getInstance().updateSelectedPage("Home");
    Sqlite.copyDatabase("bible.db");
    if(!Sqlite.exists("bible.db")) {
        Sqlite.copyDatabase("bible.db");
    } 
    new Sqlite("bible.db",function(err, db){
        var sql = `CREATE INDEX indx_CrossReference ON CrossReference (
            SourceBookID,
            SourceChapterID,
            SourceVerseNumber
        );`
        db.execSQL(sql);
    });

    const viewModel = observableModule.fromObject({
        welcomeMessage1:"Compendium of the",
        welcomeMessage2:"Catechism of the Catholic Church",
        header:"Contents",
        contents:[
            {
                pre:"Part One",
                title:"The Profession of Faith",
                anchor:"Part 1",
                visible:"collapsed",
                chapters:[
                   {   
                       indent:20,
                       pre:"Section one",
                       subtitle:"I Believe, We Believe",
                       anchor:"Section1" 
                   },
                   {
                        indent:35,
                        pre:"Chapter 1",
                        subtitle:"Man's Capacity for God",
                        anchor:"Mans Capacity for God" 
                    },
                    {
                        indent:35,
                        pre:"Chapter 2",
                        subtitle:"God Comes to Meet Man",
                        anchor:"God Comes to Meet Man" 
                    },
                    {
                        indent:35,
                        pre:"Chapter 3",
                        subtitle:"Man's Response to God",
                        anchor:"Mans Response to God" 
                    },
                    {
                        indent:20,
                        pre:"Section 2",
                        subtitle:"The Profession of the Christian Faith - The Creed",
                        anchor:"The Profession of the Christian Faith" 
                    },
                    {
                        indent:35,
                        pre:"Chapter 1",
                        subtitle:"I Believe in God the Father",
                        anchor:"I Believe in God the Father"     
                    },
                    {
                        indent:35,
                        pre:"Chapter 2",
                        subtitle:"I Believe in Jesus Christ,the Only Son of God",
                        anchor:"I Believe in Jesus Christ, the Only Son of God" 
                    },
                    {
                        indent:35,
                        pre:"Chapter 3",
                        subtitle:"I Believe in the Holy Spirit",
                        anchor:"I Believe in the Holy Spirit" 
                    }

                ]
            },
            {
                pre:"Part two",
                title:"The celebration of the Christian Mystery",
                anchor:"Part 2",
                visible:"collapsed",
                chapters:[
                    {
                        indent:20,
                        pre:"Section One",
                        subtitle:"The Sacramental Economy",
                        anchor:"The Sacramental Economy" 
                    },
                    {
                        indent:35,
                         pre:"Chapter 1",
                         subtitle:"The Paschal Mystery in the Age of the Church",
                         anchor:"The Paschal Mystery in the Age of the Church" 
                     },
                     {
                        indent:35,
                         pre:"Chapter 2",
                         subtitle:"The Sacramental Celebration of the Paschal Mystery",
                         anchor:"The Sacramental Celebration of the Paschal Mystery" 
                     },
                     {
                        indent:20,
                         pre:"section Two",
                         subtitle:"The Seven Sacraments of the Church",
                         anchor:"The Seven Sacraments of the Church" 
                     },
                     {
                        indent:35,
                         pre:"Chapter 1",
                         subtitle:"The Sacraments of Christian Initiation",
                         anchor:"The sacraments of Christian initiation" 
                     },
                     {
                        indent:35,
                         pre:"Chapter 2",
                         subtitle:"The Sacraments of Healing",
                         anchor:"The Sacraments of Healing" 
                     },
                     {
                        indent:35,
                         pre:"Chapter 3",
                         subtitle:"The Sacraments at the Service of Communion and Mission",
                         anchor:"The Sacraments at the Service of Communion and Mission" 
                     },
                     {
                        indent:35,
                         pre:"Chapter 4",
                         subtitle:"Other Liturgical Celebrations",
                         anchor:"Other Liturgical Celebrations" 
                     }              

                 ]
            },
            {
                pre:"Part three",
                title:"Life is Christ",
                anchor:"Part 3",
                visible:"collapsed",
                chapters:[
                    {
                        indent:20,
                        pre:"Section One",
                        subtitle:"Mans Vocation: Life in the Spirit",
                        anchor:"Mans Vocation: Life in the Spirit" 
                    },
                    {
                        indent:35,
                        pre:"Chapter 1",
                        subtitle:"The Dignity of the Human Person",
                        anchor:"The Dignity of the Human Person" 
                     },
                     {
                        indent:35,
                        pre:"Chapter 2",
                        subtitle:"The Human Community",
                        anchor:"The Human Community" 
                     },
                     {
                        indent:35,
                        pre:"Chapter 3",
                        subtitle:"Gods Salvation: Law and Grace",
                        anchor:"Gods Salvation: Law and Grace" 
                     },
                     
                     {
                        indent:20,
                        pre:"Section Two",
                        subtitle:"The Ten Commandments",
                        anchor:"The Ten Commandments" 
                    },
                    {
                        indent:35,
                        pre:"Chapter 1",
                        subtitle:"You Shall Love the Lord Your God  With All Your Heart, With All Your Soul,  and With All Your Mind",
                        anchor:'"You Shall Love the Lord Your God  With All Your Heart, With All Your Soul,  and With All Your Mind""' 
                     },
                     {
                        indent:35,
                        pre:"Chapter 2",
                        subtitle:"You Shall Love Your Neighbour as Yourself",
                        anchor:'"You Shall Love Your Neighbour as Yourself"' 
                     },
                     {
                        indent:35,
                        pre:"Chapter 3",
                        subtitle:"Gods Salvation: Law and Grace",
                        anchor:"Gods Salvation: Law and Grace" 
                     }  
                 ]
            },
            {
                pre:"Part Four",
                title:"Christian Prayer",
                anchor:"Part 4",
                visible:"collapsed",
                chapters:[
                    {
                        indent:20,
                        pre:"Section One",
                        subtitle:"Prayer in the Christian Life",
                        anchor:"Prayer in the Christian Life" 
                    },
                    {
                        indent:35,
                         pre:"Chapter 1",
                         subtitle:"The Revelation of Prayer",
                         anchor:"The Revelation of Prayer" 
                     },
                     {
                        indent:35,
                         pre:"Chapter 2",
                         subtitle:"The Tradition of Prayer",
                         anchor:"The Tradition of Prayer" 
                     },
                     {
                        indent:35,
                         pre:"Chapter 3",
                         subtitle:"The Life of Prayer",
                         anchor:"The Life of Prayer" 
                     },
                     {
                        indent:20,
                        pre:"Section Two",
                        subtitle:"The Lord's Prayer: \"Our Father\"",
                        anchor:"The Lords Prayer" 
                    },      
                 ]
            },
            {
                pre: "Appendix A",
                title:"Common Prayers",
                anchor:"A) COMMON PRAYERS",
                visible:"collapsed",
                chapters:[]
            },
            {
                pre: "Appendix B",
                title:"Formulas of Catholic Doctrine",
                anchor:"B) FORMULAS OF CATHOLIC DOCTRINE",
                visible:"collapsed",
                chapters:[]
            },



            

        ]
    });

    return viewModel;
}

module.exports = HomeViewModel;
