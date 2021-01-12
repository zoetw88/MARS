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
j=-1

# '華碩電腦股份有限公司','群創光電股份有限公司','瑞昱半導體股份有限公司','力成科技股份有限公司','晨星半導體股份有限公司','啟碁科技股份有限公司','日月光半導體製造股份有限公司','泰金寶電通股份有限公司','台灣美光記憶體股份有限公司'
a=['台灣美光記憶體股份有限公司','緯創資通股份有限公司']
for x in a:
    j=j+1
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
                    a[j],
                    title.a.get('title'),
                    edu.text,
                    exp.text,
                    'https://' +company.a.get('href').strip('//')
        )
        
        result.append(data)     
        i=i+1
    sql_insert_query = "INSERT INTO job(company,title,edu,exp,link) VALUES (%s,%s,%s,%s,%s)"
    cursor = mydb.cursor()
    cursor.executemany(sql_insert_query, result)
    mydb.commit()
