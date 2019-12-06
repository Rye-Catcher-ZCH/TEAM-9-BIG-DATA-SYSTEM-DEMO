import json
import numpy as np
import pandas as pd
import time
import datetime
import threading


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


class DataManager(object):
    def __init__(self, filename , filename_today):
        self.year = 2018
        self.month = 10
        self.day = 30
        self.flag = 0  # 该标志的变化预示着今日数据的添加
        self.filename = filename  # 数据来源文件名
        self.filename_today = filename_today
        self.base1 = pd.read_csv(self.filename, encoding='gbk')
        buffer = self.base1.pop('CREATE_TIME')
        self.base1['CREATE_TIME'] = buffer.apply(lambda r:lamb_func(r))
        self.base1['label'] = buffer.apply(lambda r : r )
        self.base = self.base1.sort_values(by='CREATE_TIME')
        self.base = self. base. reset_index(drop=True)

        self.lis = list(self.base.columns)
        self.q1lis =['投诉', '咨询', '建议', '求决', '-', '感谢', '其他']
        self.SIlis =['3','100','101', '102',  '103','104',  '105', '-']
        self.map ={'市容环卫': '5', '环保水务': '3', '市政设施': '6', '规土城建': '4', '教育卫生': '11','安全隐患': '1','组织人事':'12', '党纪政纪': '14', '劳动社保': '8', '社区管理': '17', '交通运输': '7', '治安维稳': '2', '专业事件采集': '695', '统一战线': '16', '民政服务': '15', '文体旅游': '10', '食药市监': '9', '党建群团': '13', '-': '-'}
        self.ETNlis = ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','695','-']
        self.CIlis =['10007', '10022', '10013', '10012', '10019', '10004', '10014', '10020', '10016', '10005',
                     '10009', '10002', '10015', '10010', '10003', '10018', '10017', '10021', '10006', '10008',
                     '10011', '10001', '-', '10000', '0']
        self.OANlis =['0', '1', '-','total']


        self.q1base ={}
        for i in self.base.index:
            self.q1base[i]= dict.fromkeys(self.q1lis, 0)
            j = self.base.iloc[i]['EVENT_PROPERTY_NAME']
            self.q1base[i][j] += 1
        for i in self.base.index:
            if i == 0:
                continue
            for j in self.q1base[i].keys():
                self.q1base[i][j] = self.q1base[i-1][j]+self.q1base[i][j]

        self.q2base = {}
        for id in self.base.index:
            self.q2base[id] = {}
            for i in self.SIlis :
                self.q2base[id][i]=dict.fromkeys(self.ETNlis, 0)
            j = self.base.iloc[id]['STREET_ID']
            k = self.map[self.base.iloc[id]['EVENT_TYPE_NAME']]
            self.q2base[id][j][k] += 1
        for id in self.base.index:
            if id == 0 :
                continue
            for i in self.q2base[id].keys():
                for j in self.q2base[id][i].keys():
                    self.q2base[id][i][j] += self.q2base[id-1][i][j]

        self.q3base={}
        for i in self.base.index:
            self.q3base[i]=dict.fromkeys(self.CIlis, 0)
            j = self.base.iloc[i]['COMMUNITY_ID']
            k = self.base.iloc[i]['OVERTIME_ARCHIVE_NUM']
            try:
                self.q3base[i][j] += 5 + 5 * int(k)
            except Exception as e:
                continue
        for i in self.base.index:
            if i == 0:
                continue
            for j in self.q3base[i].keys():
                self.q3base[i][j] = self.q3base[i-1][j]+self.q3base[i][j]

        self.q4base={}
        h = 'total'
        for id in self.base.index:
            self.q4base[id]={}
            for i in self.OANlis :
                self .q4base[id][i]=dict.fromkeys(self.ETNlis, 0)
            j = self.base.iloc[id]['OVERTIME_ARCHIVE_NUM']
            k = self.map[self.base.iloc[id]['EVENT_TYPE_NAME']]
            self . q4base[id][j][k]+=1
            self . q4base[id][h][k]+=1
        for id in self.base.index:
            if id == 0 :
                continue
            for i in self.q4base[id].keys():
                for j in self.q4base[id][i].keys():
                    self.q4base[id][i][j] += self.q4base[id-1][i][j]
        self.buffer = pd.DataFrame(columns=self.lis, index=range(0, 10000))
        t = threading.Thread(target=self.load_data, args=())
        t.start()

    def lower_bound (self ,li, ri , tar ) :
        if li + 1 >= ri :
            return li
        mid = li + ri
        mid = mid /2
        mid = int (mid)
        if self .base.iloc[mid]['CREATE_TIME'] <= tar :
            return self.lower_bound(mid ,ri ,tar )
        else :
            return self.lower_bound(li  ,mid,tar )

    def load_data(self):
        ori_data = pd.read_csv(self.filename_today, encoding='gbk')
        buffer = ori_data .pop('CREATE_TIME')
        ori_data['CREATE_TIME'] = buffer.apply(lambda r: lamb_func(r))
        ori_data['label'] = buffer.apply(lambda r : r )
        for i in range(len(ori_data)):
            time.sleep(0.5)
            self.buffer.loc[i] = ori_data.loc[i]
            self.flag += 1
            if self.flag == 2147483647:
                self.flag = 0

    def get_flag(self):
        return self.flag

    def q1_logic(self, from_year, from_month, from_day, to_year, to_month, to_day, rq_str):

        a=datetime.datetime(from_year,from_month,from_day,0,0,0).timestamp()
        b=datetime.datetime(to_year,to_month,to_day,23,59,59).timestamp()
        if a < 1518075280:
            ai = 0
        else :
            ai = self.lower_bound(0,len(self.base),a)
        bi = self.lower_bound(0,len(self.base),b)
        mmap = dict.fromkeys(self.q1lis, 0)
        for key in self.q1base[bi].keys():
            mmap [ key ] = self.q1base[bi][key] - self.q1base[ai][key]
        ll = self . base.iloc[ai]['EVENT_PROPERTY_NAME']
        mmap [ll] = mmap[ll] + 1

        for i in range(self.flag):
            m = self.buffer.loc[i]['CREATE_TIME']
            if a <= m <= b:
                j = self.buffer.iloc[i]['EVENT_PROPERTY_NAME']
                mmap[j] += 1
        data = json.dumps([{"type": "a", "a_type": "a1", "data":["按目的区分", func(mmap) ], "rq_str": rq_str}])
        data = data[1:-1]
        return data

    def q2_logic(self, is_today, year, month, rq_str):

        a = 0
        b = 0
        bi = 0
        ai = 0

        if is_today == 0  :
            a = datetime.datetime(year, month, 1, 0, 0, 0).timestamp()
            b = datetime.datetime(year, month, final(year, month), 23, 59, 59).timestamp()
            if a < 1518075280:
                ai = 0
            else:
                ai = self.lower_bound(0, len(self.base), a)
            bi = self.lower_bound(0, len(self.base), b)

        mmap = {}
        for i in self.SIlis:
            mmap[i] = dict.fromkeys(self.ETNlis, 0)
        for i in self.SIlis:
            for j in self .ETNlis:
                mmap [i][j] = self.q2base [bi][i][j]-self .q2base[ai][i][j]
        iii = self . base .iloc [ai]['STREET_ID']
        lll = self.map[self . base .iloc [ai]['EVENT_TYPE_NAME']]
        mmap [iii][lll] += 1
        print(ai,bi)
        print(mmap)

        for i in range(self.flag):
            m = self.buffer.loc[i]['CREATE_TIME']
            if  is_today == 0 and a <= m <= b :
                j = self.buffer.iloc[i]['STREET_ID']
                k = self.map[self.buffer.iloc[i]['EVENT_TYPE_NAME']]
                mmap[j][k] += 1
            elif is_today == 1:
                j = self.buffer.iloc[i]['STREET_ID']
                k = self.map[self.buffer.iloc[i]['EVENT_TYPE_NAME']]
                mmap[j][k] += 1
        base =[]
        for i in mmap.keys():
            base.append([i,func(mmap[i])])
        data = json.dumps([{"type": "a", "a_type": "a2", "data": base, "rq_str": rq_str}])
        data = data[1:-1]

        return data

    def q3_logic(self, is_today, year, month, rq_str):

        ai = 0
        bi = 0
        a = 0
        b = 0

        if is_today == 0 :
            a = datetime.datetime(year, month, 1, 0, 0, 0).timestamp()
            b = datetime.datetime(year, month, final(year, month), 23, 59, 59).timestamp()
            if a < 1518075280:
                ai = 0
            else:
                ai = self.lower_bound(0, len(self.base), a)
            bi = self.lower_bound(0, len(self.base), b)

        mmap = dict.fromkeys(self.CIlis, 0)
        for key in mmap.keys():
            mmap [ key ] = self.q3base[bi][key] - self.q3base[ai][key]
        ll = self . base.iloc[ai]['COMMUNITY_ID']
        kk = self . base.iloc[ai]['OVERTIME_ARCHIVE_NUM']
        try :
            mmap [ll] += int(kk)
        except Exception as e :
            pass

        for i in range(self.flag):
            m = self.buffer.loc[i]['CREATE_TIME']
            if is_today == 0 and a <= m <= b :
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
            maxi = max ( maxi , mmap[i])
        for i in mmap.keys():
            mmap [i] = int(mmap[i]*100/maxi)

        data = json.dumps([{"type": "a", "a_type": "a3", "data": func(mmap), "rq_str": rq_str}])
        data = data[1:-1]

        return data

    def q4_logic(self, from_year, from_month, from_day, to_year, to_month, to_day, rq_str):
        a = datetime.datetime(from_year, from_month, from_day, 0, 0, 0).timestamp()
        b = datetime.datetime(to_year, to_month, to_day, 23, 59, 59).timestamp()
        mmap = {}
        h = 'total'
        if a < 1518075280:
            ai = 0
        else:
            ai = self.lower_bound(0, len(self.base), a)
        bi = self.lower_bound(0, len(self.base), b)
        for i in self.OANlis:
            mmap [i] = dict.fromkeys(self.ETNlis, 0)
            for j in self.ETNlis :
                mmap [i][j]= self.q4base[bi][i][j]- self.q4base[ai][i][j]
        iii = self.base.iloc[ai]['OVERTIME_ARCHIVE_NUM']
        lll = self.map[self.base.iloc[ai]['EVENT_TYPE_NAME']]
        mmap[iii][lll] += 1
        mmap[h][lll]   += 1

        for i in range(self.flag):
            m = self.buffer.loc[i]['CREATE_TIME']
            if a <= m <= b:
                j = self.buffer.iloc[i]['OVERTIME_ARCHIVE_NUM']
                k = self.map[self.base.iloc[i]['EVENT_TYPE_NAME']]
                mmap[h][k] += 1
                mmap[j][k] += 1

        base = []
        for i in mmap.keys():
            base.append([i, func(mmap[i])])
        data = json.dumps([{"type": "a", "a_type": "a4", "data": base, "rq_str": rq_str}])
        data = data[1:-1]

        return data

    def q5_logic(self, rq_str):
        lis = [ ]
        sum = 0

        for i in range(self.flag):
            aaa = self.buffer.iloc[i]['EVENT_TYPE_NAME']
            if sum <= 10 :
                __v = self.buffer.loc[i]
                lis.append(list(__v[['label','STREET_NAME','COMMUNITY_NAME','EVENT_SRC_NAME','SUB_TYPE_NAME','EVENT_PROPERTY_NAME','DISPOSE_UNIT_NAME']]))
                sum +=1
            elif aaa == '安全隐患':
                __v = self.buffer.loc[i]
                lis.append(list(__v[['label', 'STREET_NAME', 'COMMUNITY_NAME', 'EVENT_SRC_NAME', 'SUB_TYPE_NAME','EVENT_PROPERTY_NAME', 'DISPOSE_UNIT_NAME']]))
        lis = sorted ( lis ,key = lambda r : r[0])
        data = json.dumps([{"type": "a", "a_type": "a5", "data": lis, "rq_str": rq_str}])
        data = data[1:-1]
        return data

    def q6_logic(self, year, mon, rq_str):
        lis = []
        if mon == 12:
            lis = [["2018/7", 476], ["2018/8", 547], ["2018/9", 2561], ["2018/10", 2800 + self.flag], ["2018/11", 2977],
                   ["2018/12", 71]]
        if mon == 11:
            lis = [["2018/6", 204], ["2018/7", 476], ["2018/8", 547], ["2018/9", 2561], ["2018/10", 2800 + self.flag],
                   ["2018/11", 2977]]
        if mon == 10:
            lis = [["2018/3", 8], ["2018/6", 204], ["2018/7", 476], ["2018/8", 547], ["2018/9", 2561],
                   ["2018/10", 2800 + self.flag]]
        if mon == 9:
            lis = [["2018/2", 185], ["2018/3", 8], ["2018/6", 204], ["2018/7", 476], ["2018/8", 547], ["2018/9", 2561]]
        if mon == 8:
            lis = [["2018/2", 185], ["2018/3", 8], ["2018/6", 204], ["2018/7", 476], ["2018/8", 547]]
        if mon == 7:
            lis = [["2018/2", 185], ["2018/3", 8], ["2018/6", 204], ["2018/7", 476]]
        if mon == 6:
            lis = [["2018/2", 185], ["2018/3", 8], ["2018/6", 204]]
        if mon == 5:
            lis = [["2018/2", 185], ["2018/3", 8]]
        if mon == 4:
            lis = [["2018/2", 185], ["2018/3", 8]]
        if mon == 3:
            lis = [["2018/2", 185], ["2018/3", 8]]
        if mon == 2:
            lis = [["2018/2", 185]]
        data = json.dumps([{"type": "a", "a_type": "a6", "data": lis, "rq_str": rq_str}])
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
        elif jpd["q_type"] == "q6":
            data = self.q6_logic(jpd["year"], jpd["month"], rq_str)
        else:
            data = '{"type": "error"}'
        return data


def main():
    base = DataManager('test.csv','today.csv')
    base.q2_logic(0,2018,9,'1')


if __name__ == "__main__":
    main()