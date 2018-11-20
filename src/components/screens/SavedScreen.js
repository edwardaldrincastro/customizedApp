import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { saved_list } from "../data/dataSample";
import { messages } from "../data/dataSample";
import { addPlace, getPlaces } from "../../store/actions/addPlace";
import { connect } from "react-redux";
import PlacesFeed from "./SavedScreens/PlacesFeed";

class SavedScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      savedList: saved_list,
      messages: messages
    };
  }
  componentDidMount() {
    this.props.onLoadPlaces()
  }
  //  componentDidUpdate() {
  //    this.props.onLoadPlaces()
  //  }
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <Text style={styles.title}> Feed </Text>

        <ScrollView style={{ margin: 10, backgroundColor: "white" }}>
          <PlacesFeed />
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  title: {
    fontSize: 40,
    fontWeight: "bold",
    marginTop: 5,
    marginLeft: 10,
    color: "#6d6d6d"
  },
})

const mapDispatchToProps = dispatch => {
  return {
    onLoadPlaces: () => dispatch(getPlaces())
  }
}
export default connect(null, mapDispatchToProps)(SavedScreen);


{/* {this.state.savedList.map((item, index) => (
          <View key={index}>
            <View style={styles.savedList}>
              <Text style={styles.name}>{item.name}</Text>
                <View style={{ height: 220 }}>
                  <Image source={{ uri: item.img }}
                    style={{
                      flex: 1,
                      width: null,
                      height: null,
                      resizeMode: 'stretch'
                    }} />
                </View>
              </View>
          </View>
        ))} */}