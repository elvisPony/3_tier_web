# 架設網頁
from flask import Flask, render_template, request, jsonify, json
import os
# 連接資料庫
import mysql.connector

# 傳入的 __name__ 參數，代表當前模組的名稱。
# 是固定用法，以便讓 Flask 知道在那裡尋找資源。 (EX: 模板和靜態文件)
# 資料夾名稱有固定且必需與main()放在一起 模板 == temolates , 靜態文件 == static
app = Flask(__name__)

# 連接資料庫
'''
host 為資料庫IP
user 資料庫註冊的使用者名稱(帳號)
passwd 使用者帳號對應的密碼
database 選擇連接的資料庫
'''
mydb = mysql.connector.connect(
    host="10.0.0.12",

    user="web",
    passwd=" ",
    database="rent_car"
)

# 確認狀態
print('\n\n'+'-'*50)
print('state: ')
print(os.getcwd())
print(mydb)
print(mydb.get_server_info())
print(__name__)
print('\n\n'+'-'*50)

# 裝飾器是告訴 Flask，哪個 URL 應該觸發我們的函式。
'''
使用下面程式碼做範例
ex:
10.0.0.11/rent_car
or
10.0.0.11
'''

# test database


@app.route("/rent_car")
def index():
    return render_template('rent_car.html')


@app.route("/get_rent_car_information", methods=['GET'])
def get_mydatabase():
    mycursor = mydb.cursor()
    mycursor.execute("SELECT * FROM bookingInformation")
    myresult = mycursor.fetchall()
    mydatabase = dict()
    for id, date, car in myresult:
        mydatabase[date + car] = True

    mydatabase = json.dumps(mydatabase)
    # print(mydatabase)
    return jsonify(mydatabase)


@app.route("/send_rent_car_day", methods=['POST'])
def rent_car():
    #print('in rent_car')
    if request.method == "POST":
        data = {
            'year': request.form['year'],
            'month': request.form['month'],
            'day': request.form['day'],
            'car': request.form['car'],
        }
    print(data)
    sql = "INSERT INTO bookingInformation (date, car) VALUES (%s, %s)"
    val = (f"{data['year']}-{data['month']}-{data['day']}", data['car'])

    mycursor = mydb.cursor()
    mycursor.execute(sql, val)
    mydb.commit()

    # mycursor.execute("SELECT * FROM bookingInformation")

    # myresult = mycursor.fetchall()

    # for x in myresult:
    #     print(x)
    #     print(type(x))
    return index()
    # return render_template('rent_car.html')


if __name__ == "__main__":
    # 啟動程式 ，debug=True 代表可以hot reload。
    app.run(host='0.0.0.0', debug=True)
