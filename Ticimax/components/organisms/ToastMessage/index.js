/* eslint-disable prettier/prettier */
import React, {
    useState,
    useImperativeHandle,
    forwardRef,
    createRef,
    useRef,
} from 'react';
import { Animated, Text, TouchableOpacity } from 'react-native';
import style from './styles';

let interval = null;

const ToastRoot = forwardRef(({ }, ref) => {
    const styles = style();
    const [active, setActive] = useState(false);
    const [params, setParams] = useState({});
    const animated = useRef(new Animated.Value(0)).current;

    useImperativeHandle(ref, () => ({
        open: params => {
            clearTimeout(interval);

            interval = setTimeout(() => {
                Animated.timing(animated, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }).start(() => {
                    setActive(false);
                });
                clearTimeout(interval);
            }, 3000);

            setParams(params);
            if (active) {
                Animated.sequence([
                    Animated.timing(animated, {
                        toValue: 0,
                        duration: 300,
                        useNativeDriver: true,
                    }),
                    Animated.timing(animated, {
                        toValue: -350,
                        duration: 300,
                        useNativeDriver: true,
                    }),
                ]).start(() => { });
            } else {
                Animated.timing(animated, {
                    toValue: -350,
                    duration: 300,
                    useNativeDriver: true,
                }).start(() => { });
                setActive(true);
            }
        },
        close: () => {
            Animated.timing(animated, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start(() => setActive(false));
        },
    }));

    if (active) {
        const { title, type } = params;
        return (
            <Animated.View
                style={[
                    styles.container,
                    {
                        transform: [{ translateY: animated }],
                        backgroundColor:
                            type == 'error'
                                ? '#FF715B'
                                : type == 'info'
                                    ? '#785DE8'
                                    : '#2ECB92',
                    },
                ]}>
                <Text
                    style={{
                        color: 'white',
                        fontSize: 13,
                        fontWeight: '700',
                    }}>
                    {title}
                </Text>
                <TouchableOpacity
                    onPress={() => {
                        Animated.timing(animated, {
                            toValue: 0,
                            duration: 300,
                            useNativeDriver: true,
                        }).start(() => setActive(false));
                    }}>
                    <Text
                        style={{
                            fontSize: 16,
                            fontWeight: '600',
                        }}>
                        X
                    </Text>
                </TouchableOpacity>
            </Animated.View>
        );
    } else {
        return null;
    }
});

const toastLoginRef = createRef();

const Toast = ({ }) => {
    return <ToastRoot ref={toastLoginRef} />;
};

Toast.open = params => {
    toastLoginRef.current?.open(params);
};

Toast.close = params => {
    toastLoginRef.current?.close(params);
};

export default Toast;
