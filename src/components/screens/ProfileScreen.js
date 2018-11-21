import React, { Component } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Profile Screen </Text>
        <View style={{ flex: 1, alignItems: "center", justifyContent: 'center', }}>
          <Button title="Log Out" onPress={() => this.props.navigation.navigate('App')} />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#212424'
  },
  title: {
    fontSize: 40,
    fontFamily: "Inconsolata-Bold",
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    color: "#FE6A6A"
  }
})
export default ProfileScreen;
