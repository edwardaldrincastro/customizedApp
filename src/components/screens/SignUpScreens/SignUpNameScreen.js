import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Dimensions } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import { Header, Left } from "native-base";



class SignUpNameScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
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
    firstNameChangedHandler = (input) => {
        this.setState({
            firstName: input
        })
    }
    lastNameChangedHandler = (input) => {
        this.setState({
            lastName: input
        })
    }
    credentialsHandler = () => {
        if ((this.state.firstName && this.state.lastName) !== "") {

            this.props.navigation.navigate('Email',
                {
                    lastName: this.state.lastName,
                    firstName: this.state.firstName
                })

        } else {
            alert("Please enter your first name and/or last name.")
        }
    }
    render() {
        alert("asdasd")
        console.log("name",this.props.navigation.state)
        return (
            <View style={{ flex: 1 }}>
                <Header style={{ backgroundColor: "#212424" }}>
                    <Left style={{ marginRight: "85%" }}>
                        <Icon name="ios-arrow-back" size={30} color="#fff" onPress={() => this.props.navigation.goBack()} />
                    </Left>
                </Header>
                <View style={styles.container}>
                    <Text style={this.state.viewMode === "portrait" ? styles.portraitWelcome : styles.landscapeWelcome}>What is your name?</Text>
                    <Text style={this.state.viewMode === "portrait" ? styles.portraitTitle : styles.landscapeTitle}> FIRST NAME</Text>

                    <View style={styles.firstNameInput}>
                        <TextInput
                            onChangeText={(val) => this.firstNameChangedHandler(val)}
                            underlineColorAndroid="white"
                            value={this.state.firstName}
                            style={styles.inputText} />
                    </View>
                    <Text style={this.state.viewMode === "portrait" ? styles.portraitTitle : styles.landscapeTitle}>LAST NAME</Text>
                    <View style={styles.lastNameInput}>
                        <TextInput
                            onChangeText={(val) => this.lastNameChangedHandler(val)}
                            underlineColorAndroid="white"
                            value={this.state.lastName}
                            style={styles.inputText} />
                    </View>
                    <View style={styles.nextButton}>
                        <TouchableOpacity onPress={() => this.credentialsHandler()}>
                            <View style={styles.buttonStyle}>
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
        marginRight: "41%",
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
        marginRight: "65%",
        fontFamily: "Inconsolata-Regular",
    },
    landscapeTitle: {
        color: "#E1E1E1",
        fontSize: 12,
        marginRight: "70%",
        fontFamily: "Inconsolata-Regular",
    },
    firstNameInput: {
        width: "82%",
        height: 35,
        justifyContent: "center",
    },
    lastNameInput: {
        width: "82%",
        height: 35,
        justifyContent: "center",
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

export default SignUpNameScreen;
