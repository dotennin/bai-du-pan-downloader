import React from 'react'
import Operation from './Operation'
import ProgressStatus from './ProgressStatus'
import SpeedStatus from './SpeedStatus'
import { InstanceForSystem } from '../../services/InstaceForSystem'
import { IStoreState } from '../../store'
import { createSelector } from 'reselect'
import { connect } from 'react-redux'
import { StatusTypes } from '../../services/types'
import TabTableHeader from '../../components/TabTableHeader'

const mapStoreToProps = (store: IStoreState) => ({
  fsIdList: createSelector(
    (store: IStoreState) => store.download.downloadItems,
    (allDownloads) =>
      Object.keys(allDownloads)
        .sort((a) => (allDownloads[a].status === StatusTypes.downloading ? -1 : 1))
        .filter((fsId) => [StatusTypes.downloading, StatusTypes.inQueued].includes(allDownloads[fsId].status))
  )(store),
})

function DownloadingTab({ fsIdList, name }: ReturnType<typeof mapStoreToProps> & { name: string }) {
  return (
    <TabTableHeader name={name}>
      {fsIdList.map((fsId, key) => {
        const item = InstanceForSystem.allDownloads[fsId]
        if (!item) {
          return null
        }
        const { serverFilename, size } = InstanceForSystem.allDownloads[fsId]
        return (
          <tr key={key} id={'row-' + fsId}>
            <td data-label="filename" style={{ wordBreak: 'break-all' }}>
              {serverFilename}
            </td>
            <td data-label="download">
              <div className="wrap">
                <ProgressStatus fsId={fsId} />
              </div>
            </td>
            <td data-label="url">{InstanceForSystem.friendlyFileSize(size)}</td>
            <td data-label="speed">
              <SpeedStatus fsId={fsId} />
            </td>
            <td data-label="operation">
              <Operation fsId={fsId} />
            </td>
          </tr>
        )
      })}
    </TabTableHeader>
  )
}

export default connect(mapStoreToProps)(DownloadingTab)
