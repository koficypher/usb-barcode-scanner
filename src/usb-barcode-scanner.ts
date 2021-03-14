import { HID, Device } from 'node-hid';
import { EventEmitter } from 'events';

import { UsbScannerOptions, HidMap, onDataScanned } from './usb-barcode-scanner-types';
import { getDevice, defaultHidMap, getDeviceByPath } from './usb-barcode-scanner-utils';

const readBufferTimeout = 50;

export class UsbScanner extends EventEmitter implements onDataScanned {
    hid?: HID;
    hidMap: any;
    readBufferTimer: boolean;

    constructor(options: UsbScannerOptions, hidMap?: any) {
        super();

        let device: Device|undefined;

        if (options.path) {
            device = this.retreiveDeviceByPath(options.path);
        } else if (options.vendorId && options.productId) {
            device = getDevice(options.vendorId, options.productId);
        }
        if (options.readBufferTimer === true) {
            this.readBufferTimer = true;
        } else {
            this.readBufferTimer = false;
        }

        if (device === undefined) {
            console.warn(`Device not found, please provide a valid path or vendor/product combination.`);
        } else {
            this.hid = new HID(device.vendorId, device.productId);

            if (hidMap) {
                this.hidMap = hidMap;
            } else {
                this.hidMap = defaultHidMap();
            }
        }
    }

    private retreiveDevice(vendorId: number, productId: number): Device|undefined {
        return getDevice(vendorId, productId);
    }

    private retreiveDeviceByPath(path: string): Device|undefined {
        return getDeviceByPath(path);
    }

    startScanning(): void {
        /**
         * USB HID Report Specification: https://www.usb.org/sites/default/files/documents/hid1_11.pdf
         * Starting Page 55
         *
         * Note USB barcode scanners always send a "input" type report which is a "long item" of 8 bytes.
         */

        /**
         * Page 60 in the specification
         */
        const HID_REPORT_BYTE_SIGNIFICANCE = {
            MODIFIER: 0,
            RESERVED: 1,
            KEY_CODE_1: 2,
            KEY_CODE_2: 3,
            KEY_CODE_3: 4,
            KEY_CODE_4: 5,
            KEY_CODE_5: 6,
            KEY_CODE_6: 7
        };

        const MODIFIER_BITS = {
            LEFT_CTRL: 0x1,
            LEFT_SHIFT: 0x2,
            LEFT_ALT: 0x3,
            LEFT_GUI: 0x4,
            RIGHT_CTRL: 0x5,
            RIGHT_SHIFT: 0x6,
            RIGHT_ALT: 0x7,
            RIGHT_GUI: 0x8
        };

        const REPORT_ENDING_KEY_CODE = 40;

        let bcodeBuffer: string[] = [];
        let barcode: string = '';
        let timer: NodeJS.Timer | undefined;

        if (this.hid) {
            this.hid.on('data', (chunk) => {
                let keyCode1 = chunk[HID_REPORT_BYTE_SIGNIFICANCE.KEY_CODE_1];
                let modifierByte = chunk[HID_REPORT_BYTE_SIGNIFICANCE.MODIFIER];
                let isShiftModified = modifierByte & MODIFIER_BITS.LEFT_SHIFT || modifierByte & MODIFIER_BITS.RIGHT_SHIFT;
                if (keyCode1) {
                    if (keyCode1 !== REPORT_ENDING_KEY_CODE) {
                        let hidMapEntry = this.hidMap[keyCode1];
                        if (hidMapEntry) {
                            if (typeof hidMapEntry === 'object') {
                                if (isShiftModified && hidMapEntry.shift) {
                                    bcodeBuffer.push(hidMapEntry.shift);
                                } else {
                                    bcodeBuffer.push(hidMapEntry.unmodified);
                                }
                            } else {
                                bcodeBuffer.push(hidMapEntry);
                            }
                        }
                        if (timer) {
                            clearTimeout(timer);
                        }
                        if (this.readBufferTimer) {
                            timer = setTimeout(() => {
                                    barcode = bcodeBuffer.join("");
                                    bcodeBuffer = [];
                                    this.emitDataScanned(barcode);
                                }, readBufferTimeout);
                        }
                    } else {
                        if (timer) {
                            clearTimeout(timer);
                        }
                        barcode = bcodeBuffer.join("");
                        bcodeBuffer = [];

                        this.emitDataScanned(barcode);
                    }
                }
            });
            this.hid.on('error', (error) => {
                    this.emitError(error);
            });
        }
    }

    stopScanning(): void {
        if (this.hid) {
            this.hid.close();
        }
    }

    private emitDataScanned(data: string): void {
        this.emit('data', data)
    }

    private emitError(error: string): void {
        this.emit('error', error)
    }

}