import React from 'react';
import { TouchableOpacity, Text, Image } from 'react-native';

export default ({
    buttonText,
    buttonStyles,
    textStyles,
    onPress,
    textWhite,
    imageStyles,
    imageUrl,
    disabled,
    ...props
}) => {
    return (
        <TouchableOpacity
            disabled={disabled}
            style={buttonStyles}
            onPress={onPress}>
            {imageUrl && <Image source={imageUrl} style={imageStyles} />}
            {buttonText && <Text style={textStyles}>{buttonText}</Text>}
        </TouchableOpacity>
    );
};
