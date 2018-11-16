const app = require("tns-core-modules/application");
const view = require("tns-core-modules/ui/core/view");
const frameModule = require("tns-core-modules/ui/frame");
const listViewModule = require("tns-core-modules/ui/list-view");
const repeaterModule = require("tns-core-modules/ui/repeater");

const GospelsViewModel = require("./gospels-view-model");
var colorModule = require("tns-core-modules/color");


var page;

function onNavigatingTo(args) {
    page = args.object;
    page.bindingContext = new GospelsViewModel();
}

function onDrawerButtonTap(args) {
    const sideDrawer = app.getRootView();
    sideDrawer.showDrawer();
}

exports.onNavigatingTo = onNavigatingTo;
exports.onDrawerButtonTap = onDrawerButtonTap;