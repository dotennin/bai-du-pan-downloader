/* eslint-disable @typescript-eslint/no-explicit-any,no-undef */
import { Char, IDownloadDetail, INotification, IOpenInTabOption, IXMLHttpRequestDetail } from './types'

/**
 * This section describes how the Tampermonkey API can be used
 * Application Programming Interface
 * @link https://www.tampermonkey.net/documentation.php
 */

export const GM = {
  /**
   * Adds the given style to the document and returns the injected style element.
   * @param css
   */
  addStyle: (css: HTMLStyleElement) => {
    // @ts-ignore
    GM_addStyle(css)
  },

  /**
   * Deletes 'name' from storage.
   * @param name
   * @constructor
   */
  deleteValue: (name: string) => {
    // @ts-ignore
    GM_deleteValue(name)
  },

  /**
   * List all names of the storage.
   */
  listValues: () => {
    eval(`GM_listValues()`)
  },

  /**
   * Adds a change listener to the storage and returns the listener ID.
   * 'name' is the name of the observed variable.
   * The 'remote' argument of the callback function shows whether this value was modified from the instance of another tab (true) or within this script instance (false).
   * Therefore this functionality can be used by scripts of different browser tabs to communicate with each other.
   * @param name
   * @param callback
   * @return number
   */
  addValueChangeListener: <N extends string>(
    name: N,
    callback: (name: N, oldValue: any, newValue: any, remote: boolean) => void
  ): number => {
    // @ts-ignore
    return GM_addValueChangeListener(name, callback)
  },

  /**
   * Removes a change listener by its ID.
   * @param listenerId
   */
  removeValueChangeListener: (listenerId: number) => {
    // @ts-ignore
    GM_removeValueChangeListener(listenerId)
  },

  /**
   * Set the value of 'name' to the storage.
   * @param name
   * @param value
   * @constructor
   */
  setValue: (name: string, value: any) => {
    // @ts-ignore
    GM_setValue(name, value)
  },

  /**
   * Get the value of 'name' from storage.
   * @param name
   * @param defaultValue
   * @constructor
   */
  getValue: <V extends any>(name: string, defaultValue: V): V => {
    // @ts-ignore
    return GM_getValue(name, defaultValue)
  },

  /**
   * Log a message to the console.
   * @param message
   */
  log: (message: any) => {
    // @ts-ignore
    GM_log(message)
  },

  /**
   * Get the content of a predefined @resource tag at the script header.
   * @param name
   */
  getResourceText: (name: string): string => {
    // @ts-ignore
    return GM_getResourceText(name)
  },

  /**
   * Get the base64 encoded URI of a predefined @resource tag at the script header.
   * @param name
   */
  getResourceURL: (name: string): string => {
    // @ts-ignore
    return GM_getResourceURL(name)
  },

  /**
   * Register a menu to be displayed at the Tampermonkey menu at pages where this script runs and returns a menu command ID.
   * @param name
   * @param callback
   * @param accessKey
   * @return number a menu command ID.
   */
  registerMenuCommand: (name: string, callback: Function, accessKey: Char): number => {
    // @ts-ignore
    return GM_registerMenuCommand(name, callback, accessKey)
  },

  /**
   * Unregister a menu command that was previously registered by GM_registerMenuCommand with the given menu command ID.
   * @param menuCmdId
   */
  unregisterMenuCommand: (menuCmdId: number) => {
    // @ts-ignore
    GM_unregisterMenuCommand(menuCmdId)
  },

  /**
   * Open a new tab with this url. The options object can have the following properties:
   * @param url
   * @param loadInBackground
   */
  openInTab: (url: string, loadInBackground: boolean | IOpenInTabOption) => {
    // @ts-ignore
    GM_openInTab(url, loadInBackground)
  },
  /**
   * Make an xmlHttpRequest.
   * Property of details:
   * @param details
   */
  xmlHttpRequest: (details: IXMLHttpRequestDetail): { abort: () => boolean } => {
    // @ts-ignore
    return GM_xmlhttpRequest(details)
  },

  /**
   * Downloads a given URL to the local disk.
   * @param urlOrdetails
   * @param name
   */
  download: (urlOrdetails: string | IDownloadDetail, name?: string): { abort: () => boolean } => {
    if (typeof urlOrdetails === 'string') {
      // @ts-ignore
      return GM_download(urlOrdetails, name)
    }
    // @ts-ignore
    return GM_download(urlOrdetails)
  },

  /**
   * Get a object that is persistent as long as this tab is open.
   * @param callback
   */
  getTab: (callback: Function) => {
    // @ts-ignore
    GM_getTab(callback)
  },

  /**
   * Save the tab object to reopen it after a page unload.
   * @param tab
   */
  saveTab: (tab: number) => {
    // @ts-ignore
    GM_saveTab(tab)
  },

  /**
   * Get all tab objects as a hash to communicate with other script instances.
   * @param callback
   */
  getTabs: (callback: Function) => {
    // @ts-ignore
    GM_getTabs(callback)
  },

  /**
   * Shows a HTML5 Desktop notification and/or highlight the current tab.
   * @param textOrDetails
   * @param titleOrOndone
   * @param image
   * @param onclick
   */
  notification: <T extends string | INotification>(
    textOrDetails: T,
    titleOrOndone?: T extends string ? string : Function,
    image?: string,
    onclick?: Function
  ) => {
    if (typeof textOrDetails === 'string') {
      // @ts-ignore
      GM_notification(textOrDetails, titleOrOndone, image, onclick)
    } else {
      // @ts-ignore
      GM_notification(textOrDetails, titleOrOndone)
    }
  },

  /**
   * Copies data into the clipboard. The parameter 'info' can be an object like "{ type: 'text', mimetype: 'text/plain'}" or just a string expressing the type ("text" or "html").
   * @param data
   * @param info
   */
  setClipboard: (
    data: any,
    info: { type: 'text' | 'html' | string; mimetype: 'text/plain' | string } = {
      type: 'text',
      mimetype: 'text/plain',
    }
  ) => {
    // @ts-ignore
    GM_setClipboard(data, info)
  },

  /**
   * Get some info about the script and TM. The object might look like this:
   */
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/camelcase
  info: GM_info,
}
