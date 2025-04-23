import React, { useState, useContext } from 'react';
import { Box, Input, Button, VStack, Text, Center } from 'native-base';
import { AuthContext } from '../contexts/AuthContext';
import { login as loginService } from '../services/auth';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const { login } = useContext(AuthContext);

  const handleLogin = async () => {
    try {
      const usuario = await loginService(email, senha);
      login(usuario); // salva no contexto
    } catch (err) {
      alert('Erro ao logar. Verifique suas credenciais.');
      console.log(err);
    }
  };

  return (
    <Center flex={1}>
      <Box w="80%">
        <VStack space={4}>
          <Text fontSize="xl" fontWeight="bold">Login</Text>
          <Input placeholder="Email" value={email} onChangeText={setEmail} />
          <Input placeholder="Senha" value={senha} onChangeText={setSenha} type="password" />
          <Button onPress={handleLogin}>Entrar</Button>
        </VStack>
      </Box>
    </Center>
  );
}
