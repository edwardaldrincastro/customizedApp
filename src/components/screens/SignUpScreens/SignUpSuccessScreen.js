import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, AsyncStorage } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';

import { connect } from "react-redux";
import { addUser } from "../../../store/actions/signUp";

const lastName = ""
const firstName = ""
const email = ""
const birthday = ""


class SignUpSuccessScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fname: "",
            lname: "",
            mail: "",
            password: null,
            birthday: null
        };
    }

    saveUserId = async () => {
        try {
          await AsyncStorage.setItem(key, JSON.stringify(account));
          console.log("Done store")
        } catch (error) {
          // Error retrieving data
          console.log(error.message);
        }
      };
    accountCreationHandler = (lastName, firstName, email) => {
       this.setState({
           lastName: lastName,
           firstName: firstName,
           email: email
       })
    }

    submitHandler = () => {
        const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'Login' })],
          });
          this.props.navigation.dispatch(resetAction);
    }
    render() {
        return (
            <View style={styles.container}>
                {/* {this.accountCreationHandler(lastName, firstName, email, birthday)} */}
                <View styles={styles.view}>
                    <Text style={styles.welcome}> Sign up Successful </Text>
                </View>
                <View style={styles.loginButton}>

                    <TouchableOpacity onPress={() => this.submitHandler()}>
                        <View style={styles.buttonStyle}>
                            <Text style={styles.loginButtonText}>
                                Sign In
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>

            </View>
        );
    }
    componentDidMount(prevProps) {
        lastName = this.props.navigation.getParam("lastName", "no last name")
        firstName = this.props.navigation.getParam("firstName", "no first name")
        email = this.props.navigation.getParam("email", "no email")
        birthday = this.props.navigation.getParam("birthday", "no birthday")

        // alert(birthday)
        // this.props.accountCreationHandler(lastName, firstName, email)
        // alert(this.state.lname)
        // alert(birthday)
        this.props.createAccount(lastName, firstName, email, birthday)
        // alert(this.state.lname)
        // this.props.myAction(this.state.num, this.state.numbato, this.state.numbate)
        // this.saveUserId()
    }

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00bfa5',
    },
    welcome: {
        color: "#fff",
        fontSize: 20,
        marginBottom: 20
    },
    loginButton: {
        width: "80%",
        height: 35,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#fff",
        backgroundColor: "#fff",
        marginTop: 10,
        justifyContent: "center"
    },
    signUpButton: {
        width: 40,
        height: 40,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: "#fff",
        marginTop: 10,
        justifyContent: "center",
        backgroundColor: '#fff',
    },
    buttonStyle: {
        justifyContent: 'center',
        alignItems: "center"
    },
    signUpButtonText: {
        color: "#00bfa5",
        fontSize: 14,
    },
    loginButtonText: {
        color: "#00bfa5",
        fontSize: 14,
    },
    buttonContainer: {
        width: "100%",
        // justifyContent: 'center',
        alignItems: "center"
    }
});

const mapDispatchToProps = dispatch => {
    return {
        createAccount: (lastName, firstName, email, birthday) => dispatch(addUser(lastName, firstName, email, birthday))
    }
}
export default connect(null, mapDispatchToProps)(SignUpSuccessScreen);
