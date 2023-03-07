
export default function isCollapsedReducers(preState=false,action) {
    let { type } = action;
    switch(type) {
        case 'on': return true;
        case 'off': return false;
        default: return preState;
    }
}