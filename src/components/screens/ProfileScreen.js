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
      <View>
        <Text style={styles.title}> Profile Screen </Text>
        <View style={{ alignItems: "center", justifyContent: 'center', }}>
          <Button title="Log Out" onPress={() => this.props.navigation.navigate('App')} />
        </View>
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
    marginRight: 10,
    marginBottom: 10,
    color: "#6d6d6d"
  }
})
export default ProfileScreen;
