import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Dimensions, AsyncStorage } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import { Header, Left } from "native-base";
import { users } from "../data/users";
import { connect } from "react-redux";

const item = ""
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
        // data = this.asyncLoginhandler()
        // datas = JSON.parse(data)
        // alert(`${data}.${datas}`)
        if ((this.state.email && this.state.password) !== "") {

            // let user = this.state.users
            // const result = user.filter(word => this.state.email === word.email)
            // user.map((item, index) => {
                // const result = user.find(element => element.email === this.state.email)
                if (this.props.email === this.state.email && this.props.password === this.state.password) {
                    // if (data.email === this.state.email && data.password === this.state.password) {
                        return this.props.navigation.navigate('Entry')
                    } else {

                        alert(`Your email or password is incorrect.`)
                        this.setState({
                            email: "",
                            password: "",
                            underlineColor: "white"
                        })

                    }
                } else {
                    alert("Please input email and/or password.")
                    this.setState({
                        underlineColor: "#e53935"
                    })

                
            }
    }

    render() {
        // alert(this.props.firstName)
        return (
            <View style={{ flex: 1 }}>
                <Header style={{ backgroundColor: "#00bfa5" }}>
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
                            value={this.state.email} />
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <Text style={this.state.viewMode === "portrait" ? styles.portraitPassword : styles.landscapePassword}>PASSWORD</Text>

                        <TouchableOpacity onPress={this.showPasswordHandler}>
                            <View style={{ width: 30 }}>
                                <Text style={{ color: "white", fontSize: 10 }}>{this.state.filter}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.lastNameInput}>
                        <TextInput
                            textContentType="password"
                            onChangeText={(val) => this.passwordChangedHandler(val)}
                            secureTextEntry={this.state.showPass}
                            underlineColorAndroid={this.state.underlineColor}
                            value={this.state.password} />
                    </View>
                    <View style={styles.nextButton}>
                        <TouchableOpacity onPress={() => this.loginHandler()}>
                            <View style={styles.buttonStyle}>
                                <Text>
                                    <Icon name="ios-arrow-forward" size={24} color="#00bfa5" />
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    {/* <View style={styles.nextButton}>
                        <TouchableOpacity onPress={() => this.checker()}>
                            <View style={styles.buttonStyle}>
                                <Text>
                                    <Icon name="ios-arrow-forward" size={24} color="#00bfa5" />
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View> */}
                </View>
            </View>
        );
    }
    
    // componentDidMount() {
    //     this.asyncLoginhandler()
    //     .catch (console.log("error did mount"))
    // }

}
const mapStateToProps = state => {
    return {
        firstName: state.signUp.firstName,
        lastName: state.signUp.lastName,
        email: state.signUp.email,
        password: state.signUp.password,
        birthday: state.signUp.birthday
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
        marginRight: "70%",
        marginBottom: 20
    },
    landscapeWelcome: {
        color: "#fff",
        fontSize: 20,
        marginRight: "80%",
        marginBottom: 20
    },
    portraitTitle: {
        color: "#fff",
        fontSize: 12,
        marginRight: "72%"
    },
    landscapeTitle: {
        color: "#fff",
        fontSize: 12,
        marginRight: "76%"
    },
    portraitPassword: {
        color: "#fff",
        fontSize: 12,
        marginRight: 200
    },
    landscapePassword: {
        color: "#fff",
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

export default connect(mapStateToProps)(LoginScreen);
