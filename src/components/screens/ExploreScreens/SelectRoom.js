import React from "react";
import { Text, View, StyleSheet, ImageBackground, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
const CategoriesSelection = (props) => {
    return (
        <View style={{ marginTop: 10, marginBottom: 10 }}>
            <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
                {props.rooms.map((item, index) => (
                    <View key={index}>
                        <View style={styles.rooms}>
                            <View style={{ height: 85 }}>
                                <ImageBackground source={{ uri: item.img }}
                                    style={{
                                        width: null,
                                        height: null,
                                        flex: 1
                                    }}>
                                    <Icon name="md-heart-outline" color="white" size={20} style={{ marginTop: 5, marginLeft: "80%" }} />
                                </ImageBackground>
                            </View>
                            <Text style={styles.roomSize}>{item.room_size}</Text>
                            <Text style={styles.description}>{item.description}</Text>
                            <Text style={styles.rate}>{item.rate}</Text>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </View>
    )
}
const styles = StyleSheet.create({
    rooms: {
        height: 185,
        width: 145,
        backgroundColor: "white",
        marginLeft: 10,
        marginRight: 10,
    },
    roomSize: {
        fontSize: 8,
        fontWeight: 'bold',
        marginTop: 10
    },
    description: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
        color: "#595959"
    },
    rate: {
        fontSize: 13,
        marginTop: 10
    },
    location: {
        fontSize: 30,
        marginLeft: 15,
        marginBottom: 15,
    }
})

export default CategoriesSelection;