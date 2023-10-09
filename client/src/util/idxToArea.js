export const arrArea = [
    'Noida',
    'Greater Noida',
    'Vaishali',
    'Indrapuram',
    'Gaur city',
]

export const AreaToIdx = (Area) => {
    return arrArea.findIndex((cont) => cont.toLowerCase() === Area.toLowerCase())
}

export const idxToArea = (idx) => {
    return (arrArea.filter((_, index) => index === Number(idx)))[0]
}