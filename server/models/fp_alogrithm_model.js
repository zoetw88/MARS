const {
    FPGrowth
} = require("../alogrithm/fpgrowth-alogrithm/fpgrowth");
const {
    query,
    transaction,
    commit,
    rollback
} = require('./mysql');


async function fp_alogrithm(company) {
        let result_company = [];
        let dataset = [];
        let hits_result = await query(`SELECT ip , GROUP_CONCAT(company) AS company FROM recommend GROUP BY ip`)

        for (let i = 0; i < hits_result.length; i++) {
            let array = hits_result[i].company.split(",").map(String);
            dataset.push(array)
        }

        let fpgrowth = new FPGrowth(.6);

        fpgrowth.on('data', function (itemset,error) {
            let items = itemset.items;
            let fp_company = Array.from(new Set(items));
         
            if(fp_company!=null){
            if (fp_company.length > 2 && fp_company.indexOf(company) > 0) {
                fp_company = fp_company.filter(function (item) {
                    return item !== company
                });
                result_company = result_company.concat(fp_company[0], fp_company[1])
            } else if (fp_company.length = 2 && fp_company.indexOf(company) > 0) {
                fp_company = fp_company.filter(function (item) {
                    return item !== company
                });
                result_company = result_company.concat(fp_company[0])
            }}
            if (error) throw error
        });
        fpgrowth.exec(dataset)
        
        query_str_company = 
        `SELECT company
        FROM recommend WHERE company NOT IN (?)
        GROUP BY company ORDER BY COUNT(company) DESC LIMIT ? `
        
        switch (result_company.length) {

            case 0:
                let select_result = await query(query_str_company, [company, 2])
                result_company[0] = select_result[0].company;
                result_company[1] = select_result[1].company;
                break;
            case 1:
                let query_company = [];
                query_company = query_company.concat(company, result_company[0])
                select_result = await query(query_str_company, [query_company, 1])
                result_company[1] = select_result[0].company;
                break;

        }
       
       
    return result_company
}
module.exports = {
    fp_alogrithm
};
