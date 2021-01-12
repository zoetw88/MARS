const {
  FPGrowth,
} = require('../algorithm/fpgrowth/fpgrowth');
const {
  query,
} = require('./mysql');


/**
 * recommend company based on another users search history
 * @param {String} company
 * @param {String} title
 * @return {array} companylist recommendation
 */
const recommendCompany = async (company, title) => {
  let companylist = [];
  const dataset = [];
  const queryHit = `
  WITH titlelist AS(
    SELECT title ,MATCH (title) AGAINST (?) AS score ,ip
        FROM recommend 
        HAVING score >0.0003
        ORDER BY score 
       )
  SELECT ip,GROUP_CONCAT(search_company) AS search_company,title
  FROM recommend 
  WHERE title IN(select title from titlelist) AND search_time > DATE_SUB(NOW(), INTERVAL 90 day)
  GROUP BY ip`;
  const hitsResult = await query(queryHit, [title]);

  hitsResult.map((data) => {
    const array = data.search_company.split(',').map(String);
    dataset.push(array);
  });
  const fpgrowth = new FPGrowth(.7);
  fpgrowth.on('data', function(itemset, error) {
    const items = itemset.items;
    let fpCompany = Array.from(new Set(items));
    if (fpCompany.length >= 2 && fpCompany[0] == company) {
      fpCompany = fpCompany.filter(function(item) {
        return item !== company;
      });
      switch (fpCompany.length) {
        case 1:
          companylist[0] = fpCompany[0];
          break;

        case 2:
          companylist[0] = fpCompany[0];
          companylist[1] = fpCompany[1];
          break;
      }
    }
    if (error) throw error;
  });

  fpgrowth.exec(dataset);
  if (title != null || title != undefined) {
    queryCompany =`
    WITH titlelist AS(
      SELECT title ,MATCH (title) AGAINST (?) AS score ,ip
      FROM recommend 
      HAVING score >0.0003
      ORDER BY score 
      )
    SELECT search_company
    FROM recommend 
    WHERE search_company NOT IN (?) AND title IN(select title from titlelist)
    GROUP BY search_company ORDER BY COUNT(search_company) DESC LIMIT ? `;

    switch (companylist.length) {
      case 0:
        const companySelect = await query(queryCompany, [title, company, 2]);

        if (companySelect.length > 1) {
          companylist[0] = companySelect[0].search_company;
          companylist[1] = companySelect[1].search_company;
          break;
        } else if (companySelect.length > 0) {
          companylist[0] = companySelect[0].search_company;
        } else {
          companylist = await topSearchCompany(company, companylist);
        }
      case 1:
        let companyCombination = [];
        companyCombination = companyCombination.concat(company, companylist[0]);
        companySecond = await query(queryCompany, [title, companyCombination, 1]);
        if (companySecond .length > 0) {
          companylist[1] = companySecond [0].search_company;
          break;
        } else {
          companylist = await topSearchCompany(company, companylist);
        }
    }
  } else {
    companylist = await topSearchCompany(company, companylist);
  }

  return companylist;
};


const topSearchCompany= async (company, companylist)=>{
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

const filterCompany = async (company) => {
  const queryCompany = `
  (SELECT company ,MATCH (company) AGAINST (?) AS score 
  FROM salary 
  HAVING score >10
  ORDER BY score DESC limit 1)
  UNION 
  (SELECT main_company AS company ,another_name
  FROM company_connection 
  WHERE another_name= ?)`;
  const companyResult = await query(queryCompany, [company, company]);

  if (companyResult.length > 0) {
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
    const titlelist= Array.from(new Set(titlesCombination));
    const titleFiltered = titlelist.join();

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
