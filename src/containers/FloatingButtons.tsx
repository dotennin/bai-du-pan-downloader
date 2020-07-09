import React from 'react'
import { connect } from 'react-redux'
import { interfaceActionCreator } from '../store/Interface'
import { InstanceForSystem } from '../services/InstaceForSystem'
import { StatusTypes } from '../types'
import { downloadActionCreator } from '../store/download'
import { IStoreState } from '../store'

const mapStoreToProps = (store: IStoreState) => ({
  autoStart: store.interface.autoStart,
  downloadable: store.interface.downloadable,
  allDownloads: store.download.allDownloads,
})
const mapActionToProps = {
  changeConfig: interfaceActionCreator.change,
  updateDownloadItem: downloadActionCreator.change.request,
  download: downloadActionCreator.downloadURL.request,
}

const FloatingButtons: React.FC<typeof mapActionToProps & ReturnType<typeof mapStoreToProps>> = ({
  changeConfig,
  autoStart,
  downloadable,
  allDownloads,
  updateDownloadItem,
  download,
}) => {
  return (
    <div id="container-floating">
      <div
        id="config-button"
        className="nd1 nds"
        data-toggle="tooltip"
        data-placement="left"
        onClick={() => {
          changeConfig({ configModalOpen: true })
        }}
      >
        <img
          alt={'bt_compose2_1x'}
          className="reminder"
          src="https://ssl.gstatic.com/bt/C3341AA7A1A076756462EE2E5CD71C11/1x/bt_compose2_1x.png"
        />
      </div>
      <div
        id="floating-button"
        data-toggle="tooltip"
        data-placement="left"
        data-original-title="Create"
        onClick={() => {
          const { selectedList } = InstanceForSystem

          selectedList.forEach((item) => {
            if (typeof allDownloads[item.fsId] === 'undefined') {
              item.progress.status = StatusTypes.inQueued
              allDownloads[item.fsId] = item

              if (downloadable && autoStart) {
                download(item)
              }
            }
          })
          updateDownloadItem({ allDownloads })

          changeConfig({ downloadModalOpen: true })
        }}
      >
        <p className="plus">+</p>
        <img
          alt={'bt_compose2_1x'}
          className="edit"
          src="//ssl.gstatic.com/bt/C3341AA7A1A076756462EE2E5CD71C11/1x/ic_reminders_speeddial_white_24dp.png"
        />
      </div>
    </div>
  )
}

export default connect(mapStoreToProps, mapActionToProps)(FloatingButtons)
