import React, { useState, useCallback } from 'react';

import { listAcessibility } from '../../../store/slices/acessibilitySlice';

import { View, Dimensions } from 'react-native';

import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { useFocusEffect } from '@react-navigation/native';

import { Buttom } from '../../Basics/Buttom';
import { Input } from '../../Basics/Input';
import { ArrowButtom } from '../../Basics/ArrowButtom';
import { Select, SelectedValueType } from '../../Basics/Select';
import { OptionSelect } from '../../Basics/OptionSelect';
import { DataTable, DefaltTableParams } from '../../DataTable/Accessibilities';
import { Header } from '../../Header';

import { useFormContext } from 'react-hook-form'

import { Container } from './styles';

const { width } = Dimensions.get('window');

export type FormParam = {
  callBack: (data: any) => void
  callReturn: () => void
  loading: boolean
}

export function Form({ callBack, callReturn, loading }: FormParam) {
  const [acessibilities, setAcessibilities] = useState<DefaltTableParams[]>([] as DefaltTableParams[])

  const { acessibility } = useAppSelector((state) => state.acessibility)

  const dispatch = useAppDispatch()

  const { control, handleSubmit, setValue, clearErrors } = useFormContext()

  const handleChangeValues = (data: any) => {
    setAcessibilities([
      ...acessibilities,
      { descricao: data.accessibilityText, icon: data.acessibilityOption.icon, id: data.acessibilityOption.id }
    ])

    setValue('accessibilityText', '')
  }

  const selectOptions = acessibility
    ? acessibility.map(value => ({
      id: value.id,
      icon: value.icon,
      value: value.descricao,
    }))
    : []

  useFocusEffect(
    useCallback(() => {
      setAcessibilities([])
    }, [setAcessibilities])
  )

  useFocusEffect(
    useCallback(() => {
      if (!acessibility) dispatch(listAcessibility())
    }, [acessibility])
  )

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
          onPress={() => acessibilities.length > 0 && callBack(acessibilities)}
        />
      </View>

      <Header
        title='Acessibilidades presentes'
      />

      {acessibilities.length > 0 && <DataTable data={acessibilities} />}

      <Select
        control={control}
        name='acessibilityOption'
        options={selectOptions}
        defaultValue={undefined}
        icon="universal-access"
        placeholder="Defina a acessibilidade"
        header='Selecione a acessibilidade'
        label="Usuario"
        OptionComponent={OptionSelect}
        onChange={(name: string, item: SelectedValueType) => { 
          setValue(name, item)
          clearErrors('acessibilityOption')
        }}
      />

      <Input
        name="accessibilityText"
        icon="pen-tool"
        placeholder="Descreva a accessibilidade"
        multiline
        numberOfLines={3}
        control={control}
      />

      <Buttom
        title="Cadastrar"
        onPress={handleSubmit(handleChangeValues)}
      />

    </Container>
  )
}