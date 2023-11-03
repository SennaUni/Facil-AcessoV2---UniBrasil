import React from 'react';

import { View, Dimensions } from 'react-native';

import { useAppDispatch } from '../../../hooks/redux';

import { useFormContext } from 'react-hook-form'

import { Input } from '../../Basics/Input';
import { ArrowButtom } from '../../Basics/ArrowButtom';
import { Header } from '../../Header';
import { Select, SelectedValueType } from '../../Basics/Select';
import { OptionSelect } from '../../Basics/OptionSelect';

import { Container } from './styles';

const { width } = Dimensions.get('window');

export type FormParam = {
  callBack: (data: any) => void
  callReturn: () => void
  loading: boolean
}

export function Form({ callBack, callReturn, loading }: FormParam) {
  const dispatch = useAppDispatch()

  const states = [
    { id: 'AC', icon: 'map', value: 'Acre' },
    { id: 'AL', icon: 'map', value: 'Alagoas' },
    { id: 'AP', icon: 'map', value: 'Amapá' },
    { id: 'AM', icon: 'map', value: 'Amazonas' },
    { id: 'BA', icon: 'map', value: 'Bahia' },
    { id: 'CE', icon: 'map', value: 'Ceará' },
    { id: 'DF', icon: 'map', value: 'Distrito Federal' },
    { id: 'ES', icon: 'map', value: 'Espírito Santo' },
    { id: 'GO', icon: 'map', value: 'Goiás' },
    { id: 'MA', icon: 'map', value: 'Maranhão' },
    { id: 'MT', icon: 'map', value: 'Mato Grosso' },
    { id: 'MS', icon: 'map', value: 'Mato Grosso do Sul' },
    { id: 'MG', icon: 'map', value: 'Minas Gerais' },
    { id: 'PA', icon: 'map', value: 'Pará' },
    { id: 'PB', icon: 'map', value: 'Paraíba' },
    { id: 'PR', icon: 'map', value: 'Paraná' },
    { id: 'PE', icon: 'map', value: 'Pernambuco' },
    { id: 'PI', icon: 'map', value: 'Piauí' },
    { id: 'RJ', icon: 'map', value: 'Rio de Janeiro' },
    { id: 'RN', icon: 'map', value: 'Rio Grande do Norte' },
    { id: 'RS', icon: 'map', value: 'Rio Grande do Sul' },
    { id: 'RO', icon: 'map', value: 'Rondônia' },
    { id: 'RR', icon: 'map', value: 'Roraima' },
    { id: 'SC', icon: 'map', value: 'Santa Catarina' },
    { id: 'SP', icon: 'map', value: 'São Paulo' },
    { id: 'SE', icon: 'map', value: 'Sergipe' },
    { id: 'TO', icon: 'map', value: 'Tocantins' }
  ]

  const { control, handleSubmit, setValue, clearErrors } = useFormContext()

  return (
    <Container>
      <View
        style={{
          position: 'absolute',
          top: -30,
          left: 210,
        }}
      >
        <ArrowButtom
          loading={loading}
          reverse={true}
          gradient={['#A88BEB', '#8241B8']}
          onPress={callReturn}
        />
      </View>

      <View
        style={{
          position: 'absolute',
          top: -30,
          left: width - 120,
        }}
      >
        <ArrowButtom
          loading={loading}
          gradient={['#A88BEB', '#8241B8']}
          onPress={handleSubmit(callBack)}
        />
      </View>
      <Header
        title='Definir endereço'
      />

      <Input
        name="address"
        icon="map-pin"
        placeholder="Endereço"
        control={control}
      />

      <Input
        name="number"
        icon="star"
        placeholder="Numero"
        control={control}
      />

      <Input
        name="neighborhood"
        icon="home"
        placeholder="Bairro"
        control={control}
      />

      <Input
        name="city"
        icon="home"
        placeholder="Cidade"
        control={control}
      />

      <Select
        options={states}
        name='state'
        icon="map"
        placeholder="Defina o estado"
        header='Selecione o estado'
        OptionComponent={OptionSelect}
        onChange={(name: string, item: SelectedValueType) => { 
          setValue(name, item)
          clearErrors('state')
        }}
        control={control}
      />

      <Input
        name="zipCode"
        icon="map-pin"
        placeholder="Cep"
        control={control}
        multiline
      />
    </Container>
  )
}