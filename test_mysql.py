import mysql.connector

mydb = mysql.connector.connect(
    host="10.0.0.12",

    user="web",
    passwd=" ",
    database="rent_car"
)

mycursor = mydb.cursor()


def use_once():
    mycursor.execute(
        "CREATE TABLE bookingInformation (id INT AUTO_INCREMENT PRIMARY KEY, date VARCHAR(255), car VARCHAR(255))")

    sql = "INSERT INTO bookingInformation (date, car) VALUES (%s, %s)"
    val = ("2022-10-10", "AXK-9113")
    mycursor.execute(sql, val)

    mydb.commit()

    print(mycursor.rowcount, "record inserted.")


# add
sql = "INSERT INTO bookingInformation (date, car) VALUES (%s, %s)"
val = ("2022-10-11", "C8-7630")
mycursor.execute(sql, val)
mydb.commit()


# delete
# sql = "DELETE FROM bookingInformation WHERE id = 2"

# mycursor.execute(sql)

# mydb.commit()
# print(mycursor.rowcount, "record(s) deleted")

mycursor.execute("SELECT * FROM bookingInformation")


myresult = mycursor.fetchall()

for x in myresult:
    print(x)
    print(type(x))

print('-'.join(['2022', '2', '20']))


# mycursor.execute("SHOW DATABASES")

# for x in mycursor:
#     print(x)
