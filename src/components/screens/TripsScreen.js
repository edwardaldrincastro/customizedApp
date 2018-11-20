import React, { Component } from 'react';
import {
  ActivityIndicator,
  View,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
  Text,
  StyleSheet,
  Modal
} from 'react-native';
import PickLocation from "../screens/TripsScreens/PickLocation";
import PickImage from "../screens/TripsScreens/PickImage";
import { addPlace } from "../../store/actions/addPlace";
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/Ionicons";

class TripsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      places: {
        placeName: null,
        image: null,
        location: {
          latitude: null,
          longitude: null
        }
      }
    };
  }
  modalHandler = () => {
    this.setState({
      modalVisible: !this.state.modalVisible
    })
  }
  submitButtonState = () => {
    if (this.state.places.placeName !== null &&
      this.state.places.image !== null &&
      this.state.places.location.latitude !== null &&
      this.state.places.location.longitude !== null) {
      this.setState({
        submitButton: !this.state.submitButton
      })
    }

  }
  addPlaceHandler = (placeName) => {
    this.setState(prevState => {
      return {
        ...prevState,
        places: {
          ...prevState.places,
          placeName: placeName
        }
      }
    })
  }
  locationPickedHandler = (location) => {
    console.log(`Pumasok sa location picked handler. Location:${location.latitude}+${location.longitude}`)
    this.setState(prevState => {
      return {
        ...prevState,
        places: {
          ...prevState.places,
          location: {
            ...prevState.location,
            latitude: location.latitude,
            longitude: location.longitude
          }
        }
      }
    })
    console.log("Done sa location picked handler")
  }
  imagePickedHandler = () => {
    this.setState(prevState => {
      return {
        ...prevState,
        places: {
          ...prevState.places,
          image: this.props.image64
        }
      }
    })
  }
  cleanState = () => {
    if (!this.props.isLoading) {
      this.setState({
        places: {
          placeName: null,
          image: null,
          location: {
            latitude: null,
            longitude: null
          }
        }
      })
    }
  }
  submitPlacehandler = () => {

    console.log("submitPlaceHandler: START")

    console.log(`submitPlacehandler STATE longi: ${this.state.places.location.longitude}`)

    if (this.state.places.placeName !== null &&
      this.props.image64 !== null &&
      this.props.locationFromRedux.latitude !== null &&
      this.props.locationFromRedux.longitude !== null) {
      this.props.addPlaceToRedux(this.state.places.placeName, this.props.image64, this.props.locationFromRedux.latitude, this.props.locationFromRedux.longitude)
      this.cleanState()
    } else {
      alert("Please complete the requirements")
    }
    console.log("submitPlaceHandler: DONE")
    console.log(`my state: ${this.state}`)
  }
  render() {
    let submitButton = (<Icon name="md-arrow-round-up" size={30} color="#fff" style={styles.sendIcon} />);

    let locateButton = (<Icon name="md-locate" size={30} color="#000" />)
    if (this.props.isLoading) {
      submitButton = <ActivityIndicator />
    }
    if (this.props.locationFromRedux.latitude && this.props.locationFromRedux.latitude !== null) {
      locateButton = (<Icon name="md-locate" size={30} color="#ff5252" />)
      console.log(this.state.places.location)
    }
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>Trips</Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.imagePicker}>
            <PickImage/>
          </View>
          <View style={styles.inputContainer} >
            <View style={styles.iconContainer} >
              <TouchableOpacity onPress={() => this.modalHandler()}>
                {locateButton}
              </TouchableOpacity>
            </View>
            <View style={styles.inputHolder} >
              <View style={styles.inputBox}>
                <TextInput
                  onChangeText={(val) => this.addPlaceHandler(val)}
                  underlineColorAndroid="white"
                  placeholder="What's on your mind?"
                  value={this.state.places.placeName}
                  multiline={true}
                  scrollEnabled={true} />
              </View>
            </View>
            <View style={styles.iconContainer} >
              <TouchableOpacity onPress={() => this.submitPlacehandler()} disabled={false}>
                {submitButton}
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>

        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            alert('Modal has been closed.')
            this.modalHandler();
          }}>
          <TouchableWithoutFeedback onPress={() => this.modalHandler()}>
            <View style={styles.modalOpacity} />
          </TouchableWithoutFeedback>
          <View style={styles.modalMap}>
            {console.log(this.state.location)}
            <PickLocation/>
          </View>
          <TouchableWithoutFeedback onPress={() => this.modalHandler()}>
            <View style={styles.modalOpacity} />
          </TouchableWithoutFeedback>

        </Modal>
      </View>

    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    color: "#6d6d6d"
  },
  imagePicker: {
    height: 399,
    width: "100%",
    borderColor: "#eee",
    borderWidth: 1
  },
  inputContainer: {
    height: 50,
    width: "100%",
    flexDirection: 'row',
    alignItems: 'center'
  },
  iconContainer: {
    height: 50,
    width: "15%",
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputHolder: {
    height: 50,
    width: "70%",
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputBox: {
    height: "80%",
    width: "100%",
    borderRadius: 50,
    borderColor: "#424242",
    borderWidth: 1
  },
  modalOpacity: {
    width: "100%",
    height: "25%",
    backgroundColor: 'rgba(66,66,66,0.7)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalMap: {
    width: "100%",
    height: "50%",
    backgroundColor: "#00b0ff"
  },
  sendIcon: {
    textAlign: 'center',
    textAlignVertical: 'center',
    height: 30,
    width: 30,
    backgroundColor: "#00c853",
    borderWidth: 1,
    borderColor: "#00c853",
    borderRadius: 100
  }

})

const mapStateToProps = state => {
  return {
    isLoading: state.ui.isLoading,
    image64: state.placeContainer.placeContainer.image.base64,
    locationFromRedux: state.placeContainer.placeContainer.location

  }
}
const mapDispatchToProps = dispatch => {
  return {
    addPlaceToRedux: (placeName, image, latitude, longitude) => dispatch(addPlace(placeName, image, latitude, longitude))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(TripsScreen);
