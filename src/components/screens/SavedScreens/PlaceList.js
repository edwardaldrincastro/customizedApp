import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from "react-redux";

const PlaceList = (props) => {
    return (
        <View>
            {props.places.map((item, index) => (
                <View key={index}>
                    <TouchableOpacity onPress={() => props.onSelectedPlace(item.id, item.placeName, item.image, item.location.latitude, item.location.longitude)}>
                        <View>
                            <View style={{ flexDirection: "row", margin: 10 }}>
                                <Image style={styles.image} source={{ uri: item.image }} />
                                <View style={styles.message}>
                                    <Text numberOfLines={1} style={{ fontWeight: "bold", }}>{item.placeName}</Text>
                                    <Text>Lat: {item.location.latitude}</Text>
                                    <Text>Long: {item.location.longitude}</Text>
                                </View>
                            </View>
                            <View style={{ borderBottomColor: '#eeeeee', borderBottomWidth: 1 }} />
                        </View>
                    </TouchableOpacity>
                </View>
            ))}
        </View>
    )
}
const styles = StyleSheet.create({
    image: {
        width: 60,
        height: 60,
        borderRadius: 100
    },
    message: {
        marginLeft: 10,
        marginRight: 10,
        flexDirection: "column",
        flex: 1
    },
    map: {
        width: "90%",
        height: 190
    }
})

const mapStateToProps = state => {
    return {
        places: state.addPlace.places
    }
}

export default connect(mapStateToProps, null)(PlaceList);
