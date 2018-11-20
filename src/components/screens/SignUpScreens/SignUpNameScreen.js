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
        return (
            <View style={{ flex: 1 }}>
                <Header style={{ backgroundColor: "#00bfa5" }}>
                    <Left style={{ marginRight: "85%" }}>
                        <Icon name="ios-arrow-back" size={30} color="#fff" onPress={() => this.props.navigation.goBack()} />
                    </Left>
                </Header>
                <View style={styles.container}>
                    <Text style={this.state.viewMode === "portrait" ? styles.portraitWelcome : styles.landscapeWelcome}>What is your name?</Text>
                    <Text style={this.state.viewMode === "portrait" ? styles.portraitTitle : styles.landscapeTitle}>FIRST NAME</Text>

                    <View style={styles.firstNameInput}>
                        <TextInput
                            onChangeText={(val) => this.firstNameChangedHandler(val)}
                            underlineColorAndroid="white"
                            value={this.state.firstName} />
                    </View>
                    <Text style={this.state.viewMode === "portrait" ? styles.portraitTitle : styles.landscapeTitle}>LAST NAME</Text>
                    <View style={styles.lastNameInput}>
                        <TextInput
                            onChangeText={(val) => this.lastNameChangedHandler(val)}
                            underlineColorAndroid="white"
                            value={this.state.lastName} />
                    </View>
                    <View style={styles.nextButton}>
                        <TouchableOpacity onPress={() => this.credentialsHandler()}>
                            <View style={styles.buttonStyle}>
                                <Icon name="ios-arrow-forward" size={24} color="#00bfa5" />
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
        backgroundColor: '#00bfa5',
    },
    portraitWelcome: {
        color: "#fff",
        fontSize: 20,
        marginRight: "41%",
        marginBottom: 20
    },
    landscapeWelcome: {
        color: "#fff",
        fontSize: 20,
        marginRight: "60%",
        marginBottom: 20
    },
    portraitTitle: {
        color: "#fff",
        fontSize: 12,
        marginRight: "62%"
    },
    landscapeTitle: {
        color: "#fff",
        fontSize: 12,
        marginRight: "70%"
    },
    firstNameInput: {
        width: "82%",
        height: 35,
        justifyContent: "center"
    },
    lastNameInput: {
        width: "82%",
        height: 35,
        justifyContent: "center"
    },
    nextButton: {
        width: 40,
        height: 40,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: "#fff",
        marginLeft: "70%",
        marginTop: 30,
        justifyContent: "center",
        backgroundColor: '#fff',
    },
    buttonStyle: {
        justifyContent: 'center',
        alignItems: "center"
    },
});

export default SignUpNameScreen;
