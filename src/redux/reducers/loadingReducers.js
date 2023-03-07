export default function loadingReducers(preState=false,action) {
    let { type } = action;
    switch(type) {
        case 'onLoading': return true;
        case 'offLoading': return false;
        default: return preState;
    }
}