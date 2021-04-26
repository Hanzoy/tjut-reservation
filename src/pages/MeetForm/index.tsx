import Taro, {useDidShow, useRouter} from "@tarojs/taro";
import {Button, Form, Input, Picker, Text, View} from "@tarojs/components";
import './index.less'
import {getRev, getRevs, MeetingRoom, modifyRev, postRev} from "../../service/api";
import {useState} from "react";
import {REMIND_TMPLS} from "../../config";

const MeetForm: Taro.FunctionComponent = () => {
  const [roomList, setRoomList] = useState<MeetingRoom[]>([]);

  const [name, setName] = useState("");
  const [roomText, setRoomText] = useState("请选择会议室");
  const [roomId, setRoomId] = useState<number>();
  const [date, setDate] = useState("请选择日期");
  const [startTime, setStartTime] = useState("开始时间")
  const [endTime, setEndTime] = useState("结束时间");
  const [content, setContent] = useState("");



  const {params} = useRouter();
  const isEdit = !!params.meetid;
  useDidShow(async () => {
    Taro.showLoading();
    let date = new Date();
    let year = (date.getFullYear()).toString();
    let month = (date.getMonth() + 1).toString()
    if (params.meetid) {
      // console.log(isEdit);
      // console.log(params.meetname!);
      // console.log(params.meetdate!);
      // console.log(params.meetstarttime!);
      // console.log(params.meetendtime!);
      // console.log(params.meetcontent!);
      // setName(params.meetname!);
      // setDate(params.meetdate!);
      year = params.pdate!.split("-")[0];
      month = params.pdate!.split("-")[1];

      const rev = await getRev({
        id: parseInt(params.meetid)
      });
      setName(rev.data.name);
      setStartTime(rev.data.time.split("-")[0]);
      setEndTime(rev.data.time.split("-")[1]);
      setContent(rev.data.content);

      // setStartTime(params.meetstarttime!);
      // setEndTime(params.meetendtime!);
      // setContent(params.meetcontent!);


    }
    // await loginAndTokenOrRedirect();
    const res = await getRevs({
      year: year,
      month: month
    });

    setRoomList(res.data.meetingRoom);
    const rooml = res.data.meetingRoom;


    // console.log(params)
    const roomid = params.roomid;
    // console.log(rooml)
    if (roomid) {
      setRoomText(rooml.find(it => it.roomid == parseInt(roomid!))!.name);
      setRoomId(parseInt(roomid!));
    }

    if (params.roomname) {
      const room = rooml.find(it => it.name == params.roomname);

      setRoomText(room.name);
      setRoomId(room.roomid)
    }

    const pdate = params.pdate; //yyyy-mm-dd
    if (pdate) {
      setDate(pdate);
    }


    Taro.hideLoading()
  });



  const handleSubmit = async () => {
    if (name == "") {
      await Taro.showToast({
        title: "会议名称不能为空",
        icon: "none"
      });
      return;
    }
    if (roomId == undefined) {
      await Taro.showToast({
        title: "请选择会议室",
        icon: "none"
      });
      return;
    }
    if (date == "请选择日期") {
      await Taro.showToast({
        title: "请选择日期",
        icon: "none"
      });
      return;
    }

    if (startTime == "开始时间") {
      await Taro.showToast({
        title: "请选择开始时间",
        icon: "none"
      });
      return;
    }

    if (endTime == "结束时间") {
      await Taro.showToast({
        title: "请选择结束时间",
        icon: "none"
      });
      return;
    }

    const ends = endTime.split(":");
    const starts = startTime.split(":");

    if (parseInt(ends[0]) < parseInt(starts[0])) {
      await Taro.showToast({
        title: "结束时间不能小于开始时间",
        icon: "none"
      });
      return;
    }

    if (parseInt(ends[0]) == parseInt(starts[0])
      && parseInt(ends[1]) <= parseInt(starts[1])) {
      await Taro.showToast({
        title: "结束时间不能小于开始时间",
        icon: "none"
      });
      return;
    }

    if (content == "") {
      await Taro.showToast({
        title: "请填写会议内容",
        icon: "none"
      });
      return;
    }
    const req = {
      content: content,
      date: date,
      endTime: endTime,
      name: name,
      roomId: roomId,
      startTime: startTime,
      remind : true
    };
    await Taro.requestSubscribeMessage({
      tmplIds : REMIND_TMPLS,
      fail : ()=>{
        req.remind = false;
      }
    })
    await Taro.showLoading();
    let res;
    if (isEdit) {
      res = await modifyRev({
        id: parseInt(params.meetid!),
        ...req
      });
    } else {
      res = await postRev(req);
    }
    // console.log(res);
    if (res.code == "00000") {
      await Taro.showToast({
        title: "请求成功",
        duration: 1000
      })
      setTimeout(() => {
        Taro.hideToast();
        Taro.navigateBack();
      }, 1000)
    } else {
      await Taro.showToast({
        title: "请求失败" + res.message,
        icon: "none",
        duration: 1000
      })
      setTimeout(() => {
        Taro.hideToast();
      }, 1000)
    }
    Taro.hideLoading();
  };

  return (
    <View className="container">
      <Form onSubmit={handleSubmit} className="meet-form">
        <View className="form-item">
          <Text className="form-item-left">会议名称</Text>
          <Input
            type='text'
            placeholder='必填'
            className="form-item-right"
            value={name}
            onInput={(e) => {
              setName(e.detail.value);
            }}/>
        </View>
        <View className="divider"/>

        <View className="form-item">
          <Text className="form-item-left">会议室</Text>
          <Picker
            mode="selector"
            range={roomList.map(it => it.name)}
            onChange={(e) => {
              // console.log(e)

              setRoomId(roomList[e.detail.value].roomid);
              // console.log(roomList[e.detail.value])
              setRoomText(roomList[e.detail.value].name);
            }}
            className="form-item-right">
            <View>{roomText}</View>
          </Picker>
        </View>
        <View className="divider"/>
        <View className="form-item">
          <Text className="form-item-left">日期</Text>
          <Picker
            mode="date"
            value={date}
            onChange={(e) => {
              setDate(e.detail.value)
              console.log(e)
            }}
            className="form-item-right">
            <View>{date}</View>
          </Picker>
        </View>
        <View className="divider"/>
        <View className="form-item">
          <Text className="form-item-left">时间</Text>
          <View className="form-item-right time-input-container">
            <Picker
              mode="time"
              value={startTime}
              onChange={(e) => {
                setStartTime(e.detail.value)
              }}
            >
              <View className="time-input-hint">{startTime}</View>
            </Picker>

            <View style={{padding: "12px"}}>~</View>

            <Picker
              mode="time"
              value={endTime}
              onChange={(e) => {
                setEndTime(e.detail.value)
                // console.log(e)
              }}>
              <View className="time-input-hint">{endTime}</View>
            </Picker>
          </View>

        </View>
        <View className="divider"/>
        <View className="form-item">
          <Text className="form-item-left">会议内容</Text>
          <Input
            type='text'
            placeholder='必填'
            className="form-item-right"
            value={content}
            onInput={(e) => {
              setContent(e.detail.value);
            }}/>
        </View>
        <View className="divider"/>
        <Button formType={"submit"} type="primary" style={{margin: "16px", backgroundColor: "#23a9f4"}}>{isEdit?"修改":"创建"}</Button>

      </Form>
    </View>
  );
};

export default MeetForm;
