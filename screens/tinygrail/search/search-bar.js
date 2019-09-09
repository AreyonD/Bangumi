/*
 * @Author: czy0729
 * @Date: 2019-09-03 21:52:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-09-03 22:11:54
 */
import React from 'react'
import { StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { Input } from '@components'
import { observer } from '@utils/decorators'
import _ from '@styles'

function SearchBar(props, { $, navigation }) {
  const { value } = $.state
  return (
    <Input
      style={styles.searchIpt}
      value={value}
      keyboardType='numeric'
      returnKeyType='search'
      placeholder='输入角色id直达...'
      onChange={$.onChange}
      onSubmitEditing={() => $.doSearch(navigation)}
    />
  )
}

SearchBar.contextTypes = {
  $: PropTypes.object,
  navigation: PropTypes.object
}

export default observer(SearchBar)

const styles = StyleSheet.create({
  searchIpt: {
    height: 34,
    paddingHorizontal: _.wind,
    fontSize: 12,
    backgroundColor: _.colorPlain,
    borderRadius: 64
  }
})