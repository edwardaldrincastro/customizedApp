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
import { addPlaceName } from "../../store/actions/placeContainer";
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
    console.log('[TripsScreen]: Initializing locationPickedHandler...')
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
    console.log('[TripsScreen]: locationPickedHandler DONE...')
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
  submitPlacehandler = () => {
    console.log('[TripsScreen]: Initializing submitPlacehandler...')
    if (this.state.places.placeName !== null &&
      this.props.image64 !== null &&
      this.props.locationFromRedux.latitude !== null &&
      this.props.locationFromRedux.longitude !== null) {
      this.props.addPlaceNameToRedux(this.state.places.placeName)
      this.props.addPlaceToRedux(this.state.places.placeName, this.props.image64, this.props.locationFromRedux.latitude, this.props.locationFromRedux.longitude)
    } else {
      alert("Please complete the requirements")
    }
    console.log('[TripsScreen]: submitPlacehandler DONE...')
  }
  render() {
    let submitButton = (<Icon name="md-arrow-round-up" size={30} color="#fff" style={styles.sendIcon} />);

    let locateButton = (<Icon name="md-locate" size={30} color="#E1E1E1" />)
    if (this.props.isLoading) {
      submitButton = <ActivityIndicator />
    }
    if (this.props.locationFromRedux.latitude && this.props.locationFromRedux.latitude !== null) {
      locateButton = (<Icon name="md-locate" size={30} color="#FE6A6A" />)
    }
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>Trips</Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.imagePicker}>
            <PickImage />
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
                  underlineColorAndroid="transparent"
                  placeholder="What's on your mind?"
                  placeholderTextColor="#FE6A6A"
                  value={this.props.placeNameFromRedux}
                  multiline={true}
                  scrollEnabled={true} 
                  style={styles.inputText}/>
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
            <PickLocation />
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
    backgroundColor: "#212424"
  },
  title: {
    fontSize: 40,
    fontFamily: 'Inconsolata-Bold',
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    color: "#FE6A6A"
  },
  imagePicker: {
    height: 399,
    width: "100%",
    borderColor: "#E1E1E1",
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
    borderColor: "#E1E1E1",
    borderWidth: 1
  },
  inputText: {
    color: '#FE6A6A',
    fontFamily: 'Inconsolata-Regular',
    marginLeft: 10
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
    backgroundColor: "#41C7C7",
    borderWidth: 1,
    borderColor: "#41C7C7",
    borderRadius: 100
  }

})

const mapStateToProps = state => {
  return {
    isLoading: state.ui.isLoading,
    image64: state.placeContainer.placeContainer.image.base64,
    locationFromRedux: state.placeContainer.placeContainer.location,
    placeNameFromRedux: state.placeContainer.placeContainer.name

  }
}
const mapDispatchToProps = dispatch => {
  return {
    addPlaceToRedux: (placeName, image, latitude, longitude) => dispatch(addPlace(placeName, image, latitude, longitude)),
    addPlaceNameToRedux: (placeName) => dispatch(addPlaceName(placeName))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(TripsScreen);
