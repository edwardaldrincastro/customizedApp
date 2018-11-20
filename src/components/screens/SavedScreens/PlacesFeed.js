import React, { Component } from 'react';
import { Modal, View, Text, Image, ImageBackground, StyleSheet, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/Ionicons";
import MapView from 'react-native-maps';
import PlaceList from "../SavedScreens/PlaceList";
import { deletePlace, getPlaces } from "../../../store/actions/addPlace";


class PlacesFeed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      selectedId: null,
      selectedPlace: null,
      selectedImage: null,
      focusedLocation: {
        latitude: 14.5557,
        longitude: 121.05,
        latitudeDelta: 0.0118,
        longitudeDelta: Dimensions.get("window").width / Dimensions.get("window").height * 0.0118
      }
    };
  }
  setModalVisible(modalInput) {
    this.setState({ modalVisible: modalInput });
  }
  selectedHandler = (id, placeName, image, latitude, longitude) => {
    console.log("selectedHandler: ", id)
    this.setState(prevState => {
      return {
        selectedId: id,
        selectedPlace: placeName,
        selectedImage: image,
        focusedLocation: {
          ...prevState.focusedLocation,
          latitude: latitude,
          longitude: longitude
        },
      }
    })
    this.setModalVisible(true)
  }
  deleteHandler = () => {
    this.props.onDeletePlace(this.state.selectedId)
    this.setModalVisible(!this.state.modalVisible)
  }
  render() {

    return (
      <View>
        <PlaceList onSelectedPlace={this.selectedHandler} />
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            alert('Modal has been closed.')
            this.setModalVisible(false);
          }}>
          <View style={{ width: "100%", height: "100%", backgroundColor: "#eee" }}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.modalContainer}>
                <Icon name="md-close" size={25} color="#4f4f4f" onPress={() => this.setModalVisible(false)} style={{ margin: 15 }} />
                <View style={{ width: "85%", height: 200 }}>
                  <ImageBackground source={{ uri: this.state.selectedImage }} style={{
                    width: '100%',
                    height: '100%'
                  }} />
                </View>
                <Text style={styles.forgotPassword}>{this.state.selectedPlace}</Text>
                <View style={{ width: "85%", height: 200, backgroundColor: "#00b0ff" }}>
                  <MapView
                    style={styles.map}
                    region={this.state.focusedLocation}
                    // onPress={this.pickLocationHandler}
                    ref={ref => this.map = ref}>
                    <MapView.Marker coordinate={this.state.focusedLocation} /></MapView>
                </View>
                {/* <View style={{ width: "100%", justifyContent: 'center',}}>
                  <Text style={styles.enterMail}>Location: {this.state.focusedLocation.latitude}</Text>
                  <Text style={styles.enterMail}>Location: {this.state.focusedLocation.longitude}</Text>
                </View> */}
                <TouchableOpacity onPress={() => alert('Passowrd recovery sent')}>
                  <View style={styles.deleteButton}>
                    <Text style={styles.buttonText}>DELETE PLACE</Text>
                  </View>
                </TouchableOpacity>


              </View>
            </ScrollView>
          </View>
        </Modal>
      </View >

    );
  }
}
const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: "#fff"
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 100
  },
  modalImage: {
    width: "90%",
    height: 190
  },
  message: {
    marginLeft: 10,
    marginRight: 10,
    flexDirection: "column",
    flex: 1
  },
  map: {
    width: "100%",
    height: "100%"
  },
  deleteButton: {
    height: 40,
    width: 250,
    backgroundColor: '#f44336',
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  buttonText: {
    fontSize: 14,
    color: "#fff"
  },
  forgotPassword: {
    fontSize: 16,
    fontWeight: 'bold',
    margin: 10,
    color: "#4f4f4f"
  },
  enterMail: {
    fontSize: 14,
    textAlign: 'center',
    margin: 10,
    color: "#8e8e8e"
  }

})
const mapStateToProps = state => {
  return {
    places: state.addPlace.places
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onDeletePlace: (id) => dispatch(deletePlace(id)),
    onLoadPlaces: () => dispatch(getPlaces())

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlacesFeed);
