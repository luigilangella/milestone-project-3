queue()
    .defer(d3.json, "static/data/data.json")
    .await(makegraphs);

function makegraphs(error, data) {
    console.log(data);
    var ndx = crossfilter(data);
    var all = ndx.groupAll().reduceSum(function(d) { return d.value + -d.ammount; });
    data.forEach(function(d) {
        d.date = new Date(d.date.$date).toDateString();
    });


    Chart_expense(ndx);


    dc.renderAll();



    function Chart_expense(ndx) {


        var expense_dimension = ndx.dimension(function(d) {
            return d.ammount;

        })
        var income_dimension = ndx.dimension(function(d) {
            return d.value;
        })
        var yearlyDimension = ndx.dimension(function(d) {
            return d.date;
        });
        var dim = ndx.dimension(function(d) {
            if (!d.ammount) {
                d.ammount = 0;
            }
            if (!d.value) {
                d.value = 0;
            }
            return [d.date];
        })

        var yearRingChart = dc.pieChart("#chart-ring-year"),
            spendHistChart = dc.barChart("#chart-hist-spend"),
            spenderRowChart = dc.rowChart("#chart-row-spenders");
        var yearDim = ndx.dimension(function(d) { return d.date; }),
            monthDimension = ndx.dimension(function(d) { return d3.time.months(d.date); }),
            spendDim = ndx.dimension(function(d) { return "$" + -d.ammount; }),
            nameDim = ndx.dimension(function(d) { return d.name; }),
            incomeDim = ndx.dimension(function(d) { return d.value; }),
            pie_dim = ndx.dimension(function(d) { return +d.value > -d.ammount ? "Savings" : "Expense"; }),
            pie_group = pie_dim.group().reduceSum(function(d) { return d.value - d.ammount; }),
            spendPerYear = yearDim.group().reduceSum(function(d) { return d.ammount; }),
            incomePerYear = yearDim.group().reduceSum(function(d) { return d.value, -d.ammount; }),
            income_PerYear = dim.group().reduceSum(function(d) { return d.value + d.ammount; }),
            spendPerName = nameDim.group().reduceSum(function(d) { return -d.ammount; }),
            spendPerDate = yearDim.group().reduce(
                function(p, v) {
                    p.count++;
                    if (v.ammount < 0) {
                        p.ammount += v.ammount;
                    }

                    p.date = v.date;
                    return p;
                },
                function(p, v) {
                    p.count--;
                    if (v.ammount < 0) {
                        p.ammount -= v.ammount;
                    }

                    p.date = -v.date;
                    return p;
                },
                function() {
                    return {
                        count: 0,
                        ammount: 0,
                        date: 0
                    }

                }
            );
        console.log(spendPerDate.top(50));
        console.log(pie_group.top(10));
        yearRingChart
            .dimension(pie_dim)
            .group(pie_group)
            .radius(100)
            .label(function(d) {
                if (yearRingChart.hasFilter() && !yearRingChart.hasFilter(d.key)) {
                    return d.key + '(0%)';
                }
                var label = d.key;
                if (all.value()) {
                    label += '(' + Math.floor(d.value / all.value() * 100) + '%)';
                }
                return label;
            })
            .controlsUseVisibility(true);
        spendHistChart
            .x(d3.scale.ordinal())
            .xUnits(dc.units.ordinal)
            .brushOn(false)
            .xAxisLabel('Date')
            .yAxisLabel('Expense')
            .dimension(spendPerYear)
            .barPadding(0.1)
            .outerPadding(0.05)
            .group(incomePerYear)
            .controlsUseVisibility(true);
        spenderRowChart
            .dimension(nameDim)
            .group(spendPerName)
            .elasticX(true)
            .controlsUseVisibility(true);


    }
}