function find_id(id_number) {
    let result = null,
        tmp = [];
    window.location.search.substring(1).split("&").forEach(function (item) {
        tmp = item.split("=");
        if (tmp[0] === id_number) {
            result = decodeURIComponent(tmp[1]);
        }
    });
    console.log(result)
    return result
}

company='聯發科技股份有限公司'


axios.get(`/api/1.0/salary?company=${company}`
)
.then((response) => {
    console.log(response.data)


var myData = `date	${response.data[0].company}	${response.data[1].company}	${response.data[2].company}\n\
1	${response.data[0].salary}	${response.data[1].salary}	${response.data[2].salary}\n\
2	${response.data[3].salary}	${response.data[4].salary}	${response.data[5].salary}\n\
3	${response.data[6].salary}	${response.data[7].salary}	${response.data[8].salary}\n\
4	${response.data[9].salary}	${response.data[10].salary}	${response.data[11].salary}\n\
5	${response.data[12].salary}	${response.data[13].salary}	${response.data[14].salary}\n\
6	${response.data[15].salary}	${response.data[16].salary}	${response.data[17].salary}\n\
7	${response.data[18].salary}	${response.data[19].salary}	${response.data[20].salary}\n\
8	${response.data[21].salary}	${response.data[22].salary}	${response.data[23].salary}\n\
9	${response.data[24].salary}	${response.data[25].salary}	${response.data[26].salary}\n\
10	${response.data[27].salary}	${response.data[28].salary}	${response.data[29].salary}\n`;


        var margin = {
            top: 20,
            right: 80,
            bottom: 80,
            left: 80
        },
            width = 900 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

        // var parseDate = d3.time.format("%Y%m%d").parse;

        var x = d3.scale.linear()
            .range([0, width]);

        var y = d3.scale.linear()
            .range([height, 0]);

        var color = d3.scale.category10();

        var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom");

        var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left");

        var line = d3.svg.line()
            .interpolate("basis")
            .x(function (d) {
                return x(d.date);
            })
            .y(function (d) {
                return y(d.temperature);
            });

        var svg = d3.select("body").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var data = d3.tsv.parse(myData);

        color.domain(d3.keys(data[0]).filter(function (key) {
            return key !== "date";
        }));

        data.forEach(function (d) {
            d.date = d.date
        });

        var cities = color.domain().map(function (name) {
            return {
                name: name,
                values: data.map(function (d) {
                    return {
                        date: d.date,
                        temperature: +d[name]
                    };
                })
            };
        });

        x.domain(d3.extent(data, function (d) {
            return d.date;
        }));

        y.domain([
            d3.min(cities, function (c) {
                return d3.min(c.values, function (v) {
                    return v.temperature;
                });
            }),
            d3.max(cities, function (c) {
                return d3.max(c.values, function (v) {
                    return v.temperature;
                });
            })
        ]);

        var legend = svg.selectAll('g')
            .data(cities)
            .enter()
            .append('g')
            .attr('class', 'legend');

        legend.append('rect')
            .attr('x', width - 170)
            .attr('y', function (d, i) {
                return i * 20;
            })
            .attr('width', 10)
            .attr('height', 10)
            .style('fill', function (d) {
                return color(d.name);
            });

        legend.append('text')
            .attr('x', width - 150)
            .attr('y', function (d, i) {
                return (i * 20) + 9;
            })
            .text(function (d) {
                return d.name;
            });
        svg.append("text")             
            .attr("transform",
                  "translate(" + (width/2) + " ," + 
                                 (height + margin.top + 20) + ")")
            .style("text-anchor", "middle")
            .text("年資");
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("transform",  "translate(0," + height + ")")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("年薪 ($NT)");

        var city = svg.selectAll(".city")
            .data(cities)
            .enter().append("g")
            .attr("class", "city");

        city.append("path")
            .attr("class", "line")
            .attr("d", function (d) {
                return line(d.values);
            })
            .style("stroke", function (d) {
                return color(d.name);
            });

        city.append("text")
            .datum(function (d) {
                return {
                    name: d.name,
                    value: d.values[d.values.length - 1]
                };
            })
            .attr("transform", function (d) {
                return "translate(" + x(d.value.date) + "," + y(d.value.temperature) + ")";
            })
            .attr("x", 3)
            .attr("dy", ".35em")
            .text(function (d) {
                return d.name;
            });

        var mouseG = svg.append("g")
            .attr("class", "mouse-over-effects");

        mouseG.append("path") // this is the black vertical line to follow mouse
            .attr("class", "mouse-line")
            .style("stroke", "black")
            .style("stroke-width", "1px")
            .style("opacity", "0");

        var lines = document.getElementsByClassName('line');

        var mousePerLine = mouseG.selectAll('.mouse-per-line')
            .data(cities)
            .enter()
            .append("g")
            .attr("class", "mouse-per-line");

        mousePerLine.append("circle")
            .attr("r", 7)
            .style("stroke", function (d) {
                return color(d.name);
            })
            .style("fill", "none")
            .style("stroke-width", "1px")
            .style("opacity", "0");

        mousePerLine.append("text")
            .attr("transform", "translate(10,3)");

        mouseG.append('svg:rect') // append a rect to catch mouse movements on canvas
            .attr('width', width) // can't catch mouse events on a g element
            .attr('height', height)
            .attr('fill', 'none')
            .attr('pointer-events', 'all')
            .on('mouseout', function () { // on mouse out hide line, circles and text
                d3.select(".mouse-line")
                    .style("opacity", "0");
                d3.selectAll(".mouse-per-line circle")
                    .style("opacity", "0");
                d3.selectAll(".mouse-per-line text")
                    .style("opacity", "0");
            })
            .on('mouseover', function () { // on mouse in show line, circles and text
                d3.select(".mouse-line")
                    .style("opacity", "1");
                d3.selectAll(".mouse-per-line circle")
                    .style("opacity", "1");
                d3.selectAll(".mouse-per-line text")
                    .style("opacity", "1");
            })
            .on('mousemove', function () { // mouse moving over canvas
                var mouse = d3.mouse(this);
                d3.select(".mouse-line")
                    .attr("d", function () {
                        var d = "M" + mouse[0] + "," + height;
                        d += " " + mouse[0] + "," + 0;
                        return d;
                    });

                d3.selectAll(".mouse-per-line")
                    .attr("transform", function (d, i) {
                        console.log(width / mouse[0])
                        var xDate = x.invert(mouse[0]),
                            bisect = d3.bisector(function (d) { return d.date; }).right;
                        idx = bisect(d.values, xDate);

                        var beginning = 0,
                            end = lines[i].getTotalLength(),
                            target = null;

                        while (true) {
                            target = Math.floor((beginning + end) / 2);
                            pos = lines[i].getPointAtLength(target);
                            if ((target === end || target === beginning) && pos.x !== mouse[0]) {
                                break;
                            }
                            if (pos.x > mouse[0]) end = target;
                            else if (pos.x < mouse[0]) beginning = target;
                            else break; //position found
                        }

                        d3.select(this).select('text')
                            .text(y.invert(pos.y).toFixed(2));

                        return "translate(" + mouse[0] + "," + pos.y + ")";
                    });
            });
   
        })
        .catch((error) => {
            console.log(error)
        })
        