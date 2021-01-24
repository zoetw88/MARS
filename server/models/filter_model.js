const {query} = require('./mysql');

const filterCompany = async (company) => {
  const queryCompany = `
    (SELECT main_company AS company ,another_name
    FROM company_connection 
    WHERE another_name= ?)
    UNION 
    (SELECT company ,MATCH (company) AGAINST (?) AS score 
    FROM salary 
    HAVING score >0.2
    ORDER BY score DESC limit 1)`;
  const companyResult = await query(queryCompany, [company, company]);

  if (companyResult.length == 0) {
    return 'no';
  };

  companyFiltered = companyResult[0].company;
  return companyFiltered;
};

const filterTitle = async (inputTitle) => {
  const title = clearTitle(inputTitle);
  let checkTitleResult = await queryCareerConnectionTable(title);

  switch (checkTitleResult) {
    case undefined:
      checkTitleResult = await queryTitleExist(title);
      return checkTitleResult;

    default:
      return checkTitleResult;
  }
};

const clearTitle = (title) => {
  let titleSplit;
  title.indexOf('工程師') ? titleSplit = title.split('工程師')[0].toString() : '';
  title.indexOf(' ') ? titleSplit = title.split(' ')[0].toString() : '';
  return titleSplit;
};

const queryCareerConnectionTable = async (title) => {
  let titleFiltered;
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
    const titlelist = Array.from(new Set(titlesCombination));
    titleFiltered = titlelist.join();
  }

  return titleFiltered;
};


const queryTitleExist = async (title) => {
  const queryTitleExist = `
    SELECT title ,MATCH (title) AGAINST (?) AS score 
    FROM salary 
    HAVING score >0.2
    ORDER BY score DESC limit 1`;
  const titleExist = await query(queryTitleExist, [title]);

  return titleExist.length == 0 ? 'no' : title;
};

module.exports = {
  filterCompany,
  filterTitle,
};
