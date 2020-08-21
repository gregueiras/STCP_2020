import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';
import Modal from 'react-native-modal';
import Card from '../../../components/Card/Card';
import { Stop } from '../../../redux/stops/types';
import { View } from 'react-native';

interface TempStopProps {
    setOpen: Dispatch<SetStateAction<boolean>>;
    stop: Stop | undefined;
    open: boolean;
}

export default function TempStop({ stop, open, setOpen }: TempStopProps) {
    if (!stop) {
        return null
    }
    
    const { code, customName, provider } = stop
    
    return (
        <Modal
            isVisible={open}
            useNativeDriver={true}
            onSwipeComplete={() => setOpen(false)}
            swipeDirection="down"
            propagateSwipe={true}
            coverScreen={false}
            onBackButtonPress={() => setOpen(false)}
            onBackdropPress={() => setOpen(false)}
        >
            <View style={{ height: "70%", marginLeft: "-7%" }}>
                <Card code={code} provider={provider} customName={`${provider} - ${customName !== "undefined" ? customName + " - " : ""}${code}`} />
            </View>
        </Modal>
    )
}