const observableModule = require("tns-core-modules/data/observable");

const SelectedPageService = require("../shared/selected-page-service");

function GospelsViewModel() {
    SelectedPageService.getInstance().updateSelectedPage("Gospels");

    const viewModel = observableModule.fromObject({
        title: "Gospels",
        scale:1.75,
        books:[
            {
                name:"Matthew",
                abbr:"Mt",
                args:"mathew.json",
                chapters:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,
                    15,16,17,18,19,20,21,22,23,24,25,26,27,28],
                visible : "collapsed",

            },
            {
                name:"Mark",
                abbr:"Mk",
                args:"mark.json",
                chapters:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16],
                visible : "collapsed"
            },
            {
                name:"Luke",
                abbr:"Lk",
                args:"luke.json",
                chapters:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,
                    15,16,17,18,19,20,21,22,23,24],
                visible : "collapsed"
                
            },
            {
                name:"John",
                abbr:"Jo",
                args:"john.json",
                chapters:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,
                    15,16,17,18,19,20,21],
                visible : "collapsed"
            },
            {
                name:"Acts",
                abbr:"ac",
                args:"acts.json",
                chapters:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,
                    15,16,17,18,19,20,21,22,23,24,25,26,27,28],
                visible : "collapsed"
            },
            {
                name:"Romans",
                abbr:"rom",
                args:"romans.json",
                chapters:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,
                    15,16],
                visible : "collapsed"
            },
            {
                name:"1 Corinthians",
                abbr:"1 cor",
                args:"_1_corinthians.json",
                chapters:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16],
                visible : "collapsed"
            },
            {
                name:"2 Corinthians",
                abbr:"2 cor",
                args:"_2_corinthians.json",
                chapters:[1,2,3,4,5,6,7,8,9,10,11,12,13],
                visible : "collapsed"
            },
            {
                name:"Galatians",
                abbr:"gal",
                args:"galatians.json",
                chapters:[1,2,3,4,5,6],
                visible : "collapsed"
            },
            {
                name:"Ephesians",
                abbr:"eph",
                args:"ephesians.json",
                chapters:[1,2,3,4,5,6],
                visible : "collapsed"
            },
            {
                name:"Philippians",
                abbr:"phil",
                args:"philippians.json",
                chapters:[1,2,3,4],
                visible : "collapsed"
            },
            {
                name:"Colossians",
                abbr:"col",
                args:"colossians.json",
                chapters:[1,2,3,4],
                visible : "collapsed"
            },
            {
                name:"1 Thessalonians",
                abbr:"1 thes",
                args:"_1_thessalonians.json",
                chapters:[1,2,3,4,5],
                visible : "collapsed"
            },
            {
                name:"2 Thessalonians",
                abbr:"2 thes",
                args:"_2_thessalonians.json",
                chapters:[1,2,3],
                visible : "collapsed"
            },
            {
                name:"1 Timothy",
                abbr:"1 tm",
                args:"_1_timothy.json",
                chapters:[1,2,3,4,5,6],
                visible : "collapsed"
            },
            {
                name:"2 Timothy",
                abbr:"2 tm",
                args:"_2_timothy.json",
                chapters:[1,2,3,4],
                visible : "collapsed"
            },
            {
                name:"Titus",
                abbr:"ti",
                args:"titus.json",
                chapters:[1,2,3],
                visible : "collapsed"
            },           
            {
                name:"Philemon",
                abbr:"phlm",
                args:"philemon.json",
                chapters:[1],
                visible : "collapsed"
            },
            {
                name:"Hebrews",
                abbr:"heb",
                args:"hebrews.json",
                chapters:[1,2,3,4,5,6,7,8,9,10,11,12,13],
                visible : "collapsed"
            },
            {
                name:"James",
                abbr:"jas",
                args:"james.json",
                chapters:[1,2,3,4,5],
                visible : "collapsed"
            },
            {
                name:"1 Peter",
                abbr:"1 pt",
                args:"_1_peter.json",
                chapters:[1,2,3,4,5],
                visible : "collapsed"
            },
            {
                name:"2 Peter",
                abbr:"2 pt",
                args:"_2_peter.json",
                chapters:[1,2,3],
                visible : "collapsed"
            },
            {
                name:"1 John",
                abbr:"1 jn",
                args:"_1_john.json",
                chapters:[1,2,3,4,5],
                visible : "collapsed"
            },
            {
                name:"2 John",
                abbr:"2 jn",
                args:"_2_john.json",
                chapters:[1],
                visible : "collapsed"
            },
            {
                name:"3 John",
                abbr:"3 jn",
                args:"_3_john.json",
                chapters:[1],
                visible : "collapsed"
            },
            {
                name:"Jude",
                abbr:"jude",
                args:"jude.json",
                chapters:[1],
                visible : "collapsed"
            },
            {
                name:"Revelation",
                abbr:"rev",
                args:"revelation.json",
                chapters:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,
                    15,16,17,18,19,20,21,22],
                visible : "collapsed"
            }
        ]
    });

    return viewModel;
}

module.exports = GospelsViewModel;


