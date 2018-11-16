const observableModule = require("tns-core-modules/data/observable");

const SelectedPageService = require("../shared/selected-page-service");

function BrowseViewModel() {
    SelectedPageService.getInstance().updateSelectedPage("Browse");

    const viewModel = observableModule.fromObject({
        isLoading : true
    });

    return viewModel;
}

module.exports = BrowseViewModel;
