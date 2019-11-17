import React, { Component } from 'react';

import './Camera.css';

const videoHeight: number = 400;
const videoWidth: number = 400;
const lblTakePicture: string = 'Take Photo';
const lblRetakePicture: string = 'Retake Photo';

type CameraState = {
    photo: string | null,
    lblTakePicture: string
};

type CameraProps = {
    onTakePhoto?: Function
};

class Camera extends Component<CameraProps, CameraState> {
    private constraints: Object = {
        video: {
            height: { exact: videoHeight },
            width: { exact: videoWidth }
        }
    };
    private video: React.RefObject<HTMLVideoElement>;
    private canvas: HTMLCanvasElement | null;

    constructor(props: CameraProps) {
        super(props);

        this.state = {
            photo: null,
            lblTakePicture: lblTakePicture
        };

        this.video = React.createRef();
        this.canvas = null;
    }

    componentDidMount(): void {
        this.canvas = document.createElement('canvas');

        navigator.mediaDevices.getUserMedia(this.constraints).
            then(stream => {
                if (this.video.current) {
                    this.video.current.autoplay = true;
                    this.video.current.srcObject = stream;
                }
            });
    }

    componentDidUpdate(): void {
        navigator.mediaDevices.getUserMedia(this.constraints).
            then(stream => {
                if (this.video.current) {
                    this.video.current.autoplay = true;
                    this.video.current.srcObject = stream;
                }
            });
    }

    hasGetUserMedia(): boolean {
        return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
    }

    handleTakePicture(): void {
        const { canvas, video, props, state } = this;
        const { onTakePhoto } = props;
        const { photo } = state;
        const videoElement = video.current;

        if (photo) {
            this.setState({
                ...state,
                photo: null,
                lblTakePicture: lblTakePicture
            });
        }
        else if (onTakePhoto && canvas && videoElement) {
            canvas.width = videoElement.videoWidth;
            canvas.height = videoElement.videoHeight;

            const context = canvas.getContext('2d');

            if (context) {
                context.drawImage(videoElement, 0, 0);
                context.canvas.toBlob(() => {
                    this.setState({
                        ...state,
                        photo: canvas.toDataURL('image/jpeg'),
                        lblTakePicture: lblRetakePicture
                    });

                    onTakePhoto(this.state.photo);
                });
            }
        }
    }

    render(): JSX.Element {
        let element: JSX.Element;
        let image: JSX.Element | null = null;

        const { photo, lblTakePicture } = this.state;

        if (photo) {
            image = (
                <div className="camera-container">
                    <img
                        src={photo}
                        className="camera-photo"
                    />
                </div>
            );
        }
        else {
            image = (
                <div className="camera-container">
                    <video
                        ref={this.video}
                        className="camera-video-container"
                    />
                </div>
            );
        }

        if (this.hasGetUserMedia()) {
            element = (
                <>
                    {image}

                    <div className="camera-button-container">
                        <button onClick={this.handleTakePicture.bind(this)}>
                            {lblTakePicture}
                        </button>
                    </div>
                </>
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
