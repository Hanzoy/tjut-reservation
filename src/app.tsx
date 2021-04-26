import './app.less'
import Taro from "@tarojs/taro";
import {View} from "@tarojs/components";

const App: Taro.FunctionComponent<any> = (props) => {
  return (
    <View className="app-root">
      {props.children}
    </View>
  )
}
export default App;

