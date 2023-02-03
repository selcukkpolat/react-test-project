/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { TextInput, View } from 'react-native';
import colors from '../../../config/color';
import { useRef } from 'react';

export default ({
    placeholder = '',
    message,
    backgroundColor = colors.grayFill,
    inputStyle,
    textInputStyles,
    onChangeText,
    ...props
}) => {


    return (
        <View
            style={{
                borderWidth: 1,
                borderColor: 'black',
                marginHorizontal: 10,
                borderRadius: 5,
                paddingHorizontal: 10,
                marginVertical: 5,
            }}>
            <TextInput
                style={{
                    width: '100%',
                }}
                placeholder={placeholder}
                {...props}
                value={message}
                onChangeText={value => {
                    onChangeText(value);
                }}
            />
        </View>
    );
};
