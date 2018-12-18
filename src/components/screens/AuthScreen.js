import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import brandIcon from '../../assets/iconBulb.png';
import { connect } from "react-redux";

class AuthScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginMode: false,
            viewMode: Dimensions.get("window").height > 500 ? "portrait" : "landscape"
        };
        Dimensions.addEventListener("change", this.updateStyles)

    }
    componentDidMount() {
        this.setState({
            loginMode: this.props.isLoginSuccessful
        })
        console.log("app has started")
    }
    componentDidUpdate() {
        if (this.props.isLoginSuccessful) {
            this.props.navigation.navigate('Entry')
            console.log("app session", this.props.isLoginSuccessful)
        }
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
    static navigationOptions = {
        header: null
    }
    loginHandler = () => {

        this.props.navigation.navigate('Login')
    }

    render() {
        console.log("app has started")
        console.log(this.props.isLoginSuccessful)
        return (
            <View style={styles.container}>
                <Image source={brandIcon} style={styles.brandIcon} />
                <View styles={styles.view}>
                    <Text style={this.state.viewMode === "portrait" ? styles.portraitWelcome : styles.landscapeWelcome}>Welcome to Ting</Text>

                </View>
                <View style={styles.loginButton}>
                    <TouchableOpacity onPress={() => this.loginHandler()}>
                        <View style={styles.buttonStyle}>
                            <Text style={styles.loginButtonText}>Login</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.signUpButton}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Name')}>
                        <View style={styles.buttonStyle}>
                            <Text style={styles.signUpButtonText}>Sign Up</Text>
                        </View>
                    </TouchableOpacity>
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
        backgroundColor: "#212424"
        // backgroundColor: '#00bfa5',
    },
    portraitWelcome: {
        color: "#FE6A6A",
        fontSize: 24,
        marginRight: 145,
        marginBottom: 10,
        fontFamily: "Inconsolata-Regular"
    },
    landscapeWelcome: {
        color: "#FE6A6A",
        fontSize: 24,
        marginRight: 330,
        marginBottom: 10,
        fontFamily: "Inconsolata-Regular"
    },
    loginButton: {
        width: "80%",
        height: 35,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#41C7C7",
        backgroundColor: "#41C7C7",
        marginTop: 10,
        justifyContent: "center"
    },
    signUpButton: {
        width: "80%",
        height: 35,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#41C7C7",
        marginTop: 10,
        justifyContent: "center",
        backgroundColor: "#41C7C7"
    },
    buttonStyle: {
        justifyContent: 'center',
        alignItems: "center"
    },
    signUpButtonText: {
        color: "#E1E1E1",
        fontSize: 14,
        fontFamily: "Inconsolata-Regular"
    },
    loginButtonText: {
        color: "#E1E1E1",
        fontSize: 16,
        fontFamily: "Inconsolata-Regular"
    },
    brandIcon: {
        height: 220,
        width: 220,
        marginBottom: 40,
        // marginRight: 20
    }
});

const mapStateToProps = state => {
    return {
        isLoginSuccessful: state.ui.isLoginSuccessful
    }
}

export default connect(mapStateToProps, null)(AuthScreen);
