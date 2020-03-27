queue()
    .defer(d3.json, "static/data/data.json")
    .await(makegraphs);

function makegraphs(error, data) {
    console.log(data);
    data.forEach(function(d) {
        d.date = new Date(d.date.$date).toDateString();
    });
    data = data.filter(d => d.date !== "" && (d.ammount < 0));

    console.log(data);

    var ndx = crossfilter(data);


    Chart_expense(ndx);

    dc.renderAll();


    function Chart_expense(ndx) {

        var spendHistChart = dc.barChart("#chart-hist-spend"),
            spenderRowChart = dc.rowChart("#chart-row-spenders");

        var yearDim = ndx.dimension(function(d) { return d.date; }),
            nameDim = ndx.dimension(function(d) { return d.name; }),
            spendPerYear = yearDim.group().reduceSum(function(d) { return -d.ammount; }),
            spendPerName = nameDim.group().reduceSum(function(d) { return -d.ammount; });


        spendHistChart
            .useViewBoxResizing(true)
            .x(d3.scale.ordinal())
            .xUnits(dc.units.ordinal)
            .xAxisLabel('Date')
            .yAxisLabel('Spend $')
            .dimension(yearDim)
            .barPadding(0.1)
            .outerPadding(0.05)
            .margins({ top: 0, bottom: 45, left: 50, right: 0 })
            .group(spendPerYear)
            .elasticY(true)
            .controlsUseVisibility(true)

        spenderRowChart
            .useViewBoxResizing(true)
            .dimension(nameDim)
            .group(spendPerName)
            .margins({ top: 0, bottom: 45, left: 50, right: 0 })
            .elasticX(true)
            .controlsUseVisibility(true);


    }
}