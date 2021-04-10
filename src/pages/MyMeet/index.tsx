import Taro, {useDidShow} from "@tarojs/taro";
import {Button, View} from "@tarojs/components";
import './index.less'
import MonthBar from "../../component/MonthBar";
import {useState} from "react";
import {getMyRev, MyMeetInfo} from "../../service/api";
import MeetItem from "../../component/MeetItem";

const MyMeet: Taro.FunctionComponent = () => {
  useDidShow(async () => {
    Taro.showLoading();
    const res = await getMyRev({
      month: (date.getMonth() + 1).toString(),
      year: (date.getFullYear()).toString()
    })
    setMonth(res.data.months);
    setInfo(res.data.info);
    Taro.hideLoading();


  })
  const [month, setMonth] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [date, setDate] = useState(new Date());
  const [info, setInfo] = useState<MyMeetInfo[]>([]);

  const handleSwitchMonth = async (toYear: number, toMonth: number) => {
    Taro.showLoading();
    const res = await getMyRev({
      month: (toMonth).toString(),
      year: (toYear).toString()
    })
    setMonth(res.data.months);
    setInfo(res.data.info);
    Taro.hideLoading();
  }

  return (
    <View className="mymeet-container">
      <View className="header">
        <View>我的会议安排</View>
        <Button
          size={"mini"}
          style={{margin: "0"}}
          onClick={() => {
            Taro.navigateTo({
              url: `../MeetForm/index`
            })
          }}>预约会议室</Button>
      </View>
      <View className="divider"/>
      <MonthBar months={month} curDate={date} onSwitchMonth={handleSwitchMonth}/>
      <View className="meet-list">
        {info.map(item => {
          return (
            <MeetItem
              {...item}/>
          )
        })}
      </View>

    </View>
  )
};

export default MyMeet;
