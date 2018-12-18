import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Dimensions, AsyncStorage } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import { Header, Left } from "native-base";
import { users } from "../data/users";
import { connect } from "react-redux";
import { login } from "../../store/actions/loginAuth";

class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            showPass: true,
            filter: "SHOW",
            underlineColor: "white",
            users: users,
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
    passwordChangedHandler = (input) => {
        this.setState({
            password: input
        })
    }
    showPasswordHandler = () => {
        this.setState({
            showPass: !this.state.showPass,
        })
        this.passwordTextHandler()
    }
    passwordTextHandler = () => {
        if (this.state.showPass === false) {
            this.setState({
                filter: "SHOW"
            })
        } else {
            this.setState({
                filter: "HIDE"
            })
        }
    }
    loginHandler = () => {
        if ((this.state.email && this.state.password) !== "") {
            this.props.fetchLogin(this.state.email, this.state.password)
            // return this.props.navigation.navigate('Entry')

        } else {
            alert("Please input email and/or password.")
            this.setState({
                underlineColor: "#e53935"
            })


        }
    }
    componentDidUpdate() {
        this.checkLogin()
    }

    checkLogin = () => {
        if (this.props.isLoginSuccessful) {
            this.props.navigation.navigate('Entry')
        }
    }
    render() {
        // alert(this.props.firstName)
        console.log("login state", this.props.navigation.state)
        return (
            <View style={{ flex: 1 }}>
                <Header style={{ backgroundColor: "#212424" }}>
                    <Left style={{ marginRight: "85%" }}>
                        <Icon name="ios-arrow-back" size={30} color="#fff" onPress={() => this.props.navigation.replace('Auth')} />
                    </Left>
                </Header>
                <View style={styles.container}>
                    <Text style={this.state.viewMode === "portrait" ? styles.portraitWelcome : styles.landscapeWelcome}>Login</Text>

                    <Text style={this.state.viewMode === "portrait" ? styles.portraitTitle : styles.landscapeTitle}>EMAIL</Text>

                    <View style={styles.firstNameInput}>
                        <TextInput
                            textContentType="emailAddress"
                            onChangeText={(val) => this.emailChangedHandler(val)}
                            underlineColorAndroid={this.state.underlineColor}
                            value={this.state.email}
                            style={styles.inputText} />
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <Text style={this.state.viewMode === "portrait" ? styles.portraitPassword : styles.landscapePassword}>PASSWORD</Text>

                        <TouchableOpacity onPress={this.showPasswordHandler}>
                            <View style={{ width: 40, }}>
                                <Text style={{ color: "#E1E1E1", textAlign: 'center', fontSize: 12, fontFamily: "Inconsolata-Regular" }}>{this.state.filter}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.lastNameInput}>
                        <TextInput
                            textContentType="password"
                            onChangeText={(val) => this.passwordChangedHandler(val)}
                            secureTextEntry={this.state.showPass}
                            underlineColorAndroid={this.state.underlineColor}
                            value={this.state.password}
                            style={styles.inputText} />
                    </View>
                    <View style={styles.nextButton}>
                        <TouchableOpacity onPress={() => this.loginHandler()}>
                            <View style={styles.buttonStyle}>
                                <Text>
                                    <Icon name="ios-arrow-forward" size={24} color="#E1E1E1" />
                                </Text>
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
        marginRight: "70%",
        marginBottom: 20,
        fontFamily: "Inconsolata-Regular"
    },
    landscapeWelcome: {
        color: "#FE6A6A",
        fontSize: 20,
        marginRight: "80%",
        marginBottom: 20,
        fontFamily: "Inconsolata-Regular"
    },
    portraitTitle: {
        color: "#E1E1E1",
        fontSize: 12,
        marginRight: "72%",
        fontFamily: "Inconsolata-Regular"
    },
    landscapeTitle: {
        color: "#E1E1E1",
        fontSize: 12,
        marginRight: "76%",
        fontFamily: "Inconsolata-Regular"
    },
    portraitPassword: {
        color: "#E1E1E1",
        fontSize: 12,
        marginRight: 200,
        fontFamily: "Inconsolata-Regular"
    },
    landscapePassword: {
        color: "#E1E1E1",
        fontSize: 12,
        marginRight: 400
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
        // firstName: state.signUp.firstName,
        // lastName: state.signUp.lastName,
        // email: state.signUp.email,
        // password: state.signUp.password,
        // birthday: state.signUp.birthday
        isLoginSuccessful: state.ui.isLoginSuccessful
    }
}
const mapDispatchToProps = dispatch => {
    return {
        fetchLogin: (email, password) => dispatch(login(email, password))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
