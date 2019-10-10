import React, { Component } from 'react';

type CameraProps = {
};

class Camera extends Component<CameraProps> {
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
