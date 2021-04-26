import { useGlobalIconFont } from './component/iconfont/helper';

export default {
  pages: [
    'pages/MeetList/index',
    'pages/MyMeet/index',
    'pages/MeetForm/index',
    'pages/RoomDetail/index',
    'pages/UserAuth/index',
    'pages/MeetDetail/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  usingComponents: Object.assign(useGlobalIconFont()),
  tabBar: {
    "color": "#fdfdfd",
    "selectedColor": "#1aa4d0",
    list: [
      {
        "selectedIconPath": "images/MyMeetSelected.png",
        "iconPath": "images/MyMeet.png",
        "pagePath": "pages/MyMeet/index",
        "text": "日程安排"
      },
      {
        "selectedIconPath": "images/MeetListSelected.png",
        "iconPath": "images/MeetList.png",
        "pagePath": "pages/MeetList/index",
        "text": "会议预约"
      }
    ]
  }
}
