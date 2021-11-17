import React from 'react';

import Icon from 'react-native-vector-icons/MaterialIcons';

import {Animated} from 'react-native';

import {PanGestureHandler, State} from 'react-native-gesture-handler';

import Header from '~/Components/Header';
import Menu from '~/Components/Menu';
import Tabs from '~/Components/Tabs';

import {
  Container,
  Content,
  CardHeader,
  CardContent,
  Title,
  CardFooter,
  Annotation,
  Description,
  Card,
} from './styles';

export default function Main() {
  const translateY = new Animated.Value(0);
  let offSet = 0;
  const animatedEvent = Animated.event(
    [
      {
        nativeEvent: {
          translationY: translateY,
        },
      },
    ],
    {
      useNativeDriver: true,
    },
  );

  const onHandlerStateChange = (ev) => {
    if (ev.nativeEvent.oldState === State.ACTIVE) {
      let opened = false;
      const {translationY} = ev.nativeEvent;
      offSet += translationY;

      if (translationY >= 100) {
        opened = true;
      } else {
        translateY.setValue(offSet);
        translateY.setOffset(0);
        offSet = 0;
      }

      Animated.timing(translateY, {
        toValue: opened ? 380 : 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        offSet = opened ? 380 : 0;
        translateY.setOffset(offSet);
        translateY.setValue(0);
      });
    }
  };

  return (
    <Container>
      <Header />

      <Content>
        <Menu translateY={translateY} />

        <PanGestureHandler
          onGestureEvent={animatedEvent}
          onHandlerStateChange={onHandlerStateChange}>
          <Card
            style={{
              transform: [
                {
                  translateY: translateY.interpolate({
                    inputRange: [-350, 0, 380], //primeiro parametro é força pra cima, o segundo a posição inicial e o terceiro é a força pra baixo
                    outputRange: [-50, 0, 380], // mesmos parametros so que agora o quanto é para sair
                    extrapolate: 'clamp',
                  }),
                },
              ],
            }}>
            <CardHeader>
              <Icon name="attach-money" size={28} color="#666" />
              <Icon name="visibility-off" size={28} color="#666" />
            </CardHeader>

            <CardContent>
              <Title>Saldo disponível </Title>
              <Description>17.559,00</Description>
            </CardContent>

            <CardFooter>
              <Annotation>
                Transferência de R$20,00 recebida de Facebook IGYT hoje às
                20:00;
              </Annotation>
            </CardFooter>
          </Card>
        </PanGestureHandler>
      </Content>
      <Tabs translateY={translateY} />
    </Container>
  );
}
