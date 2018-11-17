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
            }
        ]
    });

    return viewModel;
}

module.exports = GospelsViewModel;


