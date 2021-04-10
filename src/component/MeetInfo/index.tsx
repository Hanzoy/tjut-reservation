import Taro from "@tarojs/taro";
import {Text, View} from "@tarojs/components";
import './index.less'
import IconFont, {IconNames} from "../iconfont";
import {MyMeetInfo} from "../../service/api";

const rightItem = (icon: IconNames, tip: string) => {
  return (
    <View className="meet-info-right-item">
      <IconFont name={icon} />
      <View className="right-item-text">{tip}</View>
    </View>
  )
}
type Prop = MyMeetInfo;
const MeetInfo: Taro.FunctionComponent<Prop> =
  ({
     id,
     name,
     creator,
     meetingName,
     date,
     time,
     status
   }) =>
{
  return (
    <View className="meet-info-container" key={id}>
      <View className="left">
        <View className="name">
          {name}
        </View>
        <View className="creator">
          <IconFont name={"creator"}/>
          <View className="creator-text">
            {creator}
          </View>
        </View>
        <View className="meeting-name">
          <IconFont name={"meetingName"}/>
          <View className="meeting-name-text">
            {meetingName}
          </View>
        </View>
        <View className="third-line">
          <IconFont name="date"/>
          <View className="date">
            {date}
          </View>
          <View className="time">
            {time}
          </View>
          <View className="status">
            {status}
          </View>
        </View>
      </View>
      <View className="right">
        <View className="row-1">
          {rightItem("ring", "开启提醒")}
          {rightItem("link", "分享会议")}
        </View>
        <View className="row-2">
          {rightItem("delete", "删除会议")}
          {rightItem("edit", "修改会议")}
        </View>
      </View>
    </View>
  )

}

export default MeetInfo;