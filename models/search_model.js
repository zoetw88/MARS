const {
    query,
    transaction,
    commit,
    rollback
} = require('./mysql');
const {
    FPGrowth
} = require("../fpgrowth");

var final_result = {}
var final_result_1 = {}
var final_result_2 = {}
var data = []

const salary = async (company, title,ip) => {
    let dataset = []
    let result_company = []
    let result_avg = [null, null, null, null, null, null, null, null, null, null]
    let result_2_avg = [null, null, null, null, null, null, null, null, null, null]
    let result_3_avg = [null, null, null, null, null, null, null, null, null, null]
    let final_word;
    try {
        await transaction();
  
        let query_str={ip:`${ip}`,company:`${company}`};
        if(company!=null){
        await query('INSERT INTO recommend SET?',query_str)}
           
 
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

        if (result_company.length < 1) {
            result_company[0] = '台灣積體電路製造股份有限公司'
            result_company[1] = '台達電子工業股份有限公司'
        }
        if (result_company.length < 2) {
            result_company[1] = '聯發科技股份有限公司'
        }
        
        final_word=title;
        if (title.indexOf('工程師') > 0) {
            let word = title.split('工程師');
            final_word = word[0];}
        
      
        const salary_result = await query(`SELECT AVG(salary) as salary,experience,company FROM salary WHERE title LIKE '%${final_word}%' and company = ?  GROUP BY experience`, [company]);
        const salary_2_result = await query(`SELECT AVG(salary) as salary,experience,company FROM salary WHERE title LIKE '%${final_word}%' and company = ? GROUP BY experience`, [result_company[0]]);
        const salary_3_result = await query(`SELECT AVG(salary) as salary,experience,company FROM salary WHERE title LIKE '%${final_word}%' and company = ? GROUP BY experience`, [result_company[1]]);

        if (salary_result.length > 0) {
            for (let i = 0; i < salary_result.length; i++) {
                if (salary_result[i].experience < 11) {
                    let temp = parseInt(salary_result[i].experience)
                    result_avg[temp] = parseInt(salary_result[i].salary)
                }
            }
        }
        if (salary_2_result.length > 0) {
            for (let i = 0; i < salary_2_result.length; i++) {
                if (salary_2_result[i].experience < 11) {
                    let temp = parseInt(salary_2_result[i].experience)
                    result_2_avg[temp] = parseInt(salary_2_result[i].salary)
                }
            }
        }
        if (salary_3_result.length > 0) {
            for (let i = 0; i < salary_3_result.length; i++) {
                if (salary_3_result[i].experience < 11) {
                    let temp = parseInt(salary_3_result[i].experience)
                    result_3_avg[temp] = parseInt(salary_3_result[i].salary)
                }
            }
        }

        commit();

        final_result['y'] = result_avg
        final_result['name'] = company
        final_result['x'] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        data.push(final_result)

        final_result_1['y'] = result_2_avg
        final_result_1['name'] = result_company[0]
        final_result_1['x'] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        data.push(final_result_1)

        final_result_2['y'] = result_3_avg
        final_result_2['name'] = result_company[1]
        final_result_2['x'] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        data.push(final_result_2)
        return data
    } catch (error) {
        await rollback();
        return {
            error
        };
    }
};

const working_hour = async (company) => {
    try {
        let dataset = []
        let result_company = []
        await transaction();
        const test_result = await query(`SELECT ip,group_concat(company) as company FROM wenChang.recommend group by ip`);
        for (let i = 0; i < test_result.length; i++) {
            let array = test_result[i].company.split(",").map(String);
            dataset.push(array)
        }
  
        let fpgrowth = new FPGrowth(.4);
        await fpgrowth.on('data', function (itemset) {
            let support = itemset.support;
            let items = itemset.items;
            console.log(items)
            if (items.length > 2) {
                if (items[0] == company) {

                    result_company.push(items[1])
                }
                if (items[1] != items[2]) {
                    result_company.push(items[2])
                }
            }
        });
        await fpgrowth.exec(dataset)

        if (result_company.length < 1) {
            result_company[0] = '台灣積體電路製造股份有限公司'
            result_company[1] = '台達電子工業股份有限公司'
        }
        if (result_company.length < 2) {
            result_company[1] = '聯發科技股份有限公司'
        }

        const salary_result = await query(`SELECT salary as y,working_hour as x,company as label FROM salary WHERE company IN ('${company}','${result_company[0]}','${result_company[1]}')`);
    
        if (salary_result.length > 0) {
            await commit();
            return salary_result;
        }
    } catch (error) {
        await rollback();
        return {
            error
        };
    }
};
module.exports = {
    salary,
    working_hour
};
