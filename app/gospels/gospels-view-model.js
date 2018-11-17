const observableModule = require("tns-core-modules/data/observable");

const SelectedPageService = require("../shared/selected-page-service");

function GospelsViewModel() {
    SelectedPageService.getInstance().updateSelectedPage("Gospels");

    const viewModel = observableModule.fromObject({
        title: "Gospels",
        books:[
            {
                name:"Matthew",
                abbr:"Mt",
                args:"mathew.json",
                chapters:[]
            },
            {
                name:"Mark",
                abbr:"Mk",
                args:"mark.json",
                chapters:[]
            },
            {
                name:"Luke",
                abbr:"Lk",
                args:"luke.json",
                chapters:[]
            },
            {
                name:"John",
                abbr:"Jo",
                args:"john.json",
                chapters:[]
            }
        ]
    });

    return viewModel;
}

module.exports = GospelsViewModel;


