type Form  = {
    [index: string]:{
        type: string;
        value: string;
        choices?:{};
        patterns?:
            {
                pattern:string;
                message:string
            }[];
        error?:string[];
    }
}
