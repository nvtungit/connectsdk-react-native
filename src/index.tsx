// @ts-ignore — ConnectSDK.js is plain JavaScript without type declarations
import * as SDK from './ConnectSDK';

// ============================================================
//  Type Definitions — properly separated from runtime exports
// ============================================================

/**
 * ServiceCommand represents an async command sent to a device.
 * Chain `.success()` / `.error()` / `.complete()` for callbacks.
 */
export interface ServiceCommand {
  success(callback: (...args: any[]) => void): ServiceCommand;
  error(callback: (error: Error) => void): ServiceCommand;
  complete(
    callback: (error: Error | null, ...args: any[]) => void
  ): ServiceCommand;
}

export interface ChannelInfo {
  id: string;
  name: string;
  number: string;
  majorNumber: number;
  minorNumber: number;
}

export interface ExternalInputInfo {
  id: string;
  name: string;
}

// ── Capability Interfaces ──────────────────────────────────

export interface TVControl {
  channelUp(): ServiceCommand;
  channelDown(): ServiceCommand;
  setChannel(channelInfo: ChannelInfo): ServiceCommand;
  getChannelList(): ServiceCommand;
  getCurrentChannel(): ServiceCommand;
  subscribeCurrentChannel(): ServiceCommand;
}

export interface VolumeControl {
  getVolume(): ServiceCommand;
  setVolume(volume: number): ServiceCommand;
  volumeUp(): ServiceCommand;
  volumeDown(): ServiceCommand;
  getMute(): ServiceCommand;
  setMute(mute: boolean): ServiceCommand;
  subscribeMute(): ServiceCommand;
  subscribeVolume(): ServiceCommand;
}

export interface ExternalInputControl {
  getExternalInputList(): ServiceCommand;
  setExternalInput(externalInputInfo: ExternalInputInfo): ServiceCommand;
  showExternalInputPicker(): ServiceCommand;
}

export interface KeyControl {
  up(): ServiceCommand;
  down(): ServiceCommand;
  left(): ServiceCommand;
  right(): ServiceCommand;
  ok(): ServiceCommand;
  back(): ServiceCommand;
  home(): ServiceCommand;
  sendKeyCode(keyCode: number): ServiceCommand;
}

export interface MouseControl {
  connectMouse(): ServiceCommand;
  disconnectMouse(): ServiceCommand;
  move(dx: number, dy: number): ServiceCommand;
  scroll(dx: number, dy: number): ServiceCommand;
  click(): ServiceCommand;
}

export interface TextInputControl {
  sendText(input: string): ServiceCommand;
  sendEnter(): ServiceCommand;
  sendDelete(): ServiceCommand;
  subscribeTextInputStatus(): ServiceCommand;
}

export interface PowerControl {
  powerOff(): ServiceCommand;
}

export interface ToastControl {
  showToast(
    message: string,
    options?: Record<string, unknown>
  ): ServiceCommand;
  showClickableToast(
    message: string,
    options?: Record<string, unknown>
  ): ServiceCommand;
}

export interface WebAppLauncher {
  launchWebApp(
    webAppId: string,
    params?: Record<string, unknown>
  ): ServiceCommand;
  joinWebApp(
    webAppId: string,
    params?: Record<string, unknown>
  ): ServiceCommand;
  closeWebApp(webAppId: string): ServiceCommand;
  pinWebApp(webAppId: string): ServiceCommand;
  unPinWebApp(webAppId: string): ServiceCommand;
  isWebAppPinned(webAppId: string): ServiceCommand;
  subscribeIsWebAppPinned(webAppId: string): ServiceCommand;
}

export interface Launcher {
  launchApp(
    appId: string,
    params?: Record<string, unknown>
  ): ServiceCommand;
  closeApp(appId: string): ServiceCommand;
  launchAppStore(appId: string): ServiceCommand;
  launchBrowser(url?: string): ServiceCommand;
  launchHulu(contentId?: string): ServiceCommand;
  launchNetflix(contentId?: string): ServiceCommand;
  launchYouTube(contentId?: string): ServiceCommand;
  getAppList(): ServiceCommand;
}

export interface MediaControl {
  play(): ServiceCommand;
  pause(): ServiceCommand;
  stop(): ServiceCommand;
  rewind(): ServiceCommand;
  fastForward(): ServiceCommand;
  seek(position: number): ServiceCommand;
  getDuration(): ServiceCommand;
  getPosition(): ServiceCommand;
  subscribePlayState(): ServiceCommand;
}

export interface MediaPlayer {
  displayImage(
    url: string,
    mimeType: string,
    options?: Record<string, unknown>
  ): ServiceCommand;
  playMedia(
    url: string,
    mimeType: string,
    options?: Record<string, unknown>
  ): ServiceCommand;
}

// ── ConnectableDevice ──────────────────────────────────────

/** A discovered device on the network (TV, Chromecast, etc.) */
export interface ConnectableDevice {
  // Connection
  connect(): void;
  disconnect(): void;
  isReady(): boolean;

  // Device info
  getId(): string;
  getFriendlyName(): string;
  getIPAddress(): string;
  getModelName(): string;
  getModelNumber(): string;

  // Capabilities
  getCapabilities(): string[];
  hasCapability(cap: string): boolean;
  supports(...caps: string[]): boolean;
  supportsAny(...caps: string[]): boolean;

  // Services
  hasService(serviceName: string): boolean;
  getService(serviceName: string): unknown | null;

  // Pairing
  setPairingType(pairingType: number): void;

  // Capability getters — each returns an interface to control the device
  getMediaControl(): MediaControl;
  getMediaPlayer(): MediaPlayer;
  getTVControl(): TVControl;
  getVolumeControl(): VolumeControl;
  getExternalInputControl(): ExternalInputControl;
  getKeyControl(): KeyControl;
  getMouseControl(): MouseControl;
  getTextInputControl(): TextInputControl;
  getPowerControl(): PowerControl;
  getToastControl(): ToastControl;
  getWebAppLauncher(): WebAppLauncher;
  getLauncher(): Launcher;

  // Events
  on(event: 'ready', callback: () => void): void;
  on(event: 'disconnect', callback: () => void): void;
  on(event: 'capabilitieschanged', callback: () => void): void;
  on(event: string, callback: (...args: any[]) => void): void;

  off(event: string, callback: (...args: any[]) => void): void;
  addListener(event: string, callback: (...args: any[]) => void): void;
  removeListener(event: string, callback: (...args: any[]) => void): void;
}

// ── DevicePicker ───────────────────────────────────────────

export interface DevicePicker {
  close(): void;
  success(
    callback: (device: ConnectableDevice) => void,
    context?: unknown
  ): DevicePicker;
  error(callback: (error: Error) => void, context?: unknown): DevicePicker;
  complete(
    callback: (error: Error | null, device?: ConnectableDevice) => void,
    context?: unknown
  ): DevicePicker;
  on(
    event: 'success',
    callback: (device: ConnectableDevice) => void
  ): DevicePicker;
  on(event: 'error', callback: (error: Error) => void): DevicePicker;
  on(event: string, callback: (...args: any[]) => void): DevicePicker;
}

// ── DiscoveryManager ───────────────────────────────────────

export interface DiscoveryManagerConfig {
  pairingLevel?: 'on' | 'off';
  airPlayServiceMode?: 'webapp' | 'media';
  capabilityFilters?: string[][];
}

export interface DiscoveryManager {
  startDiscovery(config?: DiscoveryManagerConfig): void;
  stopDiscovery(): void;
  setPairingLevel(pairingLevel: 'on' | 'off'): void;
  setAirPlayServiceMode(mode: 'webapp' | 'media'): void;
  setCapabilityFilters(filters: any[]): void;
  getDeviceList(): ConnectableDevice[];

  // Typed picker
  pickDevice(
    options?: Record<string, unknown>,
    successCallback?: (device: ConnectableDevice) => void,
    errorCallback?: (error: Error) => void
  ): DevicePicker;

  // Typed event overloads — THIS is what makes autocomplete work for callbacks
  on(
    event: 'devicefound',
    callback: (device: ConnectableDevice) => void
  ): void;
  on(
    event: 'devicelost',
    callback: (device: ConnectableDevice) => void
  ): void;
  on(
    event: 'deviceupdated',
    callback: (device: ConnectableDevice) => void
  ): void;
  on(
    event: 'devicelistchanged',
    callback: (devices: ConnectableDevice[]) => void
  ): void;
  on(event: string, callback: (...args: any[]) => void): void;

  off(event: string, callback: (...args: any[]) => void): void;
  addListener(event: string, callback: (...args: any[]) => void): void;
  removeListener(event: string, callback: (...args: any[]) => void): void;
}

// ── Constants ──────────────────────────────────────────────

export interface PairingLevelConstants {
  ON: 'on';
  OFF: 'off';
}

export interface PairingTypeConstants {
  NONE: 'NONE';
  FIRST_SCREEN: 'FIRST_SCREEN';
  PIN: 'PIN';
  MIXED: 'MIXED';
  AIRPLAY_MIRRORING: 'AIRPLAY_MIRRORING';
}

export interface AirPlayServiceModeConstants {
  WEBAPP: 'webapp';
  MEDIA: 'media';
}

export interface ServicesConstants {
  Chromecast: 'Chromecast';
  DIAL: 'DIAL';
  DLNA: 'DLNA';
  NetcastTV: 'NetcastTV';
  Roku: 'Roku';
  WebOSTV: 'webOS TV';
  FireTV: 'FireTV';
  AirPlay: 'AirPlay';
}

export interface KeyCodesConstants {
  NUM_0: 0;
  NUM_1: 1;
  NUM_2: 2;
  NUM_3: 3;
  NUM_4: 4;
  NUM_5: 5;
  NUM_6: 6;
  NUM_7: 7;
  NUM_8: 8;
  NUM_9: 9;
  DASH: 10;
  ENTER: 11;
}

// ============================================================
//  Runtime Exports — properly typed instances
// ============================================================

/** Singleton DiscoveryManager — main entry point for device discovery */
export const discoveryManager: DiscoveryManager =
  SDK.discoveryManager as unknown as DiscoveryManager;

/** Device pairing level constants */
export const PairingLevel: PairingLevelConstants =
  SDK.PairingLevel as unknown as PairingLevelConstants;

/** Device pairing type constants */
export const PairingType: PairingTypeConstants =
  SDK.PairingType as unknown as PairingTypeConstants;

/** AirPlay service mode constants */
export const AirPlayServiceMode: AirPlayServiceModeConstants =
  SDK.AirPlayServiceMode as unknown as AirPlayServiceModeConstants;

/** Device service name constants */
export const Services: ServicesConstants =
  SDK.Services as unknown as ServicesConstants;

/** TV remote key code constants */
export const KeyCodes: KeyCodesConstants =
  SDK.KeyCodes as unknown as KeyCodesConstants;

/** Low-level execute function (advanced use only) */
export const execute = SDK.execute as (
  action: string,
  args: string,
  success: (...args: any[]) => void,
  error: (...args: any[]) => void
) => void;

/** Native event emitter reference (advanced use only) */
export const eventEmitter = SDK.eventEmitter;

/** CapabilityFilter constructor */
export const CapabilityFilter = SDK.CapabilityFilter as unknown as new (
  capabilities: string[]
) => { getCapabilities(): string[] };
