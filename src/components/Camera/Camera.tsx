import React, { Component } from 'react';

type CameraState = {
    photo: string | undefined,
    lblTakePicture: string
};

type CameraProps = {
    onTakePhoto?: Function
};

class Camera extends Component<CameraProps, CameraState> {
    private constraints: Object = {
        video: {
            height: { exact: 480 },
            width: { exact: 640 }
        }
    };
    private video: React.RefObject<HTMLVideoElement>;
    private canvas: HTMLCanvasElement | null;

    constructor(props: CameraProps) {
        super(props);

        this.state = {
            photo: undefined,
            lblTakePicture: 'Take photo'
        };

        this.video = React.createRef();
        this.canvas = null;
    }

    hasGetUserMedia(): boolean {
        return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
    }

    getVideoElement(element: React.RefObject<HTMLVideoElement>): void {
        this.video = element;
    }

    handleTakePicture(): void {
        const { canvas, video, props, state } = this;
        const { onTakePhoto } = props;
        const videoElement = video.current;

        if (onTakePhoto && canvas && videoElement) {
            canvas.width = videoElement.videoWidth;
            canvas.height = videoElement.videoHeight;

            const context = canvas.getContext('2d');

            if (context) {
                context.drawImage(videoElement, 0, 0);
                context.canvas.toBlob(() => {
                    this.setState({
                        ...state,
                        photo: canvas.toDataURL('image/jpeg'),
                        lblTakePicture: 'Retake picture'
                    });

                    onTakePhoto(this.state.photo);
                });
            }
        }
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

    render(): JSX.Element {
        let element: JSX.Element;
        let image: JSX.Element | null = null;

        const { photo, lblTakePicture } = this.state;

        if (photo) {
            image = (
                <div className="camera-image-container">
                    <img
                        src={photo}
                    />
                </div>
            );
        }

        if (this.hasGetUserMedia()) {
            element = (
                <div className="camera-container">
                    <video
                        ref={this.video}
                        className="camera-video-container"
                    />
                    <button
                        className="camera-button"
                        onClick={this.handleTakePicture.bind(this)}
                    >
                        {lblTakePicture}
                    </button>

                    {image}

                </div>
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
