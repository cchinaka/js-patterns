/**
 * Created by USER12 on 11/6/2016.
 */

var appCtrl = {
    catTemplate: '<div class="panel panel-default">\
                    <div class="panel-heading cat-name"><%= data.name%></div>\
                        <div class="panel-body">\
                            <img class="img-height" src="<%= data.url%>"/><br/>\
                            No of clicks: <span class="cat-click"><%= data.clickCount %></span>\
                        </div>\
                    </div>\
                 </div>',
    liTemplate: '<li class="list-group-item"><a href="#" class="cat-click-anch" data-cat-id="<%= cat.id%>"><%= cat.name%></a></li>',
    cats: {
        "catOne": {
            name: "Cat 1",
            url: "//lh3.ggpht.com/nlI91wYNCrjjNy5f-S3CmVehIBM4cprx-JFWOztLk7vFlhYuFR6YnxcT446AvxYg4Ab7M1Fy0twaOCWYcUk=s0#w=640&h=426",
            clickCount: 0
        },
        "catTwo": {
            name: "Cat 2",
            url: "//lh3.ggpht.com/kixazxoJ2ufl3ACj2I85Xsy-Rfog97BM75ZiLaX02KgeYramAEqlEHqPC3rKqdQj4C1VFnXXryadFs1J9A=s0#w=640&h=496",
            clickCount: 0
        },
        "catThree": {
            name: "Cat 3",
            url: "//lh5.ggpht.com/LfjkdmOKkGLvCt-VuRlWGjAjXqTBrPjRsokTNKBtCh8IFPRetGaXIpTQGE2e7ZCUaG2azKNkz38KkbM_emA=s0#w=640&h=454",
            clickCount: 0
        },
        "catFour": {
            name: "Cat 4",
            url: "//lh3.ggpht.com/kixazxoJ2ufl3ACj2I85Xsy-Rfog97BM75ZiLaX02KgeYramAEqlEHqPC3rKqdQj4C1VFnXXryadFs1J9A=s0#w=640&h=496",
            clickCount: 0
        },
        "catFive": {
            name: "Cat 5",
            url: "//lh4.ggpht.com/dUJNejPqb_qLsV1kfWcvviqc7adxsw02BSAm8YLWNklP4lI6fQCLKXd-28uKuchtjoEUpqFN0K6kkTSDHw=s0#w=588&h=640",
            clickCount: 0
        }
    },
    init: function () {
        this.listCats();
    },
    listCats: function () {
        for (var catId in appCtrl.cats) {
            var cat = appCtrl.cats[catId];
            cat.id = catId;
            var catLi = appCtrl.createLiTemplate(cat);
            appCtrl.addClickBehaviourToLi(catLi);
            $("ul.cat-lister").append(catLi);
        }
    },
    addClickBehaviourToLi: function (catLi) {
        catLi.find(".cat-click-anch").click(function (event) {
            event.preventDefault();
            var cat = appCtrl.cats[$(event.currentTarget).data("cat-id")];
            appCtrl.incrementClicks(cat);
            appCtrl.displayCat(cat);
        });
    },
    createLiTemplate: function (cat) {
        return $(_.template(appCtrl.liTemplate, {variable: "cat"})(cat));
    },
    incrementClicks: function (cat) {
        ++cat.clickCount;
    },
    displayCat: function (cat) {
        var drawTemplate = _.template(appCtrl.catTemplate, {variable: "data"});
        var catHtml = $(drawTemplate(cat));
        $("#cat-row").html(catHtml);
    }
};