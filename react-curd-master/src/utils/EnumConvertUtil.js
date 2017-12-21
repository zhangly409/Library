export const convertGender = (gender) => {
    switch (gender){
        case 'male':
        return '男'
        case 'female':
        return '女'
        default:
        return '未知'
    }
}