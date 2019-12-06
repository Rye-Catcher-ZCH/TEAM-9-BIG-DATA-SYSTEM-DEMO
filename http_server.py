# coding:utf-8
from utils import *
from flask import Flask, request, session, jsonify, render_template, make_response
import os
import shutil
import base64
import time
import numpy as np
import json
from PIL import Image
from PIL import ImageDraw
from PIL import ImageFont
import random
from io import BytesIO
from pprint import pprint

app = Flask(__name__)
app.config['SECRET_KEY'] = os.urandom(24)   #设置一个随机24位字符串为加密盐。
app.config['JSON_AS_ASCII'] = False
app.jinja_env.variable_start_string = '{{{{'
app.jinja_env.variable_end_string = '}}}}'


def get_random_color():
    # 获取一个随机颜色
    c1 = random.randint(0, 255)
    c2 = random.randint(0, 255)
    c3 = random.randint(0, 255)
    return c1, c2, c3


def get_random_veri_pic():
    # 获取一个随机验证码图片的base64编码二进制串
    rand_str = ''.join(random.sample(list("123456789qwertyupasdfghjkzxcvbnmQWERTYUPASDFGHJKZXCVBNM"), 4))
    truth_str = rand_str.lower()
    rand_str = " " + rand_str[0] + "  " + rand_str[1] + "  " + rand_str[2] + "  " + rand_str[3]
    img_rc = get_random_color()
    text_rc = get_random_color()
    while np.sqrt(np.sum(np.square(np.array(img_rc) - np.array(text_rc)))) < 200:
        img_rc = get_random_color()
        text_rc = get_random_color()
    image = Image.new('RGB', (120, 35), img_rc)
    draw = ImageDraw.Draw(image)
    font = ImageFont.truetype("BuxtonSketch.ttf", size=28)
    draw.text((0, 0), rand_str, text_rc, font=font)
    f = BytesIO()
    image.save(f, 'png')
    data = f.getvalue()
    data = base64.b64encode(data)
    return truth_str, data

'''
def lamb_func(df):
    timeArray = time.strptime(df, "%Y-%m-%d %H:%M:%S")
    return int ( time.mktime(timeArray))


def final ( year,month ):
    dict={1:31,3:31,4:30,5:31,6:30,7:31,8:31,9:30,10:31,11:30,12:31}
    if month ==2:
        if year %4 ==0 :
            return 29
        return 28
    return dict [month]


def func (mmap):
    lis = []
    for i in mmap.keys():
        lis.append([i,mmap[i]])
    return lis


def convert(x):
    if isinstance(x, np.int64):
        x = int(x)
        return x


class DataManager(object):
    def __init__(self, filename, filename_today):
        self.year = 2018
        self.month = 10
        self.day = 30
        self.flag = 0  # 该标志的变化预示着今日数据的添加
        self.filename = filename  # 数据来源文件名
        self.filename_today = filename_today
        self.base = pd.read_csv(self.filename, encoding='gbk')
        buffer = self.base.pop('CREATE_TIME')
        self.base['CREATE_TIME'] = buffer.apply(lambda r: lamb_func(r))
        self.base['label'] = buffer.apply(lambda r: r)
        self.lis = list(self.base.columns)
        self.q1lis = ['投诉', '咨询', '建议', '求决', '-', '感谢', '其他']
        self.SIlis = ['3', '100', '101', '102', '103', '104', '105', '-']
        self.map = {'市容环卫': '5', '环保水务': '3', '市政设施': '6', '规土城建': '4', '教育卫生': '11', '安全隐患': '1', '组织人事': '12',
                    '党纪政纪': '14', '劳动社保': '8', '社区管理': '17', '交通运输': '7', '治安维稳': '2', '专业事件采集': '695', '统一战线': '16',
                    '民政服务': '15', '文体旅游': '10', '食药市监': '9', '党建群团': '13', '-': '-'}
        self.ETNlis = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17',
                       '695', '-']
        self.CIlis = ['10007', '10022', '10013', '10012', '10019', '10004', '10014', '10020', '10016', '10005',
                      '10009', '10002', '10015', '10010', '10003', '10018', '10017', '10021', '10006', '10008',
                      '10011', '10001', '-', '10000', '0']
        self.OANlis = ['0', '1', '-', 'total']

        self.buffer = pd.DataFrame(columns=self.lis, index=range(0, 10000))
        t = threading.Thread(target=self.load_data, args=())
        t.start()

    def load_data(self):
        ori_data = pd.read_csv(self.filename_today, encoding='gbk')
        buffer = ori_data.pop('CREATE_TIME')

        ori_data['CREATE_TIME'] = buffer.apply(lambda r: lamb_func(r))
        ori_data['label'] = buffer.apply(lambda r: r)

        for i in range(len(ori_data)):
            time.sleep(5.0)
            self.buffer.loc[i] = ori_data.loc[i]
            self.flag += 1
            if self.flag == 2147483647:
                self.flag = 0

    def get_flag(self):
        return self.flag

    def q1_logic(self, from_year, from_month, from_day, to_year, to_month, to_day, rq_str):
        a = datetime.datetime(from_year, from_month, from_day, 0, 0, 0).timestamp()
        b = datetime.datetime(to_year, to_month, to_day, 23, 59, 59).timestamp()
        mmap = dict.fromkeys(self.q1lis, 0)
        for i in range(len(self.base)):
            m = self.base.loc[i]['CREATE_TIME']
            if a <= m <= b:
                j = self.base.iloc[i]['EVENT_PROPERTY_NAME']
                mmap[j] += 1
        for i in range(self.flag):
            m = self.buffer.loc[i]['CREATE_TIME']
            if a <= m <= b:
                j = self.buffer.iloc[i]['EVENT_PROPERTY_NAME']
                mmap[j] += 1

        data = json.dumps([{"type": "a", "a_type": "a1", "data": ["按目的区分", func(mmap)], "rq_str": rq_str}])
        data = data[1:-1]

        return data

    def q2_logic(self, is_today, year, month, rq_str):
        a = datetime.datetime(year, month, 1, 0, 0, 0).timestamp()
        b = datetime.datetime(year, month, final(year, month), 23, 59, 59).timestamp()
        if is_today == 1:
            b = 0
        mmap = {}
        for i in self.SIlis:
            mmap[i] = dict.fromkeys(self.ETNlis, 0)

        for i in range(len(self.base)):
            m = self.base.loc[i]['CREATE_TIME']
            if a <= m <= b:
                j = self.base.iloc[i]['STREET_ID']
                k = self.map[self.base.iloc[i]['EVENT_TYPE_NAME']]
                mmap[j][k] += 1

        for i in range(self.flag):
            m = self.buffer.loc[i]['CREATE_TIME']
            if a <= m <= b:
                j = self.buffer.iloc[i]['STREET_ID']
                k = self.map[self.buffer.iloc[i]['EVENT_TYPE_NAME']]
                mmap[j][k] += 1

            elif is_today == 1:
                j = self.buffer.iloc[i]['STREET_ID']
                k = self.map[self.buffer.iloc[i]['EVENT_TYPE_NAME']]
                mmap[j][k] += 1

        base = []
        for i in mmap.keys():
            base.append([i, func(mmap[i])])

        data = json.dumps([{"type": "a", "a_type": "a2", "data": base, "rq_str": rq_str}])
        data = data[1:-1]

        return data

    def q3_logic(self, is_today, year, month, rq_str):

        a = datetime.datetime(year, month, 1, 0, 0, 0).timestamp()
        b = datetime.datetime(year, month, final(year, month), 23, 59, 59).timestamp()
        if is_today == 1:
            b = 0
        mmap = dict.fromkeys(self.CIlis, 0)
        for i in range(len(self.base)):
            m = self.base.loc[i]['CREATE_TIME']
            if a <= m <= b:
                j = self.base.iloc[i]['COMMUNITY_ID']
                k = self.base.iloc[i]['OVERTIME_ARCHIVE_NUM']
                try:
                    mmap[j] += 5 + 5 * int(k)
                except Exception as e:
                    continue

        for i in range(self.flag):
            m = self.buffer.loc[i]['CREATE_TIME']
            if a <= m <= b:
                j = self.buffer.iloc[i]['COMMUNITY_ID']
                k = self.buffer.iloc[i]['OVERTIME_ARCHIVE_NUM']
                try:
                    mmap[j] += 5 + 5 * int(k)
                except Exception as e:
                    continue

            elif is_today == 1:
                j = self.buffer.iloc[i]['COMMUNITY_ID']
                k = self.buffer.iloc[i]['OVERTIME_ARCHIVE_NUM']
                try:
                    mmap[j] += 5 + 5 * int(k)
                except Exception as e:
                    continue

        maxi = 1
        for i in mmap.keys():
            maxi = max(maxi, mmap[i])
        for i in mmap.keys():
            mmap[i] = int(mmap[i] * 100 / maxi)

        data = json.dumps([{"type": "a", "a_type": "a3", "data": func(mmap), "rq_str": rq_str}])
        data = data[1:-1]

        return data

    def q4_logic(self, from_year, from_month, from_day, to_year, to_month, to_day, rq_str):
        a = datetime.datetime(from_year, from_month, from_day, 0, 0, 0).timestamp()
        b = datetime.datetime(to_year, to_month, to_day, 23, 59, 59).timestamp()
        mmap = {}
        h = 'total'

        for i in self.OANlis:
            mmap[i] = dict.fromkeys(self.ETNlis, 0)

        for i in range(len(self.base)):
            m = self.base.loc[i]['CREATE_TIME']
            if a <= m <= b:
                j = self.base.iloc[i]['OVERTIME_ARCHIVE_NUM']
                k = self.map[self.base.iloc[i]['EVENT_TYPE_NAME']]
                mmap[h][k] += 1
                mmap[j][k] += 1
                try:
                    sum += int(j)
                except Exception as e:
                    continue

        for i in range(self.flag):
            m = self.buffer.loc[i]['CREATE_TIME']
            if a <= m <= b:
                j = self.buffer.iloc[i]['OVERTIME_ARCHIVE_NUM']
                k = self.map[self.base.iloc[i]['EVENT_TYPE_NAME']]
                mmap[h][k] += 1
                mmap[j][k] += 1
                try:
                    sum += int(j)
                except Exception as e:
                    continue

        base = []
        for i in mmap.keys():
            base.append([i, func(mmap[i])])
        data = json.dumps([{"type": "a", "a_type": "a4", "data": base, "rq_str": rq_str}])
        data = data[1:-1]

        return data

    def q5_logic(self, rq_str):
        lis = []
        sum = 0

        for i in range(len(self.base)):
            j = self.base.iloc[i]['OVERTIME_ARCHIVE_NUM']
            k = int(self.base.iloc[i]['CREATE_TIME'])
            if j != '1':
                continue
            __v = self.base.loc[i]
            lis.append(list(__v[['label', 'STREET_NAME', 'COMMUNITY_NAME', 'EVENT_SRC_NAME', 'SUB_TYPE_NAME',
                                 'EVENT_PROPERTY_NAME', 'DISPOSE_UNIT_NAME']]))
            sum += 1

        for i in range(self.flag):
            j = self.buffer.iloc[i]['OVERTIME_ARCHIVE_NUM']
            k = int(self.buffer.iloc[i]['CREATE_TIME'])
            if j != '1':
                continue
            __v = self.buffer.loc[i]
            lis.append(list(__v[['label', 'STREET_NAME', 'COMMUNITY_NAME', 'EVENT_SRC_NAME', 'SUB_TYPE_NAME',
                                 'EVENT_PROPERTY_NAME', 'DISPOSE_UNIT_NAME']]))
            sum += 1

        lis = sorted(lis, key=lambda r: r[0])
        if len(lis) > 40:
            lis = lis[0:40]
        data = json.dumps([{"type": "a", "a_type": "a5", "data": lis, "rq_str": rq_str}])
        data = data[1:-1]
        return data

    def q_logic(self, jpd, rq_str):
        if jpd["q_type"] == "q1":
            data = self.q1_logic(jpd["from"]["year"], jpd["from"]["month"], jpd["from"]["day"],
                                 jpd["to"]["year"], jpd["to"]["month"], jpd["to"]["day"], rq_str)
        elif jpd["q_type"] == "q2":
            data = self.q2_logic(jpd["today"] == "true", jpd["year"], jpd["month"], rq_str)
        elif jpd["q_type"] == "q3":
            data = self.q3_logic(jpd["today"] == "true", jpd["year"], jpd["month"], rq_str)
        elif jpd["q_type"] == "q4":
            data = self.q4_logic(jpd["from"]["year"], jpd["from"]["month"], jpd["from"]["day"],
                                 jpd["to"]["year"], jpd["to"]["month"], jpd["to"]["day"], rq_str)
        elif jpd["q_type"] == "q5":
            data = self.q5_logic(rq_str)
        else:
            data = '{"type": "error"}'
        return data
'''


class LoginManager(object):
    def __init__(self):
        pass

    def strong_password(self, password):
        return 6 <= len(password) <= 20 and password.isalnum()

    def strong_username(self, username):
        invalid_chars = '\\/:*?#"<>|'
        return all([(char not in username) for char in invalid_chars])

    def check(self, username, password):
        try:
            with open('user/' + username + '/pswd', 'r') as p:
                return password == p.read()
        except FileNotFoundError:
            return False

    def change_password(self, username, old_password, new_password):
        if self.check(username, old_password):
            if self.strong_password(new_password):
                with open('user/' + username + '/pswd', 'w') as p:
                    p.write(new_password)
                return 'successful'
            else:
                return 'bad'
        else:
            return 'wrong'

    def get_userinfo(self, username):
        with open('user/' + username + '/info', 'r', encoding='utf-8') as i:
            return i.read()

    def set_userinfo(self, username, info):
        with open('user/' + username + '/info', 'w', encoding='utf-8') as i:
            i.write(info)
        return 'successful'

    def get_user_password(self, username, admin_password):
        if self.check(session.get("username"), admin_password):
            with open('user/' + username + '/pswd', 'r') as p:
                return p.read()
        else:
            return None


class Business(object):
    def __init__(self):
        self.data_manager = DataManager("docs/test.csv", "docs/today.csv")
        self.login_manager = LoginManager()

    def business_logic(self, is_login, jpd, rq_str):
        current_flag = self.data_manager.get_flag()
        if is_login:
            if jpd["type"] == "q":
                print(jpd)
                data = self.data_manager.q_logic(jpd, rq_str)
                return data, False
            elif jpd["type"] == "update":
                while True:  # check
                    time.sleep(0.2)
                    if current_flag != self.data_manager.get_flag():
                        data = json.dumps([{"type": "update", "a_type": "a" + jpd['q_type'][1], "upd_str": jpd['upd_str']}])[1:-1]
                        return data, False
            elif jpd["type"] == "logout":
                del session["username"]
                data = "{message:'successful'}"
                return data, False
            elif jpd["type"] == "old_confirm":
                if self.login_manager.check(session.get('username'), jpd["password"]):
                    data = "{message:'successful'}"
                    return data, False
                else:
                    data = "{message:'wrong'}"
                    return data, False
            elif jpd["type"] == "change_password":
                change_ret_str = self.login_manager.change_password(session.get('username'), jpd["old"], jpd["new"])
                data = "{message:'" + change_ret_str + "'}"
                return data, False
            elif jpd["type"] == "userinfo":
                info = self.login_manager.get_userinfo(session.get('username'))
                varinfo = json.loads(info)
                data = json.dumps([{"info": varinfo}])[1:-1]
                return data, False
            elif jpd["type"] == "info_change":
                info = json.dumps(jpd["data"])
                if not self.login_manager.strong_username(jpd["data"][0][1]):
                    data = "{message:'invalid_username'}"
                    return data, False
                change_ret_str = self.login_manager.set_userinfo(session.get('username'), info)
                if change_ret_str == 'successful':
                    shutil.move('user/' + session['username'], 'user/' + jpd["data"][0][1])
                    del session["username"]
                    session["username"] = jpd["data"][0][1]
                data = "{message:'" + change_ret_str + "'}"
                return data, False
            elif jpd["type"] == "get_admin_certif":
                print('checking_admin')
                data = "{message:'" + ("true" if session.get("admin") else "false") + "'}"
                return data, False
            elif jpd["type"] == "show_password":
                if not session.get("admin"):
                    print("error1")
                    data = "{type:'error'}"
                    return data, False
                else:
                    user_password = self.login_manager.get_user_password(jpd["target_user"], jpd["admin_password"])
                    if not user_password:
                        print("error2")
                        data = "{type:'error'}"
                        return data, False
                    else:
                        data = "{type:'password',password:'" + user_password + "'}"
                        return data, False
            elif jpd["type"] == "search_user":
                if not session.get("admin"):
                    data = "{type:'error'}"
                    return data, False
                pattern = jpd["input"]
                view_table = []
                for username in os.listdir('user'):
                    if username.find(pattern) != -1:
                        info = json.loads(self.login_manager.get_userinfo(username))
                        view_table.append({'username': username, 'name': info[1][1], 'department': info[2][1], 'password': '-', 'isAdmin': os.path.isfile("user/" + username + "/admin_certif")})
                data = json.dumps([{'table': view_table}])[1:-1]
                return data, False
            elif jpd["type"] == "add_new_user":
                if not session.get("admin"):
                    data = "{message:'permission_denied'}"
                    return data, False
                form = jpd["form"]
                if not self.login_manager.strong_username(form["username"]):
                    data = "{message:'invalid_username'}"
                    return data, False
                if os.path.exists('user/' + form["username"]):  # 此处可同时防止存在的用户名以及空用户名
                    data = "{message:'username_exists'}"
                    return data, False
                if not self.login_manager.strong_password(form["password"]):
                    data = "{message:'bad_password'}"
                    return data, False
                os.mkdir('user/' + form['username'])
                shutil.copyfile('static/images/default_user_head.bmp', 'user/' + form['username'] + '/user_head.bmp')
                info = [["\u7528\u6237\u540d User Name", form["username"]], ["\u59d3\u540d Name", form["name"]], ["\u6240\u5c5e\u5355\u4f4d Department", form["department"]]]
                with open('user/' + form['username'] + '/info', 'w') as finfo:
                    finfo.write(json.dumps(info))
                with open('user/' + form['username'] + '/pswd', 'w') as fpswd:
                    fpswd.write(form["password"])
                if form["isAdmin"]:
                    with open('user/' + form['username'] + '/admin_certif', 'w') as fctf:
                        pass
                data = "{message:'successful'}"
                return data, False
            elif jpd["type"] == "admin_change_user_info":
                if not session.get("admin"):
                    data = "{message:'permission_denied'}"
                    return data, False
                username = jpd["username"]
                if username == session.get('username'):
                    data = "{message:'self_change_denied'}"
                    return data, False
                info = jpd["info"]
                if not self.login_manager.strong_username(info["username"]):
                    data = "{message:'invalid_username'}"
                    return data, False
                if not self.login_manager.strong_password(info["password"]):
                    data = "{message:'bad_password'}"
                    return data, False
                if info["username"] != username:
                    if os.path.exists('user/' + info["username"]):
                        data = "{message:'username_exists'}"
                        return data, False
                    shutil.move('user/' + username, 'user/' + info["username"])
                    username = info['username']
                print(username)
                to_save_info = json.loads(self.login_manager.get_userinfo(username))
                to_save_info[0][1] = username
                to_save_info[1][1] = info["name"]
                to_save_info[2][1] = info["department"]
                self.login_manager.set_userinfo(username, json.dumps(to_save_info))
                with open('user/' + username + '/pswd', 'w') as fpswd:
                    fpswd.write(info["password"])
                if info["isAdmin"]:
                    with open('user/' + username + '/admin_certif', 'w') as fctf:
                        pass
                else:
                    if os.path.exists('user/' + username + '/admin_certif'):
                        os.remove('user/' + username + '/admin_certif')
                data = "{message:'successful'}"
                return data, False
            else:
                data = json.dumps([{"type": "error"}])[1:-1]
                return data, False
        else:
            if jpd["type"] == "veri":
                truth_str, veri_pic = get_random_veri_pic()
                session['veri'] = truth_str
                data = bytes("{type:'veri_pic', data:'", encoding='utf-8') + veri_pic + bytes("'}", encoding='utf-8')
                return data, False
            if jpd["type"] == "login":
                username = jpd["username"]
                password = jpd["password"]
                vericode = jpd["vericode"]
                right_user_pswd = self.login_manager.check(username, password)
                if not right_user_pswd:
                    data = "{type:'login_ret', message:'wrong_user_pswd'}"
                    return data, False
                right_vericode = (session.get('veri').lower() == vericode.lower())
                if not right_vericode:
                    data = "{type:'login_ret', message:'wrong_vericode'}"
                    return data, False
                else:
                    session['username'] = username
                    if os.path.isfile("user/" + username + "/admin_certif"):
                        print("Admin login")
                        session['admin'] = True
                    print("User \"" + username + "\" has logged in.")
                    data = "{type:'login_ret', message:'successful'}"
                    return data, True


business = Business()


def messaging(data):
    if type(data) == bytes:
        data = data.decode()
    resp = jsonify(data)
    resp.headers['Access-Control-Allow-Origin'] = '*'
    resp.headers['Access-Control-Allow-Methods'] = 'POST'
    resp.headers['Access-Control-Allow-Headers'] = 'x-requested-with,content-type'
    return resp


'''
session{
    "username" : username,
    "veri": truth_str
}
'''


# get
@app.route('/', methods=['GET'])
def get_task():
    if session.get('username'):
        return render_template('main_new.html')
    else:
        return render_template('login.html')


# get
@app.route('/user_head.bmp', methods=['GET'])
def user_head():
    if session.get('username'):
        basepath = os.path.dirname(__file__)  # 当前文件所在路径
        upload_path = os.path.join(basepath, 'user/' + session.get('username'), 'user_head.bmp')  # 注意：没有的文件夹一定要先创建，不然会提示没有该路径
        image_data = open(upload_path, "rb").read()
        response = make_response(image_data)
        response.headers['Content-Type'] = 'image/bmp'
        return response


@app.route('/static/images/<file_name>', methods=['GET'])
def get_image(file_name):
    basepath = os.path.dirname(__file__)  # 当前文件所在路径
    upload_path = os.path.join(basepath, 'static/images', file_name)  # 注意：没有的文件夹一定要先创建，不然会提示没有该路径
    image_data = open(upload_path, "rb").read()
    response = make_response(image_data)
    response.headers['Content-Type'] = 'image/jpg'
    return response


@app.route('/static/js/<file_name>', methods=['GET'])
def get_js(file_name):
    basepath = os.path.dirname(__file__)  # 当前文件所在路径
    upload_path = os.path.join(basepath, 'static/js', file_name)  # 注意：没有的文件夹一定要先创建，不然会提示没有该路径
    image_data = open(upload_path, "rb").read()
    response = make_response(image_data)
    response.headers['Content-Type'] = 'text/javascript'
    return response


@app.route('/js/<file_name>', methods=['GET'])
def get_js_2(file_name):
    basepath = os.path.dirname(__file__)  # 当前文件所在路径
    upload_path = os.path.join(basepath, 'js', file_name)  # 注意：没有的文件夹一定要先创建，不然会提示没有该路径
    image_data = open(upload_path, "rb").read()
    response = make_response(image_data)
    response.headers['Content-Type'] = 'text/javascript'
    return response


# post
@app.route('/', methods=['POST'])
def post_task():
    rq_str = dict(request.form)['meta'][0]
    param = json.loads(rq_str)
    data, login = business.business_logic(session.get('username'), param, rq_str)
    return messaging(data)


if __name__ == '__main__':
    # app.run(debug=True, host='0.0.0.0', port=8000)
    app.run(debug=True)#, host='10.250.109.112', port=8000)
