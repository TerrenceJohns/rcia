const observableModule = require("tns-core-modules/data/observable");

const SelectedPageService = require("../shared/selected-page-service");

function GospelsViewModel() {
    SelectedPageService.getInstance().updateSelectedPage("Gospels");

    const viewModel = observableModule.fromObject({
        title: "The Gospels",
        books:[
            {
                name:"Mathew",
                abbr:"Mt",
                args:""
            },
            {
                name:"Mark",
                abbr:"Mk",
                args:""
            },
            {
                name:"Luke",
                abbr:"Lk",
                args:""
            },
            {
                name:"John",
                abbr:"Jn",
                args:""
            }
        ]
    });

    return viewModel;
}

module.exports = GospelsViewModel;


