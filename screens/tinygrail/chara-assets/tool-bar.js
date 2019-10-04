/*
 * @Author: czy0729
 * @Date: 2019-10-03 21:22:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-10-04 12:43:26
 */
import React from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import PropTypes from 'prop-types'
import { Flex, Touchable, Text } from '@components'
import { observer } from '@utils/decorators'
import { colorText, colorBorder } from '../styles'
import _ from '@styles'
import { sortDS } from './store'

function ToolBar(props, { $ }) {
  const { page, sort, direction } = $.state
  if (page !== 0) {
    return null
  }
  return (
    <Flex style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {sortDS.map(item => {
          const isActive = sort === item.value
          return (
            <Touchable
              key={item.label}
              withoutFeedback
              onPress={() => $.onSortPress(item.value)}
            >
              <Flex style={styles.item} justify='center'>
                <Text
                  style={{
                    color: isActive ? _.colorWarning : colorText
                  }}
                >
                  {item.label}
                </Text>
                <View style={{ width: 4 }}>
                  {isActive && !!direction && (
                    <View style={[styles[direction], _.ml.xs]} />
                  )}
                </View>
              </Flex>
            </Touchable>
          )
        })}
      </ScrollView>
      <View style={styles.tips} />
    </Flex>
  )
}

ToolBar.contextTypes = {
  $: PropTypes.object
}

export default observer(ToolBar)

const styles = StyleSheet.create({
  container: {
    height: 46,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colorBorder
  },
  tips: {
    marginHorizontal: 8,
    borderWidth: 6,
    borderColor: 'transparent',
    borderLeftColor: colorText
  },
  item: {
    paddingLeft: 8,
    paddingRight: 12,
    height: 44
  },
  down: {
    width: 4,
    height: 4,
    marginTop: 4,
    borderWidth: 4,
    borderColor: 'transparent',
    borderTopColor: _.colorWarning
  },
  up: {
    width: 4,
    height: 4,
    marginBottom: 4,
    borderWidth: 4,
    borderColor: 'transparent',
    borderBottomColor: _.colorWarning
  }
})
