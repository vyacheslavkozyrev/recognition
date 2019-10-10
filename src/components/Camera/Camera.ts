import React, { Component } from 'react';

type CameraProps = {
};

class Camera extends Component<CameraProps> {
    Camera(props: CameraProps) {
    }

    render(): JSX.Element {
        const element: JSXElement = <span>camera component</span>

        return element;
    }
}

export { Camera };
