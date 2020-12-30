const {
  FPGrowth,
} = require('../alogrithm/fpgrowth-alogrithm/fpgrowth');
const {
  query,
} = require('./mysql');


/**
 * recommendation  algorithm
 * @param {String} company
 * @return {array} companylist recommendation
 */
const recommendCompany = async (company, title) => {
  const companylist = [];
  const dataset = [];
 
  const queryHit = `
  WITH titlelist AS(
    SELECT title ,MATCH (title) AGAINST (?) AS score 
         FROM recommend 
         HAVING score >0.2 
       ORDER BY score DESC limit 1)
   
   SELECT ip,GROUP_CONCAT(search_company) AS search_company,title
         FROM recommend 
         WHERE title in(select title from titlelist) 
         GROUP BY ip
         `;
  const hitsResult = await query(queryHit,title);
  console.log(hitsResult)
  for (let i = 0; i < hitsResult.length; i++) {
    const array = hitsResult[i].search_company.split(',').map(String);
    dataset.push(array);
  }

  const fpgrowth = new FPGrowth(.7);
  fpgrowth.on('data', function(itemset, error) {
    const items = itemset.items;
    let fpCompany = Array.from(new Set(items));
    if (fpCompany.length >=2 && fpCompany[0]==company) {
      fpCompany = fpCompany.filter(function(item) {
        return item !== company;
      });
      switch (fpCompany.length) {
        case 1:
          companylist[0]=fpCompany[0];       
          break;

        case 2:
          companylist[0]=fpCompany[0];
          companylist[1]=fpCompany[1];
          break;
      }
    }
    if (error) throw error;
  });

  console.log(3);
  fpgrowth.exec(dataset);
  // queryCompany = `
  //     SELECT company
  //     FROM recommend WHERE company NOT IN (?)
  //     GROUP BY company ORDER BY COUNT(company) DESC LIMIT ? `;

  // switch (companylist.length) {
  //   case 0:
  //     let companySelect = await query(queryCompany, [company, 2]);
  //     companylist[0] = companySelect[0].company;
  //     companylist[1] = companySelect[1].company;
  //     break;
  //   case 1:
  //     const companyCombination = [];
  //     companyCombination.push(company, companylist[0]);
  //     companySelect = await query(queryCompany, [companyCombination, 1]);
  //     companylist[1] = companySelect[0].company;
  //     break;
  // }
  return companylist;
};

const filterCompany = async (company) => {
  const queryCompany = `
      (SELECT company ,MATCH (company) AGAINST (?) AS score 
      FROM salary 
      HAVING score >0.2 
      ORDER BY score DESC limit 1)
      UNION 
      (SELECT main_company AS company ,another_name
      FROM company_connection 
      WHERE another_name= ?)`;

  const companyResult = await query(queryCompany, [company, company]);
  if (companyResult.length>0) {
    companyFiltered = companyResult[0].company;
    return companyFiltered;
  } else {
    return 'no';
  }
};

const filterTitle = async (title) => {
  if (title.indexOf('工程師')) {
    titleSplit = title.split('工程師')[0].toString();
    title = titleSplit;
  } else (title.indexOf('')); {
    titleSplit = title.split(' ').toString();
    title = titleSplit;
  }

  const queryTitle = `
      SELECT career ,category
      FROM career_connection 
      WHERE career=? OR category=?`;
  const titleResult = await query(queryTitle, [title, title]);

  if (titleResult.length > 0) {
    const titlesCombination = [];
    titleResult.map((title) => {
      titlesCombination.push(title.career, title.category);
    });
    titlesCombination.push(title);

    const titleFiltered = titlesCombination.join();
    return titleFiltered;
  } else {
    return title;
  }
};
module.exports = {
  recommendCompany,
  filterCompany,
  filterTitle,
};
