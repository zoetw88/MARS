const margin = {
  top: 50,
  left: 120,
  bottom: 90,
  right: 50,
};
const width = 500 - margin.left - margin.right;
const height = 435 - margin.top - margin.bottom;

const numberOfPoints = 100;
const pointRadius = 9;

d3.json('../../json/company.json', function(data) {
  if (data == 'no') {
    $('<h4 id="message-company">(ఠ్ఠ ˓̭ ఠ్ఠ)尚未有人提供相關情報</h4>').appendTo($('.chart-label-1 '));
  } else {
    const labels = d3.set(data.map(function(d) {
      return d.label;
    })).values();

    const xExtent = d3.extent(data, function(d) {
      return d.x;
    });
    const yExtent = d3.extent(data, function(d) {
      return d.y;
    });
    const xRange = xExtent[1] - xExtent[0];
    const yRange = yExtent[1] - yExtent[0];

    const xScale = d3.scale.linear()
        .domain([30, 100])
        .range([0, width]);

    const yScale = d3.scale.linear()
        .domain([yExtent[0] - yRange * 0.4, yExtent[1] + yRange * 0.2])
        .range([height, 0]);

    const colourScale = d3.scale.ordinal()
        .domain(labels)
        .range(['	#00FFFF', '	#FF60AF', '	#FF2D2D','#F9F900','	#FF8000','#9AFF02','	#9999CC','#9D9D9D','#16982b','#6FB7B7','#003366','#b22222']);

    const shapeScale = d3.scale.ordinal()
        .domain(labels)
        .range([d3_shape.symbolCircle, d3_shape.symbolCross,
          d3_shape.symbolSquare,d3_shape.symbolStar,d3_shape.symbolTriangle,d3_shape.symbolWye,d3_shape.symbolDiamond
        ]);

    const svg = d3.select('#scatter_container').append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .style('position', 'absolute')
        .style('z-index', 1)
        .append('g')
        .attr('transform', 'translate(' + margin.left + ',' +
                    margin.top + ')');

    const canvas = d3.select('#scatter_container').append('canvas')
        .attr('width', width - 1)
        .attr('height', height - 1)
        .style('position', 'absolute')
        .style('z-index', 2)
        .style('transform', 'translate(' + (margin.left + 1) +
                    'px' + ',' + (margin.top + 1) + 'px' + ')');

    const context = canvas.node().getContext('2d');

    d3.select('#scatter_container')
        .style('width', width + margin.left + margin.right + 'px')
        .style('height', height + margin.top + margin.bottom + 'px');

    const xAxis = d3.svg.axis()
        .scale(xScale)
        .innerTickSize(-height)
        .outerTickSize(0)
        .tickPadding(10)
        .orient('bottom');

    const yAxis = d3.svg.axis()
        .scale(yScale)
        .innerTickSize(-width)
        .outerTickSize(0)
        .orient('left')
        .tickFormat(function(d) {
          return d+'\nM';
        });

    const xAxisSvg = svg.append('g')
        .attr('class', 'axis')
        .attr('transform', 'translate(0,' + height + ')')
        .call(xAxis);

    const yAxisSvg = svg.append('g')
        .attr('class', 'axis')
        .call(yAxis);

    const xAxislabel = svg.append('text')
        .attr('text-anchor', 'end')
        .attr('x', width / 2)
        .attr('y', height + margin.top + 20)
        .text('一週工時');


    const yAxislabel = svg.append('text')
        .attr('text-anchor', 'end')
        .attr('transform', 'rotate(-90)')
        .attr('y', -margin.left + 30)
        .attr('x', -margin.top - 50)
        .text('年薪($NT)');
    // create zooming/panning behaviour
    const zoomBehaviour = d3.behavior.zoom()
        .x(xScale)
        .y(yScale)
        .scaleExtent([0.1, 5])
        .on('zoom', onZoom);

    canvas.call(zoomBehaviour);

    // add legend


    const companyQuantity=parseInt(labels.length);
    const legendWidth = 260;
    var legendHeight = companyQuantity*22;
    if (labels.length<=3) {
      var legendHeight = companyQuantity*28.5;
    }
    const legend = d3.select('#legend').append('svg')
        .attr('width', legendWidth)
        .attr('height', legendHeight)
        .attr('transform', function(d) {
          return 'translate(105,10)';
        });

    legend.append('rect')
        .attr('x', 0)
        .attr('y', 0)
        .attr('width', legendWidth)
        .attr('height', legendHeight)
        .attr('stroke', 'black')
        .attr('fill', 'white');

    labels.forEach(function(d, i) {
      const x = pointRadius + 10;
      const y = 23 + i * 20;

      const symbol = d3_shape.symbol()
          .type(shapeScale(d))
          .size(pointRadius * pointRadius);

      legend.append('path')
          .attr('d', symbol)
          .attr('fill', colourScale(d))
          .attr('stroke', 'black')
          .attr('stroke-width', 0.5)
          .attr('transform', 'translate(' + x + ',' + y + ')');

      legend.append('text')
          .attr('class', 'legend')
          .attr('x', pointRadius + 20)
          .attr('y', y)
          .style('font-size', '16px')
          .attr('dominant-baseline', 'central')
          .text(d);
    });

    draw();

    // draw points
    function draw() {
      context.clearRect(0, 0, width, height);
      data.forEach(function(d) {
        const x = Math.round(xScale(d.x));
        const y = Math.round(yScale(d.y));

        const symbol = d3_shape.symbol()
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

    function onZoom() {
      draw();
      xAxisSvg.call(xAxis);
      yAxisSvg.call(yAxis);
    }
  }
});
