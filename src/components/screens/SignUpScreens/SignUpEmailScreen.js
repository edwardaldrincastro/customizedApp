import React, { Component } from 'react';
import { ActivityIndicator, View, Text, StyleSheet, TouchableOpacity, TextInput, Dimensions } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import { Header, Left, Switch } from "native-base";
import { connect } from "react-redux";
import { authSignUpEmail } from "../../../store/actions/signUp";
class SignUpEmailScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: null,
            toggleSwitch: true,
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
    emailChangedHandler = (input) => {
        this.setState({
            email: input
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

    componentDidUpdate() {
        this.checkEmail()
    }

    emailHandler = () => {
        this.props.signUpEmail(this.state.email)
 
    }
    checkEmail = () => {
        if(this.props.isEmailConfirmed){
            this.props.navigation.navigate('Password')
        }
    }
    render() {
        
    console.log("email",this.props.navigation.state)
        const lastName = this.props.navigation.getParam("lastName", "no last name")
        const firstName = this.props.navigation.getParam("firstName", "no first name")
        let submitButton =
            (<View style={styles.nextButton}>
                {/* <TouchableOpacity onPress={() => this.credentialsHandler(lastName, firstName)}> */}
                <TouchableOpacity onPress={() => this.emailHandler()}><View style={styles.buttonStyle}>
                    <Icon name="ios-arrow-forward" size={24} color="#E1E1E1" />
                </View>
                </TouchableOpacity>
            </View>);

        if (this.props.isLoading) {
            submitButton = <ActivityIndicator />
        }

        return (
            <View style={{ flex: 1 }}>
                <Header style={{ backgroundColor: "#212424" }}>
                    <Left style={{ marginRight: "85%" }}>
                        <Icon name="ios-arrow-back" size={30} color="#fff" onPress={() => this.props.navigation.goBack()} />
                    </Left>
                </Header>
                <View style={styles.container}>
                    <Text style={this.state.viewMode === "portrait" ? styles.portraitWelcome : styles.landscapeWelcome}>And your email?</Text>
                    <Text style={this.state.viewMode === "portrait" ? styles.portraitTitle : styles.landscapeTitle}>EMAIL</Text>
                    <View style={styles.emailInput}>
                        <TextInput textContentType="emailAddress" onChangeText={(val) => this.emailChangedHandler(val)} underlineColorAndroid="white" style={styles.inputText} />
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        <View style={styles.subscribe}>
                            <Text style={styles.subscribeText}>I'd like to receive marketing and policy communications from Ting and its partners.</Text>
                        </View>
                        <Switch value={this.state.toggleSwitch} onValueChange={this.toggleSwitchHandler} tintColor="#bbb" thumbTintColor="white" onTintColor="#64dd17" />
                    </View>

                    {submitButton}
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
        marginRight: "50%",
        marginBottom: 20,
        fontFamily: "Inconsolata-Regular",
    },
    landscapeWelcome: {
        color: "#FE6A6A",
        fontSize: 20,
        marginRight: "60%",
        marginBottom: 20,
        fontFamily: "Inconsolata-Regular",
    },
    portraitTitle: {
        color: "#E1E1E1",
        fontSize: 12,
        marginRight: "74%",
        fontFamily: "Inconsolata-Regular",
    },
    landscapeTitle: {
        color: "#E1E1E1",
        fontSize: 12,
        marginRight: "76%",
        fontFamily: "Inconsolata-Regular",
    },
    subscribe: {
        width: "68%"
    },
    subscribeText: {
        color: "white",
        fontSize: 12,
        fontFamily: "Inconsolata-Regular",
    },
    emailInput: {
        width: "82%",
        height: 35,
        justifyContent: "center"
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
        isEmailConfirmed: state.ui.isEmailConfirmed,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        signUpEmail: (email) => dispatch(authSignUpEmail(email))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SignUpEmailScreen);
