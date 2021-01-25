const {
  FPGrowth,
} = require('../algorithm/fpgrowth/fpgrowth'); ;
const {
  query,
} = require('./mysql');
const recommendCompany = async (company, title) => {
  try {
    let companylist;
    const allFPresult = [];
    const dataset = await organizeSearchHistory(title);
   
    const fpgrowth = new FPGrowth(.6);
    
    fpgrowth.on('data', function(itemsets) {
      let items = itemsets.items;
      
      if (items[0]== company && items.length >=2) {
        let fpCompany = Array.from(new Set(items));
        allFPresult.push(fpCompany);
      }
      
    });
 
    fpgrowth.exec(dataset);
   
    companylist = extractFPresult(allFPresult);
    (companylist.length < 2 && title == null) ? (companylist = await searchCompanyWithoutTitle(company, companylist)) : '';
    (companylist.length < 2) ? (companylist = await selectCompanyByAnotherWay(title, company, companylist)) : '';
   
   
    return companylist;
  } catch (error) {
    return error;
  }
};

const organizeSearchHistory = async (title) => {
  const eachHistoryset = [];
  let hitsResult;
  switch (title) {
    case null:
      const queryHit = `
      SELECT ip,GROUP_CONCAT(search_company) AS search_company
      FROM recommend 
      WHERE search_time > DATE_SUB(NOW(), INTERVAL 90 day)
      GROUP BY ip`;
      hitsResult = await query(queryHit);
      break;

    default:
      const queryHitWithTitle = `
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
      hitsResult = await query(queryHitWithTitle, [title]);
      break;
  };
  hitsResult.map((data) => {
    array = data.search_company.split(',').map(String);
    eachHistoryset.push(array);
  });
  return eachHistoryset;
};

const extractFPresult = (allFPresult) => {
  const companylist = [];
  for (i = 0; i < allFPresult.length; i++) {
    switch (allFPresult[i].length) {
      case 3:
        companylist[0] = allFPresult[i][1];
        companylist[1] = allFPresult[i][2];
        break;

      case 2:
        companylist[0] = allFPresult[i][1];
        break;
    }
    if (companylist.length >= 2) {
      break;
    }
  }
  return companylist;
};

const selectCompanyByAnotherWay = async (title, company, companylist) => {
  const companySelect = await searchCompany(title, company, companylist);
  switch (companySelect.length) {
    case 2:
      companylist[0] = companySelect[0].search_company;
      companylist[1] = companySelect[1].search_company;
      break;

    case 1:
      companylist[1] = companySelect[0].search_company;
      break;

    default:
      companylist = await searchCompanyWithoutTitle(company, companylist);
      break;
  }
  return companylist;
};

const searchCompany = async (title, company, companylist) => {
  let companySelect;
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
      companySelect = await query(queryCompany, [title, company, 2]);

    case 1:
      const companyCombination = [];
      companyCombination.push(company, companylist[0]);
      companySelect = await query(queryCompany, [title, companyCombination, 1]);
  }
  return companySelect;
};
const searchCompanyWithoutTitle = async (company, companylist) => {
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
      companyCombination = companyCombination.push(company, companylist[0]);
      companyS = await query(queryCompany, [companyCombination, 1]);
      companylist[1] = companyS[0].search_company;
      break;
  }
  return companylist;
};

module.exports = {
  recommendCompany,
};
