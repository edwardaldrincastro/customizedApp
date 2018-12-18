import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import { Header, Left, DatePicker } from "native-base";

class SignUpBirthdayScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chosenDate: new Date().toLocaleDateString(),
            viewMode: Dimensions.get("window").height > 500 ? "portrait" : "landscape"
        };

        this.setDate = this.setDate.bind(this)
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
    setDate(newDate) {
        this.setState({ chosenDate: newDate.toLocaleDateString()});
    }
    submitHandler = (lastName, firstName, email) => {
        this.props.navigation.navigate('Success', {
            lastName: lastName,
            firstName: firstName,
            email: email,
            birthday: this.state.chosenDate
        })
    }
    render() {
        console.log(this.props.navigation.state)
        const lastName = this.props.navigation.getParam("lastName", "no last name")
        const firstName = this.props.navigation.getParam("firstName", "no first name")
        const email = this.props.navigation.getParam("email", "no email")
        return (
            <View style={{ flex: 1 }}>
                <Header style={{ backgroundColor: "#212424" }}>
                    <Left style={{ marginRight: "85%" }}>
                        <Icon name="ios-arrow-back" size={30} color="#fff" onPress={() => this.props.navigation.goBack()} />
                    </Left>
                </Header>
                <View style={styles.container}>
                    <View styles={styles.view}>
                        <Text style={this.state.viewMode === "portrait" ? styles.portraitWelcome : styles.landscapeWelcome}>When is your birthday?</Text>
                   
                    </View>
                    <View>
                        <Text style={styles.description}>You must be at least 18 years old to use Ting. Other people won't see your Birthday.</Text>

                    </View>
                    <Text style={styles.title}>BIRTHDAY</Text>
                    <View>
                        <DatePicker
                            defaultDate={new Date()}
                            minimumDate={new Date(1900, 1, 1)}
                            maximumDate={new Date()}
                            locale={"en"}
                            timeZoneOffsetInMinutes={undefined}
                            modalTransparent={false}
                            animationType={"fade"}
                            androidMode={"spinner"}
                            placeHolderText={this.state.chosenDate}
                            textStyle={{ color: "white", fontSize: 13, marginRight: "66%", marginTop: 10 }}
                            placeHolderTextStyle={{ color: "white", fontSize: 13, marginRight: "66%", marginTop: 10 }}
                            onDateChange={this.setDate}
                        />
                        {console.log(this.state.chosenDate)}
                        <View
                            style={{
                                borderTopColor: '#eeeeee',
                                borderTopWidth: 1,
                                marginLeft: 10,
                            }}/>
                    </View>
                    <View style={styles.nextButton}>
                        <TouchableOpacity onPress={() => this.submitHandler(lastName, firstName, email)}>
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
    title: {
        color: "#FE6A6A",
        fontSize: 13,
        marginRight: "71%",
        marginTop: 15,
        fontFamily: "Inconsolata-Regular"
    },
    description: {
        color: "#E1E1E1",
        fontSize: 14,
        marginLeft: 21,
        fontFamily: "Inconsolata-Regular"
    },
    portraitWelcome: {
        color: "#FE6A6A",
        fontSize: 20,
        marginRight: "30%",
        marginBottom: 20,
        fontFamily: "Inconsolata-Regular"
    },
    landscapeWelcome: {
        color: "#FE6A6A",
        fontSize: 20,
        marginRight: "50%",
        marginBottom: 20,
        fontFamily: "Inconsolata-Regular"
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

export default SignUpBirthdayScreen;
