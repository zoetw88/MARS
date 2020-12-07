
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
for x in ['鴻海精密工業股份有限公司','仁寶電腦工業股份有限公司','英業達股份有限公司','台達電子工業股份有限公司']:
    for i in range(1, 15):
        company = urllib.parse.quote(x)
        converted_num = str(i)
        url = 'https://www.goodjob.life/companies/' + \
            company+'/salary-work-times?p='+str(i)

        print(url)
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:23.0) Gecko/20100101 Firefox/23.0'}
        data = urllib.request.Request(url, headers=headers)
        data = urllib.request.urlopen(data).read()
        soup = BeautifulSoup(data, "html.parser")
        table = soup.find_all("table", {
            "class": "src-components-common-table-__Table-module___rwdTable src-components-TimeAndSalary-common-__WorkingHourTable-module___companyTable"})
        tab = table[0]
        for tr in tab.tbody.findAll('tr'):
            data=[]
            data.append(x)
            k=0
            for td in tr.findAll('td'):
                text = td.getText() 
                data.append(str(text))
                k=k+1
         

            if(data[7].rfind('年')>0):
                data[7]=data[7].rstrip('/ 年').replace(',','').replace(',','')
            elif(data[7].rfind('月')>0):
                cal=data[7].rstrip('/ 月')
                data[7]=int(cal.replace(',',''))*12
            elif(str(data[7]).rfind('時')>0):
                cal_hour=str(data[7]).rstrip('/ 小時')
                data[7]=int(cal_hour)*12*8*20
            

            
            if(data[6].rfind('年')>0):
                data[6]=data[6].rstrip('年')
            
            print(data[6])
            sql_insert_query = "INSERT INTO salary(company,title,type,working_time,working_hour,work_overtime,experience,salary,salary_hour,time) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"
            cursor = mydb.cursor()
            cursor.execute(sql_insert_query, [data[0],data[1],data[2],data[3],data[4],data[5],data[6],data[7],data[8],data[9]])
            mydb.commit()
        #         if compound[8] == 'wrong':
                    # cursor.execute(sql_insert_query, [compound[0], compound[1], compound[2],
                    #                                   compound[3], compound[4], compound[5], compound[9], compound[10]])
        #             mydb.commit()

        #         elif compound[4] == '錄取':
        #             cursor.execute(sql_insert_query, [
        #                            compound[0], compound[1], compound[2], 'wrong', compound[3], 'wrong', compound[7], compound[8]])
        #             mydb.commit()

        #         elif compound[8] == '詢問家庭狀況':
        #             cursor.execute(sql_insert_query, [
        #                            compound[0], compound[1], compound[2], compound[3], compound[4], compound[5], compound[9], compound[10]])
        #             mydb.commit()
        #         elif compound[8] == '未錄取':
        #             cursor.execute(sql_insert_query, [
        #                            compound[0], compound[1], compound[2], compound[3], compound[4], compound[5], compound[9], compound[10]])
        #             mydb.commit()
        #         elif compound[8] == '未通知':
        #             cursor.execute(sql_insert_query, [
        #                            compound[0], compound[1], compound[2], compound[3], compound[4], compound[5], compound[9], compound[10]])
        #             mydb.commit()
        #         elif compound[8] == '沒通知':
        #             cursor.execute(sql_insert_query, [
        #                            compound[0], compound[1], compound[2], compound[3], compound[4], compound[5], compound[9], compound[10]])
        #             mydb.commit()
        #         else:
        #             try:
        #                 cursor.execute(sql_insert_query, [compound[0], compound[1], compound[2],
        #                                                   compound[3], compound[4], compound[5], compound[8], compound[9]])
        #             except:
        #                 cursor.execute(sql_insert_query, [compound[0], compound[1], compound[2],
        #                                                   compound[3], compound[4], compound[5], compound[7], compound[7]])

        #             mydb.commit()
