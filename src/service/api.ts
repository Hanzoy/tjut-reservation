import Request from './request';
export interface BaseRes<T> {
  code: string;
  message: string;
  data: T;
}

// const rrq = <REQ, RES> (url: string, req: REQ) => Request<REQ, RES>({
//   url: url, method: "POST", data: req
// })

export interface LoginReq {
  code: string;
}

export type LoginRes = BaseRes<{
  needAuth: boolean;
  token: string;
}>;

export const login = async (req: LoginReq) => await Request<LoginReq, LoginRes>({
  url: '/login',
  method: "POST",
  data: req
});

export type LoginAuthReq = {
  code: string;
  name: string;
  nickName: string;
  avatarUrl: string;
};

export type LoginAuthRes = BaseRes<{
  token: string;
}>

export const loginAuth = async (req: LoginAuthReq) =>
  await Request<LoginAuthReq, LoginAuthRes>({
    url: "/loginAuth",
    method: "POST",
    data: req
  })

export interface GetMyRevReq {
  year: string;
  month: string;
}

export type MyMeetInfo = {
  id: number;
  name: string;
  creator : string,
  meetingName : string,
  date : string,
  time : string,
  content: string;
  remind: boolean,
  status: "未开始" | "进行中" | "已结束"
}
export type GetMyRevRes = BaseRes<{
  months: number[];
  info: MyMeetInfo[];
}>;

export type GetRevsReq = {
  year: string;
  month: string;
};

export type MeetingRoom = {
  roomid: number,
  name : string,
  date : string,
  time : string,
  remark : string
}

export type MeetingInfo = {
  id: number,
  name: string,
  creator: string,
  date: string,
  time: string
};

export type Bar = {
  start: number;
  end: number;
};

export type MeetingRoomInfo = {
  roomid: number,
  count: number,
  bar: Bar[],
  meetingInfo: MeetingInfo[];
};

export type Day = {
  dayOfMonth: string,
  count: number,
  meetingRoomInfo: MeetingRoomInfo[];
};

export type GetRevsRes = BaseRes<{
  meetingRoom: MeetingRoom[];
  day: Day[];
}>;

export const getRevs = async (req: GetRevsReq) =>
  await Request<GetRevsReq, GetRevsRes>({
      url: "/getReservations",
      method: "POST",
      data: req
    }
  );

export type GetRevReq = {
  id: number;
}

export type MeetParticipant = {
  id: string,
  name: string,
  nickName: string,
  avatarUrl: string;
};

export type GetRevRes = BaseRes<{
  isCreator : boolean,
  isParticipant: boolean;
  id : number,
  name : string,
  creator :string,
  meetingName : string,
  date : string,
  time : string,
  content : string,
  status: "未开始" | "进行中" | "已结束",
  remind: boolean,
  participant: MeetParticipant[]
}>

export const getRev = async (req: GetRevReq) =>
  await Request<GetRevReq, GetRevRes>({
    url: "/getReservation",
    method: "POST",
    data: req
  });

export type PostRevReq = {
  name : string,
  roomId : number,
  date : string,
  startTime: string,
  endTime : string,
  content : string,
  remind : boolean
}

export type PostRevRes = BaseRes<{}>;

export const postRev = async (req: PostRevReq) =>
  await Request<PostRevReq, PostRevRes>({
    url: "/postReservation",
    method: "POST",
    data: req
  });




export const getMyRev = async (req: GetMyRevReq) =>
  await Request<GetMyRevReq, GetMyRevRes>(
  {
    url: "/getMyReservations",
    method: "POST",
    data: req
  }
)

export type RemindRevReq = {
  id : number,
  remind : boolean
}

export const remindRev = async (req: RemindRevReq) =>
  await Request<RemindRevReq, PostRevRes>({
    url: "/remindReservation",
    method: "POST",
    data: req
  });

export type DeleteRevReq = {
  id: number;
  remark: string;
};

export const deleteRev = async (req: DeleteRevReq) =>
  await Request<DeleteRevReq, BaseRes<any>>({
    url: "/deleteReservation",
    method: "POST",
    data: req
  });


export type ModifyRevReq = {
  id : number,
  name : string,
  date : string,
  startTime: string,
  endTime : string,
  content : string
}

export type ModifyRevRes = BaseRes<{}>;

export const modifyRev = async (req: ModifyRevReq) =>
  await Request<ModifyRevReq, ModifyRevRes>({
    url: "/modifyReservation",
    method: "POST",
    data: req
  });

export type JoinRevReq = {
  id: number;
  join: boolean;
};

export type JoinRevRes = BaseRes<{}>;

export const joinRev = async (req: JoinRevReq) =>
  await Request<JoinRevReq, JoinRevRes>({
    url: "/joinReservation",
    method: "POST",
    data: req
  })
