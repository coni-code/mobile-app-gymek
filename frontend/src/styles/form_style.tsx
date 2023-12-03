import { StyleSheet} from "react-native";

const styles = StyleSheet.create({
    inputStyle: {
      margin: 3,
      minWidth: 300,
      maxWidth: 300,
      backgroundColor: "white"
    },
    error: {
      borderColor: "red",
      backgroundColor: "pink"
    },
    textError:{
      color: "red"
    },
    empty:{

    },
    pickerContainer: {
      borderWidth: 1,
      borderColor: 'black',
      borderRadius: 25,
      top: 6,
      margin: 3,
    },
  
    buttonStyle: {
      minWidth: 300,
      maxWidth: 300,
      minHeight: 50,
      justifyContent: 'center',
      alignItems: 'center',
      top: 30,
      margin: 3,
      backgroundColor: '#ED3D63'
    },
  
    picker: {
      minHeight: 55,
      width: '100%', 
    },
    gender: {
      width: 300,
      display:"flex",
      justifyContent: "space-evenly",
      alignItems:"center",
      flexDirection:"row",
      padding: 5
    }
  });
export default styles
