import React, { Component } from 'react';
import { View, Text, ScrollView, Image, StyleSheet } from 'react-native';
import { messages } from "../data/dataSample";

class InboxScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: messages
    };
  }
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <Text style={styles.title}> Inbox </Text>
        <Text style={styles.notif}> You have no unread messages </Text>
        <ScrollView showsHorizontalScrollIndicator={false} style={{ margin: 10, backgroundColor: "white" }}>
          {this.state.messages.map((item, index) => (
            <View key={index}>
              <View style={{ flexDirection: "row", margin: 10 }}>
                <Image style={styles.image} source={{ uri: item.img }} />
                <View style={styles.message}>
                  <View style={styles.date}>
                    <Text style={{ fontWeight: 'bold' }}>{item.name}</Text>
                    <Text>{item.date}</Text>
                  </View>
                  <Text numberOfLines={1} style={{ marginTop: 15 }}>{item.message}</Text>
                </View>
              </View>
              <View style={{ borderBottomColor: '#eeeeee', borderBottomWidth: 1 }}/>
            </View>
          ))}
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
    marginBottom: 10,
    color: "#6d6d6d"
  },
  notif: {
    fontSize: 14,
    marginTop: 5,
    marginLeft: 20,
    color: "#6d6d6d"
  },
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
  date : { 
    flexDirection: "row", 
    justifyContent: "space-between" 
  }
})
export default InboxScreen;
