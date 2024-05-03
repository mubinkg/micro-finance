export function setItem(key, value){
    if(window !== undefined){
        localStorage.setItem(key, value)
    }
}

export function removeItem(key){
    if(window !== undefined){
        localStorage.removeItem(key)
    }
}

export function isAuthenticated(){
    if(!global){
        const user = localStorage.getItem('user')
        if(user){
            return true
        }
        return false
    }
    return false
}