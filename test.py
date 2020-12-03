from selenium import webdriver
from selenium.webdriver.chrome.options import Options
import urllib.parse
import time
import urllib.request
from bs4 import BeautifulSoup
from dotenv import load_dotenv
load_dotenv()
import os

import mysql.connector
import sqlalchemy
DB_HOST= os.getenv("DB_HOST")
DB_USERNAME= os.getenv("DB_USERNAME")
DB_PASSWORD= os.getenv("DB_PASSWORD")
DB_DATABASE= os.getenv("DB_DATABASE")
engine = sqlalchemy.create_engine(f'mysql+pymysql://{DB_USERNAME}:{DB_PASSWORD}@{DB_HOST}:3306/{DB_DATABASE}')
if(engine):
    print("Connect to mysql successfully!")
else:
    print("Oops, connect to mysql unsuccessfully.")

Links = []

str=urllib.parse.quote('廣達電腦股份有限公司')
url='https://www.goodjob.life/companies/'+str+'/interview-experiences'


headers = {'User-Agent':'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:23.0) Gecko/20100101 Firefox/23.0'}
data=urllib.request.Request(url, headers=headers)
data=urllib.request.urlopen(data).read()
soup = BeautifulSoup(data, "html.parser")
divTag=soup.find_all("div", {"class" :"src-components-CompanyAndJobTitle-InterviewExperiences-__InterviewExperiences-module___container"})



for tag in divTag:
    tdTags = tag.find("a").get('href')
 

    urls='https://www.goodjob.life'+tdTags

    headers = {'User-Agent':'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:23.0) Gecko/20100101 Firefox/23.0'}
    data=urllib.request.Request(urls, headers=headers)
    data=urllib.request.urlopen(data).read()
    soup = BeautifulSoup(data, "html.parser")
    divTags=soup.find_all("div", {"class" :"src-components-common-base-__P-module___m src-components-ExperienceDetail-Article-__InfoBlock-module___content"})
    divTagss=soup.find_all("div", {"class" :"src-components-common-base-__P-module___l src-components-ExperienceDetail-Article-__SectionBlock-module___content"})
    compound=[]
    for tag in divTags:
        if tag.string is not None:
         
            compound.append(tag.string)
    for tag2 in divTagss:
        if tag2.string is not None:
            tag3=tag2.string.split("\n")
            compound.append(tag3)
        print (compound[6])

    








    # compound=[]
    # compound.append(tag.string)
    # compound.append(tag2.string)
    # print(compound)