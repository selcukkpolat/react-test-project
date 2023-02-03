/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import colors from '../../../config/color';
import Button from '../../atoms/Button';
import TextInput from '../../atoms/TextInput';

// eslint-disable-next-line prettier/prettier
export default ({ submitPress, cancelPress, setTitle, setDesc, ...props }) => {

    return (
        <View
            style={{
                borderWidth: 1,
                borderColor: '#e5e5e5',
                position: 'absolute',
                borderRadius: 5,
                bottom: 0,
                width: '100%',
                backgroundColor: 'white',
                height: 250,
            }}>
            <View
                style={{
                    width: '100%',
                    alignItems: 'flex-end',
                }}>
                <Button
                    buttonStyles={{
                        margin: 10,
                    }}
                    buttonText={'X'} textStyles={{
                        fontSize: 18,
                        fontWeight: '600',
                    }} onPress={cancelPress} />
            </View>
            <View
                style={{
                    width: '100%',
                    alignItems: 'center',
                }}>
                <Text
                    style={{
                        fontSize: 18,
                        fontWeight: 'bold',
                    }}>
                    Create Post
                </Text>
            </View>
            <View
                style={{
                    marginVertical: 10,
                }}>
                <TextInput message={props.title} placeholder="Title" onChangeText={setTitle} />
                <TextInput message={props.desc} placeholder="Descripton" onChangeText={setDesc} />
            </View>
            <View
                style={{
                    marginHorizontal: 10,
                }}>
                <Button
                    buttonStyles={{
                        height: 35,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 5,
                        width: '100%',
                        backgroundColor: colors.success,
                    }}
                    onPress={submitPress}
                    buttonText="Submit"
                    textStyles={{ color: 'white' }}
                />
            </View>
        </View>
    );
};
