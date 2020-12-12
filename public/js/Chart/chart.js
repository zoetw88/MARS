// company='聯發科技股份有限公司'
// year='10'
// axios.get(`/api/1.0/workinghour?company=${company}`)
// .then((res) => {

var margin = {top: 10, left: 160, bottom: 70, right: 20};
var width = 600 - margin.left - margin.right;
var height = 400 - margin.top - margin.bottom;

var numberOfPoints = 100;
var pointRadius = 9;

d3.json('../../json/chart.json', function(data) {
    var labels = d3.set(data.map(function(d) {
        return d.label;
    })).values();

    var xExtent = d3.extent(data, function(d) { return d.x });
    var yExtent = d3.extent(data, function(d) { return d.y });
    var xRange = xExtent[1] - xExtent[0];
    var yRange = yExtent[1] - yExtent[0];

    var xScale = d3.scale.linear()
        .domain([30,100])
        .range([0, width]);

    var yScale = d3.scale.linear()
        .domain([yExtent[0] - yRange*0.1, yExtent[1] + yRange*0.1])
        .range([height, 0]);

    var colourScale = d3.scale.ordinal()
        .domain(labels)
        .range(['#e41a1c', '#377eb8', '#4daf4a']);

    var shapeScale = d3.scale.ordinal()
        .domain(labels)
        .range([d3_shape.symbolCircle, d3_shape.symbolCross,
            d3_shape.symbolSquare]);

    var svg = d3.select('#container').append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .style('position', 'absolute')
        .style('z-index', 1)
        .append('g')
        .attr("transform", "translate(" + margin.left + "," +
            margin.top + ")");

    var canvas = d3.select('#container').append('canvas')
        .attr('width', width - 1)
        .attr('height', height - 1)
        .style('position', 'absolute')
        .style('z-index', 2)
        .style("transform", "translate(" + (margin.left + 1) +
            "px" + "," + (margin.top + 1) + "px" + ")");

    var context = canvas.node().getContext('2d');

    d3.select("#container")
        .style("width", width + margin.left + margin.right + 'px')
        .style("height", height + margin.top + margin.bottom + "px");

    var xAxis = d3.svg.axis()
        .scale(xScale)
        .innerTickSize(-height)
        .outerTickSize(0)
        .tickPadding(10)
        .orient('bottom');

    var yAxis = d3.svg.axis()
        .scale(yScale)
        .innerTickSize(-width)
        .outerTickSize(0)
        .orient('left');

    var xAxisSvg = svg.append('g')
        .attr('class', 'axis')
        .attr('transform', 'translate(0,' + height + ')')
        .call(xAxis);
    
    var xAxislabel= svg.append("text")
    .attr("text-anchor", "end")
    .attr("x", width/2)
    .attr("y", height + margin.top + 50)
    .text("一週工時")
    

    var yAxisSvg = svg.append('g')
        .attr('class', 'axis')
        .call(yAxis);
    var yAxislabel =svg.append("text")
        .attr("text-anchor", "end")
        .attr("transform", "rotate(-90)")
        .attr("y", -margin.left+40)
        .attr("x", -margin.top-100)
        .text("年薪($NT)")
    
    // create zooming/panning behaviour
    var zoomBehaviour = d3.behavior.zoom()
        .x(xScale)
        .y(yScale)
        .scaleExtent([1, 5])
        .on('zoom', onZoom);

    canvas.call(zoomBehaviour);

    // add legend
    var legendWidth = 350;
    var legendHeight = 90;

    var legend = d3.select('#legend').append('svg')
        .attr('width', legendWidth)
        .attr('height', legendHeight)
        .attr("transform", function(d) { return "translate(-80,100)"; }) 

    legend.append('rect')
        .attr('x', 0)
        .attr('y', 0)
        .attr('width', legendWidth)
        .attr('height', legendHeight)
        .attr('stroke', 'black')
        .attr('fill', 'white');

    labels.forEach(function(d, i) {
        var x = pointRadius + 10;
        var y = 23 + i * 20;

        var symbol = d3_shape.symbol()
            .type(shapeScale(d))
            .size(pointRadius * pointRadius);

        legend.append('path')
            .attr('d', symbol)
            .attr('fill', colourScale(d))
            .attr('stroke', 'black')
            .attr('stroke-width', 1)
            .attr('transform', 'translate(' + x + ',' + y + ')');

        legend.append('text')
            .attr("font-size", 30)
            .attr('class', 'legend')
            .attr('x', pointRadius + 20)
            .attr('y', y)
            .attr('dominant-baseline', 'central')
            .text(d)
            
    });

    draw();

    // draw points
    function draw() {
        console.log('draw');

        context.clearRect(0, 0, width, height);

        data.forEach(function(d) {
            var x = Math.round(xScale(d.x));
            var y = Math.round(yScale(d.y));

            var symbol = d3_shape.symbol()
                .type(shapeScale(d.label))
                .size(pointRadius * pointRadius)
                .context(context);

            context.translate(x, y);
            context.fillStyle = colourScale(d.label);
            context.beginPath();
            symbol();
            context.closePath();
            context.fill();
            context.stroke();
            context.translate(-x, -y);
        });
    }

    function onClick(e) {
        console.log('click!!');
    }

    function onZoom() {
        console.log('onZoom');

        draw();
        xAxisSvg.call(xAxis);
        yAxisSvg.call(yAxis);
    }
});