import React, {ReactElement, useEffect, useState} from "react"
import { Button } from "react-native-paper"
import { View } from "react-native"
import styles from "styles/form_style"

type Props = {
    name: string;
    onChange: (selectedValue: string, fieldName: string) => void
}

function SelectGender(props: Props): ReactElement {
    const [genderButtons, setGenderButtons] = useState<React.ReactNode[]>([]);

    const genderChoices: string[] = ["male", "female", "other"];

    useEffect(() => {
        const buttons: ReactElement[] = genderChoices.map((choice) => (
            <Button key={choice} mode="contained-tonal" onPress={() => handleButtonClick(choice)}>
                {choice}
            </Button>
        ));
        setGenderButtons(buttons);
    }, []);

    const handleButtonClick = (selectedValue: string) => {
        props.onChange(selectedValue, props.name);
    }

    return (
        <View style={styles.gender}>
            {genderButtons}
        </View>
    );
}

export default SelectGender;
