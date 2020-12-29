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
async function fpAlogrithm(company) {
  const companylist = [];
  companylist.splice(0, companylist.length);
  const dataset = [];
  const queryHit=`
  SELECT ip,GROUP_CONCAT(company) AS company 
  FROM recommend 
  GROUP BY ip`;
  const hitsResult = await query(queryHit);

  for (let i = 0; i < hitsResult.length; i++) {
    const array = hitsResult[i].company.split(',').map(String);
    dataset.push(array);
  }

  const fpgrowth = new FPGrowth(.6);
  fpgrowth.on('data', function(itemset, error) {
    const items = itemset.items;
    let fpCompany = Array.from(new Set(items));
    if (fpCompany != null) {
      if (fpCompany.length >= 2 && fpCompany.indexOf(company) > 0) {
        fpCompany = fpCompany.filter(function(item) {
          return item !== company;
        });
        if (companylist.indexOf(fpCompany[0])< 0 &&companylist.indexOf(fpCompany[1])< 0) {
          companylist = companylist.concat(fpCompany[0], fpCompany[1]);
        }
      } else if (companylist.indexOf(fpRecommendCompany[0]) < 0) {
        companylist = companylist.concat(fpRecommendCompany[0]);
      }
    }
  },

  );

  fpgrowth.exec(dataset);
  queryCompany =
        `SELECT company
        FROM recommend WHERE company NOT IN (?)
        GROUP BY company ORDER BY COUNT(company) DESC LIMIT ? `;

  switch (companylist.length) {
    case 0:
      let companySelect = await query( queryCompany, [company, 2]);
      companylist[0] =companySelect[0].company;
      companylist[1] = companySelect[1].company;
      break;
    case 1:
      let companyCombination = [];
      companyCombination = companyCombination.concat(company, companylist[0]);
      companySelect = await query(queryCompany, [companyCombination, 1]);
      companylist[1] = companySelect[0].company;
      break;
  }

  return companylist;
}


const filterCompany = async (company) => {
  const queryCompany = `
      SELECT company,MATCH (company) AGAINST (?) AS score 
      FROM salary HAVING score >0.2 ORDER BY score DESC limit 1`;

  let companyResult = await query(queryCompany, [company]);

  if (companyResult.length < 1) {
    const queryCompanyAgain = `
          SELECT main_company AS company 
          FROM company_connection WHERE another_name= ?`;
    companyResult = await query(queryCompanyAgain, [company]);
    if (companyResult.length <1) {
      return 'no';
    }
  }

  companyFiltered = companyResult[0].company;

  return companyFiltered;
};
const filterTitle=async (title)=>{
  if (title.indexOf('工程師')) {
    titleSplit=title.split('工程師')[0].toString();
    title=titleSplit;
  } else (title.indexOf(''));
  {
    titleSplit=title.split(' ').toString();
    title=titleSplit;
  }

  const queryTitle = `
      SELECT career ,category
      FROM career_connection 
      WHERE career=? or category=?`;
  const titleResult = await query(queryTitle, [title, title]);
  if ( titleResult.length>0) {
    const titlesCombination = [];
    titleResult.map((title) => {
      titlesCombination.push(title.career, title.category);
    });
    titlesCombination.push(title);

    const titleFiltered =titlesCombination.join();
    return titleFiltered;
  } else {
    return title;
  }
};
module.exports = {
  fpAlogrithm,
  filterCompany,
  filterTitle,
};
