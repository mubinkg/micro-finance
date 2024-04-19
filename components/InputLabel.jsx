'use client'
import { Input, Label } from 'reactstrap'

export function InputLable({label, placeholder}) {
    return (
        <div className='mt-2'>
            <Label for="exampleEmail">
                {label}
            </Label>
            <Input placeholder={placeholder} />
        </div>
    )
}