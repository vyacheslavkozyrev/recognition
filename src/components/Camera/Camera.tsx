import React, { Component } from 'react';

type CameraProps = {
    onTakePhoto?: Function
};

class Camera extends Component<CameraProps> {
    constructor(props: CameraProps) {
        super(props)
    }
    hasGetUserMedia(): boolean {
        return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
    }

    render(): JSX.Element {
        let element: JSX.Element;

        if (this.hasGetUserMedia()) {
            element = (
                <span>camera is supported 123</span>
            );
        }
        else {
            element = (
                <span>camera is not supported</span>
            );
        }

        return element;
    }
}

export { Camera };
