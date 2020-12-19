

const {
    FPGrowth
} = require("../alogrithm/fpgrowth-alogrithm/fpgrowth");
const {
    query,
    transaction,
    commit,
    rollback
} = require('./mysql');


async function fp_alogrithm(company){
    let result_company = [];
    let dataset = [];
    let hits_result = await query(`SELECT ip,group_concat(company) as company FROM wenChang.recommend group by ip`)
      
    for (let i = 0; i < hits_result.length; i++) {
        let array = hits_result[i].company.split(",").map(String);
        dataset.push(array)
    }

    let fpgrowth = new FPGrowth(.4);
    fpgrowth.on('data', function (itemset) {
        let support = itemset.support;
        let items = itemset.items;

        if (items.length > 2) {
            if (items[0] == company) {
                result_company.push(items[1])
            }
            if (items[1] != items[2]) {
                result_company.push(items[2])
            }
        }
    });
    fpgrowth.exec(dataset)
    
// Set, this is a simple and plain method.
    result_company = Array.from(new Set(result_company));
    
    if (result_company.length < 1) {
        let select_result=await query(`SELECT company FROM recommend  WHERE company NOT IN ('${company}' )GROUP BY company order by count(company) DESC limit 2 `)
        result_company[0]=select_result[0].company;
        result_company[1]=select_result[1].company;
    }
    if (result_company.length < 2) {
        let select_result=await query(`SELECT company FROM recommend  WHERE company NOT IN ('${company}','${result_company[0]}' )GROUP BY company order by count(company) DESC limit 1`)
        result_company[1]=select_result[0].company;
    }
    
    if(result_company[0]==company){
        let select_result=await query(`SELECT company FROM recommend  WHERE company NOT IN ('${company}','${result_company[1]}' )GROUP BY company order by count(company) DESC limit 1`)
        result_company[0]=select_result[0].company;
    }
    if(result_company[1]==company){
        let select_result=await query(`SELECT company FROM recommend  WHERE company NOT IN ('${company}','${result_company[0]}' )GROUP BY company order by count(company) DESC limit 1`)
        result_company[1]=select_result[0].company;
    }
    if(result_company[1]==result_company[0]){
        let select_result=await query(`SELECT company FROM recommend  WHERE company NOT IN ('${company}','${result_company[0]}' )GROUP BY company order by count(company) DESC limit 1`)
        result_company[1]=select_result[0].company;
    }
 
    return result_company
}
module.exports = {
   fp_alogrithm
};
