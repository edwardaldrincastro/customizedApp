import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { data_samples, explores } from "../../data/dataSample";
import CategoriesSelection from "./SelectCategories";
import RoomSelection from "./SelectRoom";

class ExploreScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: explores,
      roomChoices: data_samples
    };
  }
  render() {
    return (
      <View style={{ backgroundColor: "#212424" }}>
        <ScrollView>
          <Text style={styles.title}>Explore</Text>
          <View>
            <CategoriesSelection categories={this.state.categories} />
          </View>
          <View>
            <Text style={styles.location}>Zürich</Text>
            <RoomSelection rooms={this.state.roomChoices} />
          </View>
          <View>
            <Text style={styles.location}>Stockholm</Text>
            <RoomSelection rooms={this.state.roomChoices} />
          </View>
          <View>
            <Text style={styles.location}>Copenhagen</Text>
            <RoomSelection rooms={this.state.roomChoices} />
          </View>
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
    marginRight: 10,
    marginBottom: 10,
    color: "#FE6A6A",
    fontFamily: 'Inconsolata-Bold',
  },
  location: {
    fontSize: 30,
    marginLeft: 20,
    marginBottom: 10,
    marginTop: 10,
    fontFamily: 'Inconsolata-Regular',
    color: "#41C7C7",
  }
})
export default ExploreScreen;
