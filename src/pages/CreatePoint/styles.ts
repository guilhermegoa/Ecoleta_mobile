import { StyleSheet } from "react-native";
import colors from "../../utils/colors";
import Constants from "expo-constants";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingTop: Constants.statusBarHeight,
  },

  form: {
    padding: 8,
  },

  formTitle: {
    fontWeight: "bold",
    fontSize: 24,
    color: colors.secondary,
    textAlign: "center",
  },

  fomrSubTitle: {
    padding: 16,
    fontSize: 16,
    fontWeight: "bold",
  },

  input: {
    height: 60,
    backgroundColor: colors.white,
    borderRadius: 8,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,
  },

  mapContainer: {
    flex: 1,
    width: "100%",
    borderRadius: 10,
    overflow: "hidden",
    marginTop: 16,
  },

  map: {
    width: "100%",
    height: "100%",
    minHeight: 300,
  },

  itemsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 16,
    marginBottom: 32,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
  },

  item: {
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.grey100,
    height: 120,
    width: 120,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginVertical: 16,
    marginRight: 8,
    alignItems: "center",
    justifyContent: "space-between",
    textAlign: "center",
  },

  selectedItem: {
    borderColor: colors.primary,
    borderWidth: 2,
  },

  itemTitle: {
    fontFamily: "Roboto_400Regular",
    textAlign: "center",
    fontSize: 13,
  },

  containerButton: {
    flexDirection: "row",
    justifyContent: "space-around",
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
  },

  button: {
    paddingHorizontal: 64,
    paddingVertical: 24,
    backgroundColor: colors.primary,
  },

  buttomText: {
    fontWeight: "bold",
    fontSize: 16,
    color: colors.white,
  },
});

export default styles;
