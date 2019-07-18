/*
 * @Author: czy0729
 * @Date: 2019-07-17 09:28:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-07-17 10:02:11
 */
import React from 'react'
import { StyleSheet, View, Image as RNImage } from 'react-native'
import { Flex, Text, Touchable, Image, Input, Button } from '@components'
import _ from '@styles'

export default class Form extends React.Component {
  static defaultProps = {
    forwardRef: Function.prototype,
    onGetCaptcha: Function.prototype,
    onChange: Function.prototype,
    onLogin: Function.prototype
  }

  render() {
    const {
      navigation,
      email,
      password,
      captcha,
      base64,
      loading,
      info,
      forwardRef,
      onGetCaptcha,
      onChange,
      onLogin
    } = this.props
    return (
      <View style={[_.container.column, styles.gray]}>
        <View style={styles.form}>
          <Flex justify='center'>
            <Image
              style={styles.gray}
              width={160}
              height={128}
              src={require('@assets/screens/login/login.png')}
            />
          </Flex>
          <Flex style={_.mt.md}>
            <Flex.Item>
              <Input
                style={styles.input}
                value={email}
                placeholder='Email'
                onChange={evt => onChange(evt, 'email')}
              />
            </Flex.Item>
          </Flex>
          <Flex style={_.mt.md}>
            <Flex.Item>
              <Input
                style={styles.input}
                value={password}
                placeholder='密码'
                secureTextEntry
                onChange={evt => onChange(evt, 'password')}
              />
            </Flex.Item>
          </Flex>
          <Flex style={_.mt.md}>
            <Flex.Item>
              <Input
                ref={forwardRef}
                style={styles.input}
                value={captcha}
                placeholder='验证'
                onChange={evt => onChange(evt, 'captcha')}
              />
            </Flex.Item>
            <Touchable style={styles.captchaContainer} onPress={onGetCaptcha}>
              {!!base64 && (
                <RNImage style={styles.captcha} source={{ uri: base64 }} />
              )}
            </Touchable>
          </Flex>
          <Button
            style={_.mt.lg}
            type='main'
            shadow
            loading={loading}
            onPress={onLogin}
          >
            登陆
          </Button>
          <Text
            style={[
              _.mt.md,
              {
                height: 16
              }
            ]}
            size={12}
            type='sub'
            onPress={() => {
              if (info.includes('登陆失败')) {
                navigation.push('Login')
              }
            }}
          >
            {info}
          </Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  gray: {
    backgroundColor: 'rgb(251, 251, 251)'
  },
  form: {
    width: 280,
    paddingBottom: 82
  },
  input: {
    height: 44
  },
  captchaContainer: {
    width: 118,
    height: 44,
    marginLeft: _.sm,
    backgroundColor: _.colorBg
  },
  captcha: {
    width: 118,
    height: 44
  }
})