import dayjs from 'dayjs'

export const getNowDate = function (format = 'YYYY-MM-DD') {
    return dayjs().format(format)
}