import React from 'react'
import { Modal } from '../../components/Modal'
import { connect, shallowEqual } from 'react-redux'
import { Dispatch } from 'redux'
import { interfaceActionCreator } from '../../store/Interface'
import { IStoreState } from '../../store'
import Item from './Item'
import { createSelector } from 'reselect'

const mapStoreToProps = (store: IStoreState) => ({
  fsIdList: createSelector(
    (store: IStoreState) => store.download.allDownloads,
    (allDownloads) => Object.keys(allDownloads)
  )(store),
  downloadModalOpen: store.interface.downloadModalOpen,
})

const mapActionsToProps = (dispatch: Dispatch) => ({
  closeModal: () => {
    dispatch(interfaceActionCreator.change({ downloadModalOpen: false }))
  },
})

function DownloadList({
  fsIdList,
  downloadModalOpen,
  closeModal,
}: ReturnType<typeof mapStoreToProps> & ReturnType<typeof mapActionsToProps>) {
  console.log(fsIdList, downloadModalOpen)
  return (
    <Modal open={downloadModalOpen} close={closeModal}>
      <table>
        <thead>
          <tr>
            <th scope="col">文件</th>
            <th scope="col">进度</th>
            <th scope="col">大小</th>
            <th scope="col">速度</th>
            <th scope="col">操作</th>
          </tr>
        </thead>
        <tbody id="popup-tbody">
          {fsIdList.map((fsId, key) => {
            return <Item key={key} fsId={fsId} />
          })}
        </tbody>
      </table>
    </Modal>
  )
}
const DL = React.memo(DownloadList, (prevProps, nextProps) => {
  return (
    shallowEqual(prevProps.fsIdList, nextProps.fsIdList) &&
    shallowEqual(prevProps.downloadModalOpen, nextProps.downloadModalOpen)
  )
})

export default connect(mapStoreToProps, mapActionsToProps)(DL)
