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
      <View style={{ flex: 1, backgroundColor: "#212424" }}>
        <Text style={styles.title}>Inbox </Text>
        <Text style={styles.notif}> You have no unread messages </Text>
        <ScrollView showsHorizontalScrollIndicator={false} style={{ margin: 10 }}>
          {this.state.messages.map((item, index) => (
            <View key={index}>
              <View style={{ flexDirection: "row", margin: 10 }}>
                <Image style={styles.image} source={{ uri: item.img }} />
                <View style={styles.message}>
                  <View style={styles.date}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.dateText}>{item.date}</Text>
                  </View>
                  <Text numberOfLines={1} style={styles.messageText}>{item.message}</Text>
                </View>
              </View>
              <View style={{ borderBottomColor: '#eeeeee', borderBottomWidth: 1 }} />
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
    marginTop: 5,
    marginLeft: 10,
    marginBottom: 10,
    color: "#FE6A6A",
    fontFamily: "Inconsolata-Bold"
  },
  notif: {
    fontSize: 14,
    marginTop: 5,
    marginLeft: 20,
    color: "#41C7C7",
    fontFamily: "Inconsolata-Regular"
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 100,
  },
  name: {
    fontWeight: 'bold',
    color: '#41C7C7',
  },
  message: {
    marginLeft: 10,
    marginRight: 10,
    flexDirection: "column",
    flex: 1,
  },
  messageText: {
    marginTop: 15,
    color: '#E1E1E1',
    fontFamily: "Inconsolata-Regular"
  },
  date: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dateText: {
    fontFamily: "Inconsolata-Regular",
    color: "#41C7C7",
  }
})
export default InboxScreen;
