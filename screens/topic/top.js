/*
 * @Author: czy0729
 * @Date: 2019-05-01 20:14:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-06-01 19:26:15
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { HeaderPlaceholder, Flex, Text, RenderHtml, Divider } from '@components'
import { Avatar, SectionTitle, IconReverse } from '@screens/_'
import { simpleTime } from '@utils'
import { appNavigate } from '@utils/app'
import { IOS } from '@constants'
import _ from '@styles'

const Top = (props, { $, navigation }) => {
  const {
    title,
    // groupThumb,
    group,
    groupHref,
    time,
    avatar,
    userName,
    userId,
    userSign,
    message
  } = $.topic
  const { _reverse } = $.comments
  const { _title, _replies, _group, _time, _avatar } = $.params
  return (
    <>
      {!IOS && <HeaderPlaceholder />}
      <View style={_.container.inner}>
        <Text type='title' size={20} bold>
          {title || _title}
          {!!_replies && (
            <Text type='main' size={12}>
              {_replies}
            </Text>
          )}
        </Text>
        <Flex style={_.mt.sm} align='start'>
          <Text>
            <Text
              size={13}
              underline
              numberOfLines={1}
              onPress={() => appNavigate(groupHref, navigation)}
            >
              {group || _group}
            </Text>
            {!!time && (
              <>
                <Text style={_.ml.sm} type='sub' size={13}>
                  {' '}
                  /{' '}
                </Text>
                <Text type='sub' size={13}>
                  {simpleTime(time || _time)}
                </Text>
              </>
            )}
          </Text>
        </Flex>
        <Flex style={_.mt.md}>
          <Avatar
            navigation={navigation}
            size={40}
            src={avatar || _avatar}
            userId={userId}
          />
          <Flex.Item style={_.ml.sm}>
            <Text numberOfLines={2}>
              {userName}
              <Text type='sub'> @{userId}</Text>
            </Text>
            {!!userSign && (
              <Text style={_.mt.xs} type='sub' size={12}>
                {userSign}
              </Text>
            )}
          </Flex.Item>
        </Flex>
        <View style={styles.html}>
          {!!message && (
            <RenderHtml
              style={_.mt.lg}
              html={message}
              onLinkPress={href => appNavigate(href, navigation)}
            />
          )}
        </View>
      </View>
      <Divider />
      <SectionTitle
        style={[styles.title, _.mt.lg, _.mb.md]}
        right={
          <IconReverse
            style={styles.sort}
            color={_reverse ? _.colorMain : _.colorIcon}
            onPress={$.toggleReverseComments}
          />
        }
      >
        吐槽箱
      </SectionTitle>
    </>
  )
}

Top.contextTypes = {
  $: PropTypes.object,
  navigation: PropTypes.object
}

export default observer(Top)

const styles = StyleSheet.create({
  title: {
    paddingHorizontal: _.wind
  },
  html: {
    minHeight: 240
  },
  sort: {
    marginRight: -_.sm
  }
})
