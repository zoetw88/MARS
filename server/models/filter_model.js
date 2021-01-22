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

  if (companyResult.length ==0) {
    return 'no';
  }
  companyFiltered = companyResult[0].company;
  return companyFiltered;
};

const filterTitle = async (title) => {
  if (typeof title === 'number') {
    return 'no';
  }
  if (title.indexOf('工程師')) {
    titleSplit = title.split('工程師')[0].toString();
    title = titleSplit;
  }
  if (title.indexOf(' ')) {
    titleSplit = title.split(' ')[0].toString();
    title = titleSplit;
  }
  // check title is avaliable or not
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
    const titleFiltered = titlelist.join();
    return titleFiltered;
  }

  // check title is exist if it is not in career_connection table
  const queryTitleExist = `
    SELECT title ,MATCH (title) AGAINST (?) AS score 
    FROM salary 
    HAVING score >0.2
    ORDER BY score DESC limit 1`;
  const titleExist = await query(queryTitleExist, [title]);
  if (titleExist.length== 0) {
    return 'no';
  }
  return title;
};


module.exports = {
  filterCompany,
  filterTitle,
};

