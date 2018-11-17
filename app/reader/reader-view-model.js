const observableModule = require("tns-core-modules/data/observable");
const fs = require("file-system");
const SelectedPageService = require("../shared/selected-page-service");

var book;

function ReaderViewModel(bookName, success, failure) {
    SelectedPageService.getInstance().updateSelectedPage("Reader");
    getJson(bookName.toLowerCase()+'.json', success, failure);
    var viewModel;

}

function getJson(filename, success, failure) {
    var documents = fs.knownFolders.currentApp();
    var jsonFile = documents.getFile('vatican/archive/gospels/' + filename);
    var jsonData;

    jsonFile.readText()
        .then(function (content) {
            try {
                jsonData = JSON.parse(content);
                viewModel = new observableModule.fromObject(jsonData);
                return success(viewModel);    
            } catch (err) {
                return failure(err); 
            }
        }, function (error) {
            return failure(err);
        });

}

module.exports = ReaderViewModel;


