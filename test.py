
import hashlib
import json
import os
import time
import urllib.parse
import urllib.request

import mysql.connector
from bs4 import BeautifulSoup
from dotenv import load_dotenv
from selenium import webdriver
from selenium.webdriver.chrome.options import Options

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

# engine = sqlalchemy.create_engine(f'mysql+pymysql://{DB_USERNAME}:{DB_PASSWORD}@{DB_HOST}:3306/{DB_DATABASE}')
Links = []
if(mydb):
    print("Connect to mysql successfully!")
else:
    print("Oops, connect to mysql unsuccessfully.")
cursor = mydb.cursor()
for i in range(1, 15):
    company = urllib.parse.quote('廣達電腦股份有限公司')
    converted_num = str(i)
    url = 'https://www.goodjob.life/companies/' + \
        company+'/interview-experiences?p='+str(i)

    print(url)
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:23.0) Gecko/20100101 Firefox/23.0'}
    data = urllib.request.Request(url, headers=headers)
    data = urllib.request.urlopen(data).read()
    soup = BeautifulSoup(data, "html.parser")
    divTag = soup.find_all("div", {
                           "class": "src-components-CompanyAndJobTitle-InterviewExperiences-__InterviewExperiences-module___container"})

    for tag in divTag:
        tdTags = tag.find("a").get('href')

        urls = 'https://www.goodjob.life'+tdTags
        print(urls)
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:23.0) Gecko/20100101 Firefox/23.0'}
        data = urllib.request.Request(urls, headers=headers)
        data = urllib.request.urlopen(data).read()
        soup = BeautifulSoup(data, "html.parser")
        divTags = soup.find_all("div", {
                                 "class": "src-components-common-base-__P-module___m src-components-ExperienceDetail-Article-__InfoBlock-module___content"})
        divTagss = soup.find_all("div", {
                                 "class": "src-components-common-base-__P-module___l src-components-ExperienceDetail-Article-__SectionBlock-module___content"})
        compound = []

        for tag in divTags:

            if tag.string is None:
                tag.string = 'wrong'
                compound.append(str(tag.string))

            else:
                compound.append(str(tag.string))

        # sql_insert_query = "INSERT INTO comment(company, address) VALUES (%s, %s)"

        # cursor.execute(sql_insert_query, [compound[0], compound[1]])
        # mydb.commit()
        for tag2 in divTagss:
            if tag2.string is not None:

                compound.append(str(tag2.string))

                # print(compound)

        print(len(compound))
        if len(compound)>8:
            sql_insert_query = "INSERT INTO comment(company, address,title,length,comment_date,hire_status,interview_experience,interview_prepare) VALUES (%s,%s,%s,%s,%s,%s,%s,%s)"
            cursor = mydb.cursor()
            if compound[8]=='wrong':
                cursor.execute(sql_insert_query, [compound[0], compound[1], compound[2],
                                                compound[3], compound[4], compound[5], compound[9], compound[10]])
                mydb.commit()

            elif compound[4]=='錄取':
                cursor.execute(sql_insert_query, [compound[0], compound[1], compound[2],'wrong', compound[3], 'wrong', compound[7], compound[8]])
                mydb.commit()
            
            elif compound[8]=='詢問家庭狀況':
                cursor.execute(sql_insert_query, [compound[0], compound[1], compound[2], compound[3], compound[4], compound[5], compound[9], compound[10]])
                mydb.commit()
            elif compound[8]=='未錄取':
                cursor.execute(sql_insert_query, [compound[0], compound[1], compound[2], compound[3], compound[4], compound[5], compound[9], compound[10]])
                mydb.commit()
            elif compound[8]=='未通知':
                cursor.execute(sql_insert_query, [compound[0], compound[1], compound[2], compound[3], compound[4], compound[5], compound[9], compound[10]])
                mydb.commit()
            elif compound[8]=='沒通知':
                cursor.execute(sql_insert_query, [compound[0], compound[1], compound[2], compound[3], compound[4], compound[5], compound[9], compound[10]])
                mydb.commit()
            else:
                try:
                    cursor.execute(sql_insert_query, [compound[0], compound[1], compound[2],
                                                    compound[3], compound[4], compound[5], compound[8], compound[9]])
                except:
                    cursor.execute(sql_insert_query, [compound[0], compound[1], compound[2],
                                                    compound[3], compound[4], compound[5], compound[7], compound[7]])

                mydb.commit()

# compound=[]
# compound.append(tag.string)
# compound.append(tag2.string)
# print(compound)
