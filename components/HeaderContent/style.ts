import { StyleSheet } from "react-native";

const globalStyles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  verticalDashedLine: {
    position: "absolute",
    left: 20,
    top: 0,
    width: 1,
    height: "100%",
    borderLeftWidth: 1,
    borderLeftColor: "#747373ff",
    borderStyle: "dashed",
  },
  horizontalDashedLine: {
    width: 30,
    left: -5,
    height: 1,
    borderTopWidth: 1,
    borderTopColor: "#747373ff",
    borderStyle: "dashed",
  },
  circle: {
    width: 7,
    height: 7,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#747373ff",
  },
});

export default globalStyles;
