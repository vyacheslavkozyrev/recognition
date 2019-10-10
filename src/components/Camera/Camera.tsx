import React, { Component } from 'react';

type CameraProps = {
    onTakePhoto?: Function
};

class Camera extends Component<CameraProps> {
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
        const { canvas, video, props } = this;
        const { onTakePhoto } = props;
        const videoElement = video.current;

        if (onTakePhoto && canvas && videoElement) {
            canvas.width = videoElement.videoWidth;
            canvas.height = videoElement.videoHeight;

            const context = canvas.getContext('2d');

            if (context) {
                context.drawImage(videoElement, 0, 0);

                onTakePhoto(canvas.toDataURL('image/webp'));
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

        if (this.hasGetUserMedia()) {
            element = (
                <div>
                    <video
                        ref={this.video}
                        height="300"
                        width="300"
                    />
                    <button
                        onClick={this.handleTakePicture.bind(this)}
                    >
                        Take Picture
                    </button>
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
