// @ts-ignore
import * as SDK from './ConnectSDK';

// Define the SDK Interfaces for code autocompletion
export interface ServiceCommand {
  success(callback: (...args: unknown[]) => void): ServiceCommand;
  error(callback: (error: Error) => void): ServiceCommand;
  complete(callback: (error: Error | null, ...args: unknown[]) => void): ServiceCommand;
}

export interface CapabilityFilter {
  capabilities: string[];
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

export interface DiscoveryManager {
  startDiscovery(config?: Record<string, unknown>): void;
  stopDiscovery(): void;
  pickDevice(options?: Record<string, unknown>, successCallback?: Function, errorCallback?: Function): DevicePicker;
  on(event: string, callback: (...args: unknown[]) => void): void;
  off(event: string, callback: (...args: unknown[]) => void): void;
  addListener(event: string, callback: (...args: unknown[]) => void): void;
  removeListener(event: string, callback: (...args: unknown[]) => void): void;
  setCapabilityFilters(filters: CapabilityFilter[]): void;
  setPairingLevel(pairingLevel: string): void;
  setAirPlayServiceMode(mode: string): void;
}

export interface DevicePicker {
  showPicker(): void;
  close(): void;
  on(event: string, callback: (error: Error | null, device: ConnectableDevice) => void): void;
}

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
  showToast(message: string, options?: Record<string, unknown>): ServiceCommand;
  showClickableToast(message: string, options?: Record<string, unknown>): ServiceCommand;
}

export interface WebAppLauncher {
  launchWebApp(webAppId: string, params?: Record<string, unknown>): ServiceCommand;
  joinWebApp(webAppId: string, params?: Record<string, unknown>): ServiceCommand;
  closeWebApp(webAppId: string): ServiceCommand;
  pinWebApp(webAppId: string): ServiceCommand;
  unPinWebApp(webAppId: string): ServiceCommand;
  isWebAppPinned(webAppId: string): ServiceCommand;
  subscribeIsWebAppPinned(webAppId: string): ServiceCommand;
}

export interface Launcher {
  launchApp(appId: string, params?: Record<string, unknown>): ServiceCommand;
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
  displayImage(url: string, mimeType: string, options?: Record<string, unknown>): ServiceCommand;
  playMedia(url: string, mimeType: string, options?: Record<string, unknown>): ServiceCommand;
}

export interface ConnectableDevice {
  connect(): void;
  disconnect(): void;
  on(event: string, callback: (...args: unknown[]) => void): void;
  off(event: string, callback: (...args: unknown[]) => void): void;
  addListener(event: string, callback: (...args: unknown[]) => void): void;
  removeListener(event: string, callback: (...args: unknown[]) => void): void;
  setPairingType(pairingType: number): void;
  isReady(): boolean;
  getId(): string;
  getFriendlyName(): string;
  getIPAddress(): string;
  getModelName(): string;
  getModelNumber(): string;
  getCapabilities(): string[];
  hasCapability(cap: string): boolean;
  supports(...caps: string[]): boolean;
  supportsAny(...caps: string[]): boolean;
  hasService(serviceName: string): boolean;
  getService(serviceName: string): unknown | null;
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
}

export const discoveryManager = SDK.discoveryManager as unknown as DiscoveryManager;
export const ConnectableDevice = SDK.ConnectableDevice as unknown as ConnectableDevice;
export const DevicePicker = SDK.DevicePicker as unknown as DevicePicker;
export const CapabilityFilter = SDK.CapabilityFilter as unknown as CapabilityFilter;

export const ConnectSDK = SDK.ConnectSDK as Record<string, unknown>;
export const eventEmitter = SDK.eventEmitter as Record<string, unknown>;
export const PairingLevel = SDK.PairingLevel as Record<string, unknown>;
export const PairingType = SDK.PairingType as Record<string, unknown>;
export const AirPlayServiceMode = SDK.AirPlayServiceMode as Record<string, unknown>;
export const execute = SDK.execute as (...args: unknown[]) => unknown;
export const Command = SDK.Command as Record<string, unknown>;
export const Subscription = SDK.Subscription as Record<string, unknown>;
export const LaunchSession = SDK.LaunchSession as Record<string, unknown>;
export const Services = SDK.Services as Record<string, unknown>;
export const KeyCodes = SDK.KeyCodes as Record<string, unknown>;
