import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import MapView from 'react-native-maps'
import Icon from "react-native-vector-icons/Ionicons";
import { connect } from "react-redux";
import { addLocation } from "../../../store/actions/placeContainer";

class PickLocation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            focusedLocation: {
                latitude: 14.549299,
                longitude: 121.050855,
                latitudeDelta: 0.0118,
                longitudeDelta: Dimensions.get("window").width / Dimensions.get("window").height * 0.0118
            },
            locationChosen: false
        };
    }
    pickLocationHandler = event => {
        const coords = event.nativeEvent.coordinate;
        this.map.animateToRegion({
            ...this.state.focusedLocation,
            latitude: coords.latitude,
            longitude: coords.longitude
        })
        this.setState(prevState => {
            return {
                focusedLocation: {
                    ...prevState.focusedLocation,
                    latitude: coords.latitude,
                    longitude: coords.longitude
                },
                locationChosen: true
            }
        })
        // this.props.onLocationPicked({
        //     latitude: coords.latitude,
        //     longitude: coords.longitude
        // })
        this.props.addLocationToRedux({latitude: coords.latitude, longitude: coords.longitude})
    }
    getLocationHandler = () => {
        navigator.geolocation.getCurrentPosition(pos => {
            const coordsEvent = {
                nativeEvent: {
                    coordinate: {
                        latitude: pos.coords.latitude,
                        longitude: pos.coords.longitude
                    }
                }
            }
            this.pickLocationHandler(coordsEvent)
        },
            err => {
                console.log(err);
                alert("Fetching position failed")
            })
    }
    render() {
        console.log(this.state.focusedLocation)
        let marker = null
        if (this.state.locationChosen) {
            marker = <MapView.Marker coordinate={this.state.focusedLocation} />
        }
        return (
            <View style={styles.container}>
                <MapView
                    style={styles.map}
                    initialRegion={this.state.focusedLocation}
                    onPress={this.pickLocationHandler}
                    ref={ref => this.map = ref}>
                    {marker}
                </MapView>
                <View style={{ right: 5, position: 'absolute', bottom: 5 }}>
                    <TouchableOpacity onPress={this.getLocationHandler}>
                        <Icon name="md-locate" size={20} color="#0277bd" style={styles.locateIcon} />
                    </TouchableOpacity>
                </View>
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
    map: {
        height: "100%",
        width: "100%",
    },
    locateIcon: {
        textAlign: 'center',
        textAlignVertical: 'center',
        height: 30,
        width: 30,
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: "white",
        borderRadius: 100
    }
})
const mapStateToProps = state => {
    return {
        isLoading: state.ui.isLoading,
        locationFromRedux: state.placeContainer.placeContainer.location.latitude
    }
}
const mapDispatchToProps = dispatch => {
    return {
        addLocationToRedux: (location) => dispatch(addLocation(location))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(PickLocation);
