import { StyleSheet } from "react-native";
import colors from "../../utils/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
  },

  createPoint: {
    color: colors.grey200,
    fontFamily: "Roboto_400Regular",
    fontWeight: "bold",
    textAlign: "right",
    paddingTop: 8,
  },

  main: {
    flex: 1,
    justifyContent: "center",
  },

  title: {
    color: colors.secondary,
    fontSize: 32,
    fontFamily: "Ubuntu_700Bold",
    maxWidth: 260,
    marginTop: 64,
  },

  description: {
    color: colors.grey200,
    fontSize: 16,
    marginTop: 16,
    fontFamily: "Roboto_400Regular",
    maxWidth: 260,
    lineHeight: 24,
  },

  button: {
    backgroundColor: colors.primary,
    height: 60,
    flexDirection: "row",
    borderRadius: 10,
    overflow: "hidden",
    alignItems: "center",
    marginTop: 8,
  },

  buttonIcon: {
    height: 60,
    width: 60,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    flex: 1,
    justifyContent: "center",
    textAlign: "center",
    color: colors.white,
    fontFamily: "Roboto_500Medium",
    fontSize: 16,
  },
});

export default styles;
