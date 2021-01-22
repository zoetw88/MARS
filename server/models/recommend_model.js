const {FPGrowth} = require('../algorithm/fpgrowth/fpgrowth');
const {query} = require('./mysql');

const recommendCompany = async (company, title) => {
  try {
    let companylist = [];
    let dataset = [];
    
    (title == null || title == undefined) && (companylist = await searchCompanyWithoutTitle(company, companylist));

    dataset = await organizeSearchHistory(title);

    const fpgrowth = new FPGrowth(.4);
    fpgrowth.on('data', function(itemset) {
      const items = itemset.items;
      const fpCompany = Array.from(new Set(items));
      companylist = extractFPresult(fpCompany, company);
    });
    fpgrowth.exec(dataset);

    companylist.length < 2 && (companylist =await selectCompanyByAnotherWay(title, company, companylist));

    return companylist;
  } catch (error) {
    return error;
  }
};

const organizeSearchHistory = async (title) => {
  const eachHistoryset = [];
  const queryHit = `
  WITH titlelist AS(
    SELECT title ,MATCH (title) AGAINST (?) AS score ,ip
    FROM recommend 
    HAVING score >0.0003
    ORDER BY score 
       )
  SELECT ip,GROUP_CONCAT(search_company) AS search_company,title
  FROM recommend 
  WHERE title IN (select title from titlelist) AND search_time > DATE_SUB(NOW(), INTERVAL 90 day)
  GROUP BY ip`;
  const hitsResult = await query(queryHit, [title]);
  hitsResult.map((data) => {
    const array = data.search_company.split(',').map(String);
    eachHistoryset.push(array);
  });
  return eachHistoryset;
};

const extractFPresult = async (fpCompany, company) => {
  const companylist = [];
  (fpCompany.length >= 2 && fpCompany[0] == company) && (fpCompany = fpCompany.filter(function(item) {
    return item !== company;
  }));

  switch (fpCompany.length) {
    case 1:
      companylist[0] = fpCompany[0];
      break;
    case 2:
      companylist[0] = fpCompany[0];
      companylist[1] = fpCompany[1];
      break;
  }
  return companylist;
};

const selectCompanyByAnotherWay = async (title, company, companylist) => {
  queryCompany = `
  WITH titlelist AS(
    SELECT title ,MATCH (title) AGAINST (?) AS score ,ip
    FROM recommend 
    HAVING score >0.0003  ORDER BY score 
    )
  SELECT search_company
  FROM recommend 
  WHERE search_company NOT IN (?) AND title IN(select title from titlelist)
  GROUP BY search_company ORDER BY COUNT(search_company) LIMIT ? `;

  switch (companylist.length) {
    case 0:
      const companySelect = await query(queryCompany, [title, company, 2]);
      switch (companySelect.length) {
        case 2:
          companylist[0] = companySelect[0].search_company;
          companylist[1] = companySelect[1].search_company;
          break;

        case 1:
          companylist[0] = companySelect[0].search_company;
          break;

        default:
          companylist = await topSearchCompany(company, companylist);
          break;
      }

    case 1:
      let companyCombination = [];
      companyCombination.push(company, companylist[0]);
      const companySecond = await query(queryCompany, [title, companyCombination, 1]);
   
      switch (companySecond.length) {
        case 1:
          companylist[1] = companySecond[0].search_company;
          break;

        default:
          companylist = await topSearchCompany(company, companylist);
          break;
      }
  }
  return companylist;
};

const searchCompanyWithoutTitle= async (company, companylist) => {
  queryCompany = `
  SELECT search_company
  FROM recommend 
  WHERE search_company NOT IN (?) 
  GROUP BY search_company ORDER BY COUNT(search_company) DESC LIMIT ? `;

  switch (companylist.length) {
    case 0:
      const companySelect = await query(queryCompany, [company, 2]);
      companylist[0] = companySelect[0].search_company;
      companylist[1] = companySelect[1].search_company;
      break;

    case 1:
      let companyCombination = [];
      companyCombination = companyCombination.concat(company, companylist[0]);
      companyS = await query(queryCompany, [companyCombination, 1]);
      companylist[1] = companyS[0].search_company;
      break;
  }
  return companylist;
};

module.exports = {
  recommendCompany,
};
