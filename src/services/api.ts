import { HeaderTypes, StatusTypes } from './types'
import { GM } from './gmInterface/gmInterface'
import { ItemProxy } from './ItemProxy'
import { getFileExtension } from '../utils'
import { InstanceForSystem } from './InstaceForSystem'

export function getDownloadUrl(path: string) {
  if (path.match(/^\/sharelink\d+/) !== null) {
    throw new Error(
      '需要先「保存到我的百度网盘」后<br />在网盘列表(<a target="_blank" href="https://pan.baidu.com/disk/home">https://pan.baidu.com/disk/home</a>)中下载'
    )
  }
  return new Promise((resolve, reject) => {
    GM.xmlHttpRequest({
      url:
        'http://pcs.baidu.com/rest/2.0/pcs/file?app_id=778750&ver=2.0&method=locatedownload&path=' +
        encodeURIComponent(path),
      method: 'GET',
      responseType: 'json',
      headers: {
        'User-Agent': HeaderTypes.userAgent,
      },
      onload: (r) => {
        if (r.response.client_ip) {
          return resolve(r)
        } else {
          // Todo return error message
          return reject(r)
        }
      },
    })
  })
}

const blackListedFileExtension = ['apk', 'exe', 'pdf', '7z']
const formatServerFilename = (fileName: string) =>
  fileName + (blackListedFileExtension.includes(getFileExtension(fileName)) ? '.__________重命名我.zip' : '')

export function download(item: ItemProxy) {
  const { url, serverFilename, progress } = item
  let currentEvent: ProgressEvent | undefined = undefined
  progress.percentCount = 0
  progress.speedOverlay = 0

  return new Promise((resolve, reject) => {
    progress.request = GM.download({
      url,
      name: formatServerFilename(serverFilename),
      saveAs: true,
      headers: {
        Host: 'qdall01.baidupcs.com',
        Accept: '*/*',
        'User-Agent': HeaderTypes.userAgent,
        'Accept-Encoding': 'identity',
        'Accept-Language': 'ja-JP',
        'Accept-Charset': '*',
      },
      onprogress: (e: ProgressEvent) => {
        currentEvent = e

        progress.percentCount = Math.round((currentEvent.loaded * 100) / currentEvent.total)
      },
      onload: () => {
        progress.intervalId && clearInterval(progress.intervalId)
        progress.percentCount = 100
        progress.speedOverlay = 0
        progress.status = StatusTypes.completed

        GM.notification({
          text: '下载完成',
          title: serverFilename,
          highlight: true,
        })
        resolve()
      },
      onerror: (e) => {
        progress.intervalId && clearInterval(progress.intervalId)
        progress.percentCount = 0
        progress.speedOverlay = 0
        progress.status = StatusTypes.error
        if (Object.keys(e).length === 0) {
          reject(new Error('user is not authorized, hitcode:122'))
        } else {
          reject(new Error(e.error))
        }
      },
    })

    let loaded = 0
    progress.intervalId = window.setInterval(() => {
      if (currentEvent) {
        const speed = currentEvent.loaded - loaded
        loaded = currentEvent.loaded
        progress.speedOverlay = speed
      }
    }, 1000)
  })
}

export function createPrivateShareLink<
  R extends {
    createsharetips_ldlj: string
    ctime: number
    errno: number
    expiredType: number
    link: string
    premis: boolean
    request_id: number
    shareid: number
    shorturl: string
  }
>(fs_id?: ItemProxy['fsId']): Promise<R> {
  const { list, jquery } = InstanceForSystem
  return new Promise((resolve, reject) => {
    jquery
      .post(
        '/share/set?channel=chunlei&clienttype=0&web=1',
        {
          schannel: 4,
          channel_list: '[]',
          period: 7,
          pwd: 'qqqq',
          fid_list: jquery.stringify(fs_id ? [fs_id] : list.getSelected().map((l) => l.fs_id)),
        },
        function(r: R) {
          resolve(r)
        }
      )
      .error(function(e: Error) {
        reject(e)
      })
  })
}

export async function getDirectLinks(
  link: string,
  pwd: string
): Promise<
  {
    category: string
    fs_id: string
    isdir: '0' | '1'
    dlink: string
    local_ctime: string
    local_mtime: string
    md5: string
    path: string
    server_ctime: string
    server_filename: string
    server_mtime: string
    size: string
  }[]
> {
  return await (
    await fetch(`https://pan.dotennin.net/?link=${encodeURI(link)}%20%E6%8F%90%E5%8F%96%E7%A0%81:%20${pwd}`)
  ).json()
}
