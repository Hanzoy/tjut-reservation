import {View} from '@tarojs/components'
import './index.less'
import Taro, {useDidShow} from '@tarojs/taro'
import Calendar from "../../component/Calendar";
import {useState} from "react";
import RoomItem from "../../component/RoomItem";
import {Day, getRevs, MeetingRoom} from "../../service/api";

const MeetList: Taro.FunctionComponent = () => {
  const [date, setDate] = useState(new Date());
  const [monthData, setMonthData] = useState<Day[]>([]);
  const [roomData, setRoomData] = useState<MeetingRoom[]>([])

  useDidShow(async () => {
    // await loginAndTokenOrRedirect();
    await load(date);
  })

  const load = async (ldate: Date) => {
    await Taro.showLoading();
    const res = await getRevs({
      year: ldate.getFullYear().toString(),
      month: (ldate.getMonth() + 1).toString()
    });
    setMonthData(res.data.day);
    setRoomData(res.data.meetingRoom);
    // setDate(new Date());
    // console.log(res.data.day)
    Taro.hideLoading();



  }
  const handleCalendarChange = async (cdate: Date, inMonth: boolean) => {
    console.log(cdate);
    setDate(cdate);
    if (!inMonth) {
      await load(cdate);
    }
  }

  const today = monthData.find(it => parseInt(it.dayOfMonth) == date.getDate());
  // console.log(today)
  return (
    <View className='meet-list-container' style={{background: "#f0f0f0"}}>
      <View className="top-line"/>

      <Calendar
        initDate={new Date()}
        date={date}
        onChange={handleCalendarChange}
        dayList={monthData}
      />

      <View className="room-list">
        {roomData.map((item, index) => {
          const data = today?.meetingRoomInfo.find(it => it.roomid == item.roomid);

          if (data) {
            return (
              <View className="room-list-item" onClick={() => {
                Taro.navigateTo({
                  url: `../RoomDetail/index?roomid=${item.roomid}&year=${date.getFullYear()}&month=${date.getMonth()}&day=${date.getDate()}`
                });

              }}>
                <RoomItem
                  {...item}
                  bar={data.bar} index={index}/>
              </View>
            );
          } else {
            return (<View className="room-list-item" onClick={() => {
              Taro.navigateTo({
                url: `../RoomDetail/index?roomid=${item.roomid}&year=${date.getFullYear()}&month=${date.getMonth()}&day=${date.getDate()}`
              })
            }}>
              <RoomItem
                {...item}
                bar={[]} index={index}/>
            </View>)
          }
        })}
      </View>


    </View>


  );
}

export default MeetList;
