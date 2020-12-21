import pandas as pd
import os
import re
import time
import requests
from selenium import webdriver
from bs4 import BeautifulSoup
import mysql.connector
import urllib.parse
import urllib.request
from dotenv import load_dotenv

load_dotenv()
DB_HOST = os.getenv("DB_HOST")
DB_USERNAME = os.getenv("DB_USERNAME")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_DATABASE = os.getenv("DB_DATABASE")

mydb = mysql.connector.connect(
    host=DB_HOST,
    user=DB_USERNAME,
    password=DB_PASSWORD,
    database='wenChang'
)

for x in['和碩聯合科技股份有限公司']:
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.103 Safari/537.36'}
    company_key=x
    my_params = {'ro': '1', 
                'keyword':company_key,  
                #  'area': '6001001000',  
                'isnew': '30', 
                'mode': 'l'}  

    url = requests.get('https://www.104.com.tw/jobs/search/?',
                    my_params, headers=headers).url
    driver = webdriver.Chrome('./chromedriver.exe')
    driver.get(url)

    for i in range(2):
        driver.execute_script('window.scrollTo(0, document.body.scrollHeight);')
        time.sleep(0.6)


    k = 1
    while k != 0:
        try:
        
            driver.find_elements_by_class_name("js-more-page",)[-1].click()
    
            print('Click 手動載入，' + '載入第' + str(15 + k) + '頁')
            k = k+1
            time.sleep(1)  
        except:
            k = 0
            print('No more Job')


    soup = BeautifulSoup(driver.page_source, 'html.parser')
    List = soup.find_all('article',{'class':'js-job-item'})

   

    result=[]
    i = 0
    while i < len(List):
        
        content = List[i]
        
        company=content.find('li',{"class":"job-mode__company"})
      
   

        title=content.find('li',{"class":"job-mode__jobname"})
        edu=content.find('li',{"class":"job-mode__edu"})
        exp=content.find('li',{"class":"job-mode__exp"})
        
        data=  (
                    '和碩聯合科技股份有限公司',
                    title.a.get('title'),
    #                 # '工作內容':soup2.find('p',{'class',"mb-5 r3 job-description__content text-break"}),
    #                 # '職務類別':soup2.find("('div', {'class': 'trigger'})>u"),
    #                 # '工作待遇':soup2.find("('div', {'class': 'col p-0 mr-4 job-description-table__head'})>h3"),
    #                 # '工作性質':soup2.find_next_sibling("('div', {'class': 'col p-0 mr-4 job-description-table__head'})>h3"),
    #                 # '上班地點':soup2.select('div > dl > dd')[3].text.split('\n\n', 2)[0].split('\n', 2)[1].replace(' ', ''),
    #                 # '管理責任':soup2.select('div > dl > dd')[4].text,
    #                 # '出差外派':soup2.select('div > dl > dd')[5].text,
    #                 # '上班時段':soup2.select('div > dl > dd')[6].text,
    #                 # '休假制度':soup2.select('div > dl > dd')[7].text,
    #                 # '可上班日':soup2.select('div > dl > dd')[8].text,
    #                 # '需求人數':soup2.select('div > dl > dd')[9].text,
    #                 # '接受身份':soup2.select('div.content > dl > dd')[10].text,
                    edu.text,
                    exp.text,
    #                 # '語文條件':soup2.select('div.content > dl > dd')[14].text,
    #                 # '擅長工具':soup2.select('div.content > dl > dd')[15].text,
    #                 # '工作技能':soup2.select('div.content > dl > dd')[16].text,
    #                 # '其他條件':soup2.select('div.content > dl > dd')[17].text,
    #                 # '公司福利':soup2.select('div.content > p')[1].text,
    #                 # '科系要求':soup2.select('div.content > dl > dd')[13].text,
    #                 # '聯絡方式':soup2.select('div.content')[3].text.replace('\n', ''),
                    'https://' +company.a.get('href').strip('//')
        )
        
        result.append(data)     
        i=i+1
    sql_insert_query = "INSERT INTO job(company,title,edu,exp,link) VALUES (%s,%s,%s,%s,%s)"
    cursor = mydb.cursor()
    cursor.executemany(sql_insert_query, result)
    mydb.commit()
# def bind(cate):
#     k = []
#     for i in cate:
#         if len(i.text) > 0:
#             k.append(i.text)
#     return str(k)


# JobList = pd.DataFrame()

# i = 0
# while i < len(List):
   
#     content = List[i]
# data = urllib.request.Request('https://www.104.com.tw/job/6lh82?jobsource=n104bank2', headers=headers)
# data.encoding = 'utf8'
# print(data.encoding)
# data = urllib.request.urlopen(data).read()
# soup2 = BeautifulSoup(data, "html.parser")

# resp = requests.get('https://www.104.com.tw/job/6lh82?jobsource=n104bank2')
#     # resp = requests.get('https://' + content.attrs['href'].strip('//'))

# # soup2 = BeautifulSoup(resp.text, 'html.parser')

# print(soup2.prettify())
# df = pd.DataFrame(
#             data= [ {
#                 '公司名稱':soup2.find('a', {'class':' btn-link t3 mr-6'}),
#                 '工作職稱':soup2.find('h1',{"class":"pr-6 text-break text-truncate"}),
#                 '工作內容':soup2.find('p',{'class',"mb-5 r3 job-description__content text-break"}),
#                 '職務類別':soup2.find("('div', {'class': 'trigger'})>u"),
#                 '工作待遇':soup2.find("('div', {'class': 'col p-0 mr-4 job-description-table__head'})>h3"),
#                 '工作性質':soup2.find_next_sibling("('div', {'class': 'col p-0 mr-4 job-description-table__head'})>h3"),
#                 # '上班地點':soup2.select('div > dl > dd')[3].text.split('\n\n', 2)[0].split('\n', 2)[1].replace(' ', ''),
#                 # '管理責任':soup2.select('div > dl > dd')[4].text,
#                 # '出差外派':soup2.select('div > dl > dd')[5].text,
#                 # '上班時段':soup2.select('div > dl > dd')[6].text,
#                 # '休假制度':soup2.select('div > dl > dd')[7].text,
#                 # '可上班日':soup2.select('div > dl > dd')[8].text,
#                 # '需求人數':soup2.select('div > dl > dd')[9].text,
#                 # '接受身份':soup2.select('div.content > dl > dd')[10].text,
#                 # '學歷要求':soup2.select('div.content > dl > dd')[12].text,
#                 # '工作經歷':soup2.select('div.content > dl > dd')[11].text,
#                 # '語文條件':soup2.select('div.content > dl > dd')[14].text,
#                 # '擅長工具':soup2.select('div.content > dl > dd')[15].text,
#                 # '工作技能':soup2.select('div.content > dl > dd')[16].text,
#                 # '其他條件':soup2.select('div.content > dl > dd')[17].text,
#                 # '公司福利':soup2.select('div.content > p')[1].text,
#                 # '科系要求':soup2.select('div.content > dl > dd')[13].text,
#                 # '聯絡方式':soup2.select('div.content')[3].text.replace('\n', ''),
#                 # '連結路徑':'https://' + content.attrs['href'].strip('//')
#                 }],
#             columns=[ '工作內容', '職務類別', '工作待遇', '工作性質'])
# JobList = JobList.append(df, ignore_index=True)
#     # i += 1
# # print("Success and Crawl Next 目前正在爬第" + str(i) + "個職缺資訊")
# time.sleep(0.5)  
#     # except:
#     #     print("Fail and Try Again!")

# JobList;

# JobList.to_excel('C:/Users/zoetw/Desktop/JobList2.xlsx', encoding='cp950')
# print(JobList)