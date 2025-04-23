import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, Dimensions } from 'react-native';
import { Box, Text, VStack, HStack, Center, Button, Select, CheckIcon } from 'native-base';
import { AuthContext } from '../contexts/AuthContext';
import api from '../services/api';
import { LineChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

export default function DashboardScreen() {
  const { user, logout } = useContext(AuthContext);
  const [dadosMensais, setDadosMensais] = useState([]);
  const [resumo, setResumo] = useState({ receita: 0, despesa: 0 });
  const [anoSelecionado, setAnoSelecionado] = useState('2025');

  useEffect(() => {
    const carregarDados = async () => {
      try {
        const res = await api.get(`/lancamentos/?ano=${anoSelecionado}&usuario=${user.id}`);
        const lancamentos = res.data;

        let receita = 0;
        let despesa = 0;
        const meses = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const receitaPorMes = Array(12).fill(0);
        const despesaPorMes = Array(12).fill(0);

        lancamentos.forEach(l => {
          const mesIndex = l.mes - 1;
          if (l.tipo === 'RECEITA') {
            receitaPorMes[mesIndex] += l.valor;
            receita += l.valor;
          } else {
            despesaPorMes[mesIndex] += l.valor;
            despesa += l.valor;
          }
        });

        setResumo({ receita, despesa });
        setDadosMensais({ meses, receitaPorMes, despesaPorMes });
      } catch (err) {
        console.log('Erro ao carregar dados:', err);
      }
    };

    carregarDados();
  }, [anoSelecionado]);

  return (
    <ScrollView>
      <Center py={4}>
        <Text fontSize="2xl" fontWeight="bold">Olá, {user.nome}</Text>
      </Center>

      <VStack px={4} py={2}>
        <Text mb={2}>Selecione o ano:</Text>
        <Select
          selectedValue={anoSelecionado}
          minWidth="200"
          accessibilityLabel="Escolha o ano"
          placeholder="Escolha o ano"
          _selectedItem={{ bg: "teal.600", endIcon: <CheckIcon size="5" /> }}
          mt={1}
          onValueChange={(itemValue) => setAnoSelecionado(itemValue)}
        >
          <Select.Item label="2023" value="2023" />
          <Select.Item label="2024" value="2024" />
          <Select.Item label="2025" value="2025" />
        </Select>
      </VStack>

      <HStack justifyContent="space-around" px={4} py={2}>
        <Box bg="green.100" p={4} rounded="2xl" w="45%">
          <Text fontSize="lg">Receitas</Text>
          <Text fontSize="xl" bold>R$ {resumo.receita}</Text>
        </Box>

        <Box bg="red.100" p={4} rounded="2xl" w="45%">
          <Text fontSize="lg">Despesas</Text>
          <Text fontSize="xl" bold>R$ {resumo.despesa}</Text>
        </Box>
      </HStack>

      {dadosMensais?.meses && (
        <Box px={4} py={4}>
          <Text fontSize="lg" mb={2}>Evolução Mensal</Text>
          <LineChart
            data={{
              labels: dadosMensais.meses,
              datasets: [
                {
                  data: dadosMensais.receitaPorMes,
                  color: () => 'green',
                  strokeWidth: 2,
                },
                {
                  data: dadosMensais.despesaPorMes,
                  color: () => 'red',
                  strokeWidth: 2,
                },
              ],
              legend: ['Receita', 'Despesa']
            }}
            width={screenWidth - 32}
            height={220}
            chartConfig={{
              backgroundColor: '#fff',
              backgroundGradientFrom: '#fff',
              backgroundGradientTo: '#fff',
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: { borderRadius: 16 }
            }}
            bezier
            style={{ borderRadius: 16 }}
          />
        </Box>
      )}

      <Center my={4}>
        <Button colorScheme="red" onPress={logout}>
          Sair
        </Button>
      </Center>
    </ScrollView>
  );
}
