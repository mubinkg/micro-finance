'use client'
import { Input, Label } from 'reactstrap'

export function InputLable({label, placeholder, name, watch, setValue}) {
    return (
        <div className='mt-2'>
            <Label>
                {label}
            </Label>
            <Input value={watch ? watch(name):""} onChange={setValue ? (e)=>setValue(name, e.target.value):""}  placeholder={placeholder} />
        </div>
    )
}