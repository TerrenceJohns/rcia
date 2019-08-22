function getJson(fielname,arr) {
    var documents = fs.knownFolders.currentApp();
    var jsonFile = documents.getFile('vatican/archive/gospels/' + fielname);
    var jsonData;

    jsonFile.readText()
        .then(function (content) {
            try {
                jsonData = JSON.parse(content);
                arr = new observableArrayModule.ObservableArray(jsonData);
                
            } catch (err) {
                throw new Error('Could not parse JSON file');
            }
        }, function (error) {
            throw new Error('Could not read JSON file');
        });

}