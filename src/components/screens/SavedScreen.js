import React, { Component } from 'react';
import { ActivityIndicator, View, Text, StyleSheet, ScrollView } from 'react-native';
import { saved_list } from "../data/dataSample";
import { messages } from "../data/dataSample";
import { getPlaces } from "../../store/actions/addPlace";
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
  render() {
    let savedLoading = (<PlacesFeed />)
    if (this.props.isLoading) {
      savedLoading = (<View style={{ paddingTop: 45, margin: "50%" }}><ActivityIndicator /></View>)
    }
    return (
      <View style={{ flex: 1, backgroundColor: "#212424" }}>
        <Text style={styles.title}>Feed</Text>
        <ScrollView style={{ margin: 10,}}>
          {savedLoading}
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  title: {
    fontSize: 40,
    // fontWeight: "bold",
    marginTop: 5,
    marginLeft: 10,
    color: "#FE6A6A",
    fontFamily: 'Inconsolata-Bold',
  },
})
const mapStateToProps = state => {
  return {
    isLoading: state.ui.isLoading,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onLoadPlaces: () => dispatch(getPlaces())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SavedScreen);


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