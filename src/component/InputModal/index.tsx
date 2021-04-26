import Taro from "@tarojs/taro";
import "./index.less";
import {Button, Input, View} from "@tarojs/components";
import {useState} from "react";

type Props = {
  title: string;
  isRequired: boolean;
  isOpen: boolean;
  onMaskClick: () => void;
  onCancelClick: () => void;
  onConfirmClick: (input: string) => void;
};
const InputModal: Taro.FunctionComponent<Props> =
  ({title, isOpen, isRequired,
     onCancelClick, onMaskClick, onConfirmClick}) => {
    const [inputText, setInputText] = useState("");


    return (
      <View className={`inputmodal-container ${isOpen ? "" : "hide"}`}>
        <View className="mask" onClick={() => {
          setInputText("");
          onMaskClick()
        }}/>
        <View className="content">
          <View className="title">{title}</View>
          <Input
            type='text'
            placeholder='原因'
            className="input"
            value={inputText}
            onInput={(e) => {
              setInputText(e.detail.value);
            }}
          />
          <View className="btn-bar">
            <View className="btn-container btn-container-left">
              <View className="btn" onClick={() => {
                setInputText("");
                onCancelClick()
              }}>
                取消
              </View>
            </View>
            <View className="btn-container">
              <View className="btn" onClick={async () => {
                if (inputText == "" && isRequired) {
                  await Taro.showToast({
                    title: "请填写有效内容",
                    icon: "none"
                  });
                  return;
                }
                await onConfirmClick(inputText);
              }}>
                确定
              </View>
            </View>

          </View>


        </View>
      </View>
    );
  };

export default InputModal;
