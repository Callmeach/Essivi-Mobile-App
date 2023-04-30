import { TextInput } from "react-native";
import COLORS from "../conts/colors";

const Field = (props) => {
  return (
    <TextInput
      {...props}
      style={{ borderRadius: 100, color: COLORS.blue, paddingHorizontal: 10, backgroundColor: 'rgb(220,220, 220)', marginVertical: 10, width: '74%' }}
      placeholderTextColor={COLORS.blue}
    ></TextInput>
  );
};

export default Field;
