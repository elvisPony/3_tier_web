# 架設網頁
from flask import Flask, render_template

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
print(mydb)
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


@app.route("/")
@app.route("/rent_car")
def index():
    return "Hello world!#"


@app.route('/send_data/int/<int:id>', methods=['GET'])
def queryDataMessageById(id):
    print("type(id) : ", type(id))
    return f"{id}"


@app.route("/index")
def html_mode():
    appInfo = {  # dict
        'id': 5,
        'name': 'Python - Flask',
        'version': '1.0.1',
        'author': 'Enoxs',
        'remark': 'Python - Web Framework'
    }
    return render_template('index.html', appInfo=appInfo)


@app.route('/static')
def staticPage():
    return render_template('static.html')


if __name__ == "__main__":
    # 啟動程式 ，debug=True 代表可以hot reload。
    app.run(host='0.0.0.0', debug=True)
