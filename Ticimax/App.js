/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Text,
  View,
} from 'react-native';
import Button from './components/atoms/Button';
import CreatePostModal from './components/organisms/CreatePostModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from './components/organisms/ToastMessage';
import ConfirmModal from './components/organisms/ConfirmModal';


export default () => {

  const [data, setData] = useState([]);
  const [createPost, setCreatePost] = useState();
  const [title, setTitle] = useState();
  const [desc, setDesc] = useState();
  const [render, setRender] = useState(false);
  const [visible, setVisible] = useState(false);
  const [item, setItem] = useState();

  useEffect(() => {
    const retrieveDataAndSet = async () => {
      const retrievedData = await retrieveData();
      console.log("retrievedData->", retrievedData);
      setData(JSON.parse(retrievedData));

    };

    retrieveDataAndSet();
  }, []);

  useEffect(() => {
    saveData(data);

  }, [data, render]);

  const createObjetc = (
    title = null,
    desc = null,
    like = null,
  ) => {
    let str = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVXZ';
    let uuid = [];
    for (let i = 0; i < 14; i++) {
      uuid.push(str[Math.floor(Math.random() * str.length)]);
    }
    let object = {};
    object.title = title;
    object.logId = uuid.join('');
    object.timestamp = Date.now();
    object.desc = desc;
    object.like = like;

    return object;
  };

  const saveData = async (data) => {
    if (data === undefined) {
      console.log('Data is undefined');
      return;
    }

    try {
      await AsyncStorage.setItem('myData', JSON.stringify(data));
    } catch (error) {
      console.log(error);
    }
  };
  const retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('myData');
      if (value !== null) {
        return value;
      }
    } catch (error) {
      console.log(error);
    }
  };


  const Item = ({ item, onPress }) => (
    <View style={{
      width: '100%',
      flexDirection: 'row',
      paddingVertical: 5,
    }}>

      <View style={{
        width: '20%',
        height: '100%',
        flexDirection: 'row',
        borderRadius: 5,
      }}>
        {/* likes */}
        <View style={{
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#e5e5e5',
          borderRadius: 5,
          padding: 10,
        }}>

          <Text style={{
            textAlign: 'center',
            color: 'black',
            fontSize: 18,
            fontWeight: 'bold',
          }}>
            {item.like}
          </Text>

          <Text style={{
            color: 'grey',
          }}>
            LIKES
          </Text>
        </View>
      </View>
      <View style={{
        width: '60%',
        height: '100%',
        paddingHorizontal: 5,
      }}>

        <Text style={{
          color: 'black',
          fontSize: 16,
          fontWeight: 'bold',
        }}>
          {item?.title}
        </Text>

        <Text>
          {item?.desc}
        </Text>

        <View style={{ flexDirection: 'row', width: '20%', }}>
          <Button
            disabled={false}
            buttonStyles={{
              marginEnd: 10
            }}
            onPress={() => {
              data.forEach(function (items) {
                if (items.logId === item.logId) {
                  items.like = items.like + 1;
                }
              });
              setRender(!render);
              console.log(data);

            }}
            buttonStyles={{
              paddingHorizontal: 5,
              paddingVertical: 2
            }}
            textStyles={{
              fontSize: 18,
              fontWeight: "600"
            }}
            buttonText={"+"}
          />

          <Button
            disabled={false}
            onPress={() => {
              data.forEach(function (items) {
                if (items.logId === item.logId && item.like > 0) {
                  items.like = items.like - 1;
                }
              });
              setRender(!render);

              console.log(data);

            }}
            buttonStyles={{
              paddingHorizontal: 5,
              paddingVertical: 2
            }}
            textStyles={{
              fontSize: 18,
              fontWeight: "600"
            }}
            buttonText={"-"}
          />

        </View>

      </View>


      <View style={{
        width: '10%',
        height: '100%',
        alignItems: "flex-end"
      }}>

        <Button
          disabled={false}
          onPress={() => {
            setVisible(true);
            setItem(item);
          }}
          buttonStyles={{
            justifyContent: 'flex-end',
          }}
          textStyles={{
            fontSize: 18,
            fontWeight: "600"
          }}
          buttonText={'X'}
        />

      </View>


    </View>
  );
  const renderItem = ({ item }) => {
    return (
      <Item
        item={item}
      />
    );
  };

  const submitPress = async () => {

    if (title?.length >= 3 && desc?.length >= 3) {
      let obj = createObjetc(title, desc, 0);
      data.push(obj);
      setRender(!render);
      setTitle('');
      setDesc('');
      setCreatePost(false);
      Toast.open({
        title: "Successful!",
        type: "success",
      });
    } else {
      if (title?.length < 3) {
        Toast.open({
          title: "Title size less than 3!",
          type: "error",
        });
        return;
      }
      if (desc?.length < 3) {
        Toast.open({
          title: "Description size less than 3!",
          type: "error",
        });
        return;
      }
    }
  };

  return (
    <View style={{
      height: '100%',
      backgroundColor: '#15284b',
    }}>
      <Toast />
      <ConfirmModal title={item?.title} visible={visible} onConfirm={() => {
        try {
          const tempData = data.filter(function (x) {
            return x.logId !== item?.logId;
          });
          setItem(null);
          setData(tempData);
          setRender(!render);
          setVisible(false);
          Toast.open({
            title: "Deletion successful.!",
            type: "success",
          });
        } catch {
          Toast.open({
            title: "Deletion failed.!",
            type: "error",
          });
        }

      }} onCancel={() => {
        setItem(null);
        setVisible(false);
      }} />

      {/* Header */}
      <View style={{
        width: '100%',
        height: 40,
        backgroundColor: '#15284b',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Text style={{
          color: '#ffffff',
        }}>
          TICIMAX
        </Text>
      </View>

      {/* Body */}

      <View style={{
        height: '100%',
        backgroundColor: '#ffffff',
        margin: 20,
        padding: 14,
      }}>

        {/* Submit Button */}
        <View style={{
          height: 85,
          backgroundColor: '#e5e5e5',
          borderRadius: 5,
          flexDirection: 'row',

        }}>

          <View style={{
            width: '30%',
            height: 85,
            justifyContent: 'center',
            alignItems: 'center',
          }}>

            <Button
              disabled={false}
              onPress={() => {
                setCreatePost(true);
              }}
              buttonStyles={{
                height: 64,
                width: 64,
                borderRadius: 5,
                backgroundColor: '#b8b5b5',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              imageUrl={require('./assets/plus.png')}
              imageStyles={{
                height: 30,
                width: 30,
              }}
            />
          </View>

          <View style={{
            width: '70%',
            alignItems: 'flex-start',
            justifyContent: 'center',

          }}>
            <Text style={{
              fontWeight: 'bold',
              paddingHorizontal: 20,
              fontSize: 24,
            }}>
              Submit A Post
            </Text>
          </View>
        </View>

        {/* hr */}
        <View style={{
          height: 3,
          backgroundColor: '#e5e5e5',
          marginVertical: 10,
        }} />

        <View style={{
          flexDirection: 'row',
        }}>

          <Button
            disabled={false}
            onPress={() => {
              console.log('press a');
              data.sort(function (a, b) {
                return a.like - b.like;
              });
              setRender(!render);
            }}
            buttonStyles={{
              height: 40,
              marginHorizontal: 5,
              flex: 2,
              borderRadius: 5,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'grey',
            }}
            textStyles={{
              color: '#ffffff',
              textAlign: 'center',
              fontWeight: 'bold',
            }}
            buttonText={'ASCENDING'}
          />

          <Button
            disabled={false}
            onPress={() => {
              data.sort(function (a, b) {
                return b.like - a.like;
              });
              setRender(!render);
            }}
            buttonStyles={{
              height: 40,
              marginHorizontal: 5,
              flex: 2,
              borderRadius: 5,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'grey',
            }}
            textStyles={{
              color: '#ffffff',
              textAlign: 'center',
              fontWeight: 'bold',
            }}
            buttonText={'DESCENDING'}
          />
        </View>

        <View style={{
          width: '100%',
          height: '70%',
          marginTop: 20,
        }}>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.timestamp}
            showsVerticalScrollIndicator={false}
          />
        </View>


      </View>



      {createPost &&
        <CreatePostModal
          cancelPress={() => { setCreatePost(!createPost) }}
          setDesc={(value) => { setDesc(value) }}
          setTitle={(value) => { setTitle(value) }}
          submitPress={() => submitPress()}
          title={title}
          desc={desc}
        />}




    </View >
  );
};
