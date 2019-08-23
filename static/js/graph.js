queue()
    .defer(d3.json, "static/js/data.json")
    .await(makegraphs);

function makegraphs(error, data) {
    var ndx = crossfilter(data);

    pieChart_expense(ndx);
    barChart_expense(ndx);

    dc.renderAll();
}

function pieChart_expense(ndx) {
    var dim = ndx.dimension(dc.pluck("category_name"));
    var group = dim.group().reduceSum(function(d) {
        return d.value;
    });


    dc.pieChart("#pie")
        .width(900)
        .height(300)
        .dimension(dim)
        .group(group)
        .legend(dc.legend().x(0).y(0).gap(25));


}

function barChart_expense(ndx) {
    var dim = ndx.dimension(dc.pluck("category_name"));
    var group = dim.group().reduceSum(function(d) {
        return d.value;
    });

    dc.barChart("#bar")
        .width(600)
        .height(300)
        .outerPadding(50)
        .dimension(dim)
        .group(group)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .yAxis().ticks(5);


}