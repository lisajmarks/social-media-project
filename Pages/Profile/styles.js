import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EEEBDD",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    flexDirection: "row",
    width: 150,
    borderRadius: 5,
    backgroundColor: "#1B1717",
    height: 48,
    margin: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  text: { color: "white", fontSize: 18, fontWeight: "bold", width: 100 },

  buttonText: { color: "white" },
});

export default styles;
