import {DPR} from "../game";

export function imageName(path: string, placeholder: string = "<size>") {

    let imageSize = DPR * 100; // 100, 200, 300

    let sizes = [100, 200, 300];

    let idx = sizes.findIndex((e) => e < imageSize);
    idx = idx === -1 ? sizes.length - 1 : idx + 1;

    return path.replace(placeholder, sizes[idx].toString());
}

export function toPixels(dpi: number) {
    return dpi * DPR;
}