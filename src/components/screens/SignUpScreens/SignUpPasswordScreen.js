import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Dimensions } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import { Header, Left } from "native-base";
import { connect } from "react-redux";
import { authSignUpPassword } from "../../../store/actions/signUp";
class SignUpPasswordScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: null,
            confirmPassword: null,
            viewMode: Dimensions.get("window").height > 500 ? "portrait" : "landscape"
        };
        Dimensions.addEventListener("change", this.updateStyles)

    }

    componentWillUnmount() {
        Dimensions.removeEventListener("change", this.updateStyles)
    }

    updateStyles = (dims) => {
        this.setState({
            // viewMode: Dimensions.get("window").height > 500 ? "portrait" : "landscape"
            viewMode: dims.window.height > 500 ? "portrait" : "landscape"
        })
    }
    passwordChangedHandler = (input) => {
        this.setState({
            password: input
        })
    }
    confirmPasswordChangedHandler = (input) => {
        this.setState({
            confirmPassword: input
        })
    }
    toggleSwitchHandler = () => {
        this.setState({
            toggleSwitch: !this.state.toggleSwitch
        })
    }
    credentialsHandler = (lastName, firstName) => {
        if (this.state.email !== null) {

            this.props.navigation.navigate('Birthday', {
                lastName: lastName,
                firstName: firstName,
                email: this.state.email
            })
        } else {
            alert("Please enter your email.")
        }
    }

    passwordHandler = () => {
        // this.props.signUpEmail(this.state.email)
        if (this.state.password === this.state.confirmPassword) {
            this.props.signUpPassword(this.props.idToken, this.state.password)

        } else {
            alert("Password does not match")
        }
    }
    componentDidUpdate() {
        this.checkPassword()
    }

    checkPassword = () => {
        if (this.props.isPasswordConfirmed) {
            this.props.navigation.navigate('Birthday')
        }
    }
    render() {
        console.log("password",this.props.navigation.state)
        const lastName = this.props.navigation.getParam("lastName", "no last name")
        const firstName = this.props.navigation.getParam("firstName", "no first name")
        return (
            <View style={{ flex: 1 }}>
                <Header style={{ backgroundColor: "#212424" }}>
                    <Left style={{ marginRight: "85%" }}>
                        <Icon name="ios-arrow-back" size={30} color="#fff" onPress={() => this.props.navigation.goBack()} />
                    </Left>
                </Header>
                <View style={styles.container}>
                    <Text style={this.state.viewMode === "portrait" ? styles.portraitWelcome : styles.landscapeWelcome}>How about your password?</Text>
                    <Text style={this.state.viewMode === "portrait" ? styles.portraitTitle : styles.landscapeTitle}>PASSWORD</Text>
                    <View style={styles.inputField}>
                        <TextInput textContentType="emailAddress" onChangeText={(val) => this.passwordChangedHandler(val)}
                            underlineColorAndroid="white"
                            secureTextEntry={true}
                            style={styles.inputText} />
                    </View>
                    <Text style={this.state.viewMode === "portrait" ? styles.portraitConfirmTitle : styles.landscapeConfirmTitle}>CONFIRM PASSWORD</Text>
                    <View style={styles.inputField}>
                        <TextInput textContentType="emailAddress" onChangeText={(val) => this.confirmPasswordChangedHandler(val)}
                            underlineColorAndroid="white"
                            secureTextEntry={true}
                            style={styles.inputText} />
                    </View>
                    <View style={styles.nextButton}>
                        <TouchableOpacity onPress={() => this.passwordHandler()}><View style={styles.buttonStyle}>
                            <Icon name="ios-arrow-forward" size={24} color="#E1E1E1" />
                        </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#212424',
    },
    portraitWelcome: {
        color: "#FE6A6A",
        fontSize: 20,
        right: 45,
        marginTop: 13,
        marginBottom: 20,
        fontFamily: "Inconsolata-Regular",
    },
    landscapeWelcome: {
        color: "#FE6A6A",
        fontSize: 20,
        right: 150,
        marginBottom: 20,
        fontFamily: "Inconsolata-Regular",
    },
    portraitTitle: {
        color: "#E1E1E1",
        fontSize: 12,
        right: 125,
        fontFamily: "Inconsolata-Regular",
    },
    landscapeTitle: {
        color: "#E1E1E1",
        fontSize: 12,
        right: 223,
        fontFamily: "Inconsolata-Regular",
    },
    portraitConfirmTitle: {
        color: "#E1E1E1",
        fontSize: 12,
        right: 101,
        fontFamily: "Inconsolata-Regular",
        marginTop: 10
    },
    landscapeConfirmTitle: {
        color: "#E1E1E1",
        fontSize: 12,
        right: 199,
        fontFamily: "Inconsolata-Regular",
        marginTop: 10
    },
    subscribe: {
        width: "68%"
    },
    subscribeText: {
        color: "white",
        fontSize: 12,
        fontFamily: "Inconsolata-Regular",
    },
    inputField: {
        width: "82%",
        height: 35,
        justifyContent: 'center'
    },
    nextButton: {
        width: 40,
        height: 40,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: "#41C7C7",
        marginLeft: "70%",
        marginTop: 30,
        justifyContent: "center",
        backgroundColor: '#41C7C7',
    },
    buttonStyle: {
        justifyContent: 'center',
        alignItems: "center"
    },
    inputText: {
        color: "#FE6A6A",
        fontFamily: "Inconsolata-Regular"
    }
});
const mapStateToProps = state => {
    return {
        isLoading: state.ui.isLoading,
        idToken: state.ui.idToken,
        isPasswordConfirmed: state.ui.isPasswordConfirmed
    }
}
const mapDispatchToProps = dispatch => {
    return {
        signUpPassword: (idToken, password) => dispatch(authSignUpPassword(idToken, password))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SignUpPasswordScreen);
