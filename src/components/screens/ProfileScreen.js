import React, { Component } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { connect } from "react-redux";
import { loginSuccessful } from "../../store/actions/ui";

class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  logOutHandler = () => {
    this.props.fetchLogin(false)
    this.props.navigation.navigate('App')
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Profile Screen </Text>
        <View style={{ flex: 1, alignItems: "center", justifyContent: 'center', }}>
          <Button title="Log Out" onPress={() => this.logOutHandler()} />
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
const mapStateToProps = state => {
  return {
      isLoginSuccessful: state.ui.isLoginSuccessful
  }
}
const mapDispatchToProps = dispatch => {
  return {
      fetchLogin: (status) => dispatch(loginSuccessful(status))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
