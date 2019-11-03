import {DPR} from "../game";

export function imageName(path, placeholder = "<size>") {

    let imageSize = window.devicePixelRatio * 100; // 100, 200, 300

    let sizes = [100, 200, 300];

    let idx = sizes.findIndex((e) => e < imageSize);
    idx = idx === -1 ? sizes.length - 1 : idx + 1;

    return path.replace(placeholder, sizes[idx]);
}

export function toPixels(dpi) {
    return dpi * DPR;
}