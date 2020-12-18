import requests
from bs4 import BeautifulSoup
import pandas as pd
import json
import re
import time
import os
from IPython.display import display
from IPython.display import clear_output

headers={'user-agents':'GoogleBot'}



url = 'https://static.104.com.tw/category-tool/json/Area.json'
resp = requests.get(url)
df1 = []
for i in resp.json()[0]['n']:
    ndf = pd.DataFrame(i['n'])
    ndf['city'] = i['des']
    df1.append(ndf)
df1=pd.concat(df1, ignore_index=True)
df1 = df1.loc[:,['city','des','no']]
df1 = df1.sort_values('no')
df1.head()

url= 'https://static.104.com.tw/category-tool/json/JobCat.json'
resp = requests.get(url)
df2 = []
for i in resp.json():
    for j in i['n']:
        ndf = pd.DataFrame(j['n'])
        ndf.columns = ['des3','no3']
        ndf['des2'] = j['des']
        ndf['no2'] = j['no']
        ndf['des1'] = i['des']
        ndf['no1'] = i['no']
        df2.append(ndf)
df2 = pd.concat(df2, ignore_index=True)
df2 = df2.sort_values('no3')
df2.head()


df2 = df2.drop_duplicates(['no2']).reset_index(drop=True)
df2.shape

resp.json()[0]['n'][0]['n']


# # tmp = pd.DataFrame([re.sub('\.pkl','',file)for file in os.listdir('./data')],columns=['no'])
# df1 = pd.merge(df1, tmp, how='left',on='no',indicator=True)
# df1 = df1.loc[df1['_merge']!='both',:]
# df1


jobs = []
for areades, areacode in zip(df1['des'],df1['no']):
    values = []
    for jobdes1, jobdes2, jobdes, jobcode in zip(df2['des1'], df2['des2'], df1['des'], df1['no']):
        print(areades, ' | ', jobdes1, ' - ', jobdes2, ' - ' ,jobdes)
        page = 1
        while page <150:
            try:
                url = 'https://www.104.com.tw/jobs/search/?ro=0&jobcat={}&jobcatExpansionType=1&area={}&order=11&asc=0&page={}&mode=s&jobsource=2018indexpoc'.format(jobcode, areacode, page)
                print(url)
                resp = requests.get(url,headers=headers)
                soup = BeautifulSoup(resp.text)
                soup2 = soup.find('div',{'id':'js-job-content'}).findAll('article',{'class':'b-block--top-bord job-list-item b-clearfix js-job-item'})
                print(len(soup2))

                for job in soup2:
                    update_date = job.find('span',{'class':'b-tit__date'}).text
                    update_date = re.sub('\r|\n| ','',update_date)
                    try:
                        address = job.select('ul > li > a')[0]['title']
                        address = re.findall('公司住址：(.*?)$',address)[0]
                    except:
                        address = ''
                   
                    loc = job.find('ul',{'class':'b-list-inline b-clearfix job-list-intro b-content'}).findAll('li')[0].text
                    exp = job.find('ul',{'class':'b-list-inline b-clearfix job-list-intro b-content'}).findAll('li')[1].text
                    try:
                        edu = job.find('ul',{'class':'b-list-inline b-clearfix job-list-intro b-content'}).findAll('li')[2].text
                    except:
                        edu = ''
                    
                    try:
                        content = job.find('p').text
                    except:
                        content = ''
                    try:
                        tags = [tag.text for tag in soup2[0].find('div',{'class':'job-list-tag b-content'}).findAll('span')]
                    except:
                        tags = []
                    
                    
                    value = [job['data-cust-name'], # 公司名稱
                             job['data-cust-no'], # 公司編號
                             job['data-indcat'], # 公司類別
                             job['data-indcat-desc'], # 公司類別描述
                             job.select('ul > li > a')[0]['href'], # 公司連結
                             job['data-job-name'],# 職缺名稱
                             job['data-job-ro'], # 職務性質 _判斷全職兼職 1全職/2兼職/3高階/4派遣/5接案/6家教
                             jobdes1, # 職缺大分類
                             jobdes2, # 職缺中分類
                             jobdes, # 職缺小分類
                             job['data-job-no'],# 職缺編號
                             content, # 職務內容
                             update_date, # 更新日期
                             job.find('a',{'class':'js-job-link'})['href'], # 職缺連結
                             tags, # 標籤
                             address,# 公司地址
                             loc, # 地區
                             exp,# 經歷
                             edu  # 學歷
                            ]
                    values.append(value)
                
                page+=1
                print(len(values))
                if len(soup2) < 20:
                    break
            except:
                print('Retry')
        
    df = pd.DataFrame()
    df = pd.DataFrame(values, columns=columns)
    df.to_pickle('./data/' + areacode + '.pkl')
    clear_output()
    print('===================================  Save Data  ===================================')

    
df = []
for i in os.listdir('./data/'):
    ndf = pd.read_pickle('./data/' + i)
    df.append(ndf)
df = pd.concat(df, ignore_index=True)
df
df.info()

df.to_excel('./JobList.xlsx')