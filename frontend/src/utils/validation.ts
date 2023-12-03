export default function validate(text:string, pattern:string): errortype{
    if(!text) return errortype.notPassed
    const reg = new RegExp(pattern,'g')
    console.log(text.match(reg))
    if(text.match(reg)?.length == 1){
            return errortype.good
    }
    else{
        return errortype.invalidValue
    }
}
export enum errortype{
    "good",
    "notPassed",
    "invalidValue"
}
