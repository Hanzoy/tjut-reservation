import Taro, {useRouter, useDidShow, useShareAppMessage} from "@tarojs/taro";
import {Image, View} from "@tarojs/components";
import {getRev, GetRevRes} from "../../service/api";
import {useState} from "react";
import MeetInfo from "../../component/MeetInfo";
import "./index.less"

const MeetDetail: Taro.FunctionComponent = () => {

  useShareAppMessage(res => {
    if (res.from === 'button') {
      console.log(res.target)
    }
    return {
      title: data?.data.name,
      path: `/pages/MeetDetail/index?meetid=${data?.data.id}`,
      imageUrl: "../../images/logo.png"
    }
  })

  const load = async () => {
    await Taro.showLoading();
    // await loginAndTokenOrRedirect();
    const res = await getRev({
      id: parseInt(meetId!)
    })
    Taro.hideLoading();

    if (res.code == "A0300") {
      await Taro.showToast({
        title: res.message,
        icon: "none",
        duration: 500
      });
      setTimeout(() => {
        Taro.navigateBack();
      }, 500)
    } else if (res.code != "00000") {
      await Taro.showToast({
        title: "会议已删除",
        icon: "none",
        duration: 1000
      });
      await Taro.reLaunch({
        url: "../MeetList/index"
      });
      // setTimeout(() => {
      //   Taro.redirectTo({
      //     url: "../MeetList/index"
      //   });
      // }, 500)
    }
    setData(res);
  }

  const {params} = useRouter();
  const meetId = params.meetid;
  useDidShow(async () => {
    await load();
  })

  const [data, setData] = useState<GetRevRes>();

  return (
    <View className="meet-detail-container">
      <View className="meet-info">
        <MeetInfo
          {...data?.data!}
          reload={async () => await load()}
        />
      </View>


      <View className="meet-content">
        <View className="content-title">会议内容</View>
        <View className="divider"/>
        <View className="content-text">{data?.data.content}</View>
      </View>

      <View className="meet-ptc">
        <View className="ptc-title">参会人员 ({data?.data.participant.length})</View>
        {/*<View className="divider"/>*/}
        <View className="ptc-list">
          {data?.data.participant.map(p => {
            return (
              <View className="list-item">
                <Image src={p.avatarUrl} className="avatar"/>
                <View className="nickName">{p.nickName}</View>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
}

export default MeetDetail;

