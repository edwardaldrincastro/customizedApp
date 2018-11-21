import React, { Component } from 'react';
import { View, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import ImagePicker from "react-native-image-picker";
import Icon from "react-native-vector-icons/Ionicons";
import { connect } from "react-redux";
import { addImage } from "../../../store/actions/placeContainer";

class PickImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imagePicked: {
                uri: null,
                base64: null
            }
        };
    }
    pickImageHandler = () => {
        ImagePicker.showImagePicker({ title: "Pick image" }, res => {
            if (res.didCancel) {
                console.log("User cancelled")
            } else if (res.error) {
                console.log("Error {pickImageHandler}", res.error)
            } else {
                this.setState({
                    imagePicked: {
                        uri: res.uri,
                        base64: res.data
                    }
                })
                this.props.addImageToRedux(this.state.imagePicked)
            }
        })
    }
    iconHandler = () => {
        if (this.props.imageFromRedux === null) {
            return (
                <View style={styles.cameraIcon}>
                    <Icon name="md-camera" size={70} color="#41C7C7" />
                </View>
            )
        } else {
            return <ImageBackground source={this.state.imagePicked} style={styles.imageContainer} />
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={() => this.pickImageHandler()}>
                    {this.iconHandler()}
                </TouchableOpacity>
            </View>
        );
    }
}
const mapStateToProps = state => {
    return {
        imageFromRedux: state.placeContainer.placeContainer.image.uri
    }
}
const mapDispatchToProps = dispatch => {
    return {
        addImageToRedux: (image) => dispatch(addImage(image))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(PickImage);

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    cameraIcon: {
        height: "100%",
        width: "100%",
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageContainer: {
        height: "100%",
        width: "100%"
    }
})
