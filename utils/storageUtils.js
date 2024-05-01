export function setItem(key, value){
    if(window !== undefined){
        localStorage.setItem(key, value)
    }
}