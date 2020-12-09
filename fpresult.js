const {FPGrowth} = require("./fpgrowth");
dataSet = [['聯發科技股份有限公司','英業達股份有限公司','台達電子工業股份有限公司'],
['鴻海精密工業股份有限公司','台灣積體電路製造股份有限公司','廣達電腦股份有限公司'],
['台灣積體電路製造股份有限公司', '鴻海精密工業股份有限公司','廣達電腦股份有限公司','仁寶電腦工業股份有限公司'],
['仁寶電腦工業股份有限公司','英業達股份有限公司','台達電子工業股份有限公司'],
['聯發科技股份有限公司','台灣積體電路製造股份有限公司','廣達電腦股份有限公司'],
['鴻海精密工業股份有限公司','仁寶電腦工業股份有限公司','英業達股份有限公司','台達電子工業股份有限公司','聯發科技股份有限公司']]
// Execute FPGrowth with a minimum support of 40%.
var fpgrowth = new FPGrowth(.3);

fpgrowth.on('data', function (itemset) {
    var support = itemset.support;
    var items = itemset.items;

    console.log( `${items} 支持度 ${support}`);

});
fpgrowth.exec(dataSet)

 
