import React from 'react'
import { View } from 'react-native'
import Wrapper from '../../components/common/wrapper'
import Header from '../../components/header'

export default function UserIndex() {
  return (
    <Wrapper>
      <Header
        title="我的"
        titleAlign="center"
        leftElement={<View></View>}
        hasBottomLine
      />
    </Wrapper>
  )
}
