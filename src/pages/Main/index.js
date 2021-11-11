import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
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
  return (
    <Container>
      <Header />

      <Content>
        {/* <Menu /> */}

        <Card>
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
              Transferência de R$20,00 recebida de Facebook IGYT hoje às 20:00;
            </Annotation>
          </CardFooter>
        </Card>
      </Content>
      <Tabs />
    </Container>
  );
}
