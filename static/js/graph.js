queue()
    .defer(d3.json, "static/data/data.json")
    .await(makegraphs);

function makegraphs(error, data) {
    var ndx = crossfilter(data);

    pieChart_expense(ndx);
    barChart_expense(ndx);


    dc.renderAll();
}

function pieChart_expense(ndx) {
    var dim = ndx.dimension(dc.pluck("name"));
    var group = dim.group().reduceSum(function(d) {
        return d.ammount;
    });


    dc.pieChart("#pie")
        // .width(500)
        // .height(500)
        .useViewBoxResizing(true)
        .dimension(dim)
        .group(group)
        .legend(dc.legend().x(0).y(0).gap(20));


}

function barChart_expense(ndx) {
    var dim = ndx.dimension(dc.pluck("name"));
    var group = dim.group().reduceSum(function(d) {
        return d.ammount;
    });

    dc.barChart("#bar")

    // .width(90)
    //     .height(40)
    .useViewBoxResizing(true)
        .outerPadding(50)
        .dimension(dim)
        .group(group)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .yAxis().ticks(5);

}