import sqlalchemy
import mysql.connector
import hashlib
import json
import os
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
import urllib.parse
import time
import urllib.request
from bs4 import BeautifulSoup
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
compound = []
# engine = sqlalchemy.create_engine(f'mysql+pymysql://{DB_USERNAME}:{DB_PASSWORD}@{DB_HOST}:3306/{DB_DATABASE}')
Links = []
if(mydb):
    print("Connect to mysql successfully!")
else:
    print("Oops, connect to mysql unsuccessfully.")
cursor = mydb.cursor()
for i in range(1, 2):
    company = urllib.parse.quote('廣達電腦股份有限公司')
    converted_num = str(i)
    url = 'https://www.goodjob.life/companies/' + \
        company+'/interview-experiences?p='+str(1)

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

        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:23.0) Gecko/20100101 Firefox/23.0'}
        data = urllib.request.Request(urls, headers=headers)
        data = urllib.request.urlopen(data).read()
        soup = BeautifulSoup(data, "html.parser")
        divTags = soup.find_all("div", {
                                "class": "src-components-common-base-__P-module___m src-components-ExperienceDetail-Article-__InfoBlock-module___content"})
        divTagss = soup.find_all("div", {
                                 "class": "src-components-common-base-__P-module___l src-components-ExperienceDetail-Article-__SectionBlock-module___content"})

        for tag in divTags:

            if tag.string is not None:

                print(tag.string)
                compound.append(str(tag.string))
        
        sql_insert_query = "INSERT INTO comment(company, address) VALUES (%s, %s)"
        
        cursor.execute(sql_insert_query, [compound[0], compound[1]])
        mydb.commit()
        for tag2 in divTagss:
            if tag2.string is not None:

                tag3 = tag2.string.split("\n")
                compound.append(str(tag3))

                # print(compound)

print(compound[0])
sql_insert_query = "INSERT INTO comment(company, address) VALUES (%s, %s)"
cursor = mydb.cursor()
cursor.executemany(sql_insert_query, [compound[0], compound[1]])
mydb.commit()

# compound=[]
# compound.append(tag.string)
# compound.append(tag2.string)
# print(compound)
