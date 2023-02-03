/* eslint-disable prettier/prettier */
import React from 'react';
import { Modal, Text, View } from 'react-native';
import Button from '../../atoms/Button';

export default ({ visible, onConfirm, onCancel, title }) => {
    return (
        <Modal animationType="fade" transparent={true} visible={visible}>
            <View
                style={{
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
                    <Text style={{
                        textAlign: "center"
                    }}>{title + '\nAre you sure you want to delete?'}</Text>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            marginTop: 20,
                        }}>
                        <Button buttonText={'Confirm'} onPress={onConfirm} />
                        <Button buttonText={'Cancel'} onPress={onCancel} />
                    </View>
                </View>
            </View>
        </Modal>
    );
};
