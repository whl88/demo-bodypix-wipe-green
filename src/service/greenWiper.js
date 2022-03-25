const bodyPix = require('@tensorflow-models/body-pix');
import '@tensorflow/tfjs-backend-webgl'

export async function wipe(frameData){
    /* const net = await bodyPix.load({
        architecture: 'ResNet50',
        outputStride: 32,
        quantBytes: 2
    }) */
    const net = await bodyPix.load({
        architecture: 'MobileNetV1',
        outputStride: 16,
        multiplier: 0.75,
        quantBytes: 2,
    })
    const segmentation = await net.segmentPerson(frameData);
    segmentation.data.forEach((p,i)=>{
        frameData.data[i * 4 + 3] = p?255:0;
    })
    return frameData
}