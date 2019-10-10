import React, { Component } from 'react';

type CameraProps = {
};

class Camera extends Component<CameraProps> {
    constraints: Object = {
        video: {
            height: { exact: 480 },
            width: { exact: 640 }
        }
    };

    private video: React.RefObject<HTMLVideoElement>;

    constructor(props: CameraProps) {
        super(props);

        this.video = React.createRef();
    }

    hasGetUserMedia(): boolean {
        return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
    }

    getVideoElement(element: React.RefObject<HTMLVideoElement>): void {
        this.video = element;
    }

    componentDidMount(): void {
        navigator.mediaDevices.getUserMedia(this.constraints).
            then(stream => {
                if (this.video.current) {
                    this.video.current.autoplay = true;
                    this.video.current.srcObject = stream;
                }
            });

        console.log(this.video);
    }

    render(): JSX.Element {
        let element: JSX.Element;

        if (this.hasGetUserMedia()) {
            element = (
                <video
                    ref={this.video}
                    height="300"
                    width="300"
                />
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
