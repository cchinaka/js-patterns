/**
 * Created by USER12 on 11/6/2016.
 */


var appCtrl = {
    currentCat: null,
    init: function () {
        listView.init();
        detailView.init();
        detailView.displayCat(this.getCats()[0]);
    },
    getCats: function () {
        return model.findCats();
    },
    findCurrentCatById: function (catId) {
        if (!appCtrl.currentCat || parseInt(appCtrl.currentCat.id) !== parseInt(catId)) {
            appCtrl.currentCat = model.findCatById(catId);
        }
        return appCtrl.currentCat;
    },
    displayCat: function (event) {
        event.preventDefault();
        var catId = $(event.currentTarget).data("cat-id");
        detailView.displayCat(appCtrl.findCurrentCatById(catId));
    },
    addClickBehaviourToLi: function (catLi) {
        catLi.find(".cat-click-anch").click(appCtrl.displayCat);
    },
    incrementClicks: function (event) {
        event.preventDefault();
        var cat = appCtrl.findCurrentCatById($(event.currentTarget).data("cat-id"));
        ++cat.clickCount;
        detailView.displayCat(cat);
    }
};


var listView = {
    liTemplate: '<li class="list-group-item"><a href="#" class="cat-click-anch" data-cat-id="<%= cat.id%>"><%= cat.name%></a></li>',
    createLiTemplate: function (cat) {
        return $(_.template(listView.liTemplate, {variable: "cat"})(cat));
    },
    init: function () {
        var catListHtml = this.buildContent(appCtrl.getCats());
        this.render(catListHtml);
    },
    buildContent: function (cats) {
        var self = this;
        var catList = [];
        cats.forEach(function (cat) {
            var catLi = self.createLiTemplate(cat);
            appCtrl.addClickBehaviourToLi(catLi);
            catList.push(catLi);
        });
        return catList;
    },
    render: function (catList) {
        catList.forEach(function (catLi) {
            $("ul.cat-lister").append(catLi);
        });
    }
};

var detailView = {
    controls: {
        name: null,
        anchor: null,
        img: null,
        clicks: null
    },
    init: function () {
        this.controls.name = $(".cat-name");

        this.controls.anchor = $("#imageAnchor");
        this.controls.anchor.click(appCtrl.incrementClicks);

        this.controls.img = $("#catImg");
        this.controls.clicks = $("#catClick");

    },
    displayCat: function (cat) {
        this.controls.name.html(cat.name);
        this.controls.anchor.data("cat-id", cat.id);
        this.controls.img.prop("src", cat.url);
        this.controls.clicks.html(cat.clickCount);
    }
};

var model = {
    init: function () {
        //does nothing for now...
    },
    findCatById: function (catId) {
        var cats = this.cats.filter(function (cat) {
            return parseInt(cat.id) === parseInt(catId);
        });
        return cats[0] || null;
    },
    findCats: function () {
        return this.cats;
    },
    cats: [
        {
            id: 1,
            name: "Cat 1",
            url: "//lh3.ggpht.com/nlI91wYNCrjjNy5f-S3CmVehIBM4cprx-JFWOztLk7vFlhYuFR6YnxcT446AvxYg4Ab7M1Fy0twaOCWYcUk=s0#w=640&h=426",
            clickCount: 0
        },
        {
            id: 2,
            name: "Cat 2",
            url: "//lh3.ggpht.com/kixazxoJ2ufl3ACj2I85Xsy-Rfog97BM75ZiLaX02KgeYramAEqlEHqPC3rKqdQj4C1VFnXXryadFs1J9A=s0#w=640&h=496",
            clickCount: 0
        },
        {
            id: 3,
            name: "Cat 3",
            url: "//lh5.ggpht.com/LfjkdmOKkGLvCt-VuRlWGjAjXqTBrPjRsokTNKBtCh8IFPRetGaXIpTQGE2e7ZCUaG2azKNkz38KkbM_emA=s0#w=640&h=454",
            clickCount: 0
        },
        {
            id: 4,
            name: "Cat 4",
            url: "//lh3.ggpht.com/kixazxoJ2ufl3ACj2I85Xsy-Rfog97BM75ZiLaX02KgeYramAEqlEHqPC3rKqdQj4C1VFnXXryadFs1J9A=s0#w=640&h=496",
            clickCount: 0
        },
        {
            id: 5,
            name: "Cat 5",
            url: "//lh4.ggpht.com/dUJNejPqb_qLsV1kfWcvviqc7adxsw02BSAm8YLWNklP4lI6fQCLKXd-28uKuchtjoEUpqFN0K6kkTSDHw=s0#w=588&h=640",
            clickCount: 0
        }
    ]
};
