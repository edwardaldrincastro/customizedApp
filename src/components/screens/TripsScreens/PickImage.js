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
                console.log("error", res.error)
            } else {
                this.setState({
                    imagePicked: {
                        uri: res.uri,
                        base64: res.data
                    }
                })
                console.log(this.state.imagePicked)
                this.props.addImageToRedux(this.state.imagePicked)
                // this.props.onImagePicked({ uri: res.uri, base64: res.data })
            }
        })
    }
    iconHandler = () => {
        if (this.props.imageFromRedux=== null) {
            console.log("icon to")
            return (
                <View style={styles.cameraIcon}>
                    <Icon name="md-camera" size={70} color="#727272" />
                </View>
            )
        } else {
            console.log("image to")
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
      isLoading: state.ui.isLoading,
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
        alignItems: 'center'
    },
    imageContainer: {
        height: "100%",
        width: "100%"
    }
})
