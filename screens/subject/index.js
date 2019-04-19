/*
 * @Author: czy0729
 * @Date: 2019-03-23 04:16:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-04-18 20:34:42
 */
import React from 'react'
import { StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { WebBrowser } from 'expo'
import { ActionSheet } from '@ant-design/react-native'
import { BlurView, ListView } from '@components'
import { ManageModal, CommentItem } from '@screens/_'
import inject from '@utils/inject'
import { getBangumiUrl } from '@utils/app'
import _, { window, headerHeight, space } from '@styles'
import Header from './header'
import Store from './store'

class Subject extends React.Component {
  static contextTypes = {
    $: PropTypes.object,
    navigation: PropTypes.object
  }

  async componentDidMount() {
    const { $, navigation } = this.context

    // @issue 由于subjectStore里面的缓存数据是异步获取的
    // 当本页面是首屏, 会出现同步时获取不到数据的情况, 当然本屏通常不是首屏
    setTimeout(() => {
      const { name_cn: nameCn, name } = $.subject
      const title = nameCn || name
      if (title) {
        navigation.setParams({
          headerTransitionTitle: title
        })
      }
    }, 400)

    // 右上角头部按钮
    const data = await $.initFetch()
    if (data) {
      const { sites = [] } = $.state.bangumiInfo
      const title = data.name_cn || data.name
      const url = String(data.url).replace('http://', 'https://')
      navigation.setParams({
        headerTransitionTitle: data.name_cn || data.name,
        popover: {
          data: [
            '刷新',
            '分享',
            ...sites
              .filter(item => ['tudou', 'acfun'].indexOf(item.site) === -1)
              .map(item => item.site)
          ],
          onSelect: key => {
            let item
            switch (key) {
              case '刷新':
                $.initFetch()
                break
              case '分享':
                ActionSheet.showShareActionSheetWithOptions({
                  message: `${title}\n${url}`,
                  title: '分享',
                  url
                })
                break
              default:
                item = sites.find(item => item.site === key)
                if (item) {
                  const url = getBangumiUrl(item)
                  WebBrowser.openBrowserAsync(url)
                }
                break
            }
          }
        }
      })
    }
  }

  render() {
    const { $ } = this.context
    const { onScroll } = this.props
    const { visible } = $.state
    const { name_cn: nameCn, name, images = {} } = $.subject
    const { tags = [] } = $.subjectFormHTML
    return (
      <>
        <BlurView style={styles.blurView} theme='dark' src={images.medium} />
        <ListView
          style={_.container.flex}
          contentContainerStyle={styles.contentContainerStyle}
          keyExtractor={item => `${item.userid} ${item.time}`}
          data={$.subjectCommentsFormHTML}
          scrollEventThrottle={16}
          ListHeaderComponent={<Header />}
          renderItem={({ item, index }) => (
            <CommentItem
              isTop={index === 0}
              time={item.time}
              avatar={item.avatar}
              username={item.username}
              star={item.star}
              comment={item.comment}
            />
          )}
          onScroll={onScroll}
          onFooterRefresh={$.fetchSubjectCommentsFormHTML}
        />
        <ManageModal
          visible={visible}
          subjectId={$.params.subjectId}
          title={nameCn || name}
          desc={name}
          tags={tags}
          onSubmit={$.doUpdateCollection}
          onClose={$.closeManageModal}
        />
      </>
    )
  }
}

export default inject(Store, {
  headerTransition: 48
})(observer(Subject))

const styles = StyleSheet.create({
  blurView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: window.height * 0.5
  },
  contentContainerStyle: {
    paddingTop: headerHeight,
    paddingBottom: space
  }
})
