import React from "react";
import { Text, View, StyleSheet, Image, ScrollView } from "react-native";

const CategoriesSelection = (props) => {
    return (
        <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
            {props.categories.map((item, index) => (
                <View style={styles.categories} key={index}>
                    <View style={{ height: 85 }}>
                        <Image source={{ uri: item.img }}
                            style={{
                                flex: 1,
                                width: null,
                                height: null,
                                resizeMode: 'stretch'
                            }} />
                    </View>
                    <Text style={styles.name}>{item.name}</Text>
                </View>
            ))
            }
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    categories: {
        height: 120,
        width: 120,
        backgroundColor: "#212424",
        margin: 10,
        borderWidth: 1,
        borderColor: "#bbb",
        borderRadius: 3,
    },
    name: {
        fontSize: 15,
        // fontWeight: 'bold',
        margin: 5,
        fontFamily: 'Inconsolata-Bold',
        color: "#41C7C7",
    }
})

export default CategoriesSelection;